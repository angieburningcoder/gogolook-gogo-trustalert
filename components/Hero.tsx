'use client';

import { ArrowRight, PlayCircle } from 'lucide-react';
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
    // Scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* 🔍 Insight: Test which fear resonates most:
            - Trust: "客戶信任" (current)
            - Cost: "營收損失"
            - Legal: "法律風險"
        */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 text-balance">
          當有人冒用您的品牌
          <br />
          <span className="text-foreground/60">客戶的信任正在流失</span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          偽冒網站、假客服、詐騙社群帳號⋯⋯
          <br />
          不用再靠人工搜尋，讓系統即時發現、即時通知、即時處理。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* 🔍 Insight: Test CTA copy urgency:
              - "加入企業冒名監控候補" (waitlist, lower commitment)
              - "立即啟用監控服務" (immediate, higher urgency)
          */}
          <button
            onClick={handlePrimaryCTA}
            className="group px-8 py-4 bg-foreground text-background rounded-2xl font-medium text-lg hover:opacity-90 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            加入企業冒名監控候補
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleSecondaryCTA}
            className="px-8 py-4 border border-foreground/20 rounded-2xl font-medium text-lg hover:bg-foreground/5 transition-colors flex items-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            看看如何運作
          </button>
        </div>

        {/* Trust indicator */}
        <p className="mt-8 text-sm text-foreground/50">
          早期體驗方案 · 限量開放中
        </p>
      </div>
    </section>
  );
}
