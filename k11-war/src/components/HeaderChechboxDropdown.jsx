import React from "react";

const HeaderCheckboxDropdown = ({ label, options, align = "left" }) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef(null);
  const dropdownRef = React.useRef(null);
  const [triggerRect, setTriggerRect] = React.useState(null);

  React.useEffect(() => {
    if (open && triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect());
    }
  }, [open]);

   React.useEffect(() => {
    if (!open) return;

    const handleOutside = (e) => {
      if (
        dropdownRef.current?.contains(e.target) ||
        triggerRef.current?.contains(e.target)
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [open]);


  return (
    <div className="relative">
      {/* Trigger */}
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700"
      >
        {label}
        <span className="text-gray-400">▼</span>
      </button>

      {/* Dropdown */}
      {open && triggerRect && (
        <div
          ref={dropdownRef}
          className="fixed z-[999] mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-56"
          style={{
            top: triggerRect.bottom + 6,
            left: triggerRect.left,
          }}
        >
          <div className="max-h-40 overflow-y-auto overscroll-contain py-2"
          style={{ scrollbarGutter: "stable" }}
          >
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
