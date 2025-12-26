export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-foreground/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4">
          <p className="text-sm text-foreground/60">
            ⚠️ 早期體驗方案聲明
          </p>
          <p className="text-sm text-foreground/50 max-w-2xl mx-auto leading-relaxed">
            本頁面為產品需求驗證（Fake Door Testing）。
            目前正在收集使用者意見，以確保我們開發出真正符合企業需求的產品。
            您的關注將幫助我們優先開發最重要的功能。
          </p>

          <div className="pt-6 border-t border-foreground/5 mt-8">
            <p className="text-xs text-foreground/40">
              © {new Date().getFullYear()} 企業偽冒監控. 保留所有權利。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
