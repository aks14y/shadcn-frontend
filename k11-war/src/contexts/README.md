# Shared Context

A shared context system for sharing data between the host application (k11-war) and remote modules (k11-inbox, etc.) via Module Federation.

## Features

- **Shared State**: Share any data you need between host and remote applications
- **Generic Updates**: Single `updateSharedData` function for updating any part of the shared state
- **Module Federation Ready**: Exposed for use in remote applications
- **Flexible**: No predefined structure - define your own data structure

## Usage

### In Host Application (k11-war)

```javascript
import { SharedContextProvider } from "./contexts/SharedContext";

function App() {
  return (
    <SharedContextProvider>
      <YourComponents />
    </SharedContextProvider>
  );
}
```

### In Remote Application (k11-inbox)

```javascript
import { useSharedContext } from "k11_war/DesignSystem";
// or
import { useSharedContext } from "k11_war/SharedContext";

function MyComponent() {
  const { user, config, navigation, updateSharedData } = useSharedContext();

  // Access shared data
  console.log(user);
  console.log(config);
  console.log(navigation);

  // Update shared data
  updateSharedData({ user: { id: 1, name: "John Doe" } });
  updateSharedData({ config: { theme: "dark" } });
  updateSharedData({ navigation: { currentView: "inbox" } });
}
```

## API

### SharedContextProvider

Wrapper component that provides the shared context to all children.

**Props:**
- `children`: React children
- `initialValue` (optional): Initial values for the shared state

### useSharedContext Hook

Hook to access and update the shared context.

**Returns:**
- All properties from `initialValue` (or any data you've added via `updateSharedData`)
- `updateSharedData(updates)`: Function to update any part of the shared data. Merges updates with existing data.

**Example:**
```javascript
// If initialValue was { user: null, config: {} }
const { user, config, updateSharedData } = useSharedContext();

// Update user
updateSharedData({ user: { id: 1, name: "John" } });

// Update config (merges with existing)
updateSharedData({ config: { theme: "dark" } });

// Add new property
updateSharedData({ customData: "value" });
```

## Example

```javascript
// In k11-war
import { SharedContextProvider } from "./contexts/SharedContext";

function App() {
  return (
    <SharedContextProvider
      initialValue={{
        user: { id: 1, name: "Admin" },
        config: { appName: "k11-war" },
      }}
    >
      <YourApp />
    </SharedContextProvider>
  );
}

// In k11-inbox
import { useSharedContext } from "k11_war/DesignSystem";

function InboxComponent() {
  const { user, config, updateSharedData } = useSharedContext();

  const handleUserUpdate = () => {
    updateSharedData({ user: { id: 1, name: "John Doe" } });
  };

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <p>App: {config?.appName}</p>
      <button onClick={handleUserUpdate}>Update User</button>
    </div>
  );
}
```

## Notes

- The SharedContextProvider must be in the host application (k11-war)
- Remote applications can access the context if they're rendered within the provider
- All updates to shared data are reactive and will trigger re-renders in components using the context
