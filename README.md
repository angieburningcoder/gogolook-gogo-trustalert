# Watchmen Lite - 品牌偽冒監測訂閱服務 MVP

Gogolook 旗下的 SaaS 訂閱制品牌偽冒監測服務，透過沈浸式問卷收集用戶資料，自動生成風險評估報告與建議監控關鍵字，並提供互動式定價計算器。

## 產品概述

Watchmen Lite 是針對創作者、KOL、中小企業設計的品牌偽冒監測服務。不同於傳統的固定方案，我們提供：

- **沈浸式風險檢測問卷**：5 個步驟快速了解用戶品牌狀況
- **自動風險評估報告**：根據用戶資料計算被偽冒風險分數
- **智能關鍵字推薦**：自動生成最可能被偽冒的帳號名稱變體
- **互動式定價計算器**：用戶可自由調整監控範圍，即時看到價格變化

## 核心功能

### 1. 沈浸式問卷（5 步驟）

| 步驟 | 內容 | 互動方式 |
|------|------|----------|
| 1 | 客戶類型（個人創作者/企業品牌） | 按鈕選擇 |
| 2 | 中英文名稱 | 文字輸入 |
| 3 | 產業領域 | 9 種選項按鈕 |
| 4 | 經營的社群平台 | 8 種平台多選 |
| 5 | 品牌資訊（數量、認證、粉絲數） | 混合互動 |

### 2. 風險評估報告

- **風險分數**：0-100 分，根據用戶輸入計算
- **風險等級**：高/中/低，搭配視覺化圖示
- **風險因素分析**：列出具體的風險來源
- **不作為成本分析**：動態計算信任成本、金錢成本、修復成本（風險 ≥ 40 時顯示）
- **建議監控關鍵字**：自動生成 10-15 個可能被偽冒的名稱變體

### 3. 互動式定價計算器

- 顯示用戶選擇的監控身份與關鍵字
- 可自由新增/移除監控項目
- 即時計算月費與年費
- 透明的價格明細breakdown

## 產品價值主張

> 賣的不是「監控」，而是「可採取行動的成果」

| 功能 | 說明 |
|------|------|
| 疑似偽冒清單 | 包含平台來源與具體連結，精準掌握威脅 |
| 風險分級 (H/M/L) | 專業自動化判斷，無需資安背景 |
| Evidence Lite 證據包 | 提供素材、CTA、首次出現時間 |
| 週報與即時通知 | 高風險事件即時掌握 |
| 不作為成本分析 | 評估信任成本、金錢成本、修復成本 |
| 協助處理 SOP | Plus 方案專屬，半代管服務 |

## 技術棧

- **框架**：Next.js 15 (App Router)
- **語言**：TypeScript
- **樣式**：Tailwind CSS
- **字體**：Noto Sans JP, Noto Serif JP, Inter
- **圖示**：lucide-react

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

### 3. 建置生產版本

```bash
npm run build
```

## 專案結構

```
watchmen-lite-mvp/
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
│   ├── Header.tsx              # 頂部導航（Watchmen Lite 品牌）
│   ├── Hero.tsx                # 主視覺區塊（風險警示）
│   ├── PainPoints.tsx          # 痛點展示（統計數據 + 4大影響）
│   ├── ValueProps.tsx          # 產品價值主張（5大功能）
│   ├── Features.tsx            # SaaS 服務介紹 + 支援平台
│   ├── CTASection.tsx          # 底部 CTA
│   ├── Footer.tsx              # 頁尾
│   ├── AssessmentFlow.tsx      # 🌟 核心：沈浸式問卷 + 報告 + 計價器
│   └── LeadModal.tsx           # 舊版表單（已棄用）
├── lib/
│   ├── analytics.ts            # 追蹤工具
│   └── submitLead.ts           # 表單提交邏輯
└── public/
    └── images/
        └── gogolook-logo.png   # Gogolook Logo
```

## 核心元件：AssessmentFlow

`components/AssessmentFlow.tsx` 是本專案的核心，包含：

### 風險計算邏輯

```typescript
function calculateRiskScore(data: FormData): number {
  // 客戶類型：個人 +20, 企業 +15
  // 平台數量：每個 +8（最高 30）
  // 品牌數量：每個 +5（最高 15）
  // 無認證：+15
  // 粉絲數：100K+ = +25, 10K+ = +20, 1K+ = +10
}
```

### 關鍵字生成邏輯

