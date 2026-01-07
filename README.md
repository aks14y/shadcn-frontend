# React Module Federation Project - K11 WAR & K11 Inbox

This project demonstrates Module Federation with React, featuring **k11-war** (host/main application) that exposes a design-system, and **k11-inbox** (remote) that consumes the design-system.

## Project Structure

```
frontend/
├── k11-war/          # Main application (Host) - Exposes design-system
│   ├── src/
│   │   ├── design-system/
│   │   │   ├── theme.js          # Material UI theme configuration
│   │   │   ├── ThemeProvider.js  # Theme provider component
│   │   │   ├── components/
│   │   │   │   ├── Button.js     # Design system Button
│   │   │   │   └── Card.js       # Design system Card
│   │   │   └── index.js          # Design system exports
│   │   └── App.js
│   ├── public/
│   └── webpack.config.js
├── k11-inbox/        # Remote application - Consumes design-system
│   ├── src/
│   ├── public/
│   └── webpack.config.js
└── package.json
```

## Design System

The design-system is built using **Material UI** and includes:

- **Theme**: Custom Material UI theme with consistent colors, typography, and component styles
- **ThemeProvider**: Wrapper component that provides the theme to consuming applications
- **Button**: Custom button component with gradient variant support
- **Card**: Custom card component with consistent styling

All components are exposed via Module Federation and can be consumed by remote applications.

## Setup

1. Install dependencies (pnpm will install for all workspaces):
```bash
pnpm install
```

Or use the convenience script:
```bash
pnpm run install:all
```

## Running the Applications

### Option 1: Run separately (recommended for development)

**Terminal 1 - Start k11-war (must start first):**
```bash
pnpm run start:war
```
The k11-war will run on http://localhost:3000

**Terminal 2 - Start k11-inbox:**
```bash
pnpm run start:inbox
```
The k11-inbox will run on http://localhost:3001

### Option 2: Run both simultaneously

You can use `concurrently` to run both:
```bash
pnpm exec concurrently "pnpm run start:war" "pnpm run start:inbox"
```

## How It Works

- **k11-war (Port 3000)**: The main application that hosts and exposes the design-system
  - Exposes: `DesignSystem`, `ThemeProvider`, `Button`, `Card`
  - Uses Material UI with a custom theme
  - All design-system components are built with Material UI

- **k11-inbox (Port 3001)**: Consumes the design-system from k11-war
  - Dynamically loads components from k11-war using React's `lazy` loading
  - Uses the same theme and components for visual consistency
  - No need to install Material UI locally - it's shared via Module Federation

## Exposed Components from k11-war

- `./ThemeProvider` - Theme provider wrapper with Material UI theme
- `./DesignSystem` - Complete design-system exports
- `./Button` - Custom button component with Material UI
- `./Card` - Custom card component with Material UI

## Building for Production

```bash
pnpm run build:war
pnpm run build:inbox
```

## Key Features

1. **Unified Design System**: All components use the same Material UI theme
2. **Shared Dependencies**: Material UI, React, and ReactDOM are shared as singletons
3. **Consistent Styling**: k11-inbox automatically uses the same theme and styles as k11-war
4. **Runtime Loading**: Components are loaded at runtime, not bundled

## Notes

- **Important**: k11-war must be running before k11-inbox can load components
- The design-system ensures visual consistency across all applications
- Material UI dependencies are shared to avoid version conflicts
- All components maintain the same design language and theme
