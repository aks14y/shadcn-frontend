const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CSP headers - adjusted for production
// Must be before static files to ensure headers are set
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https:",
    "connect-src 'self' https://unrivaled-cendol-791a6d.netlify.app",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; '));
  next();
});

// Serve static files from dist directory
// Use a custom handler to ensure CSP headers are applied
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    // Ensure CSP header is set for static files too
    if (!res.getHeader('Content-Security-Policy')) {
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https:",
    "connect-src 'self' https://unrivaled-cendol-791a6d.netlify.app",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; '));
    }
  },
  fallthrough: true // Allow the request to continue if file not found
}));

// Handle client-side routing (historyApiFallback)
// This middleware runs for all GET requests that don't match static files
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Serving files from: ${path.join(__dirname, 'dist')}`);
});
