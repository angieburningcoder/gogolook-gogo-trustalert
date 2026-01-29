'use client';

import { useEffect } from 'react';
import { CheckCircle, ArrowLeft, Eye, Mail, Calendar, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
          <div className="w-20 h-20 rounded-full bg-primary-blue/10 border-2 border-primary-blue/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary-blue" />
          </div>
        </div>

        {/* Main Message */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Eye className="w-6 h-6 text-primary-blue" />
          <h1 className="font-serif text-4xl md:text-5xl font-medium">
            感謝您的信任
          </h1>
        </div>

        <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
          您的風險檢測報告已完成！
          <br />
          我們的專員會盡快與您聯繫，為您安排專屬的 Watchmen Lite 方案。
        </p>

        {/* What's Next */}
        <div className="bg-primary-blue/5 rounded-2xl p-8 mb-8 text-left border border-primary-blue/10">
          <h2 className="font-serif text-xl font-medium mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-blue" />
            接下來會發生什麼？
          </h2>
          <ul className="space-y-4 text-foreground/70">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-blue text-white text-sm flex items-center justify-center shrink-0 mt-0.5">1</div>
              <div>
                <span className="font-medium text-foreground">Email 確認</span>
                <p className="text-sm mt-0.5">我們會透過 Email 寄送您的風險報告摘要</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-blue text-white text-sm flex items-center justify-center shrink-0 mt-0.5">2</div>
              <div>
                <span className="font-medium text-foreground">專員聯繫</span>
                <p className="text-sm mt-0.5">1-2 個工作日內，專員會與您聯繫討論方案細節</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-blue text-white text-sm flex items-center justify-center shrink-0 mt-0.5">3</div>
              <div>
                <span className="font-medium text-foreground">開始監控</span>
                <p className="text-sm mt-0.5">確認方案後，即可開始享受 Watchmen Lite 的品牌保護服務</p>
              </div>
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

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-foreground/5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/images/gogolook-logo.png"
              alt="Gogolook Logo"
              width={80}
              height={26}
              className="h-6 w-auto object-contain opacity-50"
            />
            <span className="text-xs text-foreground/30">×</span>
            <span className="text-sm text-foreground/50 font-medium">Watchmen Lite</span>
          </div>
          <p className="text-sm text-foreground/50">
            有任何問題？歡迎直接回覆我們的 Email
          </p>
        </div>
      </div>
    </main>
  );
}
