# Design Tokens System

## Overview

The design tokens system provides a centralized way to manage all design properties (colors, spacing, typography, shadows, etc.) across the application. This ensures consistency and makes it easy to update the design system globally.

## Benefits

1. **No Hardcoding**: All design values come from the theme/tokens
2. **Consistency**: Same values used throughout the application
3. **Easy Updates**: Change once, update everywhere
4. **Type Safety**: TypeScript support (if using TS)
5. **Theme-aware**: Works with both MUI theme and styled-components theme

## Usage

### 1. Using Theme Helpers in sx Props

```javascript
import { fontWeight, fontSize, shadow, borderRadius, opacity } from './design-system/utils/themeHelpers';

<Box
  sx={(theme) => ({
    fontWeight: fontWeight('bold')(theme),
    fontSize: fontSize('lg')(theme),
    boxShadow: shadow('md')(theme),
    borderRadius: borderRadius('lg')(theme),
    opacity: opacity('hover')(theme),
  })}
>
  Content
</Box>
```

### 2. Using Theme Tokens in styled-components

```javascript
import styled from 'styled-components';

const StyledComponent = styled.div`
  box-shadow: ${(props) => props.theme.designTokens?.shadows?.md};
  transition: ${(props) => props.theme.designTokens?.transitions?.normal};
  border-radius: ${(props) => `${props.theme.designTokens?.borderRadius?.md}px`};
`;
```

### 3. Using MUI Theme Directly

```javascript
<Box
  sx={(theme) => ({
    padding: theme.spacing(theme.designTokens.spacing.md),
    boxShadow: theme.designTokens.shadows.md,
  })}
>
  Content
</Box>
```

## Available Tokens

### Spacing
- `xs`: 4px (0.5 units)
- `sm`: 8px (1 unit)
- `md`: 16px (2 units)
- `lg`: 24px (3 units)
- `xl`: 32px (4 units)
- `xxl`: 48px (6 units)

### Border Radius
- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `round`: 50%

### Shadows
- `sm`: Small shadow
- `md`: Medium shadow
- `lg`: Large shadow
- `xl`: Extra large shadow

### Transitions
- `fast`: 0.15s ease
- `normal`: 0.3s ease
- `slow`: 0.5s ease
- `all`: all 0.3s ease

### Font Weights
- `light`: 300
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

### Font Sizes
- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `base`: 1rem (16px)
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px)
- `2xl`: 1.5rem (24px)

### Opacity
- `disabled`: 0.5
- `hover`: 0.9
- `overlay`: 0.1
- `subtle`: 0.7

## Best Practices

1. **Never hardcode values** - Always use theme tokens
2. **Use helper functions** - They provide type safety and consistency
3. **Extend tokens when needed** - Add new tokens to `tokens.js` instead of hardcoding
4. **Use MUI theme for colors** - Colors should come from `theme.palette`
5. **Document new tokens** - When adding tokens, update this documentation

## Examples

### Before (Hardcoded)
```javascript
<Button
  sx={{
    fontWeight: 700,
    fontSize: '1rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  }}
>
  Click me
</Button>
```

### After (Using Tokens)
```javascript
import { fontWeight, fontSize, shadow, borderRadius } from './design-system/utils/themeHelpers';

<Button
  sx={(theme) => ({
    fontWeight: fontWeight('bold')(theme),
    fontSize: fontSize('base')(theme),
    boxShadow: shadow('md')(theme),
    borderRadius: borderRadius('md')(theme),
  })}
>
  Click me
</Button>
```

## Adding New Tokens

1. Add the token to `tokens.js`:
```javascript
export const designTokens = {
  // ... existing tokens
  newCategory: {
    value1: 'value',
    value2: 'value',
  },
};
```

2. Create a helper function in `themeHelpers.js` (optional but recommended):
```javascript
export const newToken = (key) => (theme) => {
  return theme.designTokens?.newCategory?.[key];
};
```

3. Use in components:
```javascript
import { newToken } from './design-system/utils/themeHelpers';

sx={(theme) => ({
  property: newToken('value1')(theme),
})}
```
