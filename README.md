# 평냉 취향 테스트 (Pyongyang Naengmyeon FE)

육향부터 메밀향까지, 내 입맛에 맞는 평양냉면 계열을 알아보는 취향 테스트 서비스의 프론트엔드입니다.

## 기술 스택

- [Next.js 16](https://nextjs.org) (App Router)
- React 19 / TypeScript
- Tailwind CSS v4
- Jest + Testing Library
- ESLint

## 시작하기

### 요구 사항

- Node.js 22 (`.nvmrc` 참고)

### 환경 변수

루트에 `.env.local` 파일을 만들고 아래 값을 설정하세요.

```
API_ORIGIN=<백엔드 API 주소>
```

### 설치 및 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run type-check` | 타입 검사 (`tsc --noEmit`) |
| `npm test` | Jest 테스트 실행 |
| `npm run test:watch` | Jest watch 모드 |
| `npm run sync-tokens` | Figma 디자인 토큰(`tokens/figma-tokens.json`)을 `src/styles/tokens.css`로 동기화 |

## 프로젝트 구조

```
src/
  app/            # 라우트 (페이지, 레이아웃)
    quiz/         # 취향 테스트 진행 화면
    result/       # 결과 화면
  components/     # 공통 UI 컴포넌트
  lib/api/        # 백엔드 API 클라이언트
  styles/         # 폰트, 전역 스타일, 토큰
tokens/           # Figma 디자인 토큰 원본
scripts/          # 토큰 동기화 등 빌드 스크립트
__tests__/        # 테스트 코드
```

## 테스트 & CI

PR 생성/푸시 시 GitHub Actions에서 lint → type-check → test가 순서대로 실행됩니다. (`.github/workflows/ci.yml`)

## 커밋 컨벤션

`<type> : #<이슈번호> <설명>` 형식을 사용합니다.

예: `feat : #57 로딩 스켈레톤 공통화 및 loading.tsx 적용`

- `feat`: 기능 추가
- `fix`: 버그 수정
- `refactor`: 리팩터링
