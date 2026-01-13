# Design System Documentation

Centralized design tokens and CSS variables for k11-war (host) and all remote applications.

## Architecture

- **Colors**: CSS variables in `index.css` (import via `ThemeCSS`)
- **Design Tokens**: Single source of truth in `utils/tokens.js`
- **Utilities**: Helper functions in `utils/themeHelpers.js`

## Usage in Host (k11-war)

### CSS Variables (Recommended)

```jsx
<div className="bg-primary text-primary-foreground p-4">
  Primary colored content
</div>
```

### Design Tokens

```jsx
import { getToken, spacingPx } from "./design-system";

const spacing = getToken("spacing", "md"); // 2
const padding = spacingPx("lg"); // 24px
const shadow = getToken("shadows", "md");
```

### Helper Functions

```jsx
import { borderRadius, spacingPx, getToken } from "./design-system";

const style = {
  borderRadius: borderRadius("lg"), // "12px"
  padding: spacingPx("md"), // 16px
  boxShadow: getToken("shadows", "md"),
  fontSize: getToken("fontSize", "lg"), // "1.125rem"
};
```

## Usage in Remotes (k11-inbox)

### 1. Import CSS (Required)

```jsx
import "k11_war/ThemeCSS";
```

### 2. Import Design Tokens

```jsx
import { 
  getToken,
  spacingPx,
  borderRadius
} from "k11_war/DesignSystem";
```

### 3. Use CSS Variables

After importing `ThemeCSS`, use Tailwind classes directly:

```jsx
<div className="bg-primary text-primary-foreground p-4 rounded-lg">
  Content with shared theme
</div>
```

### 4. Use Design Tokens

```jsx
const padding = spacingPx("lg"); // 24px
const radius = borderRadius("md"); // "8px"
const shadowValue = getToken("shadows", "md");
```

## Available Exports

### Via `./DesignSystem`:
- `getToken(category, key)` - Get any token value (use this for most cases)
- `spacingPx(value)` - Get spacing in pixels (transforms units to px)
- `borderRadius(size)` - Get border radius with unit (transforms to "px")
- `Button`, `Card`, `Alert` - Components

### Via `./ThemeCSS`:
- CSS file with CSS variables (import in remotes)

## CSS Variables

Available after importing `ThemeCSS`:

- `--primary`, `--secondary`
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`
- `--radius`

Use with Tailwind: `bg-primary`, `text-foreground`, etc.

## Design Tokens

### Spacing (1 unit = 8px)
- `xs`: 0.5 (4px)
- `sm`: 1 (8px)
- `md`: 2 (16px)
- `lg`: 3 (24px)
- `xl`: 4 (32px)
- `xxl`: 6 (48px)

### Border Radius
- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `round`: 50%

### Shadows
- `sm`: '0 2px 4px rgba(0, 0, 0, 0.1)'
- `md`: '0 4px 15px rgba(0, 0, 0, 0.1)'
- `lg`: '0 8px 25px rgba(0, 0, 0, 0.15)'
- `xl`: '0 12px 40px rgba(0, 0, 0, 0.2)'

### Typography
- `fontWeight`: light (300), normal (400), medium (500), semibold (600), bold (700)
- `fontSize`: xs, sm, base, lg, xl, 2xl

### Other
- `transitions`: fast, normal, slow, all
- `opacity`: disabled, hover, overlay, subtle
- `zIndex`: dropdown, sticky, fixed, modalBackdrop, modal, popover, tooltip
- `transforms`: hover.scale, hover.translateY, hover.translateX
- `borderWidth`: thin, medium, thick

## Example: Remote Setup

```jsx
import "k11_war/ThemeCSS";
import { Button, Card, getToken, spacingPx } from "k11_war/DesignSystem";

function App() {
  const padding = spacingPx("lg");
  
  return (
    <div className="bg-background text-foreground" style={{ padding }}>
      <Card title="Remote App">
        <Button variant="default">Shared Button</Button>
      </Card>
    </div>
  );
}
```

## Key Points

1. **Colors**: Use CSS variables via Tailwind classes - no JS needed
2. **Design Tokens**: Single source in `utils/tokens.js`
3. **Consistency**: Same tokens in host and remotes
4. **No Duplication**: Remotes don't define their own tokens
