'use client';

import { ArrowRight } from 'lucide-react';
import { track } from '@/lib/analytics';

interface CTASectionProps {
  onOpenForm: () => void;
}

export default function CTASection({ onOpenForm }: CTASectionProps) {
  const handleCTA = () => {
    track('cta_click', { location: 'bottom_cta', type: 'primary' });
    onOpenForm();
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-bg-blue-light/30 rounded-3xl p-12 md:p-16 border border-primary-blue/10">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            不要等到客戶投訴才發現
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            立即加入早期體驗方案,搶先使用企業偽冒監控系統
          </p>

          {/* 🔍 Insight: This is the second chance to convert.
              Monitor if users who didn't click Hero CTA click here.
              Consider A/B testing different fear angles or incentives.
          */}
          <button
            onClick={handleCTA}
            className="group px-8 py-4 bg-primary-blue text-white rounded-full font-medium text-lg hover:bg-[#0047CC] transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2"
          >
            加入候補名單
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="mt-6 text-sm text-foreground/50">
            30 秒完成登記 · 無需信用卡
          </p>
        </div>
      </div>
    </section>
  );
}
