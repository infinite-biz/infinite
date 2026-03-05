// 게시판 6개 전면 교체 스크립트
// R2 HTML 업로드 → Airtable 레코드 업데이트
// kmoney(k-fund.kr)와 겹치지 않는 인피니트 솔루션 차별화 콘텐츠

const WORKER_URL = "https://infinite.gangang901.workers.dev";

// 기존 Airtable 레코드 ID (업데이트 대상)
const RECORD_IDS = [
  "reclWKj6eNxQVQlRx",
  "recSNynTa3RBK26jY",
  "rec6asdsAu9XEVWg9",
  "recRb300UyJqpYsYG",
  "recmjqCTIokKQV8Yx",
  "rec7QWj6T6h4Rl7hg",
];

const posts = [
  {
    제목: "정책자금 컨설팅, 왜 필요한가? — 자체 신청 vs 전문가 대행 비교",
    요약: "정책자금 직접 신청과 전문 컨설팅의 차이를 실제 승인율 데이터와 함께 비교 분석합니다.",
    카테고리: "컨설팅",
    태그: "컨설팅,정책자금,전문가,승인율,사전진단",
    작성일: "2026-03-05",
    slug: "consulting-value-guide",
    html: `<div class="article-content">
<div style="background:linear-gradient(135deg,#313036 0%,#201f24 100%);border-radius:16px;padding:32px;margin-bottom:32px;border:1px solid rgba(201,168,76,0.3)">
<h2 style="color:#c9a84c;margin:0 0 8px;font-size:22px">정책자금 신청, 전문가가 필요한 이유</h2>
<p style="color:rgba(255,255,255,0.85);line-height:1.8;margin:12px 0 0">
매년 수조원 규모의 정책자금이 공급되지만, <strong style="color:#c9a84c">자체 신청 기업의 평균 승인율은 30~40%</strong>에 그칩니다. 서류 미비, 자격 오해, 전략 부재가 주된 원인입니다. 전문 컨설팅을 통해 이 격차를 어떻게 줄일 수 있는지 알아봅니다.
</p>
</div>

<h3 style="color:#e2e8f0;border-left:4px solid #c9a84c;padding-left:16px;margin:28px 0 16px">자체 신청 vs 전문가 대행 비교</h3>

<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
<thead>
<tr style="background:rgba(201,168,76,0.15)">
<th style="padding:14px 16px;text-align:left;color:#c9a84c;border-bottom:2px solid rgba(201,168,76,0.4)">구분</th>
<th style="padding:14px 16px;text-align:center;color:#c9a84c;border-bottom:2px solid rgba(201,168,76,0.4)">자체 신청</th>
<th style="padding:14px 16px;text-align:center;color:#c9a84c;border-bottom:2px solid rgba(201,168,76,0.4)">전문 컨설팅</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid rgba(255,255,255,0.1)">
<td style="padding:12px 16px;color:#e2e8f0;font-weight:600">평균 승인율</td>
<td style="padding:12px 16px;text-align:center;color:rgba(255,255,255,0.8)">30~40%</td>
<td style="padding:12px 16px;text-align:center;color:#c9a84c;font-weight:700">85~95%</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02)">
<td style="padding:12px 16px;color:#e2e8f0;font-weight:600">소요 기간</td>
<td style="padding:12px 16px;text-align:center;color:rgba(255,255,255,0.8)">4~8주 (시행착오 포함)</td>
<td style="padding:12px 16px;text-align:center;color:#c9a84c;font-weight:700">2~3주 (최적 경로)</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.1)">
<td style="padding:12px 16px;color:#e2e8f0;font-weight:600">서류 반려 비율</td>
<td style="padding:12px 16px;text-align:center;color:rgba(255,255,255,0.8)">60% 이상</td>
<td style="padding:12px 16px;text-align:center;color:#c9a84c;font-weight:700">5% 미만</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02)">
<td style="padding:12px 16px;color:#e2e8f0;font-weight:600">자금 규모 최적화</td>
<td style="padding:12px 16px;text-align:center;color:rgba(255,255,255,0.8)">기본 한도 신청</td>
<td style="padding:12px 16px;text-align:center;color:#c9a84c;font-weight:700">가용 한도 극대화</td>
</tr>
<tr>
<td style="padding:12px 16px;color:#e2e8f0;font-weight:600">복수 프로그램 조합</td>
<td style="padding:12px 16px;text-align:center;color:rgba(255,255,255,0.8)">단일 프로그램</td>
<td style="padding:12px 16px;text-align:center;color:#c9a84c;font-weight:700">2~3개 동시 추진</td>
</tr>
</tbody>
</table>
</div>

<h3 style="color:#e2e8f0;border-left:4px solid #10b981;padding-left:16px;margin:28px 0 16px">전문 컨설팅이 차이를 만드는 5가지 영역</h3>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:20px 0">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:12px;padding:20px">
<div style="color:#c9a84c;font-weight:700;font-size:28px;margin-bottom:4px">01</div>
<div style="color:#e2e8f0;font-weight:600;margin-bottom:8px">사전 적격성 진단</div>
<div style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6">재무제표, 신용등급, 업종별 가점을 분석하여 승인 가능성을 사전에 판단합니다.</div>
</div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:12px;padding:20px">
<div style="color:#c9a84c;font-weight:700;font-size:28px;margin-bottom:4px">02</div>
<div style="color:#e2e8f0;font-weight:600;margin-bottom:8px">최적 프로그램 매칭</div>
<div style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6">수백 개 지원사업 중 기업 상황에 딱 맞는 프로그램을 선별합니다.</div>
</div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:12px;padding:20px">
<div style="color:#c9a84c;font-weight:700;font-size:28px;margin-bottom:4px">03</div>
<div style="color:#e2e8f0;font-weight:600;margin-bottom:8px">서류 완성도 극대화</div>
<div style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6">심사 기준에 맞춘 사업계획서, 재무 자료 구성으로 반려율을 최소화합니다.</div>
</div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:12px;padding:20px">
<div style="color:#c9a84c;font-weight:700;font-size:28px;margin-bottom:4px">04</div>
<div style="color:#e2e8f0;font-weight:600;margin-bottom:8px">심사 대응 코칭</div>
<div style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6">현장 실태조사, 면접 심사에 대한 사전 준비와 시뮬레이션을 지원합니다.</div>
</div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:12px;padding:20px">
<div style="color:#c9a84c;font-weight:700;font-size:28px;margin-bottom:4px">05</div>
<div style="color:#e2e8f0;font-weight:600;margin-bottom:8px">사후 자금 관리</div>
<div style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6">자금 집행 후 사용계획 변경, 상환 전략 등 지속적인 사후관리를 제공합니다.</div>
</div>
</div>

<div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:24px;margin-top:28px">
<h4 style="color:#c9a84c;margin:0 0 12px">인피니트 솔루션의 차별점</h4>
<ul style="margin:0;padding-left:20px;color:rgba(255,255,255,0.8);font-size:14px;line-height:2">
<li>기업심사관 출신 전문 컨설턴트의 <strong>사전진단 시스템</strong></li>
<li>승인 가능성이 낮으면 <strong>솔직하게 사전 고지</strong> — 무의미한 신청 방지</li>
<li>정책자금 외 보증서, 세제혜택, R&D까지 <strong>복합 자금전략</strong> 수립</li>
<li>성공보수 기반 — <strong>승인되지 않으면 비용 없음</strong></li>
</ul>
</div>

<p style="color:rgba(255,255,255,0.6);font-size:14px;margin-top:24px;line-height:1.8">
무료 사전진단 신청: infinites.co.kr | 대표전화: 1844-0621
</p>
</div>`,
  },
  {
    제목: "정책자금 탈락 사례 TOP 5 — 사전진단으로 예방하는 핵심 포인트",
    요약: "실제 정책자금 신청에서 빈번하게 발생하는 탈락 원인 5가지와 사전진단을 통한 예방법을 공개합니다.",
    카테고리: "컨설팅",
    태그: "탈락사례,사전진단,정책자금,심사,서류보완",
    작성일: "2026-03-04",
    slug: "rejection-prevention-guide",
    html: `<div class="article-content">
<div style="background:linear-gradient(135deg,#3b1323 0%,#201f24 100%);border-radius:16px;padding:32px;margin-bottom:32px;border:1px solid rgba(239,68,68,0.3)">
<h2 style="color:#f87171;margin:0 0 8px;font-size:22px">정책자금, 왜 탈락하는가?</h2>
<p style="color:rgba(255,255,255,0.85);line-height:1.8;margin:12px 0 0">
정책자금 신청 기업의 <strong style="color:#f87171">60% 이상이 1차 서류 심사에서 탈락</strong>합니다. 대부분은 자격 요건 오해, 서류 불비, 전략 부재 등 <strong>사전에 충분히 예방 가능한 원인</strong>입니다. 실제 탈락 사례를 분석하고 예방법을 알려드립니다.
</p>
</div>

<h3 style="color:#e2e8f0;border-left:4px solid #f87171;padding-left:16px;margin:28px 0 16px">탈락 사례 TOP 5</h3>

<div style="display:flex;flex-direction:column;gap:16px;margin:20px 0">

<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:flex-start;gap:16px">
<div style="flex-shrink:0;width:48px;height:48px;background:rgba(239,68,68,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#f87171;font-size:20px;font-weight:800">01</div>
<div>
<div style="color:#f87171;font-weight:700;font-size:16px;margin-bottom:8px">재무제표 부적격 — "신용등급이 낮아서 안 된다고?"</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8">매출은 충분하지만 부채비율이 200%를 초과하거나, 최근 연도 영업적자가 있는 경우. <strong>사전진단 시 재무구조를 먼저 점검</strong>하면 개선 후 재신청 전략을 세울 수 있습니다.</div>
<div style="margin-top:10px;padding:10px 14px;background:rgba(16,185,129,0.1);border-radius:8px;color:#10b981;font-size:13px"><strong>예방법:</strong> 재무제표 사전 분석 → 부채비율 조정 → 적정 시점에 신청</div>
</div>
</div>
</div>

<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:flex-start;gap:16px">
<div style="flex-shrink:0;width:48px;height:48px;background:rgba(239,68,68,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#f87171;font-size:20px;font-weight:800">02</div>
<div>
<div style="color:#f87171;font-weight:700;font-size:16px;margin-bottom:8px">업종 제한 미확인 — "우리 업종이 제외 대상이었다니"</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8">부동산 임대업, 금융업 등 일부 업종은 정책자금 신청 자체가 불가합니다. 업종코드와 세부 조건을 사전에 확인하지 않아 시간만 낭비하는 사례가 빈번합니다.</div>
<div style="margin-top:10px;padding:10px 14px;background:rgba(16,185,129,0.1);border-radius:8px;color:#10b981;font-size:13px"><strong>예방법:</strong> KSIC 업종코드 확인 → 프로그램별 제외 업종 대조 → 대안 프로그램 탐색</div>
</div>
</div>
</div>

<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:flex-start;gap:16px">
<div style="flex-shrink:0;width:48px;height:48px;background:rgba(239,68,68,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#f87171;font-size:20px;font-weight:800">03</div>
<div>
<div style="color:#f87171;font-weight:700;font-size:16px;margin-bottom:8px">사업계획서 부실 — "계획서에 숫자가 없다"</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8">막연한 성장 비전만 나열하고 구체적인 매출 추정, 자금 소요 계획, 상환 능력 근거가 없는 사업계획서는 심사 단계에서 감점 요인입니다.</div>
<div style="margin-top:10px;padding:10px 14px;background:rgba(16,185,129,0.1);border-radius:8px;color:#10b981;font-size:13px"><strong>예방법:</strong> 정량적 데이터 기반 사업계획서 → 심사 기준 항목별 체크 → 전문가 검토</div>
</div>
</div>
</div>

<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:flex-start;gap:16px">
<div style="flex-shrink:0;width:48px;height:48px;background:rgba(239,68,68,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#f87171;font-size:20px;font-weight:800">04</div>
<div>
<div style="color:#f87171;font-weight:700;font-size:16px;margin-bottom:8px">중복 수혜 충돌 — "이미 받은 지원금이 문제가 될 줄은"</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8">기존에 동일 목적의 정책자금이나 보조금을 수혜 중인 경우, 중복 수혜로 판정되어 탈락합니다. 특히 중진공 융자와 지자체 보조금 간 중복 여부가 함정입니다.</div>
<div style="margin-top:10px;padding:10px 14px;background:rgba(16,185,129,0.1);border-radius:8px;color:#10b981;font-size:13px"><strong>예방법:</strong> 기존 수혜 이력 전수 조사 → 중복 판정 기준 사전 확인 → 시차 전략</div>
</div>
</div>
</div>

<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:flex-start;gap:16px">
<div style="flex-shrink:0;width:48px;height:48px;background:rgba(239,68,68,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#f87171;font-size:20px;font-weight:800">05</div>
<div>
<div style="color:#f87171;font-weight:700;font-size:16px;margin-bottom:8px">신청 시기 놓침 — "공고를 늦게 봤습니다"</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8">정책자금은 대부분 연초(1~3월)에 집중 공고됩니다. 예산이 소진되면 중도 마감되므로 공고 직후 신속한 대응이 필수입니다.</div>
<div style="margin-top:10px;padding:10px 14px;background:rgba(16,185,129,0.1);border-radius:8px;color:#10b981;font-size:13px"><strong>예방법:</strong> 연간 정책자금 캘린더 확보 → 사전 서류 준비 → 공고 당일 신청</div>
</div>
</div>
</div>

</div>

<div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:24px;margin-top:28px">
<h4 style="color:#c9a84c;margin:0 0 12px">인피니트 솔루션 사전진단 프로세스</h4>
<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:16px">
<div style="flex:1;min-width:130px;text-align:center;background:rgba(201,168,76,0.1);border-radius:10px;padding:14px">
<div style="font-size:22px;font-weight:800;color:#c9a84c">STEP 1</div>
<div style="color:#e2e8f0;font-size:13px;margin-top:6px">기업 현황 수집</div>
</div>
<div style="flex:1;min-width:130px;text-align:center;background:rgba(201,168,76,0.1);border-radius:10px;padding:14px">
<div style="font-size:22px;font-weight:800;color:#c9a84c">STEP 2</div>
<div style="color:#e2e8f0;font-size:13px;margin-top:6px">적격성 분석</div>
</div>
<div style="flex:1;min-width:130px;text-align:center;background:rgba(201,168,76,0.1);border-radius:10px;padding:14px">
<div style="font-size:22px;font-weight:800;color:#c9a84c">STEP 3</div>
<div style="color:#e2e8f0;font-size:13px;margin-top:6px">리스크 점검</div>
</div>
<div style="flex:1;min-width:130px;text-align:center;background:rgba(16,185,129,0.15);border-radius:10px;padding:14px">
<div style="font-size:22px;font-weight:800;color:#10b981">STEP 4</div>
<div style="color:#e2e8f0;font-size:13px;margin-top:6px">전략 수립 / 보완</div>
</div>
</div>
</div>

<p style="color:rgba(255,255,255,0.6);font-size:14px;margin-top:24px;line-height:1.8">
무료 사전진단 신청: infinites.co.kr | 대표전화: 1844-0621
</p>
</div>`,
  },
  {
    제목: "기업 성장 단계별 자금 조달 로드맵 — 창업기부터 도약기까지",
    요약: "창업기, 성장기, 성숙기, 도약기 각 단계에 맞는 최적의 자금 조달 전략을 체계적으로 안내합니다.",
    카테고리: "전략",
    태그: "자금조달,성장단계,창업기,성장기,로드맵",
    작성일: "2026-03-03",
    slug: "growth-funding-roadmap",
    html: `<div class="article-content">
<div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px;padding:32px;margin-bottom:32px;border:1px solid rgba(99,102,241,0.3)">
<h2 style="color:#818cf8;margin:0 0:8px;font-size:22px">기업 성장 단계별 자금 전략</h2>
<p style="color:rgba(255,255,255,0.85);line-height:1.8;margin:12px 0 0">
기업의 자금 필요는 성장 단계마다 다릅니다. <strong style="color:#818cf8">같은 정책자금이라도 기업의 현재 위치에 따라 활용 전략이 완전히 달라집니다.</strong> 각 단계별 최적의 자금 조달 포트폴리오를 알아봅니다.
</p>
</div>

<h3 style="color:#e2e8f0;border-left:4px solid #818cf8;padding-left:16px;margin:28px 0 16px">4단계 성장 로드맵</h3>

<div style="position:relative;padding-left:28px;margin:20px 0">
<div style="position:absolute;left:8px;top:0;bottom:0;width:2px;background:linear-gradient(180deg,#818cf8,#c9a84c,#10b981,#f59e0b)"></div>

<div style="margin-bottom:32px;position:relative">
<div style="position:absolute;left:-24px;top:4px;width:12px;height:12px;border-radius:50%;background:#818cf8"></div>
<div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
<span style="color:#818cf8;font-size:13px;font-weight:600;padding:4px 10px;background:rgba(99,102,241,0.2);border-radius:6px">STAGE 1</span>
<span style="color:#e2e8f0;font-size:18px;font-weight:700">창업기 (0~2년)</span>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8;margin-bottom:12px">초기 사업화 자금이 핵심. 매출 실적이 없어 재무 기반 심사는 불리하지만, 기술성과 사업성으로 승부할 수 있는 프로그램이 있습니다.</div>
<div style="display:flex;flex-wrap:wrap;gap:8px">
<span style="padding:6px 12px;background:rgba(99,102,241,0.15);border-radius:6px;color:#a5b4fc;font-size:13px">예비창업패키지</span>
<span style="padding:6px 12px;background:rgba(99,102,241,0.15);border-radius:6px;color:#a5b4fc;font-size:13px">초기창업패키지</span>
<span style="padding:6px 12px;background:rgba(99,102,241,0.15);border-radius:6px;color:#a5b4fc;font-size:13px">청년전용 창업자금</span>
<span style="padding:6px 12px;background:rgba(99,102,241,0.15);border-radius:6px;color:#a5b4fc;font-size:13px">기보 기술보증</span>
</div>
</div>
</div>

<div style="margin-bottom:32px;position:relative">
<div style="position:absolute;left:-24px;top:4px;width:12px;height:12px;border-radius:50%;background:#c9a84c"></div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
<span style="color:#c9a84c;font-size:13px;font-weight:600;padding:4px 10px;background:rgba(201,168,76,0.2);border-radius:6px">STAGE 2</span>
<span style="color:#e2e8f0;font-size:18px;font-weight:700">성장기 (2~5년)</span>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8;margin-bottom:12px">매출이 발생하고 사업 모델이 안정화되는 시기. 운전자금과 설비투자 자금이 동시에 필요합니다. 재무 실적을 기반으로 정책자금 선택지가 넓어집니다.</div>
<div style="display:flex;flex-wrap:wrap;gap:8px">
<span style="padding:6px 12px;background:rgba(201,168,76,0.15);border-radius:6px;color:#dfc06a;font-size:13px">중소기업 정책자금 (융자)</span>
<span style="padding:6px 12px;background:rgba(201,168,76,0.15);border-radius:6px;color:#dfc06a;font-size:13px">신보 신용보증</span>
<span style="padding:6px 12px;background:rgba(201,168,76,0.15);border-radius:6px;color:#dfc06a;font-size:13px">창업도약패키지</span>
<span style="padding:6px 12px;background:rgba(201,168,76,0.15);border-radius:6px;color:#dfc06a;font-size:13px">스마트공장 구축</span>
</div>
</div>
</div>

<div style="margin-bottom:32px;position:relative">
<div style="position:absolute;left:-24px;top:4px;width:12px;height:12px;border-radius:50%;background:#10b981"></div>
<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
<span style="color:#10b981;font-size:13px;font-weight:600;padding:4px 10px;background:rgba(16,185,129,0.2);border-radius:6px">STAGE 3</span>
<span style="color:#e2e8f0;font-size:18px;font-weight:700">성숙기 (5~10년)</span>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8;margin-bottom:12px">안정적 수익 기반에서 효율화와 경쟁력 강화가 목표. 세제혜택 극대화와 R&D 투자를 통한 기술 경쟁력 확보가 핵심 전략입니다.</div>
<div style="display:flex;flex-wrap:wrap;gap:8px">
<span style="padding:6px 12px;background:rgba(16,185,129,0.15);border-radius:6px;color:#6ee7b7;font-size:13px">R&D 정부지원금</span>
<span style="padding:6px 12px;background:rgba(16,185,129,0.15);border-radius:6px;color:#6ee7b7;font-size:13px">세제혜택 극대화</span>
<span style="padding:6px 12px;background:rgba(16,185,129,0.15);border-radius:6px;color:#6ee7b7;font-size:13px">수출기업 글로벌화</span>
<span style="padding:6px 12px;background:rgba(16,185,129,0.15);border-radius:6px;color:#6ee7b7;font-size:13px">이차보전</span>
</div>
</div>
</div>

<div style="position:relative">
<div style="position:absolute;left:-24px;top:4px;width:12px;height:12px;border-radius:50%;background:#f59e0b"></div>
<div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
<span style="color:#f59e0b;font-size:13px;font-weight:600;padding:4px 10px;background:rgba(245,158,11,0.2);border-radius:6px">STAGE 4</span>
<span style="color:#e2e8f0;font-size:18px;font-weight:700">도약기 (10년+)</span>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8;margin-bottom:12px">사업 다각화, 해외 진출, M&A 등 대규모 자금이 필요한 시기. 정책자금과 민간 금융을 조합한 포트폴리오 전략이 필수입니다.</div>
<div style="display:flex;flex-wrap:wrap;gap:8px">
<span style="padding:6px 12px;background:rgba(245,158,11,0.15);border-radius:6px;color:#fbbf24;font-size:13px">혁신성장 지원자금</span>
<span style="padding:6px 12px;background:rgba(245,158,11,0.15);border-radius:6px;color:#fbbf24;font-size:13px">해외진출 자금</span>
<span style="padding:6px 12px;background:rgba(245,158,11,0.15);border-radius:6px;color:#fbbf24;font-size:13px">AX 스프린트 트랙</span>
<span style="padding:6px 12px;background:rgba(245,158,11,0.15);border-radius:6px;color:#fbbf24;font-size:13px">민관 복합 금융</span>
</div>
</div>
</div>

</div>

<div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:24px;margin-top:28px">
<h4 style="color:#c9a84c;margin:0 0 12px">우리 기업의 최적 자금 전략은?</h4>
<p style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8;margin:0">
같은 업력이라도 업종, 매출 규모, 재무 상태, 보유 인증에 따라 전략이 완전히 달라집니다. 인피니트 솔루션의 <strong style="color:#c9a84c">무료 사전진단</strong>을 통해 귀사의 현재 위치에 맞는 맞춤 자금 조달 로드맵을 받아보세요.
</p>
</div>

<p style="color:rgba(255,255,255,0.6);font-size:14px;margin-top:24px;line-height:1.8">
무료 사전진단 신청: infinites.co.kr | 대표전화: 1844-0621
</p>
</div>`,
  },
  {
    제목: "사업계획서 작성 완벽 가이드 — 심사위원이 주목하는 5가지 포인트",
    요약: "정책자금 심사에서 실제로 평가되는 핵심 항목과 높은 점수를 받는 사업계획서 작성 노하우를 공개합니다.",
    카테고리: "노하우",
    태그: "사업계획서,심사기준,정책자금,작성법,승인전략",
    작성일: "2026-03-02",
    slug: "business-plan-writing",
    html: `<div class="article-content">
<div style="background:linear-gradient(135deg,#1e3040 0%,#162032 100%);border-radius:16px;padding:32px;margin-bottom:32px;border:1px solid rgba(59,130,246,0.3)">
<h2 style="color:#60a5fa;margin:0 0 8px;font-size:22px">심사위원은 사업계획서의 어디를 보는가?</h2>
<p style="color:rgba(255,255,255,0.85);line-height:1.8;margin:12px 0 0">
정책자금 심사에서 <strong style="color:#60a5fa">사업계획서는 배점의 40~60%</strong>를 차지합니다. 아무리 자격이 충족되더라도 계획서가 부실하면 탈락합니다. 실제 심사 기준을 기반으로 높은 점수를 받는 작성법을 안내합니다.
</p>
</div>

<h3 style="color:#e2e8f0;border-left:4px solid #60a5fa;padding-left:16px;margin:28px 0 16px">심사위원이 주목하는 5가지 핵심 항목</h3>

<div style="display:flex;flex-direction:column;gap:20px;margin:20px 0">

<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
<div style="width:36px;height:36px;background:#3b82f6;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:16px">1</div>
<div style="color:#e2e8f0;font-weight:700;font-size:17px">사업 아이템의 차별성과 시장성</div>
<div style="margin-left:auto;padding:4px 10px;background:rgba(59,130,246,0.2);border-radius:6px;color:#93c5fd;font-size:12px;font-weight:600">배점 25%</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8">"왜 이 사업이 필요하고, 시장이 있는가?"를 데이터로 증명해야 합니다. 시장 규모, 성장률, 경쟁사 대비 차별점을 구체적인 숫자와 함께 제시하세요.</div>
<div style="margin-top:12px;padding:12px;background:rgba(16,185,129,0.08);border-radius:8px">
<div style="color:#10b981;font-size:13px;font-weight:600;margin-bottom:4px">TIP</div>
<div style="color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6">"국내 시장 규모 1.2조원, 연평균 성장률 15%" 같은 정량 데이터를 반드시 포함하세요.</div>
</div>
</div>

<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
<div style="width:36px;height:36px;background:#3b82f6;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:16px">2</div>
<div style="color:#e2e8f0;font-weight:700;font-size:17px">수익 모델과 매출 추정의 현실성</div>
<div style="margin-left:auto;padding:4px 10px;background:rgba(59,130,246,0.2);border-radius:6px;color:#93c5fd;font-size:12px;font-weight:600">배점 20%</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8">수익 구조가 명확하고, 매출 추정이 과장되지 않아야 합니다. 가격 x 예상 판매량 = 매출 공식이 논리적으로 뒷받침되는지를 평가합니다.</div>
<div style="margin-top:12px;padding:12px;background:rgba(16,185,129,0.08);border-radius:8px">
<div style="color:#10b981;font-size:13px;font-weight:600;margin-bottom:4px">TIP</div>
<div style="color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6">3개년 매출 추정표를 보수적/기본/낙관 3개 시나리오로 제시하면 신뢰도가 올라갑니다.</div>
</div>
</div>

<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
<div style="width:36px;height:36px;background:#3b82f6;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:16px">3</div>
<div style="color:#e2e8f0;font-weight:700;font-size:17px">자금 소요 계획의 구체성</div>
<div style="margin-left:auto;padding:4px 10px;background:rgba(59,130,246,0.2);border-radius:6px;color:#93c5fd;font-size:12px;font-weight:600">배점 20%</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8">"운전자금 3억" 같은 뭉뚱그린 금액은 감점 대상입니다. 용도별, 시기별로 자금 소요를 상세하게 분류해야 합니다.</div>
<div style="margin-top:12px;padding:12px;background:rgba(16,185,129,0.08);border-radius:8px">
<div style="color:#10b981;font-size:13px;font-weight:600;margin-bottom:4px">TIP</div>
<div style="color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6">원자재 구매 1.2억, 인건비 0.8억, 마케팅 0.5억, 장비 0.5억 — 항목별 근거를 함께 기술하세요.</div>
</div>
</div>

<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
<div style="width:36px;height:36px;background:#3b82f6;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:16px">4</div>
<div style="color:#e2e8f0;font-weight:700;font-size:17px">대표자 역량과 팀 구성</div>
<div style="margin-left:auto;padding:4px 10px;background:rgba(59,130,246,0.2);border-radius:6px;color:#93c5fd;font-size:12px;font-weight:600">배점 20%</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8">대표자의 업계 경력, 관련 자격증, 핵심 인력의 전문성이 사업 수행 능력을 증명합니다. 팀 구성도는 역할별로 명확히 작성하세요.</div>
<div style="margin-top:12px;padding:12px;background:rgba(16,185,129,0.08);border-radius:8px">
<div style="color:#10b981;font-size:13px;font-weight:600;margin-bottom:4px">TIP</div>
<div style="color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6">대표자 이력 중 해당 업종 경력을 강조하고, 보유 특허/인증을 함께 기재하세요.</div>
</div>
</div>

<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:24px">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
<div style="width:36px;height:36px;background:#3b82f6;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:16px">5</div>
<div style="color:#e2e8f0;font-weight:700;font-size:17px">상환 능력과 재무 건전성</div>
<div style="margin-left:auto;padding:4px 10px;background:rgba(59,130,246,0.2);border-radius:6px;color:#93c5fd;font-size:12px;font-weight:600">배점 15%</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8">대출금을 갚을 수 있는 현금흐름이 있는지를 본다. 향후 영업이익 기반 상환 스케줄을 제시하면 신뢰도가 높아집니다.</div>
<div style="margin-top:12px;padding:12px;background:rgba(16,185,129,0.08);border-radius:8px">
<div style="color:#10b981;font-size:13px;font-weight:600;margin-bottom:4px">TIP</div>
<div style="color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6">월별 현금흐름 예측표와 함께 상환 계획을 제출하면 심사위원에게 강한 인상을 줍니다.</div>
</div>
</div>

</div>

<div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:24px;margin-top:28px">
<h4 style="color:#c9a84c;margin:0 0 12px">전문가의 사업계획서 검토가 필요하다면</h4>
<p style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8;margin:0">
인피니트 솔루션은 정책자금 심사 기준에 맞춘 <strong style="color:#c9a84c">사업계획서 작성 지원 서비스</strong>를 제공합니다. 심사위원 관점에서의 사전 검토와 보완 포인트를 짚어드립니다.
</p>
</div>

<p style="color:rgba(255,255,255,0.6);font-size:14px;margin-top:24px;line-height:1.8">
무료 사전진단 신청: infinites.co.kr | 대표전화: 1844-0621
</p>
</div>`,
  },
  {
    제목: "중소기업 절세 전략 7선 — 놓치면 손해인 세제혜택 총정리",
    요약: "중소기업이 활용할 수 있는 7가지 핵심 세제혜택과 절세 전략을 실전 사례와 함께 안내합니다.",
    카테고리: "세제혜택",
    태그: "절세,세제혜택,세액감면,세액공제,중소기업",
    작성일: "2026-03-01",
    slug: "tax-saving-strategies",
    html: `<div class="article-content">
<div style="background:linear-gradient(135deg,#1a2e1a 0%,#162016 100%);border-radius:16px;padding:32px;margin-bottom:32px;border:1px solid rgba(16,185,129,0.3)">
<h2 style="color:#10b981;margin:0 0 8px;font-size:22px">중소기업이 놓치는 세제혜택</h2>
<p style="color:rgba(255,255,255,0.85);line-height:1.8;margin:12px 0 0">
중소기업 전용 세제혜택만 제대로 활용해도 <strong style="color:#10b981">연간 수천만원에서 수억원의 절세</strong>가 가능합니다. 하지만 많은 기업이 이런 혜택의 존재조차 모르고 지나칩니다. 반드시 체크해야 할 7가지를 정리했습니다.
</p>
</div>

<h3 style="color:#e2e8f0;border-left:4px solid #10b981;padding-left:16px;margin:28px 0 16px">핵심 세제혜택 7선</h3>

<div style="display:flex;flex-direction:column;gap:16px;margin:20px 0">

<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:20px">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
<div style="display:flex;align-items:center;gap:10px">
<div style="width:32px;height:32px;background:#10b981;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:14px">1</div>
<div style="color:#e2e8f0;font-weight:700;font-size:16px">중소기업 특별세액감면</div>
</div>
<div style="padding:4px 10px;background:rgba(16,185,129,0.2);border-radius:6px;color:#6ee7b7;font-size:12px;font-weight:600">최대 30% 감면</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7">제조업, 건설업 등 특정 업종의 중소기업 소득세/법인세를 5~30% 감면. 소기업은 감면율이 더 높습니다. 별도 신청 없이 세금 신고 시 적용 가능합니다.</div>
</div>

<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:20px">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
<div style="display:flex;align-items:center;gap:10px">
<div style="width:32px;height:32px;background:#10b981;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:14px">2</div>
<div style="color:#e2e8f0;font-weight:700;font-size:16px">연구·인력개발비 세액공제</div>
</div>
<div style="padding:4px 10px;background:rgba(59,130,246,0.2);border-radius:6px;color:#93c5fd;font-size:12px;font-weight:600">최대 25% 공제</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7">R&D 인건비, 재료비, 위탁연구비 등을 세액공제. 중소기업은 당기 발생액의 25% 또는 증가분의 50%까지 공제 가능합니다.</div>
</div>

<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:20px">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
<div style="display:flex;align-items:center;gap:10px">
<div style="width:32px;height:32px;background:#10b981;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:14px">3</div>
<div style="color:#e2e8f0;font-weight:700;font-size:16px">고용증대 세액공제</div>
</div>
<div style="padding:4px 10px;background:rgba(245,158,11,0.2);border-radius:6px;color:#fbbf24;font-size:12px;font-weight:600">1인당 최대 1,550만원</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7">상시근로자를 전년 대비 증가시킨 경우, 수도권 중소기업 기준 청년 정규직 1인당 연 1,550만원, 그 외 850만원을 3년간 세액공제합니다.</div>
</div>

<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:20px">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
<div style="display:flex;align-items:center;gap:10px">
<div style="width:32px;height:32px;background:#10b981;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:14px">4</div>
<div style="color:#e2e8f0;font-weight:700;font-size:16px">설비투자 세액공제</div>
</div>
<div style="padding:4px 10px;background:rgba(168,85,247,0.2);border-radius:6px;color:#c4b5fd;font-size:12px;font-weight:600">최대 12% 공제</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7">사업용 자산(기계장치, 설비 등) 투자 시 중소기업은 기본 10% + 추가 2%까지 세액공제. 스마트공장 설비는 추가 공제도 가능합니다.</div>
</div>

<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:20px">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
<div style="display:flex;align-items:center;gap:10px">
<div style="width:32px;height:32px;background:#10b981;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:14px">5</div>
<div style="color:#e2e8f0;font-weight:700;font-size:16px">창업 중소기업 세액감면</div>
</div>
<div style="padding:4px 10px;background:rgba(239,68,68,0.2);border-radius:6px;color:#fca5a5;font-size:12px;font-weight:600">5년간 최대 100%</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7">수도권 과밀억제권역 외 지역 청년(15~34세) 창업 시 5년간 소득세/법인세 100% 감면. 과밀억제권역 내에서도 50% 감면됩니다.</div>
</div>

<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:20px">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
<div style="display:flex;align-items:center;gap:10px">
<div style="width:32px;height:32px;background:#10b981;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:14px">6</div>
<div style="color:#e2e8f0;font-weight:700;font-size:16px">사회보험료 세액공제</div>
</div>
<div style="padding:4px 10px;background:rgba(201,168,76,0.2);border-radius:6px;color:#dfc06a;font-size:12px;font-weight:600">사용자 부담분 공제</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7">고용을 늘린 중소기업이 추가 부담하는 사회보험료(국민연금, 건강보험 등) 사용자 부담분을 2년간 세액공제 받을 수 있습니다.</div>
</div>

<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:20px">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
<div style="display:flex;align-items:center;gap:10px">
<div style="width:32px;height:32px;background:#10b981;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:14px">7</div>
<div style="color:#e2e8f0;font-weight:700;font-size:16px">접대비 한도 우대</div>
</div>
<div style="padding:4px 10px;background:rgba(99,102,241,0.2);border-radius:6px;color:#a5b4fc;font-size:12px;font-weight:600">한도 3,600만원</div>
</div>
<div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7">중소기업은 접대비 기본 한도가 3,600만원으로 대기업(2,400만원)보다 높습니다. 또한 매출액 기준 추가 한도도 적용됩니다.</div>
</div>

</div>

<div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:24px;margin-top:28px">
<h4 style="color:#c9a84c;margin:0 0 12px">절세 전략도 전문가와 함께</h4>
<p style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8;margin:0">
인피니트 솔루션은 정책자금 컨설팅과 함께 <strong style="color:#c9a84c">기업 맞춤 절세 전략</strong>을 수립합니다. 세제혜택을 최대한 활용하여 실질적인 자금 효율을 높이세요.
</p>
</div>

<p style="color:rgba(255,255,255,0.6);font-size:14px;margin-top:24px;line-height:1.8">
무료 사전진단 신청: infinites.co.kr | 대표전화: 1844-0621
</p>
</div>`,
  },
  {
    제목: "R&D 정부지원금 확보 전략 — 과제 기획부터 선정까지 실전 가이드",
    요약: "정부 R&D 지원사업의 과제 기획, 제안서 작성, 평가 대응까지 실전 전략을 단계별로 안내합니다.",
    카테고리: "R&D",
    태그: "R&D,정부지원금,과제기획,제안서,기술개발",
    작성일: "2026-02-28",
    slug: "rnd-funding-strategy",
    html: `<div class="article-content">
<div style="background:linear-gradient(135deg,#2d1b4e 0%,#1a1033 100%);border-radius:16px;padding:32px;margin-bottom:32px;border:1px solid rgba(168,85,247,0.3)">
<h2 style="color:#c4b5fd;margin:0 0 8px;font-size:22px">정부 R&D 지원금, 어떻게 확보하는가?</h2>
<p style="color:rgba(255,255,255,0.85);line-height:1.8;margin:12px 0 0">
2026년 정부 R&D 예산은 <strong style="color:#c4b5fd">약 26조원</strong> 규모입니다. 이 중 중소기업이 활용할 수 있는 기술개발 지원사업은 수천억원 규모. 핵심은 <strong style="color:#c4b5fd">심사위원이 선정하고 싶은 과제를 기획하는 것</strong>입니다.
</p>
</div>

<h3 style="color:#e2e8f0;border-left:4px solid #a855f7;padding-left:16px;margin:28px 0 16px">R&D 지원금 확보 4단계 프로세스</h3>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:20px 0">
<div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:12px;padding:20px;text-align:center">
<div style="font-size:28px;font-weight:800;color:#a855f7;margin-bottom:4px">01</div>
<div style="color:#e2e8f0;font-weight:700;margin-bottom:8px">공고 분석</div>
<div style="color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6">NTIS에서 우리 기업에 맞는 RFP(제안요청서)를 선별하고 지원 요건을 분석합니다.</div>
</div>
<div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:12px;padding:20px;text-align:center">
<div style="font-size:28px;font-weight:800;color:#a855f7;margin-bottom:4px">02</div>
<div style="color:#e2e8f0;font-weight:700;margin-bottom:8px">과제 기획</div>
<div style="color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6">RFP의 핵심 키워드와 평가 기준에 맞춘 연구 목표와 범위를 설계합니다.</div>
</div>
<div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:12px;padding:20px;text-align:center">
<div style="font-size:28px;font-weight:800;color:#a855f7;margin-bottom:4px">03</div>
<div style="color:#e2e8f0;font-weight:700;margin-bottom:8px">제안서 작성</div>
<div style="color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6">기술 차별성, 사업화 전략, 연구 역량을 정량적으로 증명하는 제안서를 작성합니다.</div>
</div>
<div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);border-radius:12px;padding:20px;text-align:center">
<div style="font-size:28px;font-weight:800;color:#10b981;margin-bottom:4px">04</div>
<div style="color:#e2e8f0;font-weight:700;margin-bottom:8px">발표 평가</div>
<div style="color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6">심사위원 앞에서의 발표 준비와 질의응답 대응 전략을 수립합니다.</div>
</div>
</div>

<h3 style="color:#e2e8f0;border-left:4px solid #c9a84c;padding-left:16px;margin:28px 0 16px">중소기업이 도전할 수 있는 주요 R&D 사업</h3>

<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
<thead>
<tr style="background:rgba(168,85,247,0.15)">
<th style="padding:14px 16px;text-align:left;color:#c4b5fd;border-bottom:2px solid rgba(168,85,247,0.4)">사업명</th>
<th style="padding:14px 16px;text-align:left;color:#c4b5fd;border-bottom:2px solid rgba(168,85,247,0.4)">대상</th>
<th style="padding:14px 16px;text-align:right;color:#c4b5fd;border-bottom:2px solid rgba(168,85,247,0.4);white-space:nowrap">지원금</th>
<th style="padding:14px 16px;text-align:center;color:#c4b5fd;border-bottom:2px solid rgba(168,85,247,0.4)">기간</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid rgba(255,255,255,0.1)">
<td style="padding:12px 16px;color:#e2e8f0;font-weight:600">중소기업 기술개발사업</td>
<td style="padding:12px 16px;color:rgba(255,255,255,0.8)">중소기업 (기술 보유)</td>
<td style="padding:12px 16px;text-align:right;color:#a855f7;font-weight:600">최대 3억</td>
<td style="padding:12px 16px;text-align:center;color:rgba(255,255,255,0.8)">1~2년</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02)">
<td style="padding:12px 16px;color:#e2e8f0;font-weight:600">기술혁신개발사업</td>
<td style="padding:12px 16px;color:rgba(255,255,255,0.8)">혁신형 중소기업</td>
<td style="padding:12px 16px;text-align:right;color:#a855f7;font-weight:600">최대 5억</td>
<td style="padding:12px 16px;text-align:center;color:rgba(255,255,255,0.8)">2~3년</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.1)">
<td style="padding:12px 16px;color:#e2e8f0;font-weight:600">산학연 협력 기술개발</td>
<td style="padding:12px 16px;color:rgba(255,255,255,0.8)">대학·연구소 협력 기업</td>
<td style="padding:12px 16px;text-align:right;color:#a855f7;font-weight:600">최대 10억</td>
<td style="padding:12px 16px;text-align:center;color:rgba(255,255,255,0.8)">2~5년</td>
</tr>
<tr>
<td style="padding:12px 16px;color:#e2e8f0;font-weight:600">소부장 기술개발</td>
<td style="padding:12px 16px;color:rgba(255,255,255,0.8)">소재·부품·장비 기업</td>
<td style="padding:12px 16px;text-align:right;color:#a855f7;font-weight:600">최대 20억</td>
<td style="padding:12px 16px;text-align:center;color:rgba(255,255,255,0.8)">3~5년</td>
</tr>
</tbody>
</table>
</div>

<h3 style="color:#e2e8f0;border-left:4px solid #f59e0b;padding-left:16px;margin:28px 0 16px">제안서 작성 핵심 체크리스트</h3>

<div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:12px;padding:24px;margin:20px 0">
<ul style="margin:0;padding-left:20px;color:rgba(255,255,255,0.8);font-size:14px;line-height:2.2">
<li><strong style="color:#fbbf24">기술 차별성</strong> — 기존 기술 대비 성능 향상 수치를 구체적으로 제시</li>
<li><strong style="color:#fbbf24">시장 수요 근거</strong> — 목표 시장 규모와 수요 데이터를 인용</li>
<li><strong style="color:#fbbf24">연구 역량</strong> — 연구 인력의 이력, 보유 특허, 선행 연구 실적 나열</li>
<li><strong style="color:#fbbf24">사업화 전략</strong> — 개발 완료 후 매출화까지의 구체적 계획</li>
<li><strong style="color:#fbbf24">예산 적정성</strong> — 연구비 항목별 산출 근거를 투명하게 기술</li>
<li><strong style="color:#fbbf24">위험 관리</strong> — 기술적·시장 리스크와 대응 방안 사전 제시</li>
</ul>
</div>

<div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:24px;margin-top:28px">
<h4 style="color:#c9a84c;margin:0 0 12px">R&D 과제 기획부터 함께</h4>
<p style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8;margin:0">
인피니트 솔루션은 정책자금 외에도 <strong style="color:#c9a84c">R&D 지원사업 과제 기획과 제안서 작성</strong>을 지원합니다. 기업의 기술 역량을 정확히 분석하고 최적의 과제를 설계해드립니다.
</p>
</div>

<p style="color:rgba(255,255,255,0.6);font-size:14px;margin-top:24px;line-height:1.8">
무료 사전진단 신청: infinites.co.kr | 대표전화: 1844-0621
</p>
</div>`,
  },
];

