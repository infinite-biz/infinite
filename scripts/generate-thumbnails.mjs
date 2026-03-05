// 게시글 썸네일 이미지 6개 생성
// HTML → PNG → R2 업로드 → Airtable 썸네일URL 업데이트
// 의존성: npm install puppeteer (또는 playwright)

import { writeFile, unlink } from "fs/promises";
import { execSync } from "child_process";

const WORKER_URL = "https://infinite.gangang901.workers.dev";

// R2 업로드를 위한 Cloudflare 설정
const CF_ACCOUNT_ID = "dda30f9c90982d079ef3ec76921f7d84";
const CF_API_TOKEN = "oLRWcM8_U9YSjrjTnY6A2mEnycrAPZ2TywDAV1LG";
const R2_BUCKET = "infinites-r2";

const thumbnails = [
  {
    recordId: "reclWKj6eNxQVQlRx",
    slug: "thumb-consulting-value",
    icon: "&#x1F4CB;",
    iconLabel: "VS",
    title: "정책자금 컨설팅\n왜 필요한가?",
    subtitle: "자체 신청 vs 전문가 대행 비교",
    accent: "#c9a84c",
    bg: "linear-gradient(135deg, #313036 0%, #1a191d 100%)",
  },
  {
    recordId: "recSNynTa3RBK26jY",
    slug: "thumb-rejection-prevention",
    icon: "&#x26A0;",
    iconLabel: "TOP 5",
    title: "정책자금 탈락\n사례 TOP 5",
    subtitle: "사전진단으로 예방하는 핵심 포인트",
    accent: "#f87171",
    bg: "linear-gradient(135deg, #3b1323 0%, #201f24 100%)",
  },
  {
    recordId: "rec6asdsAu9XEVWg9",
    slug: "thumb-growth-roadmap",
    icon: "&#x1F4C8;",
    iconLabel: "ROADMAP",
    title: "기업 성장 단계별\n자금 조달 전략",
    subtitle: "창업기부터 도약기까지",
    accent: "#818cf8",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  },
  {
    recordId: "recRb300UyJqpYsYG",
    slug: "thumb-business-plan",
    icon: "&#x1F4DD;",
    iconLabel: "GUIDE",
    title: "사업계획서\n작성 가이드",
    subtitle: "심사위원이 주목하는 5가지 포인트",
    accent: "#60a5fa",
    bg: "linear-gradient(135deg, #1e3040 0%, #162032 100%)",
  },
  {
    recordId: "recmjqCTIokKQV8Yx",
    slug: "thumb-tax-saving",
    icon: "&#x1F4B0;",
    iconLabel: "7선",
    title: "중소기업\n절세 전략",
    subtitle: "놓치면 손해인 세제혜택 총정리",
    accent: "#10b981",
    bg: "linear-gradient(135deg, #1a2e1a 0%, #162016 100%)",
  },
  {
    recordId: "rec7QWj6T6h4Rl7hg",
    slug: "thumb-rnd-funding",
    icon: "&#x1F52C;",
    iconLabel: "R&D",
    title: "R&D 정부지원금\n확보 전략",
    subtitle: "과제 기획부터 선정까지",
    accent: "#a855f7",
    bg: "linear-gradient(135deg, #2d1b4e 0%, #1a1033 100%)",
  },
];

