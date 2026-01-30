import { ListChecks, Lightbulb, FileText, Bell, HeartHandshake, TrendingDown } from 'lucide-react';

const values = [
  {
    icon: ListChecks,
    title: '疑似偽冒清單',
    description: '包含平台來源與具體連結，精準掌握每一個可能的偽冒威脅。',
    highlight: '不只告訴你有問題，還告訴你問題在哪',
  },
  {
    icon: Lightbulb,
    title: '風險分級 (H/M/L)',
    description: '專業自動化判斷每個偽冒帳號的風險等級，客戶無需具備資安背景也能快速了解威脅程度。',
    highlight: '高、中、低三級分類，一目瞭然',
  },
  {
    icon: FileText,
    title: 'Evidence Lite 證據包',
    description: '提供素材截圖、CTA 內容、首次出現時間等完整證據，加速後續處理流程。',
    highlight: '完整蒐證，省去您手動截圖的時間',
  },
  {
    icon: Bell,
    title: '週報與即時通知',
    description: '高風險事件即時掌握，定期週報讓您持續了解監控狀態，數據交付感透明且有感。',
    highlight: '重要事件即時推播，不會漏接',
  },
  {
    icon: TrendingDown,
    title: '不作為成本分析',
    description: '評估偽冒期間的信任成本（負評增加）、金錢成本（廣告效益下降、客服量上升）、以及未來修復成本。',
    highlight: '現在省下的處理成本，未來會變成數倍的修復成本',
  },
  {
    icon: HeartHandshake,
    title: '協助處理 SOP',
    description: '半代管服務，提供檢舉流程 SOP 與專人協助，省事是提升 LTV 的核心引擎。',
    highlight: 'Plus 方案專屬服務',
    isPlusFeature: true,
  },
];

export default function ValueProps() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary-blue font-medium mb-3">產品價值主張</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            賣的不是「監控」
          </h2>
          <p className="text-xl text-foreground/70">
            而是「<span className="text-primary-blue font-medium">可採取行動的成果</span>」
          </p>
        </div>

        <div className="space-y-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 border border-foreground/[0.08] hover:border-primary-blue/20 transition-all group"
              >
                <div className="flex gap-5 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-blue/10 group-hover:bg-primary-blue/20 flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6 text-primary-blue" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif text-xl text-primary-blue">
                        {value.title}
                      </h3>
                      {'isPlusFeature' in value && value.isPlusFeature && (
                        <span className="text-xs bg-foreground/10 text-foreground/70 px-2 py-0.5 rounded-full">
                          Plus 方案
                        </span>
                      )}
                    </div>
                    <p className="text-foreground/70 leading-relaxed mb-2">
                      {value.description}
                    </p>
                    <p className="text-sm text-foreground/50 border-l-2 border-primary-blue/30 pl-3">
                      {value.highlight}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
