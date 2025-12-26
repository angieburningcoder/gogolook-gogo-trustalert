'use client';

import Image from 'next/image';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-foreground/5">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/gogolook-logo.png"
              alt="Gogo! TrustAlert Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="font-serif text-lg font-medium">Gogo! TrustAlert</h1>
            <p className="text-xs text-foreground/60">守護品牌聲譽的第一道防線</p>
          </div>
        </div>

        {/* Optional: Language toggle or info button placeholder */}
        <button
          className="p-2 rounded-xl hover:bg-foreground/5 transition-colors"
          aria-label="更多資訊"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
