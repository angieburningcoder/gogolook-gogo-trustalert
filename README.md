# 企業偽冒監控 - Fake Door MVP: "Gogo! TrustAlert"

一個用於驗證產品需求的 Fake Door Landing Page，專為「企業偽冒監控」產品設計!

## 專案特色

- ✅ **即開即用**：`npm install` → `npm run dev` 即可啟動
- ✅ **日系簡約風格**：MUJI / iOS 風格的留白設計
- ✅ **完整追蹤**：內建 analytics hooks，支援 GTM / Vercel / Cloudflare
- ✅ **彈性表單**：可串接外部服務（Formspree）或內部 API
- ✅ **一鍵部署**：完整支援 Vercel 部署

## 產品假設與驗證策略

### 我想透過這個 Fake Door 驗證什麼？

本專案聚焦驗證TA「中小企業對品牌偽冒監控服務的即時需求」，核心假設如下：

#### 核心假設

1. **企業將「品牌被偽冒」視為高風險問題**
   特別是對品牌信任的即時損害，而非僅是法律或內部成本問題

2. **即時通知比事後處理更有吸引力**
   企業願意為「提前知道」而非「事後補救」付費

3. **自動化監控的價值高於人工檢查**
   企業理解人工搜尋的時間成本與不可擴展性

#### 為什麼是「客戶信任流失」？

相較於法律風險或內部處理成本，我們認為「客戶信任流失」是最能驅動企業立即行動的恐懼，因為：

- **即時性**：一次詐騙事件即可破壞品牌形象
- **不可逆**：客戶信任一旦受損難以恢復
- **直接影響營收**：導致不回購、負評擴散
- **老闆能感知**：即使無數據也理解其嚴重性

> 💡 **產品洞察**：企業買的不是「偽冒監控」，而是「不要讓客戶懷疑我」

### 100 人看到頁面後，我們會觀察什麼？

#### 關鍵指標與判斷標準

| 指標 | 門檻 | 意義 |
|------|------|------|
| **CTA 點擊率** | ≥ 10% | 問題描述夠痛、具吸引力 |
| **表單完成率** | ≥ 5% | 願意留下聯絡方式，顯示初步需求 |
| **表單開啟率** | ≥ 80% | CTA 到 Modal 的流暢度 |

#### Go / No-Go 決策邏輯

**✅ Go（繼續開發）**

- CTA 點擊率 ≥ 10%
- 表單完成率 ≥ 5%
- 訊號清晰：高 CTR + 高完成率 → 需求存在且強烈

**⚠️ 需調整（Pivot）**

- CTA 點擊率 ≥ 10%，但表單完成率 < 5%
  → 問題有吸引力，但價值主張或表單設計需優化

**❌ No-Go（暫停或重新定義）**

- CTA 點擊率 < 10%
  → 問題描述不夠痛，或 TA 選擇錯誤

#### 為什麼是這些數字？

- **10% CTR**：一般 B2B SaaS landing page 的及格線為 5-8%，我們設定 10% 是因為這是「痛點驗證」而非成熟產品
- **5% 表單完成率**：表示每 100 人中有 5 人願意留下聯絡方式，已足夠證明有一群明確的早期採用者

> 📊 **關鍵洞察**：Fake Door 不是測「有多少人會買」，而是測「有多少人認為這是他們的問題」

## 技術棧

- **框架**：Next.js 15 (App Router)
- **語言**：TypeScript
- **樣式**：Tailwind CSS
- **字體**：Noto Sans JP, Noto Serif JP, Inter
- **圖示**：lucide-react

## 快速開始

### 1. 安裝依賴

```bash
cd gogolook-fake-door-mvp
npm install
```

### 2. 設定環境變數

複製 `.env.example` 為 `.env`：

```bash
cp .env.example .env
```

編輯 `.env`：

