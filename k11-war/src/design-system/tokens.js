/**
 * Design Tokens - Centralized design values
 * 
 * All design properties (colors, spacing, typography, shadows, etc.)
 * should be defined here and accessed through the theme system.
 * This ensures consistency across all components.
 */

export const designTokens = {
  // Spacing scale (using MUI's spacing unit - 1 = 8px)
  spacing: {
    xs: 0.5,   // 4px
    sm: 1,     // 8px
    md: 2,     // 16px
    lg: 3,     // 24px
    xl: 4,     // 32px
    xxl: 6,    // 48px
  },

  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: '50%',
  },

  // Shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 15px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 25px rgba(0, 0, 0, 0.15)',
    xl: '0 12px 40px rgba(0, 0, 0, 0.2)',
  },

  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    all: 'all 0.3s ease',
  },

  // Typography weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Font sizes (in rem)
  fontSize: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
  },

  // Opacity values
  opacity: {
    disabled: 0.5,
    hover: 0.9,
    overlay: 0.1,
    subtle: 0.7,
  },

  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // Transform values
  transforms: {
    hover: {
      scale: 'scale(1.05)',
      translateY: 'translateY(-5px)',
      translateX: 'translateX(5px)',
    },
  },

  // Border widths
  borderWidth: {
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
};
