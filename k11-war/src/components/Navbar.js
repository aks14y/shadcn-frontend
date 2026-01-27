import React from "react";
import { Button } from "../design-system/components/Button";
import { cn } from "../design-system/utils/utils";

const Navbar = ({ currentView, onViewChange }) => {
  const handleNavClick = (view) => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center py-4">
          <h1
            className="text-xl font-bold cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleNavClick("home")}
          >
            K11 WAR
          </h1>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => handleNavClick("home")}
              className={cn(
                "text-white hover:bg-white/10 rounded-none",
                currentView === "home"
                  ? "font-bold border-b-2 border-white"
                  : "font-normal border-b-2 border-transparent"
              )}
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