```env
# 選項 1: 使用外部表單服務（例如 Formspree）
NEXT_PUBLIC_SUBMIT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# 選項 2: 使用內部 API（留空即使用 /api/lead）
# NEXT_PUBLIC_SUBMIT_ENDPOINT=
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

## 專案結構

```
gogolook-fake-door-mvp/
├── app/
│   ├── layout.tsx              # 全域佈局 + 字體設定
│   ├── globals.css             # 全域樣式
│   ├── page.tsx                # Landing Page
│   ├── thanks/
│   │   └── page.tsx            # 感謝頁
│   └── api/
│       └── lead/
│           └── route.ts        # 內部 API endpoint
├── components/
│   ├── Header.tsx              # 頂部導航
│   ├── Hero.tsx                # 主視覺區塊
│   ├── PainPoints.tsx          # 痛點卡片
│   ├── ValueProps.tsx          # 價值主張
│   ├── Features.tsx            # 功能特色
│   ├── CTASection.tsx          # 底部 CTA
│   ├── Footer.tsx              # 頁尾
│   └── LeadModal.tsx           # 表單 Modal
├── lib/
│   ├── analytics.ts            # 追蹤工具
│   └── submitLead.ts           # 表單提交邏輯
├── .env.example                # 環境變數範例
├── tailwind.config.ts          # Tailwind 設定
└── README.md
```

## 表單設定

### 選項 1: 使用外部服務（推薦快速測試）

支援任何接受 POST JSON 的服務：

#### Formspree

1. 前往 [formspree.io](https://formspree.io) 註冊
2. 建立新表單，取得 endpoint（例如：`https://formspree.io/f/xyzabc123`）
3. 在 `.env` 設定：
   ```env
   NEXT_PUBLIC_SUBMIT_ENDPOINT=https://formspree.io/f/xyzabc123
   ```

#### Google Forms

1. 建立 Google 表單
2. 取得表單的 action URL（需要一些技巧，可搜尋 "Google Forms API"）
3. 在 `.env` 設定該 URL

### 選項 2: 使用內部 API

預設已提供 `/app/api/lead/route.ts`，目前功能：

- ✅ 驗證 email 格式
- ✅ Console log 所有提交
- ✅ 回傳成功訊息

#### 擴充建議

在 `app/api/lead/route.ts` 中可加入：

```typescript
// 儲存到資料庫（Cloudflare D1, Supabase, etc.）
await db.insert('leads', data);

// 發送 Email 通知（Resend, SendGrid）
await sendEmail({
  to: 'team@company.com',
  subject: 'New Lead',
  body: `Email: ${data.email}...`
});

// 發送到 Slack
await fetch(process.env.SLACK_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({ text: `New lead: ${data.email}` })
});
```

## Analytics 設定

### 預設：Console + GTM

預設會 log 到 console 並推送到 `dataLayer`（供 Google Tag Manager 使用）。

追蹤的事件：

- `page_view`：頁面瀏覽
- `cta_click`：CTA 按鈕點擊（含位置：hero / bottom_cta）
- `form_open`：表單開啟
- `form_submit`：表單提交
- `form_success`：提交成功
- `form_error`：提交失敗

### 選項 1: Vercel Analytics

1. 安裝：
   ```bash
   npm install @vercel/analytics
   ```

2. 在 `lib/analytics.ts` 取消註解相關代碼

3. 部署到 Vercel 後自動啟用

### 選項 2: Cloudflare Web Analytics

1. 前往 [Cloudflare Dashboard](https://dash.cloudflare.com) 取得 Analytics Token

2. 在 `.env` 加入：
   ```env
   NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your_token_here
   ```

3. 在 `app/layout.tsx` 的 `<head>` 加入 script：
   ```tsx
   <script
     defer
     src='https://static.cloudflareinsights.com/beacon.min.js'
     data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN}"}`}
   />
   ```

## 部署到 Vercel

### 方式 1: 透過 Vercel Dashboard

1. 前往 [vercel.com](https://vercel.com) 並登入
2. 點擊 "Add New..." → "Project"
3. 匯入 Git repository
4. 設定環境變數（如有需要）
5. 點擊 "Deploy"

### 方式 2: 透過 Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel

# 正式環境
vercel --prod
```

### 環境變數設定

在 Vercel Dashboard 的 "Settings" → "Environment Variables" 加入：

- `NEXT_PUBLIC_SUBMIT_ENDPOINT`（如使用外部服務）
- `NEXT_PUBLIC_VERCEL_ANALYTICS`（如啟用 Vercel Analytics）
- `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`（如啟用 Cloudflare）

## 產品洞察標記 🔍

