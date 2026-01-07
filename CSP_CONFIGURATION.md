# CSP (Content Security Policy) Configuration Guide

This project is configured to work with CSP using Material UI's Emotion with nonce support.

## Overview

The setup addresses three common CSP issues:
1. ✅ **Inline styles blocked** - Solved with nonce-based Emotion cache
2. ✅ **Fonts/Icons blocked** - Configured CSP headers to allow Google Fonts
3. ✅ **Dynamic styles injection** - Using MUI's `sx` prop instead of inline styles

## Architecture

### 1. Emotion Cache with Nonce

The `ThemeProvider` component creates an Emotion cache with nonce support:

```javascript
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({
  key: "mui",
  nonce: nonce, // CSP nonce value
  prepend: true, // Prepend styles to head
});
```

### 2. Nonce Retrieval

The nonce can be provided in three ways (in order of priority):
1. **Prop to ThemeProvider** - `nonce` prop (for SSR/SSG)
2. **Meta tag** - `<meta name="csp-nonce" content="...">` in HTML
3. **Environment variable** - `CSP_NONCE` env var (development only)

### 3. Component Styling

All components use MUI's `sx` prop for dynamic styles (CSP-safe):

```javascript
// ✅ CSP-safe (uses sx prop)
<Button sx={{ color: 'primary.main' }}>Click me</Button>

// ❌ Avoid inline styles
<div style={{ color: 'red' }}>Don't do this</div>
```

## CSP Headers Configuration

### Development (webpack-dev-server)

The webpack config includes CSP headers for development:

```javascript
headers: {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https:",
    "connect-src 'self' http://localhost:* ws://localhost:* wss://localhost:*",
    "frame-ancestors 'none'",
  ].join("; "),
}
```

**Note**: `'unsafe-inline'` and `'unsafe-eval'` are needed for webpack dev server. In production, use nonce-based CSP.

### Production CSP Headers

For production, use a stricter CSP with nonce:

```javascript
// Example Express.js middleware
app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;
  
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}'`,
      `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );
  
  // Pass nonce to HTML template
  next();
});
```

Then in your HTML template:

```html
<meta name="csp-nonce" content="{{nonce}}">
<script nonce="{{nonce}}">...</script>
```

## Usage Examples

### Basic Usage (Automatic Nonce Detection)

```javascript
import ThemeProvider from "k11_war/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      {/* Nonce automatically detected from meta tag */}
      <YourApp />
    </ThemeProvider>
  );
}
```

### With Explicit Nonce (SSR/SSG)

```javascript
import ThemeProvider from "k11_war/ThemeProvider";

function App({ nonce }) {
  return (
    <ThemeProvider nonce={nonce}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using Components with sx Prop

```javascript
import Button from "k11_war/Button";
import Card from "k11_war/Card";

function MyComponent() {
  return (
    <Card
      sx={{
        // All styles use sx prop - CSP-safe
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      <Button
        sx={{
          width: '100%',
          mt: 2, // MUI spacing shorthand
        }}
      >
        Click me
      </Button>
    </Card>
  );
}
```

## Best Practices

1. ✅ **Always use `sx` prop** for dynamic styles
2. ✅ **Use theme values** in sx prop: `sx={{ color: 'primary.main' }}`
3. ✅ **Generate nonce server-side** in production
4. ✅ **Pass nonce to ThemeProvider** for SSR/SSG
5. ❌ **Avoid inline styles** (`style` prop)
6. ❌ **Avoid `styled` components** for dynamic styles (use sx instead)

## Testing CSP

1. Open browser DevTools → Network tab
2. Check response headers for `Content-Security-Policy`
3. Check Console for CSP violations
4. Verify styles are injected with nonce attribute

## Troubleshooting

### Styles not applying
- Check if nonce is being passed correctly
- Verify CSP headers allow `'nonce-{nonce}'` for style-src
- Check browser console for CSP violations

### Fonts not loading
- Ensure `font-src` includes `https://fonts.gstatic.com`
- Check if fonts are loaded via `@mui/material` (should work automatically)

### Icons not displaying
- MUI icons use fonts, so same as above
- Ensure `font-src` includes `data:` for icon fonts

## Production Deployment

1. Generate nonce server-side for each request
2. Pass nonce in CSP headers
3. Include nonce in HTML meta tag
4. ThemeProvider will automatically detect and use it
5. Remove `'unsafe-inline'` and `'unsafe-eval'` from CSP in production
