import React from "react";

const ACTIONS = [
  "Add Curve",
  "Add Schedule",
  "Define Curve",
  "Set Default",
];

const DERDropdown = () => {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });

  const btnRef = React.useRef(null);
  const menuRef = React.useRef(null);

  const updatePosition = React.useCallback(() => {
    if (!btnRef.current) return;

    const rect = btnRef.current.getBoundingClientRect();

    setPos({
      top: rect.bottom + 6,
      left: rect.right - 160, // align dropdown right
    });
  }, []);

  const toggle = () => {
    updatePosition();
    setOpen((v) => !v);
  };

  // Close on outside click
  React.useEffect(() => {
    const close = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // 🔑 Reposition on scroll + resize
  React.useEffect(() => {
    if (!open) return;

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  return (
    <>
      {/* Trigger */}
      <button
        ref={btnRef}
        onClick={toggle}
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
          ref={menuRef}
          className="fixed z-[9999] w-40 rounded-lg border border-gray-200 bg-white shadow-lg"
          style={{
            top: pos.top,
            left: pos.left,
          }}
        >
          <ul className="py-1 text-sm">
            {ACTIONS.map((item) => (
              <li
                key={item}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
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
    </>
  );
};

export default DERDropdown;
