import React, { useEffect } from "react";
import "k11_war/ThemeCSS";
import { Button, Card } from "k11_war/DesignSystem";
import { useSharedContext } from "k11_war/SharedContext";

function App() {
  const { navigation, config, user, updateSharedData } = useSharedContext();

  useEffect(() => {
    console.log("Shared context from k11-war:", { navigation, config, user });
  }, [navigation, config, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">
              K11 Inbox
          </h1>
          <h2 className="text-2xl font-medium mb-4">
              Remote Application Consuming Design System
          </h2>
          <p className="mt-2 opacity-90">
              This application consumes the design-system from k11-war via Module Federation
          </p>
            {config && (
            <p className="mt-1 text-sm opacity-80">
                Connected to: {config.appName} v{config.version}
            </p>
            )}
            {navigation?.currentView && (
            <p className="mt-1 text-sm opacity-80">
                Current View: {navigation.currentView}
            </p>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                title="Consumed Button Component"
            description="This button is loaded from k11-war's design-system. It uses the same theme and styling!"
              >
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button variant="default" onClick={() => alert("Button clicked!")}>
                    Click Me
                  </Button>
              <Button variant="outline">Outlined</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
              </Card>

              <Card
                title="Consumed Card Component"
            description="This card component is also from k11-war's design-system. Notice how it maintains the same design language and theme consistency across both applications!"
              />

              <Card
                title="Uniform Design System"
            description="Both k11-war and k11-inbox use the same design-system components, ensuring visual consistency across all applications. The theme, colors, typography, and component styles are all shared."
            className="md:col-span-2"
          >
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
              </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
