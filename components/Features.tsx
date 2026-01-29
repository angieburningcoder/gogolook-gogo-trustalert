import { Eye, Bell, FileCheck, Instagram, Youtube, Facebook, Globe, MessageCircle, Twitter } from 'lucide-react';

const monitoringPlatforms = [
  { icon: Instagram, name: 'Instagram' },
  { icon: Facebook, name: 'Facebook' },
  { icon: Youtube, name: 'YouTube' },
  { icon: Twitter, name: 'X (Twitter)' },
  { icon: Globe, name: 'TikTok' },
  { icon: MessageCircle, name: 'LINE' },
  { icon: Globe, name: 'Threads' },
  { icon: Globe, name: '官方網站' },
];

const features = [
  {
    icon: Eye,
    title: '全平台偽冒監控',
    description: '24/7 自動掃描主流社群平台，發現任何可疑的偽冒帳號、假冒網站與釣魚頁面。',
    items: [
      '社群平台假帳號偵測',
      '偽冒網站與釣魚頁面',
      '假客服帳號監控',
      '品牌名稱變體追蹤',
    ],
  },
  {
    icon: Bell,
    title: '智能通知系統',
    description: '根據風險等級智能推播，確保您不會錯過任何重要警示，同時不被低風險訊息打擾。',
    items: [
      '高風險即時推播',
      '週報定期彙整',
      'Email 詳細報告',
      '自訂通知偏好',
    ],
  },
  {
    icon: FileCheck,
    title: '證據包與處理 SOP',
    description: '自動保存證據截圖、記錄首次出現時間，並提供檢舉流程指引，讓後續處理更有效率。',
    items: [
      '自動截圖存證',
      '首次發現時間記錄',
      '平台檢舉 SOP 指引',
      '案件進度追蹤',
    ],
  },
];

export default function Features() {
  return (
    <section id="features" className="py-32 px-6 bg-bg-blue-light/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            SaaS 訂閱制監控服務
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Watchmen Lite 是 Gogolook 推出的品牌偽冒監測訂閱服務<br />
            以彈性定價、自助式操作，為創作者與中小企業提供專業級保護
          </p>
        </div>

        {/* Monitoring Platforms */}
        <div className="mb-16">
          <p className="text-center text-sm text-foreground/60 mb-6">支援監控平台</p>
          <div className="flex flex-wrap justify-center gap-4">
            {monitoringPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-foreground/[0.08]"
                >
                  <Icon className="w-4 h-4 text-primary-blue" />
                  <span className="text-sm">{platform.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 shadow-sm border border-foreground/[0.08] hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary-blue" />
                </div>

                <h3 className="font-serif text-xl mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-foreground/60 mb-4">
                  {feature.description}
                </p>

                <ul className="space-y-2.5">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-foreground/70">
                      <span className="text-primary-blue mt-1">✓</span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
