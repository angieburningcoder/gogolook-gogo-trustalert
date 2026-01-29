'use client';

import { ArrowRight, Zap, Shield, CheckCircle } from 'lucide-react';
import { track } from '@/lib/analytics';

interface CTASectionProps {
  onOpenForm: () => void;
}

const benefits = [
  '即時發現偽冒帳號',
  '自動風險分級判斷',
  '完整證據包下載',
  '彈性訂閱價格',
];

export default function CTASection({ onOpenForm }: CTASectionProps) {
  const handleCTA = () => {
    track('cta_click', { location: 'bottom_cta', type: 'primary' });
    onOpenForm();
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-primary-blue/5 to-primary-blue/10 rounded-3xl p-12 md:p-16 border border-primary-blue/20">
          <div className="inline-flex items-center gap-2 bg-white/80 text-primary-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            品牌保護刻不容緩
          </div>

          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            不要等到粉絲被騙才行動
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            立即檢測您的品牌被偽冒風險<br />
            獲得專屬監控方案建議
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-foreground/70">
                <CheckCircle className="w-4 h-4 text-primary-blue" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleCTA}
            className="group px-8 py-4 bg-primary-blue text-white rounded-full font-medium text-lg hover:bg-[#0047CC] transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            免費檢測我的風險
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="mt-6 text-sm text-foreground/50">
            只需 30 秒 · 立即獲得專屬報告
          </p>
        </div>
      </div>
    </section>
  );
}
