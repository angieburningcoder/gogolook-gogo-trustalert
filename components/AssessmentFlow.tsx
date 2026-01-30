'use client';

import { useState, useEffect } from 'react';
import {
  X, ArrowRight, ArrowLeft, Building2, User, Briefcase,
  Instagram, Youtube, Facebook, Twitter, Globe, MessageCircle,
  BadgeCheck, Users, AlertTriangle, Shield, Eye, FileText,
  Bell, CheckCircle, Sparkles, Calculator, ChevronDown, ChevronUp,
  Zap, TrendingUp, Clock
} from 'lucide-react';
import { track } from '@/lib/analytics';

interface AssessmentFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  // Step 1: Customer type
  customerType: 'individual' | 'business' | '';

  // Step 2: Identity info
  chineseName: string;
  englishName: string;

  // Step 3: Industry/Occupation
  industry: string;

  // Step 4: Social platforms
  platforms: string[];

  // Step 5: Brand info
  brandCount: number;
  brandNames: string[];
  hasVerification: boolean;
  maxFollowers: string;

  // Contact
  email: string;
}

// Risk calculation logic
function calculateRiskScore(data: FormData): number {
  let score = 0;

  // Customer type risk
  if (data.customerType === 'individual') score += 20;
  if (data.customerType === 'business') score += 15;

  // Platform risk (more platforms = higher exposure)
  score += Math.min(data.platforms.length * 8, 30);

  // Brand count risk
  score += Math.min(data.brandCount * 5, 15);

  // Verification status (no verification = higher risk)
  if (!data.hasVerification) score += 15;

  // Follower count risk
  const followers = parseInt(data.maxFollowers) || 0;
  if (followers >= 100000) score += 25;
  else if (followers >= 10000) score += 20;
  else if (followers >= 1000) score += 10;
  else score += 5;

  return Math.min(score, 100);
}

// Generate suggested keywords based on user input
function generateKeywords(data: FormData): string[] {
  const keywords: string[] = [];

  // Add name variations
  if (data.chineseName) {
    keywords.push(data.chineseName);
    keywords.push(`${data.chineseName}官方`);
    keywords.push(`${data.chineseName}客服`);
  }

  if (data.englishName) {
    keywords.push(data.englishName);
    keywords.push(data.englishName.toLowerCase());
    keywords.push(`${data.englishName}_official`);
    keywords.push(`${data.englishName.toLowerCase()}_tw`);
  }

  // Add brand names
  data.brandNames.forEach(brand => {
    if (brand) {
      keywords.push(brand);
      keywords.push(`${brand}官方`);
      keywords.push(`${brand}_official`);
    }
  });

  // Add industry-specific keywords
  const industryKeywords: { [key: string]: string[] } = {
    'kol': ['代言', '業配', '合作洽詢'],
    'ecommerce': ['官方商城', '客服', '購物'],
    'finance': ['投資', '理財', '顧問'],
    'education': ['課程', '講師', '教學'],
    'entertainment': ['經紀', '演出', '粉絲團'],
    'beauty': ['美妝', '保養', '代購'],
    'food': ['美食', '餐廳', '訂位'],
    'tech': ['科技', '服務', '技術支援'],
  };

  if (data.industry && industryKeywords[data.industry]) {
    const nameBase = data.chineseName || data.englishName || '';
    industryKeywords[data.industry].forEach(suffix => {
      if (nameBase) keywords.push(`${nameBase}${suffix}`);
    });
  }

  return [...new Set(keywords)].slice(0, 15);
}

// Pricing calculation
function calculatePrice(identityCount: number, keywordCount: number): { monthly: number; yearly: number } {
  const basePrice = 990; // Base monthly price in TWD
  const identityPrice = 299; // Per identity
  const keywordPrice = 99; // Per keyword

  const monthly = basePrice + (identityCount * identityPrice) + (keywordCount * keywordPrice);
  const yearly = monthly * 10; // 2 months free

  return { monthly, yearly };
}

