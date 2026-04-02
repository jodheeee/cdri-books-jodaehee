## CERTICOS BOOKS

카카오 도서 검색 API 기반의 도서 검색

### 실행 방법

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
# .env 파일을 프로젝트 루트에 생성하고 카카오 REST API 키를 입력
VITE_KAKAO_REST_API_KEY=

# 개발 서버 실행
pnpm dev
```

- Node 20 이상 필요

### 폴더 구조 및 주요 코드 설명

```
src/
├── components            # 공통 컴포넌트
├── hooks                 # 공통 훅
├── layout                # 헤더, 레이아웃
├── pages
│   ├── search            # 도서 검색 페이지
│   └── wishlist          # 찜 목록 페이지
├── stores                # 전역 상태
├── icons                 # SVG 아이콘
└── images                # 이미지
```

- 페이지별 `modules/` 하위에 컴포넌트, 훅, API를 구성해 관심사를 분리하고 공통 UI(`BookList`, `EmptyResult` 등)는 `components/`에서 관리

### 라이브러리 선택 이유

- 전역 상태관리는 찜 목록/검색 기록 정도만 저장하여 가볍고 미들웨어로 로컬스토리지 연동이 편리하여 Zustand 선택
- CSS 라이브러리는 Vercel에서 공식으로 지지하고 다른 CSS 라이브러리에 비하여 유지보수가 잘 이루어지기 때문에 Tailwind CSS 선택

### 강조하고 싶은 부분

**도서 목록 서스펜스 적용**

- 로딩 폴백으로 스켈레톤 노출
  - UI 쉬프트가 일어나지 않도록 신경

**인피니티 스크롤 적용**

- 2회 이상 로딩 시 탑 버튼 노출

**도서 목록 이미지 최적화**

- lazy loading

**검색, 찜 페이지 코드 스플리팅 적용**

- React.lazy()

**리액트 쿼리 캐시 최적화**

- staleTime: 5분 / 동일 검색어 재요청 시 캐시 사용
- gcTime: 10분 / 사용하지 않는 캐시 정리 주기
