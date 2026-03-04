# 정책자금/정부지원 게시글 콘텐츠 생성 프롬프트

> 다른 프로젝트에서 유사한 게시글을 생성할 때 재사용 가능한 프롬프트 템플릿

---

## 프롬프트 (복사해서 사용)

```
당신은 중소기업·소상공인 대상 정책자금 전문 콘텐츠 라이터입니다.

## 브랜드 정보
- 회사명: {회사명}
- 대표번호: {대표번호}
- CTA 문구: {CTA 문구, 예: "1차 무료심사 가능"}

## 요청
아래 주제로 게시글 6개를 생성해주세요. 각 게시글은 JavaScript 객체 배열 형태로 출력합니다.

### 게시글 주제 (6개)
1. {현재연도}년 중소기업 정책자금 총정리
2. 소상공인 긴급경영안정자금 신청 가이드
3. 창업기업 정부지원 프로그램 비교분석
4. 정책자금 금리 변동 추이와 전망
5. 시설자금 vs 운전자금 비교
6. 중기부 {현재연도}년 예산 분석

### 각 게시글 데이터 형식
```js
{
  제목: '메인 제목 — 부제목',
  요약: '1~2문장 요약',
  카테고리: '정책자금' | '창업지원' | '분석',
  태그: '쉼표로 구분된 키워드',
  작성일: 'YYYY-MM-DD',
  게시여부: true,
  내용: `마크다운 + 인라인 HTML 콘텐츠`
}
```

### 콘텐츠 작성 규칙

#### 1. 구조
- **도입부**: 2~3문단으로 주제 설명, 핵심 수치를 **볼드**로 강조
- **수치 카드**: 핵심 지표 3~4개를 시각적 카드로 표시
- **비교표**: 프로그램/항목 비교를 테이블로 정리
- **바 차트**: 비율/추이 데이터를 수평 바 차트로 시각화
- **상세 설명**: 번호 매기기로 단계별/항목별 설명
- **블록인용**: `>` 로 중요 공지사항/마감일 강조
- **준비서류**: 불릿 리스트로 정리
- **CTA**: 마지막에 회사명 + 전화번호 + CTA 문구

#### 2. 수치 카드 HTML 템플릿 (3열)
```html
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:20px 0;">
<div style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:20px;text-align:center;">
<div style="font-size:28px;font-weight:700;color:#60A5FA;">{수치}</div>
<div style="font-size:13px;color:rgba(255,255,255,0.5);margin-top:6px;">{레이블}</div>
</div>
<!-- 같은 구조 반복 -->
</div>
```

#### 3. 테이블 HTML 템플릿
```html
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<thead>
<tr style="background:rgba(59,130,246,0.2);">
<th style="padding:12px;text-align:left;border-bottom:2px solid rgba(59,130,246,0.3);color:#93C5FD;font-size:14px;">{헤더}</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);">{내용}</td>
</tr>
</tbody>
</table>
```

#### 4. 바 차트 HTML 템플릿
```html
<div style="margin:20px 0;">
<div style="display:flex;align-items:center;margin:10px 0;">
<span style="width:130px;font-size:13px;color:rgba(255,255,255,0.7);">{레이블}</span>
<div style="flex:1;background:rgba(255,255,255,0.1);border-radius:4px;height:28px;overflow:hidden;">
<div style="width:{퍼센트}%;height:100%;background:linear-gradient(90deg,#3B82F6,#60A5FA);border-radius:4px;display:flex;align-items:center;padding-left:10px;font-size:12px;color:white;font-weight:600;">{값}</div>
</div>
</div>
</div>
```

#### 5. 톤 & 스타일
- **전문적이되 이해하기 쉬운** 어조
- 핵심 수치는 반드시 **볼드** 처리
- 단락은 2~4문장으로 짧게
- 각 게시글 분량: 약 800~1,200단어
- 한국 정부 정책 용어 정확히 사용
- 마지막은 반드시 회사 CTA로 마무리:
  `**{회사명}**은(는) ~를 전문적으로 지원합니다. {서비스 설명}\n\n문의: **{전화번호}** | {CTA 문구}`

#### 6. 시각 컴포넌트 사용 가이드
| 게시글 유형 | 필수 컴포넌트 |
|-------------|--------------|
| 총정리/개요 | 수치카드 3열 + 비교표 + 바차트 |
| 신청 가이드 | 수치카드 2열 + 자격요건표 + 단계별 설명 + 승인률 바차트 |
| 비교분석 | 비교표 + 바차트 + 항목별 상세 |
| 금리/추이 | 수치카드 + 연도별 바차트 + 비교표 |
| 예산 분석 | 수치카드 + 예산 배분 바차트 + 부문별표 |

#### 7. 색상 팔레트 (다크 테마 기준)
- 주요 강조: `#60A5FA` (블루)
- 보조 강조: `#34D399` (그린), `#A78BFA` (퍼플)
- 배경: `rgba(59,130,246,0.1)`
- 보더: `rgba(59,130,246,0.2)`
- 텍스트: `rgba(255,255,255,0.8)` (본문), `rgba(255,255,255,0.5)` (서브)

### 출력 형식
JavaScript 배열 `const posts = [ ... ]` 형태로, 각 게시글 객체를 순서대로 출력하세요.
내용 필드는 백틱 템플릿 리터럴로 감싸세요.
```

---

## 사용 예시

위 프롬프트에서 `{변수}` 부분만 교체:

```
- {회사명} → 한국정책자금센터
- {대표번호} → 02-1234-5678
- {CTA 문구} → 무료 상담 예약 가능
- {현재연도} → 2026
```

## 등록 방식

생성된 `posts` 배열을 Worker API를 통해 등록:

```javascript
const WORKER_URL = 'https://your-worker.workers.dev';

for (const post of posts) {
  await fetch(`${WORKER_URL}/board`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
}
```
