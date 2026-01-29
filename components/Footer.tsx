import { Eye } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-foreground/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/images/gogolook-logo.png"
              alt="Gogolook Logo"
              width={100}
              height={32}
              className="h-8 w-auto object-contain opacity-60"
            />
            <div className="border-l border-foreground/20 pl-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-foreground/40" />
                <span className="text-sm font-medium text-foreground/60">Watchmen Lite</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-foreground/50">
            <span>品牌偽冒監測訂閱服務</span>
          </div>
        </div>

        <div className="text-center space-y-4 pt-6 border-t border-foreground/5">
          <p className="text-xs text-foreground/40 max-w-2xl mx-auto leading-relaxed">
            Watchmen Lite 是 Gogolook 旗下的品牌偽冒監測服務。我們運用先進的監控技術，
            幫助創作者與企業主動發現並處理品牌偽冒問題。
          </p>

          <p className="text-xs text-foreground/30">
            © {new Date().getFullYear()} Gogolook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
