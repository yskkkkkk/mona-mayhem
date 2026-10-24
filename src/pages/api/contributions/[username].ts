import type { APIRoute } from 'astro';
import type { ApiError, ContributionData } from '../../../types/contributions';

export const prerender = false;

const CACHE_TTL_MS = 10 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 10 * 1000;
const cache = new Map<string, { data: ContributionData; expiresAt: number }>();

function jsonResponse<T>(
	data: T,
	status: number,
	cacheControl: string,
	cacheStatus?: 'HIT' | 'MISS',
): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': cacheControl,
			...(cacheStatus ? { 'X-Cache': cacheStatus } : {}),
		},
	});
}

export const GET: APIRoute = async ({ params }) => {
	const username = params.username;
	if (!username || !/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(username)) {
		return jsonResponse<ApiError>({ error: 'Invalid GitHub username' }, 400, 'no-store');
	}

	const cacheKey = username.toLowerCase();
	const now = Date.now();
	for (const [key, entry] of cache) {
		if (entry.expiresAt <= now) cache.delete(key);
	}

	const cached = cache.get(cacheKey);
	if (cached) {
		return jsonResponse(cached.data, 200, 'public, max-age=600', 'HIT');
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
	try {
		const upstream = await fetch(`https://github.com/${encodeURIComponent(username)}.contribs`, {
			signal: controller.signal,
		});
		if (upstream.status === 404) {
			return jsonResponse<ApiError>({ error: 'Not Found' }, 404, 'no-store');
		}
		if (!upstream.ok) {
			return jsonResponse<ApiError>({ error: 'Contribution service unavailable' }, 502, 'no-store');
		}

		const data: ContributionData = await upstream.json();
		cache.set(cacheKey, { data, expiresAt: Date.now() + CACHE_TTL_MS });
		return jsonResponse(data, 200, 'public, max-age=600', 'MISS');
	} catch {
		return jsonResponse<ApiError>({ error: 'Contribution service unavailable' }, 502, 'no-store');
	} finally {
		clearTimeout(timeout);
	}
};
