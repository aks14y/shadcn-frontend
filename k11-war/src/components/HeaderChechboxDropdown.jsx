import React from "react";

const HeaderCheckboxDropdown = ({ label, options, align = "left" }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700"
      >
        {label}
        <span className="text-gray-400">▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={`absolute z-50 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="p-2 space-y-2">
            {options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderCheckboxDropdown;
