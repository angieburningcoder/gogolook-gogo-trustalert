import { Search, Clock, HelpCircle } from 'lucide-react';

const painPoints = [
  {
    icon: Search,
    title: '發現太慢',
    description: '靠人工搜尋品牌名稱、定期檢查，往往是客戶投訴後才知道被冒用。',
  },
  {
    icon: Clock,
    title: '處理太慢',
    description: '不知道該向誰檢舉、如何蒐證，等到處理完畢，損失已經造成。',
  },
  {
    icon: HelpCircle,
    title: '無法預防',
    description: '缺乏系統化監控，每次都是被動應對，無法阻止下一次發生。',
  },
];

export default function PainPoints() {
  return (
    <section className="py-32 px-6 bg-bg-blue-light/20">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">
          品牌冒用的三大困境
        </h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          您的團隊可能正在經歷這些挑戰
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 shadow-sm border border-foreground/[0.08] hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary-blue" />
                </div>
                <h3 className="font-serif text-xl mb-3">
                  {point.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
