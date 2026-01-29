/**
 * Analytics tracking utility
 *
 * By default, logs to console and pushes to dataLayer for GTM.
 * Can be extended to support Vercel Analytics or Cloudflare Web Analytics.
 */

type EventName =
  | 'cta_click'
  | 'form_open'
  | 'form_submit'
  | 'form_success'
  | 'form_error'
  | 'page_view'
  | 'assessment_open'
  | 'assessment_step_complete'
  | 'assessment_complete';

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track an event
 * 🔍 Insight: Monitor these events to measure engagement
 * - cta_click: Which CTA drives most clicks? (Primary vs Secondary)
 * - form_open: How many visitors are interested enough to open the form?
 * - form_submit: How many actually submit?
 * - form_success: Completion rate (form_success / form_open)
 */
export function track(eventName: EventName, properties?: EventProperties) {
  // Console logging for development
  console.log('[Analytics]', eventName, properties);

  // Push to dataLayer for Google Tag Manager
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...properties,
    });
  }

  // 🔧 Optional: Vercel Analytics
  // Uncomment if you've installed @vercel/analytics
  /*
  if (process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true') {
    import('@vercel/analytics').then(({ track }) => {
      track(eventName, properties);
    });
  }
  */

  // 🔧 Optional: Cloudflare Web Analytics
  // This requires adding the script tag in layout.tsx
  /*
  if (typeof window !== 'undefined' && (window as any).__cfBeacon) {
    (window as any).__cfBeacon.trackEvent(eventName, properties);
  }
  */
}

/**
 * Track page view
 */
export function trackPageView(pageName: string) {
  track('page_view', { page: pageName });
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}
