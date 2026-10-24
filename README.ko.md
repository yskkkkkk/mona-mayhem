🌐 [English](README.md) | [Español](README.es.md) | [Português (Brasil)](README.pt_BR.md) | 한국어

# Mona Mayhem — GitHub 기여도 배틀 아레나

레트로 아케이드 배틀로 두 GitHub 사용자를 비교합니다. Astro 서버 앱은 서버 측 API 프록시를 통해 기여 데이터를 가져오고, 기여 그래프, 연속 기여 기록(streak), 배틀 우승자를 표시합니다.

## 로컬에서 실행

Node.js와 npm이 필요합니다. 저장소 루트에서 다음을 실행합니다.

```bash
npm ci
npm run dev
```

[http://localhost:4321](http://localhost:4321)을 열고 GitHub 사용자 이름 두 개를 입력한 다음 배틀을 시작합니다.

프로덕션 빌드를 확인하려면 다음을 실행합니다.

```bash
npm run build
npm run preview
```

이 앱의 미리보기가 이미 실행 중이라면 `npm run build`를 실행하기 전에 중지하고, 빌드가 끝난 후 `npm run preview`로 다시 시작합니다. 이전 미리보기 프로세스는 오래된 해시 CSS/JS URL을 참조할 수 있으며, 이 경우 404 오류와 스타일 또는 스크립트 문제가 발생합니다.

## 기능

- 일별 툴팁과 색상 단계 범례를 갖춘 나란히 배치된 기여 그래프
- 기여 합계, 날짜 범위, 최장 연속 기여 기록, 우승자 배너
- 대체 네온 테마, 최근 배틀 기록, 선택 사항인 합성 사운드, 공유 가능한 결과

## 기여 API

`GET /api/contributions/{username}`은 서버에서 GitHub의 `https://github.com/{username}.contribs` 엔드포인트를 프록시하여 브라우저 CORS 제한을 피합니다. 유효한 사용자 이름에는 `from`, `to`, `total_contributions`, `colors_full`, `weeks`, `months`를 포함한 업스트림 JSON이 반환됩니다. 유효하지 않은 사용자 이름은 `400`, 존재하지 않는 GitHub 사용자는 `404`, 업스트림 오류는 `502`를 반환합니다. 성공 응답은 메모리에 10분간 캐시되며, `X-Cache`는 `MISS` 또는 `HIT`를 알려 줍니다.

## 브라우저 검증 체크리스트

이 수동 점검은 아직 진행되지 않았습니다. 필요에 따라 브라우저 DevTools로 뷰포트, 동작 줄이기(reduced-motion), 스토리지, API 응답 상황을 시뮬레이션합니다.

- [ ] `octocat`과 `torvalds`로 배틀합니다. 두 그래프, 합계, 연속 기여 기록, 우승자가 표시됩니다. 두 사용자 이름 입력란 중 어느 쪽에서든 Enter 키로 반복합니다.
- [ ] 어느 입력란에서든 빈 값과 잘못된 형식의 사용자 이름(예: `bad/name`)을 제출합니다. 명확한 유효성 검사 오류가 표시되고, 입력을 바로잡으면 배틀을 진행할 수 있습니다.
- [ ] 형식은 올바르지만 존재하지 않는 GitHub 사용자 이름을 각 플레이어 위치에 따로 입력합니다. API 오류가 해당 플레이어를 가리키고, 로딩이 끝나며, 수정 후 재시도가 동작합니다.
- [ ] 12px 그래프 셀과 그래프별 범례 색상 견본 5개를 확인합니다. 날짜에 마우스를 올리거나 키보드로 포커스를 이동하면 올바른 날짜와 기여 횟수가 담긴 툴팁이 표시됩니다.
- [ ] Tab 키는 각 그래프의 날짜 한 곳으로 진입하고, 화살표 키는 해당 그래프 안에서 포커스를 이동하며, Tab/Shift+Tab은 모든 셀을 순회하지 않고 그래프를 벗어납니다. 포커스된 툴팁은 그래프 가장자리 근처에서도 계속 표시됩니다.
- [ ] 1024px, 768px, 모바일 너비(예: 375px)에서 컨트롤과 결과를 계속 사용할 수 있습니다. 넓은 그래프는 페이지 수준의 가로 스크롤 없이 자체 컨테이너 안에서 가로로 스크롤됩니다.
- [ ] 테마를 전환한 후 새로고침합니다. 선택한 테마가 유지됩니다.
- [ ] 배틀을 여러 번 진행한 후 새로고침합니다. 최근 배틀은 최대 10개까지 유지됩니다. 기록을 지우고 새로고침합니다. 저장된 테마는 지워지지 않으며 기록은 비어 있는 상태로 유지됩니다.
- [ ] 우승자 결과와 무승부(두 플레이어에 같은 사용자 이름 사용)를 공유합니다. 공유/복사된 우승자 또는 무승부 상태, 두 사용자 이름, 두 기여 횟수가 표시된 결과와 일치합니다.
- [ ] 카운트다운과 결과 슬라이드인을 확인합니다. 동작 줄이기를 켜고 반복합니다. 애니메이션은 억제되지만 배틀은 계속 결과에 도달합니다.
- [ ] 할당량 오류를 포함한 `localStorage` 읽기/쓰기/삭제 실패를 시뮬레이션합니다. 배틀 중에도 경고가 계속 표시되고, 공유와 테마 변경은 처리되지 않은 오류 없이 계속 사용할 수 있습니다.
- [ ] 손상된 저장 테마/기록 데이터를 시뮬레이션합니다. 잘못된 JSON, 배열이 아닌 기록, 유효하지 않은 항목이 섞인 기록이 있어도 배틀이 중단되지 않아야 합니다. 저장된 기록은 변경되지 않고, 유효한 레코드가 표시되며, 기록 지우기에 성공할 때까지 새 저장이 일시 중지됩니다.
- [ ] 잘못된 JSON 또는 예상하지 못한 기여 API 응답 형식을 시뮬레이션합니다. 해당 플레이어에게 읽을 수 있는 오류가 표시되고 유효한 플레이어의 그래프는 계속 표시됩니다. 우승자/공유 결과는 제공되지 않고, 로딩이 끝나며, 유효한 재시도는 성공합니다.

# 🎮 Mona Mayhem

**VS Code 및 GitHub Copilot CLI 워크숍** — GitHub 기여도 배틀 아레나 만들기

두 사용자의 GitHub 기여 그래프를 비교하는 레트로 아케이드 스타일 웹사이트를 Astro로 만드는 워크숍 템플릿입니다. 이 저장소는 **시작점**이며, GitHub Copilot을 사용해 단계별로 앱을 완성합니다.

![Mona Mayhem 스크린샷](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*워크숍을 마치면 만들 수 있는 결과물*

## 📚 워크숍

워크숍은 두 가지 트랙을 제공합니다. 선호하는 작업 방식에 맞는 트랙을 선택하십시오.

- **VS Code 트랙** — 편집기 안에서 채팅(Chat), 계획 모드(Plan Mode), 에이전트 모드(Agent Mode), 백그라운드 에이전트(Background agents), 편집기 내 검토 흐름을 실습합니다.
- **CLI 트랙** — 터미널에서 `copilot`, `@file` 컨텍스트, `/plan`, 자율 편집, `/fleet`, `/delegate`, `/review`를 실습합니다.

| 파트 | 제목 | Copilot 중점 기능 |
|------|-------|------------------|
| [00](workshop/ko/00-overview.md) | 개요 | 트랙 선택 및 학습 목표 |
| [01](workshop/ko/01-setup.md) | 설정 및 컨텍스트 엔지니어링(Context Engineering) | 지침, 권한, 환경 설정 |
| [02](workshop/ko/02-plan-and-scaffold.md) | 계획 및 스캐폴딩(Scaffolding) | API 및 페이지 아키텍처 계획 |
| [03](workshop/ko/03-agent-mode.md) | 게임 구현 | 에이전트 기반 구현(Agentic implementation) 및 반복 개선 |
| [04](workshop/ko/04-design-vibes.md) | 디자인 우선 테마 구성 | 시각 디자인 계획 및 구현 |
| [05](workshop/ko/05-polish.md) | 다듬기 및 병렬 작업 | 병렬 처리, 검토, 품질 개선 |
| [06](workshop/ko/06-bonus.md) | 보너스 및 확장 기능 | 자유 과제 및 추가 실험 |

## 🚀 빠른 시작

1. 먼저 다음 방법 중 하나로 저장소를 만듭니다.
   - **Use this template**을 클릭해 새 저장소를 만들거나
   - 이 저장소를 포크합니다.
2. 원하는 워크숍 트랙을 선택합니다.
   - **VS Code:** 저장소를 복제하고 VS Code에서 엽니다.
   - **GitHub Copilot CLI:** 저장소를 로컬에 복제하고 `copilot`을 설치한 다음 터미널에서 작업합니다.
3. [워크숍 안내](workshop/ko/00-overview.md)를 따라 진행합니다.

## 사전 준비

### 공통

- GitHub Copilot(Pro, Business 또는 Enterprise)
- Git
- Node.js

### VS Code 트랙

- VS Code v1.107+
- GitHub Copilot 확장에 로그인

### CLI 트랙

- GitHub Copilot CLI(`copilot`)
- `npm install -g @github/copilot`으로 CLI를 설치하려면 Node.js 22+
- 또는 Homebrew나 WinGet 등 원하는 패키지 관리자로 설치

## 기술 스택

- **프레임워크:** [Astro](https://astro.build/) v6
- **런타임:** [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) 어댑터를 사용하는 Node.js
- **글꼴:** Press Start 2P(레트로 게임 글꼴)
- **API:** GitHub 기여 그래프 API

## 배포 참고 사항

### 현재 GitHub Pages 구성

현재 `.github/workflows/deploy.yml` 워크플로는 `docs/` 및 `workshop/`의 정적 콘텐츠를 GitHub Pages에 배포합니다. `src/`의 Astro 앱을 빌드하거나 배포하지는 않습니다.

### Astro 앱을 GitHub Pages에 배포하려는 경우

GitHub Pages는 정적 호스팅이므로 Astro 앱도 정적 출력을 사용해야 합니다.

1. `astro.config.mjs`의 `output`을 `server`에서 `static`으로 변경합니다.
2. `astro.config.mjs`와 `package.json`에서 Node 어댑터(`@astrojs/node`)를 제거합니다.
3. GitHub Actions 워크플로에서 `npm ci`와 `npm run build`를 실행한 다음, Pages 아티팩트로 `dist/`를 업로드하도록 변경합니다.
4. 프로젝트 페이지(`https://<user>.github.io/<repo>/`)에 배포한다면 `astro.config.mjs`에서 `site`와 `base`를 설정합니다.

프로덕션에서 API 라우트를 계속 실행해야 한다면 GitHub Pages 대신 Vercel, Netlify 또는 Node.js 호스트와 같은 서버 플랫폼을 사용합니다.

## 라이선스

MIT
