'use client';

import { ArrowRight, Shield, Zap } from 'lucide-react';
import { track } from '@/lib/analytics';

interface HeroProps {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: HeroProps) {
  const handlePrimaryCTA = () => {
    track('cta_click', { location: 'hero', type: 'primary' });
    onOpenForm();
  };

  const handleSecondaryCTA = () => {
    track('cta_click', { location: 'hero', type: 'secondary' });
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-40 pb-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Shield className="w-4 h-4" />
          每天有超過 1000+ 個品牌被偽冒
        </div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-balance">
          你的品牌<span className="text-red-500">正在被偽冒</span>
          <br />
          <span className="text-foreground/60">你知道嗎？</span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          Watchmen Lite 幫你 24/7 監控品牌偽冒帳號
          <br />
          <span className="text-primary-blue font-medium">即時發現 → 風險分級 → 證據打包 → 協助處理</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handlePrimaryCTA}
            className="group px-8 py-4 bg-primary-blue text-white rounded-full font-medium text-lg hover:bg-[#0047CC] transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            免費檢測我的被偽冒風險
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleSecondaryCTA}
            className="px-8 py-4 border-2 border-primary-blue text-primary-blue rounded-full font-medium text-lg hover:bg-primary-blue/5 transition-colors flex items-center gap-2"
          >
            了解服務內容
          </button>
        </div>

        <p className="mt-8 text-sm text-foreground/50">
          只需 30 秒回答幾個問題 · 立即獲得專屬風險報告
        </p>
      </div>
    </section>
  );
}
