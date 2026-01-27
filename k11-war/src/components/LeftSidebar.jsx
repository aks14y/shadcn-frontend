import React, { useState } from "react";
import { cn } from "../design-system/utils/utils";

const LeftSidebar = ({ activeItem = "monitor", onToggle, onNavChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    if (onToggle) onToggle(newExpanded);
  };

  const menuItems = [
    { 
      key: "monitor",
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ), 
      text: "Monitor",
    },
    { 
      key: "insights",
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      ), 
      text: "Insights",
    },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 z-50 flex flex-col items-center pt-5",
      isExpanded ? "w-[150px]" : "w-[5rem]"
    )}>
      {/* Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className="mb-12 p-2 hover:bg-gray-100 rounded transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Menu Items */}
      <div className="flex flex-col flex-1 w-full">
        {menuItems.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onNavChange && onNavChange(item.key)}
            className={cn(
              "w-full flex items-center px-5 py-4 transition-colors",
              isExpanded ? "justify-start" : "justify-center",
              activeItem === item.key
                ? "bg-[#155EEF] text-white"
                : "text-gray-700 hover:bg-[#D1E0FF]"
            )}
          >
            <span className={cn(
              activeItem === item.key ? "text-white" : "text-gray-700"
            )}>
              {React.cloneElement(item.icon, {
                className: cn("w-6 h-6", activeItem === item.key ? "text-white" : "text-gray-700")
              })}
            </span>
            {isExpanded && (
              <span className={cn(
                "ml-4 text-base font-medium transition-opacity",
                activeItem === item.key ? "text-white" : "text-gray-700"
              )}>
                {item.text}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
