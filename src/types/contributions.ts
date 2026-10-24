export interface ContributionDay {
	weekday: number;
	count: number;
	level: number;
}

export interface ContributionWeek {
	index: number;
	first_day: string;
	contribution_days: ContributionDay[];
}

export interface ContributionMonth {
	month: string;
	total_weeks: number;
}

export interface ContributionData {
	schema: string;
	generated_at: string;
	from: string;
	to: string;
	range_days: number;
	total_contributions: number;
	private_contributions_included: boolean;
	colors_full: string[];
	weeks: ContributionWeek[];
	months: ContributionMonth[];
}

export interface ApiError {
	error: string;
}
