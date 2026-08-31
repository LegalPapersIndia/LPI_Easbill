// import { useState, useRef, useEffect, useMemo } from "react";
// import { ChevronDown } from "lucide-react";

// /**
//  * Reusable searchable dropdown — same box acts as trigger + search input.
//  * options: [{ value, label, subLabel? }]
//  */
// export default function SearchableSelect({
//   options = [],
//   value,
//   onChange,
//   placeholder = "Select...",
//   emptyText = "No results found",
// }) {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [highlightIndex, setHighlightIndex] = useState(0);
//   const wrapperRef = useRef(null);
//   const inputRef = useRef(null);

//   const selected = options.find((o) => o.value === value);

//   const filtered = useMemo(() => {
//     if (!query.trim()) return options;
//     const q = query.toLowerCase();
//     return options.filter(
//       (o) =>
//         o.label?.toLowerCase().includes(q) ||
//         o.subLabel?.toLowerCase().includes(q)
//     );
//   }, [options, query]);

//   // click outside → close & reset query to show selected value again
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setOpen(false);
//         setQuery("");
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (open) setHighlightIndex(0);
//   }, [open, query]);

//   const handleSelect = (opt) => {
//     onChange(opt.value);
//     setOpen(false);
//     setQuery("");
//   };

//   const handleFocus = () => {
//     setOpen(true);
//     setQuery(""); // typing shuru karte hi fresh search
//   };

//   const handleKeyDown = (e) => {
//     if (!open) return;
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setHighlightIndex((i) => Math.max(i - 1, 0));
//     } else if (e.key === "Enter") {
//       e.preventDefault();
//       if (filtered[highlightIndex]) handleSelect(filtered[highlightIndex]);
//     } else if (e.key === "Escape") {
//       setOpen(false);
//       setQuery("");
//       inputRef.current?.blur();
//     }
//   };

//   // box mein kya dikhna chahiye: agar open hai to typed query, warna selected label
//   const displayValue = open ? query : selected?.label || "";

//   return (
//     <div ref={wrapperRef} className="relative w-full">
//       <div className="relative">
//         <input
//           ref={inputRef}
//           type="text"
//           value={displayValue}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={handleFocus}
//           onKeyDown={handleKeyDown}
//           placeholder={placeholder}
//           className="w-full border border-border rounded-lg px-3 py-2 pr-8 text-sm outline-none focus:border-brand bg-white text-ink placeholder:text-ink-muted truncate"
//         />
//         <ChevronDown size={14} className="text-ink-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
//       </div>

//       {open && (
//         <div className="absolute z-50 mt-1 w-full min-w-[220px] bg-white border border-border rounded-lg shadow-lg overflow-hidden">
//           <div className="max-h-56 overflow-y-auto">
//             {filtered.length === 0 ? (
//               <p className="text-xs text-ink-muted px-3 py-3 text-center">{emptyText}</p>
//             ) : (
//               filtered.map((opt, idx) => (
//                 <div
//                   key={opt.value}
//                   onMouseEnter={() => setHighlightIndex(idx)}
//                   onMouseDown={(e) => e.preventDefault()} // input blur se pehle click register ho
//                   onClick={() => handleSelect(opt)}
//                   className={`px-3 py-2 text-sm cursor-pointer flex flex-col ${
//                     idx === highlightIndex ? "bg-brand-light" : ""
//                   } ${opt.value === value ? "font-medium text-brand" : "text-ink"}`}
//                 >
//                   <span className="truncate">{opt.label}</span>
//                   {opt.subLabel && (
//                     <span className="text-[11px] text-ink-muted truncate">{opt.subLabel}</span>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

/**
 * Reusable searchable dropdown — same box acts as trigger + search input.
 * Dropdown list renders via portal into document.body so it never gets
 * clipped by parent overflow-x-auto/overflow-hidden containers (e.g. tables).
 * options: [{ value, label, subLabel? }]
 */
export default function SearchableSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  emptyText = "No results found",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, openUpward: false });
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const selected = options.find((o) => o.value === value);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter(
      (o) =>
        o.label?.toLowerCase().includes(q) ||
        o.subLabel?.toLowerCase().includes(q)
    );
  }, [options, query]);

  // click outside (input OR portal list) → close & reset query
  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedInput = wrapperRef.current && wrapperRef.current.contains(e.target);
      const clickedList = listRef.current && listRef.current.contains(e.target);
      if (!clickedInput && !clickedList) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) setHighlightIndex(0);
  }, [open, query]);

  // calculate fixed position (viewport coords) + upward/downward on open, scroll, resize
  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = 240;
      const openUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

      setCoords({
        top: openUpward ? rect.top : rect.bottom,
        left: rect.left,
        width: rect.width,
        openUpward,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, query]);

  const handleSelect = (opt) => {
    onChange(opt.value);
    setOpen(false);
    setQuery("");
  };

  const handleFocus = () => {
    setOpen(true);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlightIndex]) handleSelect(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  };

  const displayValue = open ? query : selected?.label || "";

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full border border-border rounded-lg px-3 py-2 pr-8 text-sm outline-none focus:border-brand bg-white text-ink placeholder:text-ink-muted truncate"
        />
        <ChevronDown size={14} className="text-ink-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {open &&
        createPortal(
          <div
            ref={listRef}
            style={{
              position: "fixed",
              top: coords.openUpward ? undefined : coords.top + 4,
              bottom: coords.openUpward ? window.innerHeight - coords.top + 4 : undefined,
              left: coords.left,
              width: coords.width,
              zIndex: 9999,
            }}
            className="bg-white border border-border rounded-lg shadow-lg overflow-hidden"
          >
            <div className="max-h-56 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-xs text-ink-muted px-3 py-3 text-center">{emptyText}</p>
              ) : (
                filtered.map((opt, idx) => (
                  <div
                    key={opt.value}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(opt)}
                    className={`px-3 py-2 text-sm cursor-pointer flex flex-col ${
                      idx === highlightIndex ? "bg-brand-light" : ""
                    } ${opt.value === value ? "font-medium text-brand" : "text-ink"}`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {opt.subLabel && (
                      <span className="text-[11px] text-ink-muted truncate">{opt.subLabel}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}