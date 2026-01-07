import React, { useMemo } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { StyleSheetManager } from "styled-components";
import { theme } from "./theme";
import { getNonce } from "./utils/nonce";

// Create Emotion cache with nonce support for CSP compliance
const createEmotionCache = (nonce) => {
  return createCache({
    key: "mui",
    nonce: nonce,
    prepend: true, // Prepend styles to head for better CSP compatibility
  });
};

// Default cache instance (will be overridden if nonce is provided)
let emotionCache = createEmotionCache();

const ThemeProvider = ({ children, nonce }) => {
  // Get nonce from prop, meta tag, or environment
  const cspNonce = nonce || getNonce();

  // Create cache with nonce if available
  const cache = useMemo(() => {
    if (cspNonce) {
      return createEmotionCache(cspNonce);
    }
    return emotionCache;
  }, [cspNonce]);

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <StyleSheetManager nonce={cspNonce}>
            <CssBaseline />
            {children}
          </StyleSheetManager>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
