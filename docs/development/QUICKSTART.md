# 快速開始指南

## 🚀 5 分鐘啟動

```bash
# 1. 進入專案目錄
cd gogolook-fake-door-mvp

# 2. 安裝依賴（只需第一次）
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 開啟瀏覽器
open http://localhost:3000
```

就這樣！你應該會看到一個漂亮的 Landing Page。

## ✅ 功能檢查清單

啟動後，測試以下功能：

### Landing Page
- [ ] 頁面正常載入，字體清晰（Noto Sans/Serif JP）
- [ ] 滾動順暢，留白舒服
- [ ] 手機版 RWD 正常（縮小瀏覽器視窗測試）

### 互動功能
- [ ] 點擊 Hero 區的「加入企業冒名監控候補」→ 開啟表單
- [ ] 點擊「看看如何運作」→ 滾動到功能區
- [ ] 點擊底部 CTA「加入候補名單」→ 開啟表單

### 表單功能
- [ ] 開啟表單 modal
- [ ] 填寫 Email（必填）
- [ ] 選填欄位都能正常選擇
- [ ] 點擊「提交」→ 跳轉到 `/thanks` 頁面
- [ ] 查看瀏覽器 Console → 應該看到 analytics log

### 感謝頁
- [ ] 顯示成功訊息
- [ ] 有「返回首頁」連結
- [ ] 點擊連結回到 Landing Page

## 🔧 設定表單提交（選填）

預設情況下，表單會提交到內部 API (`/api/lead`)，只會 log 到 console。

如果你想立即測試真實表單提交：

### 方案 1: 使用 Formspree（推薦，2 分鐘搞定）

1. 前往 [formspree.io](https://formspree.io)
2. 用 GitHub 或 Email 註冊（免費）
3. 建立新表單，複製 endpoint URL（例如：`https://formspree.io/f/xyzabc123`）
4. 在專案根目錄建立 `.env` 檔案：
   ```bash
   echo 'NEXT_PUBLIC_SUBMIT_ENDPOINT=https://formspree.io/f/xyzabc123' > .env
   ```
5. 重啟 dev server：
   ```bash
   npm run dev
   ```
6. 測試提交表單 → 到 Formspree Dashboard 查看收到的資料

### 方案 2: 檢視內部 API

表單預設會提交到 `/api/lead`，可以在 Console 看到 log。

如果想看詳細內容，開啟 `app/api/lead/route.ts`，會看到：

```typescript
console.log('[Lead Captured]', {
  email: data.email,
  company_size: data.company_size,
  // ...
});
```

## 📊 查看 Analytics

所有互動都會追蹤，開啟瀏覽器 Console (F12) 查看：

```
[Analytics] page_view {page: 'landing'}
[Analytics] cta_click {location: 'hero', type: 'primary'}
[Analytics] form_open {}
[Analytics] form_submit {company_size: '11-50', role: 'Marketing', ...}
[Analytics] form_success {}
```

這些事件可以串接到：
- Google Tag Manager（透過 `dataLayer`）
- Vercel Analytics
- Cloudflare Web Analytics
- Mixpanel / Amplitude

詳見 `README.md` 的 Analytics 設定章節。

## 🎨 自訂文案

### 修改主標題

編輯 `components/Hero.tsx`：

```typescript
<h1 className="font-serif text-5xl ...">
  當有人冒用您的品牌
  <br />
  <span className="text-foreground/60">客戶的信任正在流失</span>
</h1>
```

改成你想要的文案，存檔後瀏覽器會自動重新載入（HMR）。

### 修改 CTA 按鈕文字

同樣在 `components/Hero.tsx`：

```typescript
<button ...>
  加入企業冒名監控候補
  <ArrowRight ... />
</button>
```

### 修改痛點 / 功能描述

- **痛點**：`components/PainPoints.tsx`
- **價值主張**：`components/ValueProps.tsx`
- **功能特色**：`components/Features.tsx`

全都是純 TypeScript/React，直接改文字即可。

## 🎨 自訂顏色

編輯 `app/globals.css`：

```css
:root {
  --background: #fafaf8;  /* 背景色：米白 */
  --foreground: #1a1a1a;  /* 文字色：深灰 */
}
```

例如改成更白的背景：

```css
:root {
  --background: #ffffff;
  --foreground: #000000;
}
```

## 📱 測試手機版

### 方法 1: 瀏覽器 DevTools
1. F12 開啟 DevTools
2. 點擊 Toggle Device Toolbar（Ctrl+Shift+M / Cmd+Shift+M）
3. 選擇不同裝置（iPhone, iPad, etc.）

### 方法 2: 真實手機
1. 確保手機和電腦在同一個 Wi-Fi
2. 查看開發伺服器的 Network URL：
   ```
   - Local:   http://localhost:3000
   - Network: http://172.20.10.3:3000  ← 用這個
   ```
3. 在手機瀏覽器開啟 Network URL

## 🚢 部署到 Vercel

最簡單的方法：

```bash
# 安裝 Vercel CLI（只需一次）
npm i -g vercel

# 登入
vercel login

# 部署（第一次會問一些問題，全部按 Enter 用預設值即可）
vercel

# 正式部署
vercel --prod
```

幾分鐘後你會拿到一個公開 URL，例如：
```
https://gogolook-fake-door-mvp.vercel.app
```

詳細步驟見 `DEPLOYMENT.md`。

## 📚 進階閱讀

- **README.md**：完整專案說明、技術細節
- **DEPLOYMENT.md**：Vercel 部署完整指南
- **INSIGHTS.md**：產品驗證策略、指標追蹤、A/B 測試建議

## 🆘 遇到問題？

### 常見問題

**Q: `npm install` 失敗**
```bash
# 清除 cache
rm -rf node_modules package-lock.json
npm install
```

**Q: 字體沒有載入**
- 檢查網路連線（字體從 Google Fonts CDN 載入）
- 等待幾秒，Next.js 首次載入較慢

**Q: 點擊按鈕沒反應**
- 開啟 Console (F12) 查看錯誤訊息
- 確認沒有 JavaScript 錯誤

**Q: 表單提交後沒跳轉**
- 檢查 Console 是否有錯誤
- 確認 `.env` 設定正確（或留空使用內部 API）

**Q: 修改程式碼後沒變化**
- 確認存檔了（Cmd+S / Ctrl+S）
- 如果還是沒變化，手動重新整理（Cmd+R / Ctrl+R）
- 最後手段：重啟 dev server（Ctrl+C 停止，再 `npm run dev`）

## 🎯 下一步

1. ✅ 確認本地開發正常
2. ✅ 自訂文案（至少改主標題）
3. ✅ 設定表單提交（Formspree 或內部 API）
4. ✅ 部署到 Vercel
5. ✅ 分享給 5-10 位目標客群測試
6. ✅ 開始收集 analytics 數據
7. ✅ 一週後檢視數據，決定下一步

**祝你測試順利！** 🎉
