/**
 * Analytics Event Dispatcher (Privacy-safe)
 * Emits events to window.dataLayer / window.gtag if configured on the host.
 * Strictly avoids PII (emails, names, message contents are never recorded).
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | 'contact_click'
  | 'whatsapp_click'
  | 'resume_download'
  | 'project_open'
  | 'project_live_click'
  | 'form_submit_success'
  | 'language_change'
  | 'theme_change';

export function trackEvent(name: AnalyticsEventName, params?: Record<string, string | number | boolean>) {
  try {
    if (typeof window === 'undefined') return;

    const payload = {
      event: name,
      timestamp: new Date().toISOString(),
      ...params,
    };

    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    }
  } catch {
    // Fail silently without affecting UX
  }
}
