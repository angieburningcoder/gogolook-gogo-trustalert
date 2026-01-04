# Vercel 部署指南

## 快速部署（推薦）

### 方法 1: GitHub + Vercel Dashboard

1. **推送到 GitHub**
   ```bash
   cd gogolook-fake-door-mvp
   git init
   git add .
   git commit -m "Initial commit: Fake Door MVP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **連結 Vercel**
   - 前往 [vercel.com/new](https://vercel.com/new)
   - 點擊 "Import Git Repository"
   - 選擇你的 GitHub repository
   - Vercel 會自動偵測 Next.js 專案

3. **設定環境變數**（選填）
   - 在 "Configure Project" 頁面
   - 展開 "Environment Variables"
   - 加入（若需要）：
     ```
     NEXT_PUBLIC_SUBMIT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
     ```

4. **部署**
   - 點擊 "Deploy"
   - 等待 1-2 分鐘
   - 完成！

### 方法 2: Vercel CLI（適合快速測試）

1. **安裝 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登入**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   cd gogolook-fake-door-mvp
   vercel
   ```

   第一次會問一些問題：
   - Set up and deploy "gogolook-fake-door-mvp"? **Y**
   - Which scope? (選擇你的帳號)
   - Link to existing project? **N**
   - What's your project's name? **gogolook-fake-door-mvp**
   - In which directory is your code located? **./**
   - Want to override the settings? **N**

4. **正式部署**
   ```bash
   vercel --prod
   ```

## 環境變數設定

### 透過 Dashboard

1. 前往 [vercel.com/dashboard](https://vercel.com/dashboard)
2. 選擇專案
3. 點擊 "Settings" → "Environment Variables"
4. 加入變數：

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUBMIT_ENDPOINT` | `https://formspree.io/f/YOUR_ID` | Production, Preview, Development |

### 透過 CLI

```bash
vercel env add NEXT_PUBLIC_SUBMIT_ENDPOINT
# 輸入值：https://formspree.io/f/YOUR_ID
# 選擇環境：Production, Preview, Development
```

## 自訂網域

1. 在 Vercel Dashboard → Settings → Domains
2. 加入你的網域（例如：`monitor.yourdomain.com`）
3. 依照指示設定 DNS（CNAME 或 A record）
4. 等待 DNS 生效（通常幾分鐘到數小時）

## 部署後檢查清單

- [ ] Landing page 能正常載入
- [ ] 日文字體正確顯示
- [ ] 點擊 CTA 能開啟表單
- [ ] 表單能成功提交
- [ ] 提交後跳轉到 `/thanks` 頁面
- [ ] 開啟瀏覽器 DevTools → Console，確認 analytics 事件有 log
- [ ] 測試手機版 RWD

## 分析工具啟用

### Vercel Analytics（推薦）

如果部署在 Vercel，這是最簡單的選項：

1. **安裝套件**
   ```bash
   npm install @vercel/analytics
   ```

2. **修改 `app/layout.tsx`**
   ```tsx
   import { Analytics } from '@vercel/analytics/react';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

3. **重新部署**
   ```bash
   git add .
   git commit -m "Add Vercel Analytics"
   git push
   ```
   或
   ```bash
   vercel --prod
   ```

4. **查看數據**
   - Vercel Dashboard → Analytics
   - 可看到 Page Views, Unique Visitors, Top Pages 等

### Google Analytics 4

1. **取得 GA4 Measurement ID**
   - 前往 [analytics.google.com](https://analytics.google.com)
   - 建立新 property
   - 取得 Measurement ID（格式：`G-XXXXXXXXXX`）

2. **加入環境變數**
   ```bash
   vercel env add NEXT_PUBLIC_GA_ID
   # 輸入：G-XXXXXXXXXX
   ```

3. **修改 `app/layout.tsx`**
   ```tsx
   export default function RootLayout({ children }) {
     const gaId = process.env.NEXT_PUBLIC_GA_ID;

     return (
       <html>
         <head>
           {gaId && (
             <>
               <script
                 async
                 src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
               />
               <script
                 dangerouslySetInnerHTML={{
                   __html: `
                     window.dataLayer = window.dataLayer || [];
                     function gtag(){dataLayer.push(arguments);}
                     gtag('js', new Date());
                     gtag('config', '${gaId}');
                   `,
                 }}
               />
             </>
           )}
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

## 效能優化建議

部署後可進一步優化：

1. **啟用 Edge Runtime**（更快的回應時間）
   在 `app/layout.tsx` 加入：
   ```tsx
   export const runtime = 'edge';
   ```

2. **圖片優化**
   如果之後加入圖片，使用 Next.js `<Image>` component

3. **字體優化**（已完成）
   - ✅ 使用 `next/font` 自動優化
   - ✅ 設定 `display: 'swap'` 避免 FOIT

## 常見問題

### Q: 部署後樣式跑掉

確認 `tailwind.config.ts` 的 `content` 設定包含所有檔案。

### Q: 表單提交沒反應

1. 檢查瀏覽器 Console 是否有錯誤
2. 確認環境變數已正確設定
3. 測試 `/api/lead` endpoint：
   ```bash
   curl -X POST https://your-domain.vercel.app/api/lead \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

### Q: 字體載入很慢

Next.js 會自動優化 Google Fonts。如果還是慢，可考慮：
- 減少字重（目前載入 3 個字重）
- 使用 `preload` (已在 `next/font` 自動處理)

### Q: 想改回 development 環境測試

```bash
vercel env pull .env.local
npm run dev
```

## 監控與維護

### 查看部署記錄

```bash
vercel ls
```

### 查看 Logs

```bash
vercel logs YOUR_DEPLOYMENT_URL
```

### 回滾到先前版本

1. Vercel Dashboard → Deployments
2. 找到想回滾的版本
3. 點擊 "..." → "Promote to Production"

---

**部署愉快！** 🚀
