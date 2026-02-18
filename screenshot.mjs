import { chromium } from "playwright";

const BASE = "http://localhost:6006";
const OUT = "./assets";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // Screenshot 1: Button stories overview
  await page.goto(
    `${BASE}/iframe.html?id=components-button--filled&viewMode=story`,
    { waitUntil: "networkidle" }
  );
  await page.waitForTimeout(1000);

  // Build a nice showcase page with multiple components
  await page.setContent(`
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Inter', system-ui, sans-serif;
            background: #fafafa;
            padding: 40px;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            max-width: 1000px;
            margin: 0 auto;
          }
          .card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            border: 1px solid #f0f0f0;
          }
          .card h3 {
            font-size: 13px;
            font-weight: 600;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 16px;
          }
          .row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 10px; }
          .btn {
            display: inline-flex; align-items: center; justify-content: center;
            padding: 8px 20px; border-radius: 12px; font-size: 14px; font-weight: 500;
            border: none; cursor: pointer; transition: all 0.2s;
          }
          .btn-filled { background: hsl(267, 68%, 58%); color: white; }
          .btn-outline { background: transparent; border: 1.5px solid hsl(267, 68%, 58%); color: hsl(267, 68%, 58%); }
          .btn-ghost { background: transparent; color: hsl(267, 68%, 58%); }
          .btn-destructive { background: hsl(0, 75%, 54%); color: white; }
          .btn-sm { padding: 6px 14px; font-size: 13px; }
          .btn-lg { padding: 10px 24px; font-size: 15px; }

          .badge {
            display: inline-flex; align-items: center; padding: 2px 10px;
            border-radius: 999px; font-size: 12px; font-weight: 500;
          }
          .badge-pink { background: hsl(350, 96%, 93%); color: hsl(344, 70%, 39%); }
          .badge-purple { background: hsl(279, 96%, 93%); color: hsl(273, 60%, 39%); }
          .badge-green { background: hsl(149, 75%, 90%); color: hsl(143, 55%, 30%); }
          .badge-amber { background: hsl(44, 96%, 89%); color: hsl(38, 70%, 32%); }
          .badge-red { background: hsl(0, 95%, 92%); color: hsl(0, 65%, 36%); }
          .badge-blue { background: hsl(209, 95%, 92%); color: hsl(203, 58%, 36%); }

          .input-wrapper { display: flex; flex-direction: column; gap: 6px; }
          .input-label { font-size: 13px; font-weight: 500; color: #374151; }
          .input-field {
            padding: 8px 12px; border: 1.5px solid hsl(220, 16%, 86%);
            border-radius: 12px; font-size: 14px; outline: none; width: 100%;
          }
          .input-field:focus { border-color: hsl(267, 68%, 58%); box-shadow: 0 0 0 3px hsl(262, 100%, 97%); }
          .input-error { border-color: hsl(0, 75%, 54%); }
          .input-helper { font-size: 12px; color: #9ca3af; }
          .input-error-text { font-size: 12px; color: hsl(0, 75%, 54%); }

          .toggle-track {
            width: 44px; height: 24px; border-radius: 12px; position: relative;
            cursor: pointer; transition: background 0.2s;
          }
          .toggle-on { background: hsl(267, 68%, 58%); }
          .toggle-off { background: hsl(220, 16%, 86%); }
          .toggle-thumb {
            position: absolute; top: 2px; width: 20px; height: 20px;
            border-radius: 10px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.15);
            transition: transform 0.2s;
          }
          .toggle-on .toggle-thumb { transform: translateX(22px); }
          .toggle-off .toggle-thumb { transform: translateX(2px); }

          .avatar {
            width: 40px; height: 40px; border-radius: 50%; display: inline-flex;
            align-items: center; justify-content: center; font-size: 14px; font-weight: 600;
            color: white; overflow: hidden;
          }

          .tag {
            display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px;
            border-radius: 999px; font-size: 13px; font-weight: 500;
          }
          .tag-close { cursor: pointer; opacity: 0.6; }

          .checkbox {
            width: 18px; height: 18px; border-radius: 4px; display: inline-flex;
            align-items: center; justify-content: center;
          }
          .checkbox-checked { background: hsl(267, 68%, 58%); }
          .checkbox-unchecked { border: 1.5px solid hsl(220, 16%, 86%); background: white; }

          .header { text-align: center; margin-bottom: 32px; }
          .header h1 { font-size: 28px; font-weight: 700; color: hsl(267, 68%, 58%); margin-bottom: 6px; }
          .header p { font-size: 14px; color: #9ca3af; }

          .color-dots { display: flex; gap: 8px; }
          .color-dot { width: 32px; height: 32px; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Baby Design UI Kit</h1>
          <p>A pastel-themed React component library with 20 components</p>
        </div>
        <div class="grid">
          <div class="card">
            <h3>Buttons</h3>
            <div class="row">
              <button class="btn btn-filled">Primary</button>
              <button class="btn btn-outline">Outline</button>
              <button class="btn btn-ghost">Ghost</button>
              <button class="btn btn-destructive">Delete</button>
            </div>
            <div class="row">
              <button class="btn btn-filled btn-sm">Small</button>
              <button class="btn btn-filled">Medium</button>
              <button class="btn btn-filled btn-lg">Large</button>
            </div>
          </div>

          <div class="card">
            <h3>Badges & Tags</h3>
            <div class="row">
              <span class="badge badge-pink">Design</span>
              <span class="badge badge-purple">Dev</span>
              <span class="badge badge-green">Shipped</span>
              <span class="badge badge-amber">Pending</span>
              <span class="badge badge-red">Critical</span>
              <span class="badge badge-blue">Info</span>
            </div>
            <div class="row" style="margin-top: 8px;">
              <span class="tag" style="background: hsl(350, 96%, 93%); color: hsl(344, 70%, 39%);">React <span class="tag-close">x</span></span>
              <span class="tag" style="background: hsl(279, 96%, 93%); color: hsl(273, 60%, 39%);">TypeScript <span class="tag-close">x</span></span>
              <span class="tag" style="background: hsl(174, 75%, 90%); color: hsl(168, 55%, 30%);">Tailwind <span class="tag-close">x</span></span>
            </div>
          </div>

          <div class="card">
            <h3>Form Inputs</h3>
            <div class="input-wrapper" style="margin-bottom: 12px;">
              <label class="input-label">Email address</label>
              <input class="input-field" placeholder="you@example.com" value="hello@baby.design" />
              <span class="input-helper">We'll never share your email.</span>
            </div>
            <div class="input-wrapper">
              <label class="input-label">Password</label>
              <input class="input-field input-error" type="password" value="short" />
              <span class="input-error-text">Password must be at least 8 characters.</span>
            </div>
          </div>

          <div class="card">
            <h3>Toggles & Checkboxes</h3>
            <div class="row">
              <div class="toggle-track toggle-on"><div class="toggle-thumb"></div></div>
              <span style="font-size: 14px; color: #374151;">Dark mode</span>
            </div>
            <div class="row">
              <div class="toggle-track toggle-off"><div class="toggle-thumb"></div></div>
              <span style="font-size: 14px; color: #374151;">Notifications</span>
            </div>
            <div class="row" style="margin-top: 4px;">
              <div class="checkbox checkbox-checked"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
              <span style="font-size: 14px; color: #374151;">Accept terms</span>
            </div>
            <div class="row">
              <div class="checkbox checkbox-unchecked"></div>
              <span style="font-size: 14px; color: #374151;">Subscribe to newsletter</span>
            </div>
          </div>

          <div class="card">
            <h3>Color Palettes</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; gap: 4px;">
                <div class="color-dot" style="background: hsl(262, 100%, 97%)"></div>
                <div class="color-dot" style="background: hsl(264, 88%, 86%)"></div>
                <div class="color-dot" style="background: hsl(266, 74%, 67%)"></div>
                <div class="color-dot" style="background: hsl(267, 68%, 58%)"></div>
                <div class="color-dot" style="background: hsl(268, 62%, 48%)"></div>
                <div class="color-dot" style="background: hsl(269, 58%, 39%)"></div>
                <div class="color-dot" style="background: hsl(271, 50%, 22%)"></div>
              </div>
              <div style="display: flex; gap: 4px;">
                <div class="color-dot" style="background: hsl(350, 100%, 97%)"></div>
                <div class="color-dot" style="background: hsl(349, 93%, 85%)"></div>
                <div class="color-dot" style="background: hsl(347, 87%, 67%)"></div>
                <div class="color-dot" style="background: hsl(346, 84%, 58%)"></div>
                <div class="color-dot" style="background: hsl(345, 75%, 48%)"></div>
                <div class="color-dot" style="background: hsl(344, 70%, 39%)"></div>
                <div class="color-dot" style="background: hsl(342, 60%, 22%)"></div>
              </div>
              <div style="display: flex; gap: 4px;">
                <div class="color-dot" style="background: hsl(175, 80%, 96%)"></div>
                <div class="color-dot" style="background: hsl(173, 70%, 80%)"></div>
                <div class="color-dot" style="background: hsl(171, 60%, 56%)"></div>
                <div class="color-dot" style="background: hsl(170, 55%, 46%)"></div>
                <div class="color-dot" style="background: hsl(169, 55%, 38%)"></div>
                <div class="color-dot" style="background: hsl(168, 55%, 30%)"></div>
                <div class="color-dot" style="background: hsl(166, 45%, 17%)"></div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>Avatars</h3>
            <div class="row">
              <div class="avatar" style="background: hsl(267, 68%, 58%); width: 32px; height: 32px; font-size: 12px;">AB</div>
              <div class="avatar" style="background: hsl(346, 84%, 58%);">CD</div>
              <div class="avatar" style="background: hsl(170, 55%, 46%); width: 48px; height: 48px; font-size: 16px;">EF</div>
              <div class="avatar" style="background: hsl(40, 75%, 48%); width: 56px; height: 56px; font-size: 18px;">GH</div>
              <div class="avatar" style="background: hsl(0, 75%, 54%); width: 64px; height: 64px; font-size: 20px;">IJ</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/components-showcase.png`, fullPage: true });
  console.log("Saved components-showcase.png");

  // Screenshot 2: Storybook UI
  await page.goto(`${BASE}/?path=/story/components-button--filled`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/storybook-preview.png` });
  console.log("Saved storybook-preview.png");

  await browser.close();
}

main().catch(console.error);