```typescript
function generateKeywords(data: FormData): string[] {
  // 名稱變體：{名字}、{名字}官方、{名字}客服
  // 英文變體：{name}、{name}_official、{name}_tw
  // 品牌變體：{品牌}、{品牌}官方、{品牌}_official
  // 產業關鍵字：根據產業加入相關詞彙
}
```

### 定價計算邏輯

```typescript
function calculatePrice(identityCount: number, keywordCount: number) {
  const basePrice = 990;        // 基本月費
  const identityPrice = 299;    // 每個身份
  const keywordPrice = 99;      // 每個關鍵字

  const monthly = basePrice + (identityCount * identityPrice) + (keywordCount * keywordPrice);
  const yearly = monthly * 10;  // 年繳省 2 個月

  return { monthly, yearly };
}
```

### 不作為成本計算邏輯

根據用戶輸入動態計算三種成本影響：

| 成本類型 | 計算依據 | 輸出範例 |
|----------|----------|----------|
| 信任成本 | 粉絲數量 | 私訊質疑 20-50 則/週、負評比例 10-20% |
| 金錢成本 | 產業類型 + 有無認證 | CPM 上升 25-40%、轉換率下降 20-35% |
| 修復成本 | 平台數 + 品牌數 | 信任回復需 4-8 個月 |

```typescript
function calculateImpactCost(data: FormData) {
  // 信任成本：粉絲 100K+ → 50-100 則/週, 10K+ → 20-50 則/週
  // 金錢成本：高風險產業(金融/電商/KOL) + 無認證 → CPM 上升 25-40%
  // 修復成本：平台 ≥ 5 或品牌 ≥ 3 → 6-12 個月
}
```

## Analytics 追蹤事件

| 事件名稱 | 觸發時機 | 附帶資料 |
|----------|----------|----------|
| `page_view` | 頁面載入 | page |
| `cta_click` | CTA 按鈕點擊 | location, type |
| `assessment_open` | 開啟問卷 | - |
| `assessment_step_complete` | 完成問卷步驟 | step, stepName |
| `assessment_complete` | 提交方案諮詢 | riskScore, identityCount, keywordCount, pricing, email |

## 驗證指標

### 關鍵指標

| 指標 | 計算方式 | 建議門檻 |
|------|----------|----------|
| CTA 點擊率 | assessment_open / page_view | > 10% |
| 問卷完成率 | assessment_complete / assessment_open | > 30% |
| 平均風險分數 | avg(riskScore) | 觀察分佈 |
| 平均方案金額 | avg(pricing) | 觀察分佈 |

### Go/No-Go 決策

**Go（繼續開發）**
- CTA 點擊率 > 10%
- 問卷完成率 > 30%
- 累積 50+ 有效 leads

**No-Go（需調整）**
- CTA 點擊率 < 5%
- 問卷完成率 < 20%
- 用戶反饋定價太高或功能不符需求

## 部署到 Vercel

### 方式 1: Vercel Dashboard

1. 前往 [vercel.com](https://vercel.com) 並登入
2. 點擊 "Add New..." → "Project"
3. 匯入 Git repository
4. 點擊 "Deploy"

### 方式 2: Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel

# 正式環境
vercel --prod
```

## 自訂與擴充

### 調整風險計算權重

編輯 `components/AssessmentFlow.tsx` 中的 `calculateRiskScore` 函數。

### 調整定價

編輯 `components/AssessmentFlow.tsx` 中的 `calculatePrice` 函數：

```typescript
const basePrice = 990;      // 調整基本月費
const identityPrice = 299;  // 調整每身份價格
const keywordPrice = 99;    // 調整每關鍵字價格
```

### 新增產業類別

編輯 `INDUSTRIES` 陣列：

```typescript
const INDUSTRIES = [
  { id: 'kol', name: 'KOL / 網紅 / 創作者' },
  { id: 'ecommerce', name: '電商 / 品牌商' },
  // 新增更多...
];
```

### 新增監控平台

編輯 `PLATFORMS` 陣列：

```typescript
const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  // 新增更多...
];
```

## 後續開發建議

1. **整合真實後端**
   - 儲存問卷結果到資料庫
   - 發送 Email 通知給銷售團隊
   - 整合 CRM 系統

2. **增強報告功能**
   - 產出 PDF 報告
   - 發送報告到用戶信箱
   - 加入真實的偽冒案例範例

3. **支付整合**
   - 整合 Stripe 或其他支付服務
   - 實現訂閱管理功能

## License

MIT

---

**Gogolook × Watchmen Lite** - 守護您的品牌聲譽
