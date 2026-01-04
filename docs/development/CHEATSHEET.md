# 快速參考手冊

## 🎯 一分鐘速查

### 啟動專案
```bash
npm run dev          # 啟動開發伺服器
npm run build        # 建置正式版本
npm run start        # 執行正式版本
npm run lint         # 程式碼檢查
```

### 常用路徑
- Landing Page: `http://localhost:3000`
- 感謝頁: `http://localhost:3000/thanks`
- API Endpoint: `http://localhost:3000/api/lead`

### 檔案位置速查

| 要改什麼 | 編輯哪個檔案 |
|---------|------------|
| 主標題 | `components/Hero.tsx` |
| CTA 按鈕文字 | `components/Hero.tsx` |
| 痛點描述 | `components/PainPoints.tsx` |
| 價值主張 | `components/ValueProps.tsx` |
| 功能說明 | `components/Features.tsx` |
| 表單欄位 | `components/LeadModal.tsx` |
| 頁尾文字 | `components/Footer.tsx` |
| 網站標題 | `app/layout.tsx` |
| 顏色主題 | `app/globals.css` |
| 表單提交邏輯 | `lib/submitLead.ts` |
| Analytics 追蹤 | `lib/analytics.ts` |

## 🎨 快速自訂

### 改顏色
`app/globals.css`:
```css
:root {
  --background: #fafaf8;  /* 背景 */
  --foreground: #1a1a1a;  /* 文字 */
}
```

### 改主標
`components/Hero.tsx:27`:
```tsx
當有人冒用您的品牌  ← 改這行
客戶的信任正在流失  ← 改這行
```

### 改 CTA
`components/Hero.tsx:44`:
```tsx
加入企業冒名監控候補  ← 改這行
```

### 改表單欄位
`components/LeadModal.tsx`:
1. 加欄位到 `LeadFormData` interface (`lib/submitLead.ts`)
2. 加 UI 到 `<form>` 裡

## 📊 Analytics 事件

| 事件名稱 | 觸發時機 | 位置 |
|---------|---------|------|
| `page_view` | 頁面載入 | `app/page.tsx` |
| `cta_click` | 點擊 CTA | `Hero.tsx`, `CTASection.tsx` |
| `form_open` | 開啟表單 | `LeadModal.tsx` |
| `form_submit` | 提交表單 | `LeadModal.tsx` |
| `form_success` | 提交成功 | `LeadModal.tsx` |
| `form_error` | 提交失敗 | `LeadModal.tsx` |

查看方法：開啟 Console (F12) → 看 `[Analytics]` 開頭的 log

## 🔧 環境變數

`.env` 檔案：
```env
# 表單提交 endpoint（選填，留空用內部 API）
NEXT_PUBLIC_SUBMIT_ENDPOINT=https://formspree.io/f/YOUR_ID

# Vercel Analytics（選填）
NEXT_PUBLIC_VERCEL_ANALYTICS=true

# Cloudflare Analytics（選填）
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your_token
```

## 🚀 快速部署

```bash
# Vercel（推薦）
vercel          # 預覽
vercel --prod   # 正式

# 或用 Vercel Dashboard
# 1. 推到 GitHub
# 2. vercel.com/new
# 3. Import repository
# 4. Deploy
```

## 🐛 常見問題

### 字體沒載入
等待 5-10 秒（首次較慢）

### 按鈕沒反應
F12 查看 Console 錯誤訊息

### 表單提交失敗
1. 檢查 `.env` 設定
2. 檢查 Console 錯誤
3. 確認網路連線

### 改了沒變
1. 確認有存檔 (Cmd+S)
2. 手動重新整理 (Cmd+R)
3. 重啟 dev server

## 📈 指標門檻

| 指標 | 建議門檻 |
|-----|---------|
| CTR (CTA 點擊率) | > 10% |
| Form Open Rate | > 80% |
| Form Submit Rate | > 60% |
| Overall Conversion | > 5% |

## 📁 專案結構（精簡版）

```
app/
  page.tsx          ← Landing page
  thanks/page.tsx   ← 感謝頁
  api/lead/route.ts ← API endpoint

components/
  Hero.tsx          ← 主視覺 + CTA
  LeadModal.tsx     ← 表單
  (其他 UI 組件)

lib/
  analytics.ts      ← 追蹤
  submitLead.ts     ← 表單邏輯
```

## 🔗 快速連結

- [README.md](README.md) - 完整文檔
- [QUICKSTART.md](QUICKSTART.md) - 新手指南
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署教學
- [INSIGHTS.md](INSIGHTS.md) - 驗證策略
- [Vercel](https://vercel.com)
- [Formspree](https://formspree.io)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

## 💡 記得...

- ✅ 改文案後存檔
- ✅ 測試手機版
- ✅ 部署前先本地測試
- ✅ 設定 analytics
- ✅ 每週檢視數據
- ✅ 質化 + 量化並重

---

**需要更多幫助？查看 README.md 📚**
