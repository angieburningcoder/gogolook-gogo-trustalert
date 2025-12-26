# 產品洞察與測試建議

這份文件整理了專案中所有標記 `🔍 Insight` 的關鍵測試點，幫助你優化 Fake Door 測試策略。

## 核心指標追蹤

### 漏斗分析

```
頁面瀏覽 (page_view)
    ↓
CTA 點擊 (cta_click)
    ↓
表單開啟 (form_open)
    ↓
表單提交 (form_submit)
    ↓
提交成功 (form_success)
```

### 關鍵指標定義

| 指標名稱 | 計算公式 | 建議門檻 | 說明 |
|---------|---------|---------|------|
| **CTR** | cta_click / page_view | > 10% | 有多少訪客對產品有興趣 |
| **Form Open Rate** | form_open / cta_click | > 80% | CTA 是否有效引導開啟表單 |
| **Form Submit Rate** | form_submit / form_open | > 60% | 表單是否太複雜或有阻礙 |
| **Completion Rate** | form_success / form_submit | > 95% | 技術層面是否順暢 |
| **Overall Conversion** | form_success / page_view | > 5% | 整體轉換效果 |

### Go/No-Go 決策框架

#### ✅ Go（值得繼續投入開發）

至少滿足以下**兩項**：

- [ ] Landing Page CTR > 10%
- [ ] Overall Conversion > 5%
- [ ] 累積 50+ 有效 email leads
- [ ] 至少 20% leads 表示「曾遭遇偽冒」（高意圖用戶）
- [ ] 平均每日新增 3+ leads（有機流量，非廣告）

#### ⚠️ Pivot（調整方向或定位）

如果出現以下狀況：

- [ ] CTR < 5%（訪客不感興趣）
- [ ] Form Submit Rate < 40%（表單或文案有問題）
- [ ] Bounce Rate > 70%（頁面內容不符預期）
- [ ] 大量 leads 但回信詢問「這是什麼？」（價值主張不清楚）

考慮調整：
- 重新定義目標受眾（中小企業 vs 大企業）
- 改變恐懼訴求（信任 vs 法律 vs 成本）
- 簡化表單或改變 CTA 文案

#### ❌ No-Go（暫停或放棄）

如果長期（2 週以上）出現：

- [ ] CTR < 3%
- [ ] Overall Conversion < 1%
- [ ] 即使投放廣告，每日新增 leads < 1
- [ ] Leads 質量差（大量無效 email、惡意輸入）

## 關鍵測試點

### 1. Hero 主張測試（影響 CTR）

**位置**：`components/Hero.tsx:27`

**當前版本**：
```
當有人冒用您的品牌
客戶的信任正在流失
```

**測試變數**：

| 版本 | 主張 | 訴求重點 | 適合對象 |
|-----|------|---------|---------|
| A（現行） | 客戶信任正在流失 | 信任/聲譽 | B2C 品牌、服務業 |
| B | 每次偽冒都在流失營收 | 成本/損失 | 電商、訂閱制服務 |
| C | 品牌偽冒可能觸犯法律責任 | 法律/風險 | 金融、醫療、上市公司 |

**如何測試**：
- 使用 Google Optimize 或手動 A/B test（每週輪換）
- 追蹤各版本的 CTR
- 樣本數建議：每版本至少 100 page views

**決策標準**：
- 選擇 CTR 最高的版本作為主要文案
- 如果差異 < 2%，選擇最符合品牌調性的版本

---

### 2. CTA 文案測試（影響承諾門檻）

**位置**：`components/Hero.tsx:44`

**當前版本**：
```
加入企業冒名監控候補
```

**測試變數**：

| 版本 | 文案 | 承諾程度 | 預期轉換率 |
|-----|------|---------|-----------|
| A（現行） | 加入企業冒名監控候補 | 低（waitlist） | 中高 |
| B | 立即啟用監控服務 | 高（immediate） | 低 |
| C | 免費試用 30 天 | 中（trial） | 高 |
| D | 預約專人說明 | 中（demo） | 中 |

