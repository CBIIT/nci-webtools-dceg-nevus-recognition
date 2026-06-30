// Google Analytics (GA4) helpers.
//
// gtag is bootstrapped in public/index.html with a hardcoded GA4 Measurement ID
// (G-XXXXXXXXXX), the same id in every tier. Each helper here is a no-op unless that
// bootstrap ran, so call sites never need to know the environment.
//
// PII policy: never pass user-identifying values, free-text input, or query strings to
// these functions. Stick to controlled enum values (case ids, filter names) and hash
// route paths.

export function isAnalyticsEnabled() {
  return (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    Boolean(window.GA_MEASUREMENT_ID)
  );
}

// Send a GA4 page_view for SPA (HashRouter) route changes. We pass only the hash route
// path — never the query string — so no PII reaches GA4.
export function trackPageView(path) {
  if (!isAnalyticsEnabled()) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location:
      window.location.origin + window.location.pathname + '#' + path,
    page_title: document.title,
  });
}

// Track a key interaction. `params` must contain no PII.
export function trackEvent(action, params = {}) {
  if (!isAnalyticsEnabled()) return;
  window.gtag('event', action, params);
}