// Impact cost calculation (不作為成本計算)
function calculateImpactCost(data: FormData): {
  trustCost: { dmIncrease: string; negativeRatio: string };
  moneyCost: { cpmIncrease: string; conversionDrop: string };
  recoveryCost: { months: string };
} {
  const followers = parseInt(data.maxFollowers) || 0;
  const platformCount = data.platforms.length;
  const hasVerification = data.hasVerification;
  const isHighRiskIndustry = ['finance', 'ecommerce', 'kol'].includes(data.industry);

  // 信任成本 - 根據粉絲數
  let dmIncrease: string;
  let negativeRatio: string;
  if (followers >= 100000) {
    dmIncrease = '50-100 則/週';
    negativeRatio = '15-25%';
  } else if (followers >= 10000) {
    dmIncrease = '20-50 則/週';
    negativeRatio = '10-20%';
  } else {
    dmIncrease = '5-15 則/週';
    negativeRatio = '5-10%';
  }

  // 金錢成本 - 根據產業、認證狀態
  let cpmIncrease: string;
  let conversionDrop: string;
  if (isHighRiskIndustry && !hasVerification) {
    cpmIncrease = '25-40%';
    conversionDrop = '20-35%';
  } else if (isHighRiskIndustry || !hasVerification) {
    cpmIncrease = '20-35%';
    conversionDrop = '15-25%';
  } else {
    cpmIncrease = '15-25%';
    conversionDrop = '10-20%';
  }

  // 修復成本 - 根據平台數和品牌數
  let months: string;
  if (platformCount >= 5 || data.brandCount >= 3) {
    months = '6-12 個月';
  } else if (platformCount >= 3) {
    months = '4-8 個月';
  } else {
    months = '3-6 個月';
  }

  return {
    trustCost: { dmIncrease, negativeRatio },
    moneyCost: { cpmIncrease, conversionDrop },
    recoveryCost: { months },
  };
}

const STEPS = ['客戶類型', '身份資訊', '產業領域', '社群平台', '品牌資訊', '風險報告', '方案試算'];

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'youtube', name: 'YouTube', icon: Youtube },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'twitter', name: 'X (Twitter)', icon: Twitter },
  { id: 'tiktok', name: 'TikTok', icon: Globe },
  { id: 'line', name: 'LINE', icon: MessageCircle },
  { id: 'threads', name: 'Threads', icon: MessageCircle },
  { id: 'website', name: '官方網站', icon: Globe },
];

const INDUSTRIES = [
  { id: 'kol', name: 'KOL / 網紅 / 創作者' },
  { id: 'ecommerce', name: '電商 / 品牌商' },
  { id: 'finance', name: '金融 / 投資' },
  { id: 'education', name: '教育 / 知識付費' },
  { id: 'entertainment', name: '娛樂 / 藝人經紀' },
  { id: 'beauty', name: '美妝 / 時尚' },
  { id: 'food', name: '餐飲 / 食品' },
  { id: 'tech', name: '科技 / 軟體服務' },
  { id: 'other', name: '其他' },
];

const FOLLOWER_OPTIONS = [
  { value: '500', label: '500 以下' },
  { value: '1000', label: '1,000 - 5,000' },
  { value: '10000', label: '5,000 - 10,000' },
  { value: '50000', label: '10,000 - 50,000' },
  { value: '100000', label: '50,000 - 100,000' },
  { value: '500000', label: '100,000 - 500,000' },
  { value: '1000000', label: '500,000+' },
];