**洞察**：
- **低承諾** → 高轉換率，但 lead 質量可能較低
- **高承諾** → 低轉換率，但 lead 質量高（真正有需求）

**建議**：
- Fake Door 階段用 A（候補）收集最多 leads
- 後續 Email 追蹤時，篩選出高意圖用戶

---

### 3. 表單欄位優化（影響 Submit Rate）

**位置**：`components/LeadModal.tsx:96`

**當前欄位**：
- ✅ Email（必填）
- ✅ 公司規模（選填）
- ✅ 職位（選填）
- ✅ 關注的冒用類型（選填）

**建議新增**：

#### 欄位 A：是否曾被偽冒

```tsx
<div>
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={formData.has_been_impersonated}
      onChange={(e) =>
        setFormData({ ...formData, has_been_impersonated: e.target.checked })
      }
    />
    <span>我們曾經遭遇品牌偽冒問題</span>
  </label>
</div>
```

**洞察價值**：
- 區分「有痛點」vs「只是好奇」
- 優先聯繫勾選的 leads（轉換率可能高 3-5 倍）
- 用於驗證市場痛點真實性

#### 欄位 B：預期預算（選填，進階）

如果你想進一步驗證付費意願：

```tsx
<select>
  <option>不確定</option>
  <option>每月 $1000 以下</option>
  <option>每月 $1000-$5000</option>
  <option>每月 $5000-$10000</option>
  <option>每月 $10000 以上</option>
</select>
```

**注意**：可能降低 Submit Rate，建議先不加，等累積 50+ leads 再測試。

---

### 4. Secondary CTA 測試（「看看如何運作」）

**位置**：`components/Hero.tsx:51`

**當前行為**：滾動到功能區塊

**替代方案**：

| 版本 | 行為 | 優點 | 缺點 |
|-----|------|------|------|
| A（現行） | 滾動到 #features | 簡單、留在頁面 | 沒有展示真實產品 |
| B | 開啟 demo 影片 modal | 視覺化展示 | 需要製作影片 |
| C | 開啟「功能 preview」圖片輪播 | 視覺化、成本低 | 需要設計 mockup |
| D | 直接開啟表單（同 Primary CTA） | 最大化轉換 | 失去「低承諾」選項 |

**建議**：
- 初期用 A（現行）
- 如果 Secondary CTA 點擊率高（> 5%），考慮加入視覺化內容（B 或 C）

---

### 5. Bottom CTA 轉換分析

**位置**：`components/CTASection.tsx:20`

**追蹤重點**：

比較兩個 CTA 的轉換率：

```javascript
// Hero CTA
track('cta_click', { location: 'hero', type: 'primary' });

// Bottom CTA
track('cta_click', { location: 'bottom_cta', type: 'primary' });
```

**常見模式**：

| 模式 | Hero CTR | Bottom CTR | 解讀 |
|-----|----------|------------|------|
| 衝動型 | 高 (15%+) | 低 (3%) | 訪客快速決定，無需看完整頁面 |
| 理性型 | 低 (5%) | 高 (10%) | 訪客需要完整資訊才決定 |
| 平衡型 | 中 (10%) | 中 (7%) | 兩階段都有轉換 |

**優化建議**：
- **衝動型**：Hero 是關鍵，強化主標、視覺吸引力
- **理性型**：內容是關鍵，強化痛點描述、功能說明、信任指標
- **平衡型**：當前策略有效，持續優化文案

---

## 分析工具設定

### 推薦工具組合

#### 免費方案
- **Vercel Analytics**：基本流量、Conversion
- **Google Analytics 4**：詳細用戶行為、來源分析
- **Google Tag Manager**（搭配 dataLayer）：自訂事件追蹤

