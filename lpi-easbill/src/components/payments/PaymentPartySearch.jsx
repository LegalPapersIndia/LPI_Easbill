// import { useState } from "react";
// import { Search, X, User } from "lucide-react";
// import { contactsList } from "../../data/dummyData";

// export default function PaymentPartySearch({ contactType, selectedParty, onSelect }) {
//   const [query, setQuery] = useState("");
//   const [showResults, setShowResults] = useState(false);

//   const parties = contactsList.filter((c) => c.contactType === contactType);
//   const filtered = parties.filter((p) =>
//     p.name.toLowerCase().includes(query.toLowerCase()) || p.mobile.includes(query)
//   );

//   if (selectedParty) {
//     return (
//       <div className="flex items-center justify-between bg-brand-light border border-brand/20 rounded-lg px-4 py-3">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-display font-semibold text-sm shrink-0">
//             {selectedParty.name.charAt(0)}
//           </div>
//           <div>
//             <p className="text-sm font-medium text-ink">{selectedParty.name}</p>
//             <p className="text-xs text-ink-muted tabular-num">{selectedParty.mobile}</p>
//           </div>
//         </div>
//         <button onClick={() => onSelect(null)} className="text-ink-muted hover:text-status-overdue">
//           <X size={16} />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2">
//         <Search size={16} className="text-ink-muted shrink-0" />
//         <input
//           value={query}
//           onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
//           onFocus={() => setShowResults(true)}
//           placeholder="Search party by name or number"
//           className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
//         />
//       </div>

//       {showResults && (
//         <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-52 overflow-y-auto">
//           {filtered.length === 0 ? (
//             <p className="px-4 py-3 text-sm text-ink-muted">Koi party nahi mili</p>
//           ) : (
//             filtered.map((p) => (
//               <button
//                 key={p._id}
//                 type="button"
//                 onClick={() => { onSelect(p); setShowResults(false); setQuery(""); }}
//                 className="w-full flex items-center gap-3 text-left px-4 py-2.5 hover:bg-paper transition-colors border-b border-border last:border-0"
//               >
//                 <User size={14} className="text-ink-muted shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium text-ink">{p.name}</p>
//                   <p className="text-xs text-ink-muted tabular-num">{p.mobile}</p>
//                 </div>
//               </button>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { Search, X, User } from "lucide-react";
import { getContacts } from "../../api/contactsApi";

export default function PaymentPartySearch({ contactType, selectedParty, onSelect }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const { data } = await getContacts({ contactType });
        setParties(data.contacts);
      } catch (err) {
        console.error("Parties load karne mein error:", err);
      }
    };
    fetchParties();
  }, [contactType]);

  const filtered = parties.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || p.mobile.includes(query)
  );

  if (selectedParty) {
    return (
      <div className="flex items-center justify-between bg-brand-light border border-brand/20 rounded-lg px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-display font-semibold text-sm shrink-0">
            {selectedParty.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-ink">{selectedParty.name}</p>
            <p className="text-xs text-ink-muted tabular-num">{selectedParty.mobile}</p>
          </div>
        </div>
        <button onClick={() => onSelect(null)} className="text-ink-muted hover:text-status-overdue">
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2">
        <Search size={16} className="text-ink-muted shrink-0" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
          onFocus={() => setShowResults(true)}
          placeholder="Search party by name or number"
          className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
        />
      </div>

      {showResults && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-52 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-4 py-3 text-sm text-ink-muted">Koi party nahi mili</p>
          ) : (
            filtered.map((p) => (
              <button
                key={p._id}
                type="button"
                onClick={() => { onSelect(p); setShowResults(false); setQuery(""); }}
                className="w-full flex items-center gap-3 text-left px-4 py-2.5 hover:bg-paper transition-colors border-b border-border last:border-0"
              >
                <User size={14} className="text-ink-muted shrink-0" />
                <div>
                  <p className="text-sm font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-ink-muted tabular-num">{p.mobile}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}