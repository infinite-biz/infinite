// 썸네일 6개 모두 통일된 골드+다크 컬러로 재생성
import { writeFile, readFile, unlink } from "fs/promises";

const WORKER_URL = "https://infinite.gangang901.workers.dev";
const GOLD = "#c9a84c";
const BG = "linear-gradient(135deg, #313036 0%, #1a191d 100%)";

const thumbnails = [
  { recordId: "reclWKj6eNxQVQlRx", slug: "thumb-consulting-value", title: "정책자금 컨설팅\n왜 필요한가?", subtitle: "자체 신청 vs 전문가 대행 비교", label: "VS" },
  { recordId: "recSNynTa3RBK26jY", slug: "thumb-rejection-prevention", title: "정책자금 탈락\n사례 TOP 5", subtitle: "사전진단으로 예방하는 핵심 포인트", label: "TOP 5" },
  { recordId: "rec6asdsAu9XEVWg9", slug: "thumb-growth-roadmap", title: "기업 성장 단계별\n자금 조달 전략", subtitle: "창업기부터 도약기까지", label: "ROADMAP" },
  { recordId: "recRb300UyJqpYsYG", slug: "thumb-business-plan", title: "사업계획서\n작성 가이드", subtitle: "심사위원이 주목하는 5가지 포인트", label: "GUIDE" },
  { recordId: "recmjqCTIokKQV8Yx", slug: "thumb-tax-saving", title: "중소기업\n절세 전략", subtitle: "놓치면 손해인 세제혜택 총정리", label: "7선" },
  { recordId: "rec7QWj6T6h4Rl7hg", slug: "thumb-rnd-funding", title: "R&D 정부지원금\n확보 전략", subtitle: "과제 기획부터 선정까지", label: "R&D" },
];

function generateHTML(t) {
  const titleHTML = t.title.split("\n").map(l => `<div>${l}</div>`).join("");
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:800px;height:450px;overflow:hidden;font-family:'Pretendard',-apple-system,sans-serif}
.card{width:800px;height:450px;background:${BG};display:flex;align-items:center;justify-content:space-between;padding:48px 56px;position:relative;overflow:hidden}
.card::before{content:'';position:absolute;top:-80px;right:-80px;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,${GOLD}12 0%,transparent 70%)}
.card::after{content:'';position:absolute;bottom:-100px;left:-40px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,${GOLD}08 0%,transparent 70%)}
.left{position:relative;z-index:1;max-width:480px}
.tag{display:inline-block;padding:6px 16px;border:1px solid ${GOLD}55;border-radius:16px;color:${GOLD};font-size:14px;font-weight:500;letter-spacing:0.5px;margin-bottom:20px}
.title{color:#fff;font-size:38px;font-weight:800;line-height:1.25;margin-bottom:14px;letter-spacing:-0.5px}
.subtitle{color:rgba(255,255,255,0.5);font-size:16px;font-weight:400;line-height:1.4}
.right{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center}
.icon-box{width:100px;height:100px;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.3);border-radius:20px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.icon-label{color:${GOLD};font-size:16px;font-weight:700;letter-spacing:2px}
.icon-num{font-size:36px;font-weight:800;color:${GOLD}}
.brand{position:absolute;bottom:20px;left:56px;color:rgba(255,255,255,0.25);font-size:13px;letter-spacing:1.5px;font-weight:500}
.bar{position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${GOLD},${GOLD}88,${GOLD})}
</style></head><body>
<div class="card">
  <div class="left">
    <div class="tag">INFINITE SOLUTIONS</div>
    <div class="title">${titleHTML}</div>
    <div class="subtitle">${t.subtitle}</div>
  </div>
  <div class="right">
    <div class="icon-box"><div class="icon-num">${t.label}</div></div>
  </div>
  <div class="brand">infinites.co.kr</div>
  <div class="bar"></div>
</div>
</body></html>`;
}

async function main() {
  console.log("=== 통일 썸네일 재생성 ===\n");
  const puppeteer = await import("puppeteer");
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");

  const s3 = new S3Client({
    region: "auto",
    endpoint: "https://dda30f9c90982d079ef3ec76921f7d84.r2.cloudflarestorage.com",
    credentials: {
      accessKeyId: "35bac4cc5dff025c6dc59d8f91f8babf",
      secretAccessKey: "fabf04a6debd7ea40c3ec9c9f4e882998c020b3b5f9ef9a176c8315ee029b824",
    },
  });

  const browser = await puppeteer.default.launch({ headless: "new", args: ["--no-sandbox"] });

  for (let i = 0; i < thumbnails.length; i++) {
    const t = thumbnails[i];
    console.log(`[${i+1}/6] ${t.slug}`);

    const htmlPath = `scripts/temp-${i}.html`;
    const pngPath = `scripts/${t.slug}.png`;
    await writeFile(htmlPath, generateHTML(t));

    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 450 });
    await page.goto(`file:///${process.cwd().replace(/\\/g, "/")}/${htmlPath}`, { waitUntil: "networkidle0", timeout: 15000 });
    await page.screenshot({ path: pngPath, type: "png" });
    await page.close();

    // R2 업로드
    const body = await readFile(pngPath);
    await s3.send(new PutObjectCommand({ Bucket: "infinites-r2", Key: `board/${t.slug}.png`, Body: body, ContentType: "image/png" }));
    console.log(`  업로드 완료`);

    await unlink(htmlPath);
    await unlink(pngPath);
  }

  await browser.close();
  console.log("\n=== 썸네일 통일 완료 ===");
}

main().catch(console.error);
