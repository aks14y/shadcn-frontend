import React, { createContext, useContext, useState, useCallback } from "react";

const SharedContext = createContext(null);

export const SharedContextProvider = ({ children, initialValue = {} }) => {
  const [sharedData, setSharedData] = useState(initialValue);

  const updateSharedData = useCallback((updates) => {
    setSharedData((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const value = {
    ...sharedData,
    updateSharedData,
  };

  return (
    <SharedContext.Provider value={value}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  const context = useContext(SharedContext);
  if (!context) {
    throw new Error("useSharedContext must be used within SharedContextProvider");
  }
  return context;
};

export default SharedContext;
