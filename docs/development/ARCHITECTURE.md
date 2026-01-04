# 技術架構文檔

## 📋 目錄

1. [系統架構概覽](#系統架構概覽)
2. [技術棧](#技術棧)
3. [目錄結構](#目錄結構)
4. [組件架構](#組件架構)
5. [數據流](#數據流)
6. [API 設計](#api-設計)
7. [前端架構](#前端架構)
8. [Analytics 架構](#analytics-架構)
9. [設計決策](#設計決策)
10. [擴展性考量](#擴展性考量)

---

## 系統架構概覽

### 架構圖

```
┌─────────────────────────────────────────────────────────────┐
│                         使用者                               │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Pages Layer (SSR/SSG)                               │   │
│  │  • Landing Page (/)                                  │   │
│  │  • Thanks Page (/thanks)                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Component Layer                                      │   │
│  │  • Header, Hero, PainPoints, ValueProps              │   │
│  │  • Features, CTASection, Footer, LeadModal           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Utility Layer                                        │   │
│  │  • analytics.ts (Event Tracking)                     │   │
│  │  • submitLead.ts (Form Submission)                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  API Routes                                           │   │
│  │  • POST /api/lead (Lead Collection)                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
┌──────────────────┐              ┌──────────────────────┐
│  Analytics       │              │  External Services   │
│  • Console       │              │  • Formspree         │
│  • dataLayer     │              │  • Google Forms      │
│  • Vercel        │              │  • 其他表單服務      │
│  • Cloudflare    │              └──────────────────────┘
└──────────────────┘
```

### 核心特性

- **靜態優先**: Landing Page 使用 SSG (Static Site Generation)
- **無狀態設計**: 不依賴後端數據庫（Fake Door 階段）
- **漸進增強**: 從內建 API 開始，可逐步擴展到外部服務
- **事件驅動**: 完整的 Analytics 事件追蹤系統

---

## 技術棧

### 框架與語言

| 技術 | 版本 | 用途 |
|-----|------|------|
| **Next.js** | 15.1.0 | React 框架 (App Router) |
| **React** | 19.0.0 | UI 函式庫 |
| **TypeScript** | 5.x | 類型安全的 JavaScript |

### 樣式與 UI

| 技術 | 版本 | 用途 |
|-----|------|------|
| **Tailwind CSS** | 3.4.17 | CSS 框架 |
| **PostCSS** | 8.4.49 | CSS 處理工具 |
| **Autoprefixer** | 10.4.20 | CSS 前綴自動化 |
| **lucide-react** | 0.469.0 | 圖示庫 |

### 字體

| 字體 | 字重 | 用途 |
|-----|------|------|
| **Noto Sans JP** | 400, 500, 700 | 內文、按鈕 |
| **Noto Serif JP** | 400, 500, 600 | 標題、強調 |
| **Inter** | 400-700 | 英文、數字 |

### 開發工具

| 工具 | 版本 | 用途 |
|-----|------|------|
| **ESLint** | 9 | 程式碼檢查 |
| **TypeScript Compiler** | 5.x | 類型檢查 |

---

## 目錄結構

### 完整結構

```
gogolook-fake-door-mvp/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # 根佈局（字體、metadata）
│   ├── page.tsx                      # Landing Page
│   ├── globals.css                   # 全域樣式 + Tailwind
│   ├── thanks/
│   │   └── page.tsx                  # 感謝頁面
│   └── api/
│       └── lead/
│           └── route.ts              # Lead 收集 API
│
├── components/                       # React 組件
│   ├── Header.tsx                    # 導航欄
│   ├── Hero.tsx                      # 主視覺 + CTA
│   ├── PainPoints.tsx                # 痛點卡片
│   ├── ValueProps.tsx                # 價值主張
│   ├── Features.tsx                  # 功能特色
│   ├── CTASection.tsx                # 底部 CTA
│   ├── Footer.tsx                    # 頁尾
│   └── LeadModal.tsx                 # 表單 Modal
│
├── lib/                              # 工具函數
│   ├── analytics.ts                  # 事件追蹤
│   └── submitLead.ts                 # 表單提交邏輯
│
├── public/                           # 靜態資源
│   └── images/
│       └── gogolook-logo.png
│
├── docs/                             # 文檔
│   ├── README.md                     # 文檔索引
│   ├── development/                  # 開發文檔
│   ├── deployment/                   # 部署文檔
│   └── product/                      # 產品文檔
│
├── 設定檔案
│   ├── package.json                  # 依賴管理
│   ├── tsconfig.json                 # TypeScript 設定
│   ├── next.config.ts                # Next.js 設定
│   ├── tailwind.config.ts            # Tailwind 設定
│   ├── postcss.config.mjs            # PostCSS 設定
│   ├── .eslintrc.json                # ESLint 設定
│   └── .env.example                  # 環境變數範本
│
└── README.md                         # 專案主文檔
```

### 設計原則

1. **關注點分離**: 頁面、組件、工具函數分層明確
2. **模組化**: 每個組件職責單一，可獨立測試
3. **可維護性**: 清晰的命名和目錄結構
4. **可擴展性**: 易於添加新組件和功能

---

## 組件架構

### 組件層級

```
app/page.tsx (Landing Page)
├── Header
├── Hero
│   └── LeadModal (Conditional)
├── PainPoints
├── ValueProps
├── Features
├── CTASection
│   └── LeadModal (Conditional)
└── Footer
```

### 組件詳解

#### 1. Header (`components/Header.tsx`)

**職責**: 頂部導航欄

**特性**:
- 固定定位 (`sticky top-0`)
- Logo + 品牌名稱
- Info 按鈕（未來可擴展為登入/註冊）

**Props**: 無

**狀態**: 無

---

#### 2. Hero (`components/Hero.tsx`)

**職責**: 主視覺區塊 + 雙 CTA

**特性**:
- 主標題（可 A/B 測試）
- Primary CTA: 開啟表單
- Secondary CTA: 滾動到功能區

**Props**: `onOpenForm: () => void`

**事件追蹤**:
- `cta_click` (location: 'hero', type: 'primary' | 'secondary')

**🔍 測試點**:
- Hero 主張測試（信任 vs 成本 vs 法律）
- CTA 文案測試（候補 vs 立即啟用）

---

#### 3. PainPoints (`components/PainPoints.tsx`)

**職責**: 展示三大痛點

**特性**:
- 卡片式佈局
- 圖示 + 標題 + 描述
- Hover 效果

**Props**: 無

**內容**:
1. 即時性問題：偽冒網站已經出現，卻渾然不知
2. 資源限制：沒有專人每天搜尋監控
3. 損害擴大：客戶受騙後才發現，信任已經流失

---

#### 4. ValueProps (`components/ValueProps.tsx`)

**職責**: 展示三大價值主張

**特性**:
- 詳細描述 + 重點亮點
- 響應式佈局（mobile: 1 列，desktop: 3 列）

**Props**: 無

**內容**:
1. 多維監控：社群媒體、搜尋引擎、網域註冊、App Store
2. 即時通知：偵測到偽冒立即通知
3. 處理指引：提供檢舉流程與法律資源

---

#### 5. Features (`components/Features.tsx`)

**職責**: 功能特色展示

**特性**:
- 3 列網格佈局
- 圖示 + 標題 + 描述

**Props**: 無

**內容**:
1. AI 驅動監控
2. 每日自動掃描
3. 詳細威脅報告

---

#### 6. CTASection (`components/CTASection.tsx`)

**職責**: 底部 CTA 區塊（二次轉換機會）

**特性**:
- 強調「無需信用卡」
- 追蹤 CTA 位置標記

**Props**: `onOpenForm: () => void`

**事件追蹤**:
- `cta_click` (location: 'bottom_cta', type: 'primary')

**🔍 測試點**:
- 比較 Hero CTA vs Bottom CTA 的轉換率

---

#### 7. Footer (`components/Footer.tsx`)

**職責**: 頁尾 + Fake Door 免責聲明

**特性**:
- 版權資訊
- 重要免責聲明（透明化 Fake Door 測試）

**Props**: 無

---

#### 8. LeadModal (`components/LeadModal.tsx`)

**職責**: 表單 Modal（核心轉換組件）

**特性**:
- 4 個表單欄位（1 必填 + 3 選填）
- Email 格式驗證
- 提交狀態管理
- 錯誤處理

**Props**:
```typescript
{
  isOpen: boolean;
  onClose: () => void;
}
```

**狀態**:
```typescript
{
  formData: LeadFormData;
  isSubmitting: boolean;
  error: string | null;
}
```

**表單欄位**:
```typescript
interface LeadFormData {
  email: string;              // 必填
  company_size?: string;      // 選填：1-10, 11-50, 51-200, 200+
  role?: string;              // 選填：行銷、客服、創辦人、IT、其他
  impersonation_type?: string; // 選填：社群、網站、客服、App、其他
}
```

**事件追蹤**:
- `form_open`: Modal 開啟
- `form_submit`: 表單提交
- `form_success`: 提交成功
- `form_error`: 提交失敗

**提交流程**:
1. 驗證 email 格式
2. 追蹤 `form_submit` 事件
3. 呼叫 `submitLead()`
4. 成功 → 導航到 `/thanks` + 追蹤 `form_success`
5. 失敗 → 顯示錯誤訊息 + 追蹤 `form_error`

**🔍 測試點**:
- 建議加入「是否曾被偽冒」checkbox 區分高意圖用戶

---

## 數據流

### 表單提交流程

```
用戶填寫表單
    │
    ▼
LeadModal 驗證 (Email 格式)
    │
    ▼
追蹤 form_submit 事件
    │
    ▼
submitLead(formData)
    ├─ 加入 timestamp
    ├─ 加入 source 標籤
    │
    ▼
判斷 endpoint
    ├─ 外部 (NEXT_PUBLIC_SUBMIT_ENDPOINT)
    │   └─ POST 到 Formspree / Google Forms
    │
    └─ 內部 (未設定環境變數)
        └─ POST 到 /api/lead
            ├─ 驗證 email
            ├─ console.log 記錄
            └─ 返回成功訊息
    │
    ▼
成功
    ├─ 追蹤 form_success
    └─ 導航到 /thanks
    │
失敗
    ├─ 追蹤 form_error
    └─ 顯示錯誤訊息
```

### Analytics 事件流

```
頁面載入
    │
    ▼
追蹤 page_view
    │
    ▼
用戶點擊 CTA
    │
    ▼
追蹤 cta_click (location: hero/bottom_cta)
    │
    ▼
開啟 Modal
    │
    ▼
追蹤 form_open
    │
    ▼
提交表單
    │
    ▼
追蹤 form_submit (含欄位資訊)
    │
    ▼
成功/失敗
    │
    ▼
追蹤 form_success / form_error
```

### 事件輸出

所有事件會同時輸出到：

1. **Console** (開發階段)
2. **window.dataLayer** (Google Tag Manager)
3. **Vercel Analytics** (選配)
4. **Cloudflare Analytics** (選配)

---

## API 設計

### POST /api/lead

**端點**: `/api/lead`

**方法**: POST

**Content-Type**: `application/json`

**Request Body**:
```typescript
{
  email: string;              // 必填
  company_size?: string;      // 選填
  role?: string;              // 選填
  impersonation_type?: string; // 選填
  timestamp?: string;         // 自動加入
  source?: string;            // 自動加入 (fake_door_mvp)
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "Lead captured successfully"
}
```

**Response (Error - Invalid Email)**:
```json
{
  "success": false,
  "error": "Valid email is required"
}
```

**狀態碼**:
- `200`: 成功
- `400`: 請求錯誤（Email 無效）
- `405`: 方法不允許（僅支援 POST）
- `500`: 伺服器錯誤

**目前實作**:
```typescript
// app/api/lead/route.ts
export async function POST(request: Request) {
  const data = await request.json();

  // 驗證 email
  if (!data.email || !data.email.includes('@')) {
    return NextResponse.json(
      { success: false, error: 'Valid email is required' },
      { status: 400 }
    );
  }

  // Log 到 console（開發階段）
  console.log('[Lead Captured]', data);

  // 返回成功
  return NextResponse.json({
    success: true,
    message: 'Lead captured successfully'
  });
}
```

**擴展建議**:

1. **儲存到資料庫** (Cloudflare D1, Supabase)
```typescript
await db.insert('leads', {
  email: data.email,
  company_size: data.company_size,
  created_at: new Date()
});
```

2. **發送 Email 通知** (Resend, SendGrid)
```typescript
await sendEmail({
  to: 'team@company.com',
  subject: 'New Lead',
  body: `Email: ${data.email}...`
});
```

3. **Webhook 通知** (Slack, Discord)
```typescript
await fetch(process.env.SLACK_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({
    text: `New lead: ${data.email}`
  })
});
```

---

## 前端架構

### 狀態管理

目前使用 **React State** (無需複雜狀態管理)

**LeadModal 狀態**:
```typescript
const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState<LeadFormData>({
  email: '',
  company_size: undefined,
  role: undefined,
  impersonation_type: undefined
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**為什麼不用 Redux/Zustand？**
- 狀態簡單（只有表單狀態）
- 無需跨組件共享複雜狀態
- 無需時間旅行或中間件
- 保持簡單是最好的

### 路由

使用 **Next.js App Router**

**路由表**:
| 路徑 | 頁面 | 渲染方式 |
|------|------|---------|
| `/` | Landing Page | SSG (Static) |
| `/thanks` | 感謝頁 | SSG (Static) |
| `/api/lead` | Lead API | Dynamic (On-demand) |

**導航方式**:
```typescript
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/thanks'); // 客戶端導航
```

### 樣式系統

**Tailwind CSS + CSS Variables**

**全域變數** (`app/globals.css`):
```css
:root {
  --background: #fafaf8;  /* 米白色背景 */
  --foreground: #1a1a1a;  /* 深灰色文字 */
}
```

**Tailwind 擴展** (`tailwind.config.ts`):
```typescript
theme: {
  extend: {
    colors: {
      'primary-blue': '#0059FF',
      'bg-blue-light': '#EDF4FF',
      background: 'var(--background)',
      foreground: 'var(--foreground)',
    },
    fontFamily: {
      sans: ['var(--font-noto-sans-jp)', 'Inter', 'sans-serif'],
      serif: ['var(--font-noto-serif-jp)', 'Georgia', 'serif'],
    },
    borderRadius: {
      xl: '1rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
    }
  }
}
```

**設計系統**:
- **間距**: Tailwind 標準間距 (4px, 8px, 12px, 16px, 24px, 32px...)
- **圓角**: xl (16px), 2xl (24px), 3xl (32px)
- **陰影**: Tailwind 標準陰影
- **斷點**: sm (640px), md (768px), lg (1024px), xl (1280px)

---

## Analytics 架構

### 事件追蹤系統

**核心函數** (`lib/analytics.ts`):
```typescript
export function track(
  eventName: string,
  properties?: Record<string, any>
) {
  // 1. Console log (開發階段)
  console.log('[Analytics]', eventName, properties);

  // 2. Push to dataLayer (GTM)
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...properties
    });
  }

  // 3. Vercel Analytics (選配)
  // if (process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true') {
  //   analytics.track(eventName, properties);
  // }

  // 4. Cloudflare Analytics (選配)
  // ...
}
```

### 追蹤的事件

| 事件名稱 | 觸發時機 | 屬性 |
|---------|---------|------|
| `page_view` | 頁面載入 | `{ page: 'landing' \| 'thanks' }` |
| `cta_click` | CTA 點擊 | `{ location: 'hero' \| 'bottom_cta', type: 'primary' \| 'secondary' }` |
| `form_open` | 表單開啟 | `{}` |
| `form_submit` | 表單提交 | `{ company_size?, role?, impersonation_type? }` |
| `form_success` | 提交成功 | `{}` |
| `form_error` | 提交失敗 | `{ message: string }` |

### 漏斗分析

```
page_view (100%)
    ↓
cta_click (目標 > 10%)
    ↓
form_open (目標 > 80% of clicks)
    ↓
form_submit (目標 > 60% of opens)
    ↓
form_success (目標 > 95% of submits)
```

### 集成方式

**Google Tag Manager**:
```javascript
// 已預設支援 via dataLayer
window.dataLayer.push({
  event: 'form_submit',
  company_size: '11-50',
  role: 'Marketing'
});
```

**Vercel Analytics**:
```typescript
// 1. 安裝: npm install @vercel/analytics
// 2. 在 app/layout.tsx 加入:
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

---

## 設計決策

### ADR-001: 使用 Next.js App Router

**日期**: 2025-12-26

**狀態**: 已採用

**背景**:
需要選擇 React 框架來建立 Landing Page

**決策**:
採用 Next.js 15 (App Router)

**理由**:
1. ✅ 內建 SSG/SSR，適合 Landing Page（SEO 友善）
2. ✅ 內建 API Routes，無需獨立後端
3. ✅ 優秀的開發體驗（HMR、TypeScript 支援）
4. ✅ Vercel 一鍵部署
5. ✅ 內建字體優化（Google Fonts）

**替代方案**:
- Create React App: 無 SSR/SSG，SEO 較差
- Vite + React: 需要額外設定 SSR
- Astro: 適合靜態網站，但 React 互動性較弱

---

### ADR-002: 使用 Tailwind CSS

**日期**: 2025-12-26

**狀態**: 已採用

**背景**:
需要選擇 CSS 框架來快速建立 UI

**決策**:
採用 Tailwind CSS 3.4.17

**理由**:
1. ✅ Utility-first，快速開發
2. ✅ 內建響應式設計
3. ✅ 易於自訂（色彩、字體、間距）
4. ✅ 與 Next.js 完美整合
5. ✅ 生產環境自動清除未使用樣式（小體積）

**替代方案**:
- CSS Modules: 需要手寫更多 CSS
- Styled Components: Runtime 成本，體積較大
- MUI: 過於複雜，不適合 Landing Page

---

### ADR-003: 內建 API vs 外部服務

**日期**: 2025-12-26

**狀態**: 已採用（雙模式）

**背景**:
表單提交需要選擇後端方案

**決策**:
支援雙模式：
1. 內建 API (`/api/lead`) - 預設
2. 外部服務 (Formspree, etc.) - 可選

**理由**:
1. ✅ 內建 API: 零依賴，開箱即用
2. ✅ 外部服務: 快速測試，無需設定資料庫
3. ✅ 漸進增強: 可從內建 API 逐步擴展到資料庫

**實作**:
```typescript
// lib/submitLead.ts
const endpoint = process.env.NEXT_PUBLIC_SUBMIT_ENDPOINT || '/api/lead';
```

---

### ADR-004: 日系簡約設計風格

**日期**: 2025-12-26

**狀態**: 已採用

**背景**:
需要選擇設計風格來建立品牌形象

**決策**:
採用日系簡約風格（MUJI / iOS 影響）

**理由**:
1. ✅ 專業、可信賴（適合 B2B）
2. ✅ 低飽和色彩，舒適易讀
3. ✅ 大圓角、留白，現代感
4. ✅ 日文字體（Noto Sans/Serif JP），質感優秀

**設計元素**:
- 色彩: 黑/灰/米白 (#1a1a1a, #fafaf8)
- 圓角: 16-24px
- 字體: Noto Sans JP (內文), Noto Serif JP (標題)
- 留白: 舒適的行距 (1.6-1.8) 和間距

---

### ADR-005: TypeScript 優先

**日期**: 2025-12-26

**狀態**: 已採用

**背景**:
需要選擇開發語言

**決策**:
使用 TypeScript (嚴格模式)

**理由**:
1. ✅ 類型安全，減少 runtime 錯誤
2. ✅ 更好的 IDE 支援（自動完成、重構）
3. ✅ 文檔化（Interface 即文檔）
4. ✅ 易於維護和擴展

**範例**:
```typescript
// lib/submitLead.ts
export interface LeadFormData {
  email: string;
  company_size?: string;
  role?: string;
  impersonation_type?: string;
}

export async function submitLead(data: LeadFormData): Promise<void> {
  // Type-safe implementation
}
```

---

## 擴展性考量

### 資料庫整合

**現狀**: 無資料庫（Fake Door 階段）

**未來擴展** (驗證成功後):

#### 選項 1: Cloudflare D1 (推薦)
```typescript
// app/api/lead/route.ts
import { D1Database } from '@cloudflare/workers-types';

export async function POST(request: Request) {
  const data = await request.json();

  // 插入到 D1
  await env.DB.prepare(
    'INSERT INTO leads (email, company_size, role, created_at) VALUES (?, ?, ?, ?)'
  ).bind(
    data.email,
    data.company_size,
    data.role,
    new Date().toISOString()
  ).run();

  return NextResponse.json({ success: true });
}
```

**優點**:
- ✅ Serverless SQL (SQLite)
- ✅ 與 Cloudflare Pages 整合
- ✅ 免費額度充足
- ✅ 低延遲（Edge）

#### 選項 2: Supabase
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  const data = await request.json();

  const { error } = await supabase
    .from('leads')
    .insert([data]);

  if (error) throw error;
  return NextResponse.json({ success: true });
}
```

**優點**:
- ✅ PostgreSQL (更強大)
- ✅ 內建 Auth、Storage
- ✅ 實時訂閱
- ✅ 免費額度慷慨

---

### Email 自動回覆

**未來擴展** (與 leads 互動):

```typescript
// app/api/lead/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();

  // 儲存 lead
  await saveLead(data);

  // 發送感謝 Email
  await resend.emails.send({
    from: 'TrustAlert <noreply@trustalert.com>',
    to: data.email,
    subject: '感謝您的關注！',
    html: `
      <h1>感謝您對 TrustAlert 的興趣！</h1>
      <p>我們會在產品上線時第一時間通知您。</p>
      <p>請問：您最希望這個監控系統幫您解決什麼問題？</p>
    `
  });

  return NextResponse.json({ success: true });
}
```

**推薦服務**:
- **Resend**: 現代化 API，開發者友善
- **SendGrid**: 成熟穩定，功能豐富
- **AWS SES**: 便宜，適合大量發送

---

### A/B 測試整合

**未來擴展** (優化轉換率):

```typescript
// lib/experiments.ts
import { track } from './analytics';

export function getVariant(experimentName: string): string {
  // 簡單的客戶端 A/B 測試
  const userId = getUserId(); // 從 cookie 或生成
  const hash = hashCode(userId + experimentName);
  const variant = hash % 2 === 0 ? 'A' : 'B';

  track('experiment_view', {
    experiment: experimentName,
    variant
  });

  return variant;
}

// components/Hero.tsx
const heroVariant = getVariant('hero_headline');

const headline = heroVariant === 'A'
  ? '當有人冒用您的品牌，客戶的信任正在流失'
  : '每次偽冒都在流失您的營收';
```

**推薦工具**:
- **Google Optimize**: 免費（2023 年已停止，建議其他方案）
- **Vercel Edge Config**: 簡單的 feature flags
- **PostHog**: 開源，功能齊全

---

### 多語言支援

**未來擴展** (拓展市場):

```typescript
// app/[locale]/page.tsx
import { getDictionary } from '@/lib/i18n';

export default async function Page({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getDictionary(locale);

  return (
    <main>
      <Hero headline={t.hero.headline} />
      {/* ... */}
    </main>
  );
}

// dictionaries/zh-TW.json
{
  "hero": {
    "headline": "當有人冒用您的品牌，客戶的信任正在流失"
  }
}

// dictionaries/en.json
{
  "hero": {
    "headline": "When someone impersonates your brand, customer trust is eroding"
  }
}
```

---

### 效能優化

**目前狀態**: 已優化

- ✅ 字體優化 (`next/font`)
- ✅ 靜態生成 (SSG)
- ✅ Tailwind CSS 自動清除未使用樣式

**未來優化**:

1. **圖片優化**:
```typescript
import Image from 'next/image';

<Image
  src="/images/screenshot.png"
  alt="Dashboard"
  width={800}
  height={600}
  priority // 首屏圖片
/>
```

2. **Code Splitting**:
```typescript
import dynamic from 'next/dynamic';

const LeadModal = dynamic(() => import('@/components/LeadModal'), {
  ssr: false // 只在客戶端載入
});
```

3. **Edge Runtime** (更快的回應):
```typescript
// app/api/lead/route.ts
export const runtime = 'edge';
```

---

## 安全性考量

### 目前實作

1. ✅ **Input 驗證**: Email 格式檢查
2. ✅ **HTTPS**: Vercel 自動提供
3. ✅ **CORS**: Next.js 預設保護

### 未來加強

1. **驗證碼** (防止機器人):
```typescript
// Cloudflare Turnstile (免費、隱私友善)
import { verify } from '@cloudflare/turnstile';

export async function POST(request: Request) {
  const { token, ...data } = await request.json();

  const result = await verify(token, process.env.TURNSTILE_SECRET);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 400 }
    );
  }

  // 繼續處理...
}
```

2. **Rate Limiting** (防止濫用):
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 每分鐘 5 次
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  // 繼續處理...
}
```

---

## 總結

這個架構設計遵循以下原則：

1. **簡單優先**: 避免過度工程，保持代碼清晰
2. **漸進增強**: 從簡單開始，按需擴展
3. **開發者體驗**: 優秀的 DX（TypeScript、Tailwind、Next.js）
4. **可維護性**: 清晰的分層、命名、文檔
5. **可測試性**: 模組化設計，易於單元測試

**下一步**:
- 📖 閱讀 [快速開始指南](./QUICKSTART.md)
- 🚀 部署到生產環境 ([部署指南](../deployment/DEPLOYMENT.md))
- 📊 設定 Analytics 並開始收集數據 ([產品洞察](../product/INSIGHTS.md))

---

**文檔版本**: 1.0.0
**最後更新**: 2026-01-04
**維護者**: Gogolook Team
