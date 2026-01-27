import React, { useState } from "react";
import QueryProvider from "./api/QueryProvider";
import { SharedContextProvider } from "./contexts/SharedContext";
import { ToastProvider } from "./design-system/components";
import LeftSidebar from "./components/LeftSidebar";
import MonitorDashboard from "./components/MonitorDashboard";
import { cn } from "./design-system/utils/utils";
import InsightsDashboard from "./components/InsightsDashboard";

const AppContent = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeNav, setActiveNav] = useState("monitor"); // monitor = Sites Dashboard, insights = DT view

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <LeftSidebar
        activeItem={activeNav}
        onToggle={setIsSidebarExpanded}
        onNavChange={setActiveNav}
      />

      <div
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarExpanded ? "ml-[150px]" : "ml-[5rem]"
        )}
      >
        {activeNav === "monitor" ? (
          <MonitorDashboard onNavigateToInsights={() => setActiveNav("insights")} />
        ) : (
          <InsightsDashboard />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
      <QueryProvider>
        <SharedContextProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
        </SharedContextProvider>
      </QueryProvider>
  );
}

export default App;
