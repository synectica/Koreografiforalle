// Єдина точка для подій GA4 / Google Ads.
// Мітки конверсій Ads беруться з .env (VITE_*), їх треба вказувати літерально,
// щоб Next.js підставив значення під час збірки.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type TrackedEvent =
  | "generate_lead" // успішне бронювання пробного заняття (основна конверсія)
  | "contact" // надіслано повідомлення з форми контакту
  | "begin_checkout" // клік «Betal» (перехід до Vipps)
  | "select_content" // клік по CTA
  | "file_download" // завантаження плаката
  | "click_directions"; // відкрито Google Maps

const ADS_ID = import.meta.env.VITE_ADS_ID;

const ADS_LABELS: Partial<Record<TrackedEvent, string | undefined>> = {
  generate_lead: import.meta.env.VITE_ADS_LEAD_LABEL,
  contact: import.meta.env.VITE_ADS_CONTACT_LABEL,
  begin_checkout: import.meta.env.VITE_ADS_PAY_LABEL,
};

export function trackEvent(name: TrackedEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", name, params);

  const label = ADS_LABELS[name];
  if (ADS_ID && label) {
    window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}`, ...params });
  }
}
