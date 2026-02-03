import React from "react";

const ACTIONS = [
  "Add Curve",
  "Add Schedule",
  "Define Curve",
  "Set Default",
];

const DERDropdown = () => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  // Close on outside click
  React.useEffect(() => {
    const close = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-flex">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1 rounded hover:bg-gray-100 transition"
        aria-label="DER actions"
      >
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-full
            mt-2
            z-50
            w-40
            rounded-lg
            border
            border-gray-200
            bg-white
            shadow-lg
          "
        >
          <ul className="max-h-48 overflow-y-auto py-1 text-sm">
            {ACTIONS.map((item) => (
              <li
                key={item}
                className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  console.log(item);
                  setOpen(false);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DERDropdown;
