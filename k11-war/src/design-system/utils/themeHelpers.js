/**
 * Theme Helper Utilities
 * 
 * Utility functions to access theme values consistently
 * Use these instead of hardcoding values in components
 */

/**
 * Get spacing value from theme
 * @param {number|string} value - Spacing value (MUI spacing unit or token key)
 * @returns {function} Function that accepts theme and returns spacing value
 */
export const spacing = (value) => (theme) => {
  if (typeof value === 'string' && theme.designTokens.spacing[value]) {
    return theme.spacing(theme.designTokens.spacing[value]);
  }
  return theme.spacing(value);
};

/**
 * Get border radius from theme
 * @param {string} size - Size key (sm, md, lg, xl, round)
 * @returns {function} Function that accepts theme and returns border radius
 */
export const borderRadius = (size = 'md') => (theme) => {
  const value = theme.designTokens.borderRadius[size];
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

/**
 * Get shadow from theme
 * @param {string} size - Size key (sm, md, lg, xl)
 * @returns {function} Function that accepts theme and returns shadow value
 */
export const shadow = (size = 'md') => (theme) => {
  return theme.designTokens.shadows[size];
};

/**
 * Get transition from theme
 * @param {string} speed - Speed key (fast, normal, slow) or 'all'
 * @returns {function} Function that accepts theme and returns transition value
 */
export const transition = (speed = 'normal') => (theme) => {
  return theme.designTokens.transitions[speed];
};

/**
 * Get font weight from theme
 * @param {string} weight - Weight key (light, normal, medium, semibold, bold)
 * @returns {function} Function that accepts theme and returns font weight
 */
export const fontWeight = (weight = 'normal') => (theme) => {
  return theme.designTokens.fontWeight[weight];
};

/**
 * Get font size from theme
 * @param {string} size - Size key (xs, sm, base, lg, xl, 2xl)
 * @returns {function} Function that accepts theme and returns font size
 */
export const fontSize = (size = 'base') => (theme) => {
  return theme.designTokens.fontSize[size];
};

/**
 * Get opacity from theme
 * @param {string} level - Opacity level (disabled, hover, overlay, subtle)
 * @returns {function} Function that accepts theme and returns opacity value
 */
export const opacity = (level = 'hover') => (theme) => {
  return theme.designTokens.opacity[level];
};

/**
 * Get transform from theme
 * @param {string} type - Transform type (scale, translateY, translateX)
 * @returns {function} Function that accepts theme and returns transform value
 */
export const transform = (type = 'translateY') => (theme) => {
  return theme.designTokens.transforms.hover[type];
};

/**
 * Get border width from theme
 * @param {string} width - Width key (thin, medium, thick)
 * @returns {function} Function that accepts theme and returns border width
 */
export const borderWidth = (width = 'medium') => (theme) => {
  return theme.designTokens.borderWidth[width];
};

/**
 * Get z-index from theme
 * @param {string} level - Z-index level key
 * @returns {function} Function that accepts theme and returns z-index value
 */
export const zIndex = (level) => (theme) => {
  return theme.designTokens.zIndex[level];
};

/**
 * Helper to create sx prop values using theme
 * Usage: sx={{ ...sxTheme({ color: 'primary.main', spacing: 'md' }) }}
 */
export const sxTheme = (styles) => (theme) => {
  const result = {};
  
  Object.entries(styles).forEach(([key, value]) => {
    if (key === 'spacing' && typeof value === 'string') {
      result.padding = spacing(value)(theme);
    } else if (key === 'borderRadius' && typeof value === 'string') {
      result.borderRadius = borderRadius(value)(theme);
    } else if (key === 'shadow' && typeof value === 'string') {
      result.boxShadow = shadow(value)(theme);
    } else if (key === 'transition' && typeof value === 'string') {
      result.transition = transition(value)(theme);
    } else if (key === 'fontWeight' && typeof value === 'string') {
      result.fontWeight = fontWeight(value)(theme);
    } else if (key === 'fontSize' && typeof value === 'string') {
      result.fontSize = fontSize(value)(theme);
    } else {
      result[key] = value;
    }
  });
  
  return result;
};