function generateHTML(t) {
  const titleLines = t.title.split("\n");
  const titleHTML = titleLines
    .map((line) => `<div>${line}</div>`)
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:800px; height:450px; overflow:hidden; font-family:'Pretendard',-apple-system,sans-serif; }
.card {
  width:800px; height:450px;
  background:${t.bg};
  display:flex; align-items:center; justify-content:space-between;
  padding:48px 56px;
  position:relative; overflow:hidden;
}
.card::before {
  content:''; position:absolute; top:-80px; right:-80px;
  width:350px; height:350px; border-radius:50%;
  background:radial-gradient(circle,${t.accent}15 0%,transparent 70%);
}
.card::after {
  content:''; position:absolute; bottom:-100px; left:-40px;
  width:280px; height:280px; border-radius:50%;
  background:radial-gradient(circle,${t.accent}08 0%,transparent 70%);
}
.left { position:relative; z-index:1; max-width:480px; }
.tag {
  display:inline-block; padding:6px 16px;
  border:1px solid ${t.accent}66; border-radius:16px;
  color:${t.accent}; font-size:14px; font-weight:500;
  letter-spacing:0.5px; margin-bottom:20px;
}
.title {
  color:#fff; font-size:38px; font-weight:800;
  line-height:1.25; margin-bottom:14px; letter-spacing:-0.5px;
}
.subtitle {
  color:rgba(255,255,255,0.55); font-size:16px;
  font-weight:400; line-height:1.4;
}
.right {
  position:relative; z-index:1;
  display:flex; flex-direction:column; align-items:center;
}
.icon-box {
  width:100px; height:100px;
  background:${t.accent}20; border:1px solid ${t.accent}40;
  border-radius:20px;
  display:flex; align-items:center; justify-content:center;
  font-size:44px; margin-bottom:12px;
}
.icon-label {
  color:${t.accent}; font-size:16px; font-weight:700;
  letter-spacing:2px;
}
.brand {
  position:absolute; bottom:20px; left:56px;
  color:rgba(255,255,255,0.3); font-size:13px;
  letter-spacing:1.5px; font-weight:500;
}
.bar {
  position:absolute; bottom:0; left:0; right:0;
  height:3px; background:linear-gradient(90deg,${t.accent},${t.accent}88,${t.accent});
}
</style>
</head>
<body>
<div class="card">
  <div class="left">
    <div class="tag">INFINITE SOLUTIONS</div>
    <div class="title">${titleHTML}</div>
    <div class="subtitle">${t.subtitle}</div>
  </div>
  <div class="right">
    <div class="icon-box">${t.icon}</div>
    <div class="icon-label">${t.iconLabel}</div>
  </div>
  <div class="brand">infinites.co.kr</div>
  <div class="bar"></div>
</div>
</body>
</html>`;
}

async function uploadToR2(filePath, r2Key) {
  // S3-compatible API로 R2에 업로드
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
  const { readFile } = await import("fs/promises");

  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: "35bac4cc5dff025c6dc59d8f91f8babf",
      secretAccessKey:
        "fabf04a6debd7ea40c3ec9c9f4e882998c020b3b5f9ef9a176c8315ee029b824",
    },
  });

  const body = await readFile(filePath);
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: r2Key,
      Body: body,
      ContentType: "image/png",
    }),
  );

  return `${WORKER_URL}/r2/${r2Key}`;
}

async function main() {
  console.log("=== 썸네일 이미지 생성 시작 ===\n");

  // puppeteer 동적 임포트
  let puppeteer;
  try {
    puppeteer = await import("puppeteer");
  } catch {
    console.log("puppeteer 설치 중...");
    execSync("npm install puppeteer", { stdio: "inherit" });
    puppeteer = await import("puppeteer");
  }

  const browser = await puppeteer.default.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });

  for (let i = 0; i < thumbnails.length; i++) {
    const t = thumbnails[i];
    console.log(`[${i + 1}/6] ${t.slug}`);

    // 1. HTML 생성
    const htmlPath = `scripts/temp-thumb-${i}.html`;
    const pngPath = `scripts/${t.slug}.png`;
    await writeFile(htmlPath, generateHTML(t));

    // 2. 스크린샷
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 450 });
    await page.goto(`file:///${process.cwd().replace(/\\/g, "/")}/${htmlPath}`, {
      waitUntil: "networkidle0",
      timeout: 15000,
    });
    await page.screenshot({ path: pngPath, type: "png" });
    await page.close();

    console.log(`  PNG 생성: ${pngPath}`);

    // 3. R2 업로드
    const r2Key = `board/${t.slug}.png`;
    const r2Url = await uploadToR2(pngPath, r2Key);
    console.log(`  R2 URL: ${r2Url}`);

    // 4. Airtable 썸네일URL 업데이트
    const patchResp = await fetch(`${WORKER_URL}/board/${t.recordId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 썸네일URL: r2Url }),
    });
    const patchResult = await patchResp.json();
    if (patchResult.success) {
      console.log(`  Airtable 업데이트 완료`);
    } else {
      console.error(`  Airtable 실패: ${JSON.stringify(patchResult)}`);
    }

    // 5. 임시 파일 정리
    await unlink(htmlPath);
    console.log("");
  }

  await browser.close();

  // 확인
  console.log("=== 썸네일 업데이트 확인 ===");
  const resp = await fetch(`${WORKER_URL}/posts?nocache=1`);
  const data = await resp.json();
  data.records.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.제목}`);
    console.log(`     썸네일: ${r.thumbnailUrl || "(없음)"}`);
  });
}

main().catch(console.error);
