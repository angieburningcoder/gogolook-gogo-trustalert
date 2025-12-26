import { Bell, Zap, FileCheck } from 'lucide-react';

const values = [
  {
    icon: Zap,
    title: '即時監控',
    description: '24/7 自動掃描網路上的品牌冒用行為，包含網站、社群、App 等多種來源。',
    highlight: '不漏接任何一次冒用',
  },
  {
    icon: Bell,
    title: '即時通知',
    description: '發現可疑冒用時立即通知，透過 Email、Slack 或 LINE，讓您第一時間掌握狀況。',
    highlight: '最快 5 分鐘內收到警示',
  },
  {
    icon: FileCheck,
    title: '處理建議',
    description: '不只告訴您「被冒用了」，更提供檢舉流程、蒐證建議、法律資源等下一步行動指引。',
    highlight: '從發現到處理，一站完成',
  },
];

export default function ValueProps() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-center mb-4">
          一套完整的品牌保護系統
        </h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          從發現、通知到處理，讓您專注本業
        </p>

        <div className="space-y-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 border border-foreground/5 hover:border-foreground/10 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 flex items-center justify-center transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-medium mb-3">
                      {value.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed mb-3">
                      {value.description}
                    </p>
                    <p className="text-sm font-medium text-foreground/80 border-l-2 border-foreground/20 pl-4">
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
