/**
 * Get nonce value for CSP (Content Security Policy)
 * 
 * This function retrieves the nonce from:
 * 1. Meta tag in the document head (recommended for SSR/SSG)
 * 2. Environment variable (for development)
 * 3. Returns undefined if not found (will use hash-based CSP instead)
 * 
 * @returns {string|undefined} The nonce value or undefined
 */
export const getNonce = () => {
  // Try to get nonce from meta tag (recommended approach)
  if (typeof document !== "undefined") {
    const nonceMeta = document.querySelector('meta[name="csp-nonce"]');
    if (nonceMeta) {
      return nonceMeta.getAttribute("content");
    }
  }

  // Fallback to environment variable (for development)
  if (typeof process !== "undefined" && process.env.CSP_NONCE) {
    return process.env.CSP_NONCE;
  }

  // Return undefined - will use hash-based CSP instead
  return undefined;
};
