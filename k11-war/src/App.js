import React, { useState, Suspense, useMemo, useEffect } from "react";
import QueryProvider from "./api/QueryProvider";
import { SharedContextProvider, useSharedContext } from "./contexts/SharedContext";
import { Button } from "./design-system/components/Button";
import { Card } from "./design-system/components/Card";
import Navbar from "./components/Navbar";
import { Alert } from "./design-system/components/Alert";

// Error fallback component
const InboxErrorFallback = ({ error }) => (
  <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
    <Alert 
      variant="destructive" 
      className="max-w-[600px]"
      title="Failed to load Inbox module"
      description={
        <>
          <p className="mb-2">
            Please ensure k11-inbox is running on http://localhost:3001
          </p>
          <p className="mb-2">
            Start it with: <code className="bg-muted px-1 py-0.5 rounded">pnpm run start:inbox</code>
          </p>
          {error && (
            <p className="mt-2 font-mono text-xs">
              Error: {error.message}
            </p>
          )}
        </>
      }
    />
  </div>
);

const AppContent = () => {
  const [currentView, setCurrentView] = useState("home");
  const [inboxError, setInboxError] = useState(null);
  const { updateSharedData } = useSharedContext();

  useEffect(() => {
    updateSharedData({ navigation: { currentView } });
  }, [currentView, updateSharedData]);

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
    <div className="min-h-[calc(100vh-64px)] bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold mb-4">
            K11 WAR
          </h1>
          <h2 className="text-2xl font-medium mb-4">
            Main Application with Design System
          </h2>
          <p className="mt-4 opacity-90">
            This application hosts the design-system and exposes it via Module Federation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Design System Button"
            description="This button component is part of the design-system exposed to k11-inbox"
          >
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </Card>

          <Card
            title="Design System Card"
            description="This card component uses shadcn/ui and is part of the shared design-system. It can be consumed by k11-inbox and other remote applications."
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1">
        {currentView === "home" ? (
          <HomeView />
        ) : InboxAppComponent ? (
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }
          >
            <InboxAppComponent />
          </Suspense>
        ) : (
          <InboxErrorFallback />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryProvider>
      <SharedContextProvider>
        <AppContent />
      </SharedContextProvider>
    </QueryProvider>
  );
}

export default App;
