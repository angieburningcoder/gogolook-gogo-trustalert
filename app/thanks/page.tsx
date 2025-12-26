'use client';

import { useEffect } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { trackPageView } from '@/lib/analytics';

export default function ThanksPage() {
  useEffect(() => {
    trackPageView('thanks');
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="max-w-2xl text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
          感謝您的關注
        </h1>

        <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
          我們已收到您的登記。
          <br />
          我們會優先通知您產品的最新進展與早期體驗資格。
        </p>

        {/* What's Next */}
        <div className="bg-foreground/[0.02] rounded-2xl p-8 mb-8 text-left border border-foreground/5">
          <h2 className="font-serif text-xl font-medium mb-4">接下來會發生什麼？</h2>
          <ul className="space-y-3 text-foreground/70">
            <li className="flex items-start gap-3">
              <span className="text-foreground/40">1.</span>
              <span>我們會透過 Email 確認您的登記資訊</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-foreground/40">2.</span>
              <span>開放早期體驗時，您會優先收到邀請通知</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-foreground/40">3.</span>
              <span>期間若有任何問題，歡迎直接回覆我們的 Email</span>
            </li>
          </ul>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首頁
        </Link>

        {/* Optional: Share buttons or additional CTAs */}
        <div className="mt-12 pt-8 border-t border-foreground/5">
          <p className="text-sm text-foreground/50">
            想幫助更多企業保護品牌聲譽？
            <br />
            歡迎分享給有需要的朋友或同事
          </p>
        </div>
      </div>
    </main>
  );
}