export default function AssessmentFlow({ isOpen, onClose }: AssessmentFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    customerType: '',
    chineseName: '',
    englishName: '',
    industry: '',
    platforms: [],
    brandCount: 1,
    brandNames: [''],
    hasVerification: false,
    maxFollowers: '',
    email: '',
  });
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedIdentities, setSelectedIdentities] = useState<string[]>([]);
  const [showPricingDetails, setShowPricingDetails] = useState(false);

  useEffect(() => {
    if (isOpen) {
      track('assessment_open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // When reaching report step, initialize selected keywords
  useEffect(() => {
    if (currentStep === 5) {
      const suggested = generateKeywords(formData);
      setSelectedKeywords(suggested.slice(0, 5));
    }
  }, [currentStep, formData]);

  // When reaching pricing step, initialize selected identities
  useEffect(() => {
    if (currentStep === 6) {
      const identities = formData.brandNames.filter(n => n);
      if (identities.length === 0) {
        // Use main name if no brand names entered
        const mainName = formData.chineseName || formData.englishName || '您的品牌';
        setSelectedIdentities([mainName]);
      } else {
        setSelectedIdentities(identities);
      }
    }
  }, [currentStep, formData]);

  const handleNext = () => {
    track('assessment_step_complete', { step: currentStep, stepName: STEPS[currentStep] });
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handlePlatformToggle = (platformId: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId],
    }));
  };

  const handleBrandCountChange = (count: number) => {
    const newBrandNames = [...formData.brandNames];
    while (newBrandNames.length < count) newBrandNames.push('');
    while (newBrandNames.length > count) newBrandNames.pop();
    setFormData(prev => ({
      ...prev,
      brandCount: count,
      brandNames: newBrandNames,
    }));
  };

  const handleBrandNameChange = (index: number, value: string) => {
    const newBrandNames = [...formData.brandNames];
    newBrandNames[index] = value;
    setFormData(prev => ({
      ...prev,
      brandNames: newBrandNames,
    }));
  };

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const riskScore = calculateRiskScore(formData);
  const suggestedKeywords = generateKeywords(formData);

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: '高風險', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: AlertTriangle };
    if (score >= 40) return { level: '中風險', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: Shield };
    return { level: '低風險', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle };
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!formData.customerType;
      case 1: return !!(formData.chineseName || formData.englishName);
      case 2: return !!formData.industry;
      case 3: return formData.platforms.length > 0;
      case 4: return !!formData.maxFollowers;
      default: return true;
    }
  };

  if (!isOpen) return null;

  const risk = getRiskLevel(riskScore);
  const RiskIcon = risk.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-background rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-foreground/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-primary-blue" />
            <div>
              <h3 className="font-serif text-xl font-medium">品牌偽冒風險檢測</h3>
              <p className="text-xs text-foreground/60">
                步驟 {currentStep + 1} / {STEPS.length}: {STEPS[currentStep]}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-foreground/5 transition-colors" aria-label="關閉">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-foreground/5">
          <div
            className="h-full bg-primary-blue transition-all duration-500"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Step 0: Customer Type */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl mb-2">請問您是？</h2>
                <p className="text-foreground/60">選擇最符合您身份的選項</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData(prev => ({ ...prev, customerType: 'individual' }))}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.customerType === 'individual'
                      ? 'border-primary-blue bg-primary-blue/5'
                      : 'border-foreground/10 hover:border-foreground/20'
                  }`}
                >
                  <User className={`w-8 h-8 mb-3 ${formData.customerType === 'individual' ? 'text-primary-blue' : 'text-foreground/40'}`} />
                  <h3 className="font-medium text-lg mb-1">個人創作者</h3>
                  <p className="text-sm text-foreground/60">KOL、網紅、藝人、自媒體經營者</p>
                </button>

                <button
                  onClick={() => setFormData(prev => ({ ...prev, customerType: 'business' }))}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.customerType === 'business'
                      ? 'border-primary-blue bg-primary-blue/5'
                      : 'border-foreground/10 hover:border-foreground/20'
                  }`}
                >
                  <Building2 className={`w-8 h-8 mb-3 ${formData.customerType === 'business' ? 'text-primary-blue' : 'text-foreground/40'}`} />
                  <h3 className="font-medium text-lg mb-1">企業 / 品牌</h3>
                  <p className="text-sm text-foreground/60">公司、品牌、電商、組織機構</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Identity Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl mb-2">
                  {formData.customerType === 'individual' ? '您的名字是？' : '您的品牌名稱是？'}
                </h2>
                <p className="text-foreground/60">藝名、本名、或品牌名稱皆可</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">中文名稱</label>
                  <input
                    type="text"
                    value={formData.chineseName}
                    onChange={(e) => setFormData(prev => ({ ...prev, chineseName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:ring-2 focus:ring-primary-blue/30 transition-shadow"
                    placeholder="例：小明、好物推薦"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">英文名稱</label>
                  <input
                    type="text"
                    value={formData.englishName}
                    onChange={(e) => setFormData(prev => ({ ...prev, englishName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:ring-2 focus:ring-primary-blue/30 transition-shadow"
                    placeholder="例：Ming、GoodPicks"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Industry */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl mb-2">您的產業領域是？</h2>
                <p className="text-foreground/60">這將幫助我們更精準評估風險</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {INDUSTRIES.map(industry => (
                  <button
                    key={industry.id}
                    onClick={() => setFormData(prev => ({ ...prev, industry: industry.id }))}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.industry === industry.id
                        ? 'border-primary-blue bg-primary-blue/5'
                        : 'border-foreground/10 hover:border-foreground/20'
                    }`}
                  >
                    <span className="text-sm font-medium">{industry.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Social Platforms */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl mb-2">您有在經營哪些平台？</h2>
                <p className="text-foreground/60">可複選，選越多越能完整評估風險</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {PLATFORMS.map(platform => {
                  const Icon = platform.icon;
                  const isSelected = formData.platforms.includes(platform.id);
                  return (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.id)}
                      className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'border-primary-blue bg-primary-blue/5'
                          : 'border-foreground/10 hover:border-foreground/20'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-primary-blue' : 'text-foreground/40'}`} />
                      <span className="text-sm font-medium">{platform.name}</span>
                      {isSelected && <CheckCircle className="w-4 h-4 text-primary-blue ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Brand Info */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl mb-2">更多品牌資訊</h2>
                <p className="text-foreground/60">幫助我們評估您的曝光風險</p>
              </div>

              <div className="space-y-6">
                {/* Brand count */}
                <div>
                  <label className="block text-sm font-medium mb-3">您經營幾個品牌/帳號？</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        onClick={() => handleBrandCountChange(num)}
                        className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${
                          formData.brandCount === num
                            ? 'border-primary-blue bg-primary-blue text-white'
                            : 'border-foreground/10 hover:border-foreground/20'
                        }`}
                      >
                        {num}{num === 5 ? '+' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand names */}
                {formData.brandCount > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-3">品牌/帳號名稱（選填）</label>
                    <div className="space-y-2">
                      {formData.brandNames.map((name, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={name}
                          onChange={(e) => handleBrandNameChange(idx, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:ring-2 focus:ring-primary-blue/30 transition-shadow"
                          placeholder={`品牌 ${idx + 1} 名稱`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification */}
                <div>
                  <label className="block text-sm font-medium mb-3">您有購買官方認證（藍勾勾）嗎？</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, hasVerification: true }))}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                        formData.hasVerification
                          ? 'border-primary-blue bg-primary-blue/5'
                          : 'border-foreground/10 hover:border-foreground/20'
                      }`}
                    >
                      <BadgeCheck className={`w-5 h-5 ${formData.hasVerification ? 'text-primary-blue' : 'text-foreground/40'}`} />
                      <span>有認證</span>
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, hasVerification: false }))}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                        !formData.hasVerification && formData.hasVerification !== undefined
                          ? 'border-primary-blue bg-primary-blue/5'
                          : 'border-foreground/10 hover:border-foreground/20'
                      }`}
                    >
                      <span>無認證</span>
                    </button>
                  </div>
                </div>

                {/* Follower count */}
                <div>
                  <label className="block text-sm font-medium mb-3">您粉絲數最高的平台大約有多少追蹤者？</label>
                  <div className="grid grid-cols-2 gap-2">
                    {FOLLOWER_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => setFormData(prev => ({ ...prev, maxFollowers: option.value }))}
                        className={`p-3 rounded-xl border-2 text-sm transition-all ${
                          formData.maxFollowers === option.value
                            ? 'border-primary-blue bg-primary-blue/5 font-medium'
                            : 'border-foreground/10 hover:border-foreground/20'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Risk Report */}
          {currentStep === 5 && (
            <div className="space-y-6">
              {/* Risk Score Card */}
              <div className={`${risk.bg} ${risk.border} border-2 rounded-2xl p-6 text-center`}>
                <RiskIcon className={`w-12 h-12 mx-auto mb-3 ${risk.color}`} />
                <h2 className={`font-serif text-3xl mb-2 ${risk.color}`}>{risk.level}</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-5xl font-bold">{riskScore}</span>
                  <span className="text-foreground/60">/100 分</span>
                </div>
                <p className="text-sm text-foreground/70">
                  {riskScore >= 70
                    ? '您的品牌極易成為偽冒目標，建議立即啟用監控保護！'
                    : riskScore >= 40
                    ? '您的品牌有一定的被偽冒風險，建議盡快啟用監控。'
                    : '目前風險較低，但預防勝於治療，建議持續關注。'}
                </p>
              </div>

              {/* Risk Factors */}
              <div className="bg-foreground/[0.02] rounded-2xl p-6 border border-foreground/5">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-blue" />
                  風險因素分析
                </h3>
                <div className="space-y-3 text-sm">
                  {formData.platforms.length > 3 && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span>經營多個社群平台（{formData.platforms.length} 個），偽冒風險倍增</span>
                    </div>
                  )}
                  {!formData.hasVerification && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span>尚無官方認證，粉絲較難辨別真偽帳號</span>
                    </div>
                  )}
                  {parseInt(formData.maxFollowers) >= 10000 && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>高粉絲數量使您成為詐騙集團的熱門目標</span>
                    </div>
                  )}
                  {formData.brandCount > 1 && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span>經營多個品牌（{formData.brandCount} 個），需要更全面的監控覆蓋</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Impact Warning - 不作為成本提示 */}
              {riskScore >= 40 && (() => {
                const impact = calculateImpactCost(formData);
                return (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <h3 className="font-medium mb-3 flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-5 h-5" />
                      若持續暴露於偽冒風險中...
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3 bg-white/50 rounded-xl p-3">
                        <span className="text-lg">💸</span>
                        <div>
                          <span className="font-medium text-red-700">信任成本</span>
                          <p className="text-red-600/80 mt-0.5">
                            私訊質疑預估增加 <span className="font-semibold">{impact.trustCost.dmIncrease}</span>、廣告負評比例上升 <span className="font-semibold">{impact.trustCost.negativeRatio}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white/50 rounded-xl p-3">
                        <span className="text-lg">📉</span>
                        <div>
                          <span className="font-medium text-red-700">金錢成本</span>
                          <p className="text-red-600/80 mt-0.5">
                            廣告 CPM 可能上升 <span className="font-semibold">{impact.moneyCost.cpmIncrease}</span>、轉換率下降 <span className="font-semibold">{impact.moneyCost.conversionDrop}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white/50 rounded-xl p-3">
                        <span className="text-lg">🔄</span>
                        <div>
                          <span className="font-medium text-red-700">修復成本</span>
                          <p className="text-red-600/80 mt-0.5">
                            清除偽冒後，品牌信任回復需 <span className="font-semibold">{impact.recoveryCost.months}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-red-500/70 mt-4 pt-3 border-t border-red-200">
                      現在省下的處理成本，未來會變成數倍的修復成本
                    </p>
                  </div>
                );
              })()}

              {/* Suggested Keywords */}
              <div className="bg-foreground/[0.02] rounded-2xl p-6 border border-foreground/5">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-blue" />
                  建議監控的關鍵字
                </h3>
                <p className="text-sm text-foreground/60 mb-4">
                  根據您的資訊，這些是最可能被偽冒的帳號名稱變體
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedKeywords.map(keyword => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        selectedKeywords.includes(keyword)
                          ? 'bg-primary-blue text-white'
                          : 'bg-foreground/5 hover:bg-foreground/10'
                      }`}
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-foreground/50 mt-3">
                  已選擇 {selectedKeywords.length} 個關鍵字
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Pricing Calculator */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl mb-2">您的專屬方案</h2>
                <p className="text-foreground/60">根據您填寫的資料，我們為您推薦以下監控範圍</p>
              </div>

              {/* Identity Summary - Editable */}
              <div className="bg-foreground/[0.02] rounded-2xl p-5 border border-foreground/5">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-primary-blue" />
                  <span className="font-medium">監控身份</span>
                  <span className="ml-auto text-sm text-foreground/60">
                    已選 {selectedIdentities.length} 個
                  </span>
                </div>
                <div className="space-y-2">
                  {(() => {
                    const allIdentities = formData.brandNames.filter(n => n).length > 0
                      ? formData.brandNames.filter(n => n)
                      : [formData.chineseName || formData.englishName || '您的品牌'];
                    return allIdentities.map((name, idx) => {
                      const isSelected = selectedIdentities.includes(name);
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (isSelected && selectedIdentities.length > 1) {
                              setSelectedIdentities(prev => prev.filter(i => i !== name));
                            } else if (!isSelected) {
                              setSelectedIdentities(prev => [...prev, name]);
                            }
                          }}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-primary-blue/10 border-2 border-primary-blue/30'
                              : 'bg-foreground/5 border-2 border-transparent opacity-50'
                          }`}
                        >
                          {isSelected ? (
                            <CheckCircle className="w-4 h-4 text-primary-blue shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-foreground/30 shrink-0" />
                          )}
                          <span className="text-sm font-medium flex-1 text-left">{name}</span>
                          {isSelected && selectedIdentities.length > 1 && (
                            <X className="w-4 h-4 text-foreground/40 hover:text-foreground/60" />
                          )}
                        </button>
                      );
                    });
                  })()}
                </div>
                <p className="text-xs text-foreground/50 mt-3">
                  點擊可新增或移除監控身份
                </p>
              </div>

              {/* Keywords Summary - Editable */}
              <div className="bg-foreground/[0.02] rounded-2xl p-5 border border-foreground/5">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-primary-blue" />
                  <span className="font-medium">監控關鍵字</span>
                  <span className="ml-auto text-sm text-foreground/60">
                    已選 {selectedKeywords.length} 個
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedKeywords.map(keyword => (
                    <button
                      key={keyword}
                      onClick={() => {
                        if (selectedKeywords.length > 1) {
                          setSelectedKeywords(prev => prev.filter(k => k !== keyword));
                        }
                      }}
                      className="group px-3 py-1.5 bg-primary-blue/10 text-primary-blue rounded-full text-sm flex items-center gap-1.5 hover:bg-primary-blue/20 transition-colors"
                    >
                      {keyword}
                      {selectedKeywords.length > 1 && (
                        <X className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-foreground/50 mt-3">
                  點擊關鍵字可移除，或返回上一步新增更多
                </p>
              </div>

              {/* Pricing Result */}
              <div className="bg-primary-blue/5 border-2 border-primary-blue rounded-2xl p-6">
                <div className="text-center">
                  <p className="text-sm text-foreground/60 mb-2">預估月費</p>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-sm">NT$</span>
                    <span className="text-4xl font-bold text-primary-blue">
                      {calculatePrice(selectedIdentities.length, selectedKeywords.length).monthly.toLocaleString()}
                    </span>
                    <span className="text-foreground/60">/月</span>
                  </div>
                  <p className="text-sm text-foreground/50 mb-4">
                    年繳 NT${calculatePrice(selectedIdentities.length, selectedKeywords.length).yearly.toLocaleString()}（省 2 個月）
                  </p>

                  <button
                    onClick={() => setShowPricingDetails(!showPricingDetails)}
                    className="text-sm text-primary-blue flex items-center gap-1 mx-auto"
                  >
                    查看方案內容
                    {showPricingDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {showPricingDetails && (
                  <div className="mt-4 pt-4 border-t border-primary-blue/20 space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-blue mt-0.5 shrink-0" />
                      <span>疑似偽冒清單：包含平台來源與具體連結</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-blue mt-0.5 shrink-0" />
                      <span>風險分級（H/M/L）：專業自動化判斷</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-blue mt-0.5 shrink-0" />
                      <span>Evidence Lite 證據包：素材、CTA、首次出現時間</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-blue mt-0.5 shrink-0" />
                      <span>週報與即時通知：高風險事件即時掌握</span>
                    </div>
                    <div className="flex items-start gap-2 opacity-60">
                      <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>協助處理 SOP（Plus 方案可升級）</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="text-xs text-foreground/50 space-y-1 bg-foreground/[0.02] rounded-xl p-4">
                <div className="flex justify-between">
                  <span>基本月費</span>
                  <span>NT$ 990</span>
                </div>
                <div className="flex justify-between">
                  <span>身份監控 × {selectedIdentities.length}</span>
                  <span>NT$ {(selectedIdentities.length * 299).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>關鍵字監控 × {selectedKeywords.length}</span>
                  <span>NT$ {(selectedKeywords.length * 99).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-foreground/10 font-medium text-foreground/70">
                  <span>合計</span>
                  <span>NT$ {calculatePrice(selectedIdentities.length, selectedKeywords.length).monthly.toLocaleString()} /月</span>
                </div>
              </div>

              {/* Email Collection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">留下您的 Email，我們會與您聯繫</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:ring-2 focus:ring-primary-blue/30 transition-shadow"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer with navigation */}
        <div className="sticky bottom-0 bg-background border-t border-foreground/5 px-6 py-4 flex items-center justify-between gap-4">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-xl border border-foreground/10 hover:bg-foreground/5 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              上一步
            </button>
          ) : (
            <div />
          )}

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-3 bg-primary-blue text-white rounded-xl font-medium hover:bg-[#0047CC] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {currentStep === 4 ? '查看風險報告' : '下一步'}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                track('assessment_complete', {
                  riskScore,
                  identityCount: selectedIdentities.length,
                  keywordCount: selectedKeywords.length,
                  pricing: calculatePrice(selectedIdentities.length, selectedKeywords.length).monthly,
                  email: formData.email,
                  selectedIdentities: selectedIdentities.join(','),
                  selectedKeywords: selectedKeywords.join(','),
                });
                window.location.href = '/thanks';
              }}
              disabled={!formData.email}
              className="px-6 py-3 bg-primary-blue text-white rounded-xl font-medium hover:bg-[#0047CC] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              立即諮詢方案
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
