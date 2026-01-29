import { AlertTriangle, TrendingUp, Banknote, Users } from 'lucide-react';

const stats = [
  { number: '73%', label: '的品牌曾被偽冒詐騙', color: 'text-red-500' },
  { number: '2.5x', label: '偽冒帳號年增長率', color: 'text-yellow-500' },
  { number: '48hr', label: '平均發現偽冒所需時間', color: 'text-orange-500' },
];

const painPoints = [
  {
    icon: AlertTriangle,
    title: '粉絲被騙，品牌背鍋',
    description: '詐騙集團以您的名義詐騙粉絲，受害者第一時間怪罪的是您，品牌聲譽瞬間崩塌。',
    impact: '聲譽損失',
  },
  {
    icon: Banknote,
    title: '營收被竊取',
    description: '假帳號、假官網攔截您的潛在客戶，用您辛苦建立的品牌信任為詐騙變現。',
    impact: '財務損失',
  },
  {
    icon: TrendingUp,
    title: '問題持續惡化',
    description: '沒有系統化監控，偽冒帳號越來越多，每次處理都像打地鼠，永遠處於被動。',
    impact: '資源耗損',
  },
  {
    icon: Users,
    title: '粉絲信任流失',
    description: '當粉絲無法分辨真假，他們會選擇不再相信任何一個，包括真正的您。',
    impact: '用戶流失',
  },
];

export default function PainPoints() {
  return (
    <section className="py-32 px-6 bg-bg-blue-light/20">
      <div className="max-w-5xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.number}</p>
              <p className="text-sm text-foreground/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">
          品牌偽冒正在<span className="text-red-500">傷害</span>您
        </h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          這些問題您可能正在經歷，或即將面對
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 shadow-sm border border-foreground/[0.08] hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif text-lg">
                        {point.title}
                      </h3>
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                        {point.impact}
                      </span>
                    </div>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {point.description}
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
