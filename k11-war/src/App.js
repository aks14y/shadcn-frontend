import React, { useState, Suspense, useMemo } from "react";
import { Container, Typography, Box, Grid, CircularProgress, Alert } from "@mui/material";
import ThemeProvider from "./design-system/ThemeProvider";
import QueryProvider from "./api/QueryProvider";
import Button from "./design-system/components/Button";
import Card from "./design-system/components/Card";
import Navbar from "./components/Navbar";

// Error fallback component
const InboxErrorFallback = ({ error }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 64px)",
      padding: 4,
    }}
  >
    <Alert severity="error" sx={{ maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Failed to load Inbox module
      </Typography>
      <Typography variant="body2">
        Please ensure k11-inbox is running on http://localhost:3001
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Start it with: <code>pnpm run start:inbox</code>
      </Typography>
      {error && (
        <Typography variant="body2" sx={{ mt: 1, fontFamily: "monospace", fontSize: "0.75rem" }}>
          Error: {error.message}
        </Typography>
      )}
    </Alert>
  </Box>
);

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [inboxError, setInboxError] = useState(null);

  // Only load the remote module when inbox view is selected
  const InboxAppComponent = useMemo(() => {
    if (currentView !== "inbox") return null;
    
    return React.lazy(() => {
      return import("k11_inbox/App")
        .catch((error) => {
          setInboxError(error);
          // Return a component that shows the error
          return {
            default: () => <InboxErrorFallback error={error} />,
          };
        });
    });
  }, [currentView]);

  const HomeView = () => (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        background: (theme) => theme.palette.background.default,
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h1" gutterBottom>
            K11 WAR
          </Typography>
          <Typography variant="h5">
            Main Application with Design System
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, opacity: 0.9 }}>
            This application hosts the design-system and exposes it via Module Federation
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              title="Design System Button"
              content="This button component is part of the design-system exposed to k11-inbox"
            >
              <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              title="Design System Card"
              content="This card component uses Material UI and is part of the shared design-system. It can be consumed by k11-inbox and other remote applications."
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  return (
    <ThemeProvider>
      <QueryProvider>
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar currentView={currentView} onViewChange={setCurrentView} />
          
          <Box sx={{ flex: 1 }}>
            {currentView === "home" ? (
              <HomeView />
            ) : InboxAppComponent ? (
              <Suspense
                fallback={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "calc(100vh - 64px)",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                }
              >
                <InboxAppComponent />
              </Suspense>
            ) : (
              <InboxErrorFallback />
            )}
          </Box>
        </Box>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
