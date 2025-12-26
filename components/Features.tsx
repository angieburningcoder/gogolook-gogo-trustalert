import { Globe, Smartphone, Shield } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: '多維度監控來源',
    items: [
      '假冒網站與釣魚頁面',
      '社群平台詐騙帳號',
      'App Store 假冒應用程式',
      '論壇與新聞留言區',
    ],
    note: '涵蓋 90% 以上的冒用場景',
  },
  {
    icon: Smartphone,
    title: '多管道即時通知',
    items: [
      'Email 詳細報告',
      'Slack / Teams 整合',
      'LINE 官方帳號推播',
      'Webhook 自訂串接',
    ],
    note: '選擇最適合團隊的通知方式',
  },
  {
    icon: Shield,
    title: '處理行動指引',
    items: [
      '平台檢舉流程 SOP',
      '蒐證與截圖建議',
      '法律諮詢資源連結',
      '案件追蹤與紀錄',
    ],
    note: '不只發現問題，更協助解決',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-foreground/[0.02]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-center mb-4">
          功能特色
        </h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          專為企業品牌保護設計的完整解決方案
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 shadow-sm border border-foreground/5"
              >
                <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-xl font-medium mb-4">
                  {feature.title}
                </h3>

                <ul className="space-y-2.5 mb-6">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-foreground/70">
                      <span className="text-foreground/40 mt-1">·</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-foreground/50 pt-4 border-t border-foreground/5">
                  {feature.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
