const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chrome = 'C:\\Users\\ashis\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve(__dirname, '../docs/redesign/screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const viewports = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'large-desktop', width: 1920, height: 1080 },
];

for (const vp of viewports) {
  const file = path.join(outputDir, `qa-${vp.width}x${vp.height}.png`);
  console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
  try {
    execFileSync(chrome, [
      '--headless=new',
      '--disable-gpu',
      `--window-size=${vp.width},${vp.height}`,
      `--screenshot=${file}`,
      '--virtual-time-budget=5000',
      'http://localhost:3000/?qa=1'
    ], { timeout: 20000 });
    console.log(`Saved: ${file} (exists: ${fs.existsSync(file)}, size: ${fs.existsSync(file) ? fs.statSync(file).size : 0})`);
  } catch (err) {
    console.error(`Error on ${vp.name}:`, err.message);
  }
}
