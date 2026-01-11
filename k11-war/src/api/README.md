# API Configuration & React Query Integration

This module provides shared API configuration and React Query hooks for data fetching across k11-war and k11-inbox applications.

## Structure

```
api/
├── config.js           # API configuration and fetch utility
├── QueryProvider.js    # React Query provider component
├── hooks/
│   ├── useApiQuery.js  # Query hook for GET requests
│   └── useApiMutation.js # Mutation hook for POST/PUT/DELETE
└── index.js           # Main exports
```

## Features

- **Automatic Authentication**: Handles local and production authentication
- **CSRF Token Management**: Automatically includes CSRF tokens in requests
- **React Query Integration**: Built-in hooks for data fetching
- **Error Handling**: Comprehensive error handling with proper error messages
- **Module Federation Ready**: Exposed for use in k11-inbox and other remotes

## Usage

### In k11-war

```javascript
import { QueryProvider, useApiQuery, useApiMutation } from './api';
import ThemeProvider from './design-system/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <YourComponent />
      </QueryProvider>
    </ThemeProvider>
  );
}
```

### In k11-inbox (Remote)

```javascript
import { QueryProvider } from 'k11_war/QueryProvider';
import { useApiQuery, useApiMutation } from 'k11_war/Api';
import ThemeProvider from 'k11_war/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <YourComponent />
      </QueryProvider>
    </ThemeProvider>
  );
}
```

## API Configuration

The API config automatically:
- Detects if running locally or in production
- Authenticates with local credentials when on localhost
- Extracts CSRF token from URL params in production
- Sets the correct host URL based on environment

### Manual Configuration

```javascript
import { getApiConfig, resetApiConfig } from './api/config';

// Get current config
const config = getApiConfig();

// Reset config (useful for testing)
resetApiConfig();
```

## React Query Hooks

### useApiQuery

For GET requests and data fetching:

```javascript
import { useApiQuery } from './api';

function MyComponent() {
  const { data, isLoading, error } = useApiQuery(
    ['users'], // query key
    '/k11/api/v1.0/users', // endpoint
    {
      // Optional: additional fetch options
      // Optional: React Query options
      staleTime: 5 * 60 * 1000,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

### useApiMutation

For POST, PUT, DELETE requests:

```javascript
import { useApiMutation } from './api';

function CreateUser() {
  const mutation = useApiMutation({
    onSuccess: (data) => {
      console.log('User created:', data);
    },
    invalidateQueries: ['users'], // Refetch users list after mutation
  });

  const handleSubmit = () => {
    mutation.mutate({
      endpoint: '/k11/api/v1.0/users',
      method: 'POST',
      body: JSON.stringify({ name: 'John Doe' }),
    });
  };

  return (
    <button onClick={handleSubmit} disabled={mutation.isPending}>
      {mutation.isPending ? 'Creating...' : 'Create User'}
    </button>
  );
}
```

## Direct API Fetch

For cases where you don't need React Query:

```javascript
import { apiFetch } from './api';

async function fetchData() {
  try {
    const data = await apiFetch('/k11/api/v1.0/users');
    console.log(data);
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Status:', error.status);
  }
}
```

## Exposed via Module Federation

The following are exposed and can be imported in k11-inbox:

- `k11_war/ApiConfig` - API configuration module
- `k11_war/QueryProvider` - React Query provider
- `k11_war/useApiQuery` - Query hook
- `k11_war/useApiMutation` - Mutation hook
- `k11_war/Api` - All API exports

## Example: Complete Usage

```javascript
import React from 'react';
import { QueryProvider, useApiQuery, useApiMutation } from 'k11_war/Api';
import ThemeProvider from 'k11_war/ThemeProvider';
import { Button, Card } from 'k11_war/DesignSystem';

function UsersList() {
  const { data: users, isLoading, error, refetch } = useApiQuery(
    ['users'],
    '/k11/api/v1.0/users'
  );

  const deleteMutation = useApiMutation({
    onSuccess: () => {
      refetch(); // Refresh list after deletion
    },
  });

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card title="Users">
      {users?.map(user => (
        <div key={user.id}>
          {user.name}
          <Button
            onClick={() => deleteMutation.mutate({
              endpoint: `/k11/api/v1.0/users/${user.id}`,
              method: 'DELETE',
            })}
          >
            Delete
          </Button>
        </div>
      ))}
    </Card>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <UsersList />
      </QueryProvider>
    </ThemeProvider>
  );
}
```

## Configuration Details

### Environment Variables

Create a `.env` file in `k11-war` directory (copy from `.env.example`):

```bash
REACT_APP_API_AUTH_URL=https://vision.kalki.io/k11/api/v1.0/authenticate
REACT_APP_API_LOCAL_HOST=vision.kalki.io
REACT_APP_API_USER=support@kalkitech.in
REACT_APP_API_PASSWORD=kalki123
REACT_APP_API_BASE_PATH=/k11/api/v1.0
```

**Important**: Never commit `.env` file to version control. It's already in `.gitignore`.

### Local Development
- Automatically authenticates using credentials from environment variables
- Uses `REACT_APP_API_LOCAL_HOST` for host URL
- Stores auth token and CSRF token
- Falls back to default values if env vars not set

### Production
- Extracts CSRF token from URL query parameter
- Uses current window location as host URL
- No automatic authentication (assumes already authenticated)
- Environment variables should be set at build time

## Error Handling

All API errors include:
- `error.message` - Human-readable error message
- `error.status` - HTTP status code
- `error.response` - Full response object
- `error.responseData` - Parsed response data
