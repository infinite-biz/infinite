# 다음 세션: SEO 전체 텍스트 리라이팅

## 프로젝트

- 경로: `F:\pola_homepage\26.26_1th_kimkyunghwan_infinites`
- 브랜드: 인피니트 솔루션 (infinites.co.kr)
- 대표: 김경환 / 기업심사관
- GitHub: infinite-biz (SSH: github-infinites)

## 완료된 작업

### 브랜드 컬러 CSS 일괄 적용 (완료)

1. main.css :root CSS 변수 전체 교체 (Dark Charcoal + Gold)
2. main.css 하드코딩 컬러 전체 교체
3. dashboard.css 브랜드 컬러 교체
4. HTML 18개 파일 인라인 컬러 교체 (골드-다크 그라데이션 위반 0건)
5. 로고/프로필사진/폰트 에셋 셋업
6. 파비콘 생성 (ico/png/apple-touch)
7. 로고 네온 글로우 톤다운 (헤더 + 풋터)
8. 풋터 로고 크기 축소 (120px → 56px)
9. 헤더 브랜드명 골드 컬러 적용 (#DFC06A, 24px)
10. 풋터 옛 상호명 교체 (케이(k)-자금 컴퍼니 → 인피니트)

### 컨텐츠 톤 수정 (완료)

- "서류 작성" → "서류 준비 안내"
- "기업 분석" → "현황 체크/사전 평가/역량 평가"
- "대행" → "안내"
- 31개 문구 수정 (index/about/process/fund/service/board/policy)

### 보안 스캔 (완료, 미적용)

- staffEmails 클라이언트 노출 (6개 파일) → Worker 서버 사이드로 이동 필요
- docs/ 가이드에 민감값 하드코딩 → 플레이스홀더로 교체 필요

## 다음 할 일: SEO 전체 텍스트 리라이팅

### 문제

- 현재 텍스트가 kmoney(15번 프로젝트)에서 복사한 것이라 검색 SEO에 중복 컨텐츠로 불리함
- 전체 페이지 텍스트를 고유하게 리라이팅해야 함

### 리라이팅 규칙 (반드시 준수)

1. **글자수 동일 유지** — 레이아웃 깨지지 않게
2. **맥락 의미 동일** — 전달하려는 메시지는 유지
3. **"정책자금 심사관 출신" 표현 불가** — 공공기관 출신 뉘앙스 금지
4. **"기업심사관"** = 경영컨설팅 전문가의 직함일 뿐 (공공기관 심사관 아님)
5. **서류를 작성해주는 게 아님** — 서류 준비 안내, 대표자 직접 신청·작성
6. **"기업현황분석" → "현황분석", "역량평가", "사전심사"** 등으로 변경
7. **공공기관 느낌 절대 금지** — private consulting firm

### 리라이팅 대상 파일 (10개 메인 페이지)

- `index.html` — 메인 페이지 전체 텍스트
- `about.html` — 회사소개 페이지
- `process.html` — 진행절차 페이지
- `fund.html` — 정책자금 페이지
- `service.html` — 전문가서비스 페이지
- `marketing.html` — 온라인마케팅 페이지
- `board.html` — 게시판 페이지
- `post.html` — 게시글 상세 페이지
- `policy.html` — 이용약관
- `privacy.html` — 개인정보처리방침

### 리라이팅 방법 제안

- 페이지별로 현재 텍스트 전체 추출
- SEO 키워드 분석 (인피니트 솔루션 고유 키워드 선정)
- 페이지별 리라이팅 후 반영
- meta description, title, OG 태그도 전부 고유하게 변경

### 미적용 보안 개선 (리라이팅과 함께 진행 가능)

- staffEmails 서버 사이드 이동
- docs/ 가이드 민감값 플레이스홀더 교체
- Worker URL config.js 중앙화

## 적용된 브랜드 컬러 매핑 (참고)

| 구분          | Variable        | 값                    |
| ------------- | --------------- | --------------------- |
| Primary Dark  | --primary-dark  | #1A191D               |
| Primary Pale  | --primary-pale  | #201F24               |
| Primary       | --primary       | #313036               |
| Primary Hover | --primary-hover | #3C3A42               |
| Primary Light | --primary-light | #46444C               |
| Secondary     | --secondary     | #7A7870               |
| Accent        | --accent        | #C9A84C               |
| Accent Dark   | --accent-dark   | #B8963F               |
| Accent Light  | --accent-light  | #DFC06A               |
| Accent Pale   | --accent-pale   | #F5EDDA               |
| Glass BG      | --glass-bg      | rgba(201,168,76,0.08) |

### 디자인 규칙

- 골드 → 다크 직접 그라데이션 금지
- 골드는 단색(solid)으로만: CTA 버튼, 텍스트 하이라이트, 아이콘
- 그라데이션은 다크 계열끼리만

## 참고 파일

- `BRAND_INFO.md` — 브랜드 정보 + 컬러 정리
- `color-guide.html` — 전체 프리뷰 + CSS 매핑표
- `.env.local` — 전체 크레덴셜
- `fonts/FreesentationVF.ttf` — 로고 폰트 (프리젠테이션 5 medium)