// ========================================
// 실행: R2 업로드 + Airtable 업데이트
// ========================================

async function updatePosts() {
  console.log("=== 게시판 콘텐츠 전면 교체 시작 ===\n");

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const recordId = RECORD_IDS[i];
    console.log(`[${i + 1}/6] ${post.제목}`);

    // 1. R2에 새 HTML 업로드
    const r2Resp = await fetch(`${WORKER_URL}/upload-content`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: post.html, slug: post.slug }),
    });
    const r2Result = await r2Resp.json();

    if (!r2Result.success) {
      console.error(`  R2 업로드 실패: ${r2Result.error}`);
      continue;
    }
    console.log(`  R2: ${r2Result.url}`);

    // 2. Airtable 레코드 업데이트 (PATCH)
    const patchResp = await fetch(`${WORKER_URL}/board/${recordId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        제목: post.제목,
        내용: r2Result.url,
        요약: post.요약,
        카테고리: post.카테고리,
        태그: post.태그,
        작성일: post.작성일,
        게시여부: true,
      }),
    });
    const patchResult = await patchResp.json();

    if (patchResult.success) {
      console.log(`  Airtable 업데이트 완료: ${recordId}`);
    } else {
      console.error(`  Airtable 업데이트 실패: ${JSON.stringify(patchResult)}`);
    }

    console.log("");
  }

  // 3. 확인
  console.log("=== 업데이트 결과 확인 ===");
  const resp = await fetch(`${WORKER_URL}/posts?nocache=1`);
  const data = await resp.json();
  data.records.forEach((r, i) => console.log(`  ${i + 1}. ${r.제목}`));
  console.log(`\n총 ${data.records.length}건 완료`);
}

updatePosts().catch(console.error);
