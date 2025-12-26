'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { submitLead, type LeadFormData } from '@/lib/submitLead';
import { track } from '@/lib/analytics';
import { useRouter } from 'next/navigation';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<LeadFormData>({
    email: '',
    company_size: '',
    role: '',
    impersonation_type: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      track('form_open');
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    track('form_submit', {
      company_size: formData.company_size,
      role: formData.role,
      has_impersonation_type: !!formData.impersonation_type,
    });

    try {
      const result = await submitLead(formData);

      if (result.success) {
        track('form_success');
        // Redirect to thank you page
        router.push('/thanks');
      } else {
        track('form_error', { message: result.message });
        setError(result.message);
      }
    } catch (err) {
      track('form_error', { message: 'unknown_error' });
      setError('發生未預期的錯誤，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-foreground/5 px-8 py-6 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-medium">加入候補名單</h3>
            <p className="text-sm text-foreground/60 mt-1">
              填寫基本資訊，搶先體驗
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-foreground/5 transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
          {/* Email - Required */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              電子郵件 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
              placeholder="your@email.com"
            />
          </div>

          {/* Company Size - Optional */}
          <div>
            <label htmlFor="company_size" className="block text-sm font-medium mb-2">
              公司規模
            </label>
            <select
              id="company_size"
              value={formData.company_size}
              onChange={(e) =>
                setFormData({ ...formData, company_size: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
            >
              <option value="">請選擇</option>
              <option value="1-10">1-10 人</option>
              <option value="11-50">11-50 人</option>
              <option value="51-200">51-200 人</option>
              <option value="200+">200+ 人</option>
            </select>
          </div>

          {/* Role - Optional */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-2">
              職位
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
            >
              <option value="">請選擇</option>
              <option value="Marketing">行銷</option>
              <option value="CS">客服</option>
              <option value="Founder">創辦人/高階主管</option>
              <option value="IT">IT/資安</option>
              <option value="Other">其他</option>
            </select>
          </div>

          {/* Impersonation Type - Optional */}
          {/* 🔍 Insight: Consider adding "是否曾被偽冒" checkbox
              to segment high-intent users who've already experienced pain.
              This could help prioritize outreach and validate PMF faster.
          */}
          <div>
            <label htmlFor="impersonation_type" className="block text-sm font-medium mb-2">
              最關注的冒用類型
            </label>
            <select
              id="impersonation_type"
              value={formData.impersonation_type}
              onChange={(e) =>
                setFormData({ ...formData, impersonation_type: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
            >
              <option value="">請選擇</option>
              <option value="social">社群平台詐騙帳號</option>
              <option value="website">假冒網站</option>
              <option value="customer_service">假客服</option>
              <option value="app">假冒 App</option>
              <option value="other">其他</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-foreground text-background rounded-2xl font-medium text-lg hover:opacity-90 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '提交中...' : '提交'}
          </button>

          <p className="text-xs text-foreground/50 text-center">
            提交後即表示您同意接收產品相關資訊
          </p>
        </form>
      </div>
    </div>
  );
}
