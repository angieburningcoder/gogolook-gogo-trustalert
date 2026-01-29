'use client';

import Image from 'next/image';
import { Eye } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-foreground/[0.08]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/gogolook-logo.png"
              alt="Gogolook Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
          <div className="border-l border-foreground/20 pl-3">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary-blue" />
              <h1 className="font-serif text-lg font-medium">Watchmen Lite</h1>
            </div>
            <p className="text-xs text-foreground/60">品牌偽冒監測訂閱服務</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-primary-blue/10 text-primary-blue px-3 py-1 rounded-full font-medium">
            SaaS 訂閱制
          </span>
        </div>
      </div>
    </header>
  );
}