#### 進階方案（驗證成功後再考慮）
- **Mixpanel** / **Amplitude**：Funnel 分析、Cohort 分析
- **Hotjar**：Heatmap、Session Recording（看使用者真實操作）
- **PostHog**：開源替代方案，自架或雲端

### 必須追蹤的事件

確保以下事件都有正確觸發：

```javascript
// ✅ 已實作
track('page_view', { page: 'landing' });
track('cta_click', { location: 'hero', type: 'primary' });
track('form_open');
track('form_submit', { company_size, role, has_impersonation_type });
track('form_success');
track('form_error', { message });

// 🔧 建議新增
track('scroll_depth', { depth: '25%' | '50%' | '75%' | '100%' });
track('time_on_page', { seconds: 30 | 60 | 120 });
track('exit_intent'); // 滑鼠移出視窗時
```

---

## 週報範本

建議每週檢視以下數據：

### 📊 本週數據（YYYY/MM/DD - YYYY/MM/DD）

| 指標 | 本週 | 上週 | 變化 |
|-----|------|------|------|
| Page Views | - | - | - |
| Unique Visitors | - | - | - |
| CTA Clicks | - | - | - |
| CTR | - | - | - |
| Form Opens | - | - | - |
| Form Submits | - | - | - |
| Form Success | - | - | - |
| Overall Conversion | - | - | - |

### 🎯 Lead 質量分析

- 總 Leads：-
- 有效 Email：-（排除 test@, 明顯假 email）
- 公司規模分佈：
  - 1-10 人：-
  - 11-50 人：-
  - 51-200 人：-
  - 200+ 人：-
- 職位分佈：-
- 曾被偽冒：-（如有加此欄位）

### 💡 本週洞察

- （例如：發現 75% leads 來自社群媒體，應加強該管道）
- （例如：200+ 人公司的 Conversion 是整體的 2 倍，應調整目標客群）

### 🚀 下週行動

- [ ] （例如：測試新的 Hero 主張版本 B）
- [ ] （例如：發送 Email 給本週 leads，詢問詳細需求）

---

## 進階：質化研究

數據之外，也要做質化研究：

### 1. User Interview（使用者訪談）

對象：提交表單的前 10-20 位 leads

問題：
- 「是什麼讓您決定留下 Email？」
- 「您目前如何處理品牌偽冒問題？」
- 「如果這個產品上線,您願意付多少錢？」
- 「您覺得哪個功能最重要？」

### 2. Email 回信率

發送感謝 Email 時，加入一個問題：
> 「您最希望這個監控系統幫您解決什麼問題？」

回信率 > 10% → 代表 leads 質量高、真實需求強

### 3. 競品分析

問 leads：
- 「您有試過其他類似服務嗎？」
- 「為什麼沒有繼續使用？」

找出現有解決方案的不足，作為產品差異化方向。

---

## 總結：90 天驗證計畫

### Week 1-2：Launch & Baseline
- [ ] 部署上線
- [ ] 設定所有追蹤
- [ ] 取得前 20-30 leads
- [ ] 建立 baseline metrics

### Week 3-4：Optimize Conversion
- [ ] 測試不同 Hero 主張（A/B test）
- [ ] 測試不同 CTA 文案
- [ ] 優化表單欄位
- [ ] 目標：Conversion +50%

### Week 5-6：Qualify Leads
- [ ] Email 訪談前 20 位 leads
- [ ] 加入「是否曾被偽冒」欄位
- [ ] 分析高質量 vs 低質量 leads 差異
- [ ] 調整目標客群（如果需要）

### Week 7-8：Scale or Pivot
- [ ] 如果指標達標 → 開始寫產品 spec
- [ ] 如果指標不達標 → Pivot 或放棄

### Week 9-12：Pre-launch
- [ ] 確認前 50 位高意圖 leads
- [ ] 開發 MVP
- [ ] Beta 測試邀請

---

**祝測試順利！記得數據會說話，相信數據勝過相信直覺。** 📈