專案中標記了多個 `🔍 Insight` 註解，這些是建議測試的關鍵點：

### 1. Hero 主張測試（`components/Hero.tsx`）

```typescript
// 🔍 Insight: Test which fear resonates most:
//     - Trust: "客戶信任" (current)
//     - Cost: "營收損失"
//     - Legal: "法律風險"
```

**建議**：A/B 測試不同恐懼訴求，觀察哪個 CTR 最高。

### 2. CTA 文案測試（`components/Hero.tsx`）

```typescript
// 🔍 Insight: Test CTA copy urgency:
//     - "加入企業冒名監控候補" (waitlist, lower commitment)
//     - "立即啟用監控服務" (immediate, higher urgency)
```

**建議**：測試不同承諾程度的文案，找出最佳轉換率。

### 3. 表單欄位測試（`components/LeadModal.tsx`）

```typescript
// 🔍 Insight: Consider adding "是否曾被偽冒" checkbox
//     to segment high-intent users who've already experienced pain.
```

**建議**：加入「是否曾遭遇偽冒」欄位，區分高意圖用戶，優先聯繫。

### 4. 轉換漏斗分析（`lib/analytics.ts`）

```typescript
// 🔍 Insight: Monitor these events to measure engagement
// - cta_click: Which CTA drives most clicks?
// - form_open: How many visitors are interested?
// - form_submit: How many actually submit?
// - form_success: Completion rate (form_success / form_open)
```

**建議指標**：

| 指標 | 計算方式 | 建議門檻 |
|------|---------|---------|
| CTR | cta_click / page_view | > 10% |
| Form Open Rate | form_open / cta_click | > 80% |
| Completion Rate | form_success / form_open | > 50% |

### Go/No-Go 決策建議

**Go（繼續開發）條件：**

- Landing Page CTR > 10%
- Form completion rate > 50%
- 累積 50+ 有效 leads
- 至少 20% leads 表示「曾遭遇偽冒」

**No-Go（暫停/調整）條件：**

- CTR < 5%
- Completion rate < 30%
- 高 bounce rate（> 70%）
- 使用者反饋不符合預期需求

## 自訂與擴充

### 修改顏色主題

編輯 `app/globals.css`：

```css
:root {
  --background: #fafaf8;  /* 背景色 */
  --foreground: #1a1a1a;  /* 前景色 */
}
```

### 修改字體

編輯 `app/layout.tsx` 與 `tailwind.config.ts`。

### 加入更多欄位

編輯 `lib/submitLead.ts` 的 `LeadFormData` interface：

```typescript
export interface LeadFormData {
  email: string;
  company_size?: string;
  role?: string;
  impersonation_type?: string;
  // 新增欄位
  has_been_impersonated?: boolean;
  monthly_budget?: string;
}
```

並在 `components/LeadModal.tsx` 加入對應的表單欄位。

## 後續擴充建議

當驗證需求成功後，可考慮：

1. **整合真實後端**
   - Cloudflare Workers + D1 (serverless SQL)
   - Supabase (PostgreSQL + Auth)
   - Firebase (快速原型)

2. **加入驗證碼**
   - Cloudflare Turnstile（免費、隱私友善）
   - Google reCAPTCHA

3. **Email 自動回覆**
   - Resend
   - SendGrid
   - AWS SES

4. **進階分析**
   - Mixpanel / Amplitude（事件分析）
   - Hotjar（熱圖與錄影）
   - PostHog（開源替代方案）

## 疑難排解

### 字體沒有正確載入

確認 `app/layout.tsx` 的字體設定正確，並檢查瀏覽器 DevTools 的 Network tab。

### 表單提交失敗

1. 檢查 `.env` 的 `NEXT_PUBLIC_SUBMIT_ENDPOINT` 設定
2. 查看瀏覽器 Console 的錯誤訊息
3. 確認外部服務（如 Formspree）的 CORS 設定

### 部署到 Vercel 後樣式跑掉

確認 `tailwind.config.ts` 的 `content` 設定包含所有檔案：

```typescript
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
],
```

## License

MIT

---

**注意**：這是 Fake Door 測試專案，目前不包含真實的偽冒監控功能。所有功能說明僅用於需求驗證。
