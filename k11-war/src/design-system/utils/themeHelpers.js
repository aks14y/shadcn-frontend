import { designTokens } from "./tokens";

export const getToken = (category, key) => {
  return designTokens[category]?.[key] || null;
};

export const spacingPx = (value) => {
  const spacingValue = typeof value === 'string' 
    ? designTokens.spacing[value] 
    : typeof value === 'number' ? value : 0;
  return spacingValue * 8;
};

export const borderRadius = (size = 'md') => {
  const value = designTokens.borderRadius[size];
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};
