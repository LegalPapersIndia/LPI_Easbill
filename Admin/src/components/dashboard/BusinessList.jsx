// import { useState } from "react";
// import { RefreshCcw, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

// const PAGE_SIZE = 10;

// export default function BusinessList({ users, loading, onRefresh, onView, onDelete, deletingId }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
//   const startIdx = (currentPage - 1) * PAGE_SIZE;
//   const paginatedUsers = users.slice(startIdx, startIdx + PAGE_SIZE);

//   const goToPage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h2 className="text-lg font-semibold text-[#0F172A]">All Registered Businesses</h2>
//           <p className="text-sm text-[#64748B] mt-0.5">
//             Total: <span className="font-medium text-[#0F172A]">{users.length}</span>
//           </p>
//         </div>
//         <button
//           onClick={onRefresh}
//           className="flex items-center gap-1.5 border border-[#E2E8F0] text-[#64748B] text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors"
//         >
//           <RefreshCcw size={14} /> Refresh
//         </button>
//       </div>

//       <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[840px] text-sm">
//             <thead>
//               <tr className="text-left text-[#64748B] border-b border-[#E2E8F0] bg-[#F8FAFC]">
//                 <th className="py-3 px-4 font-medium w-12">Sr No.</th>
//                 <th className="py-3 px-4 font-medium">Business Name</th>
//                 <th className="py-3 px-4 font-medium">Owner</th>
//                 <th className="py-3 px-4 font-medium">Email</th>
//                 <th className="py-3 px-4 font-medium">Phone</th>
//                 <th className="py-3 px-4 font-medium">Registered Date</th>
//                 <th className="py-3 px-4 font-medium text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={7} className="py-8 text-center text-[#64748B]">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : paginatedUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="py-8 text-center text-[#64748B]">
//                     Koi registered business nahi mila.
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedUsers.map((u, idx) => (
//                   <tr key={u._id} className="border-b border-[#E2E8F0] last:border-0">
//                     <td className="py-3 px-4 text-[#64748B] tabular-num">{startIdx + idx + 1}</td>
//                     <td className="py-3 px-4 text-[#0F172A] font-medium">
//                       {u.companyId?.businessName || "—"}
//                     </td>
//                     <td className="py-3 px-4 text-[#0F172A]">{u.name}</td>
//                     <td className="py-3 px-4 text-[#64748B]">{u.email}</td>
//                     <td className="py-3 px-4 text-[#64748B] tabular-num">{u.phone}</td>
//                     <td className="py-3 px-4 text-[#64748B]">
//                       {new Date(u.createdAt).toLocaleDateString("en-IN", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center justify-end gap-2">
//                         <button
//                           onClick={() => onView(u)}
//                           className="flex items-center gap-1 text-xs font-medium text-[#1D4ED8] border border-[#1D4ED8]/20 bg-[#EFF6FF] px-2.5 py-1.5 rounded-lg hover:bg-[#1D4ED8]/10 transition-colors"
//                         >
//                           <Eye size={13} /> View
//                         </button>
//                         <button
//                           onClick={() => onDelete(u._id, u.name)}
//                           disabled={deletingId === u._id}
//                           className="flex items-center gap-1 text-xs font-medium text-[#DC2626] border border-[#DC2626]/20 bg-red-50 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
//                         >
//                           <Trash2 size={13} /> {deletingId === u._id ? "..." : "Delete"}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {!loading && users.length > PAGE_SIZE && (
//           <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0]">
//             <p className="text-xs text-[#64748B]">
//               Page <span className="font-medium text-[#0F172A]">{currentPage}</span> of{" "}
//               <span className="font-medium text-[#0F172A]">{totalPages}</span>
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => goToPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="flex items-center gap-1 text-xs font-medium text-[#64748B] border border-[#E2E8F0] px-3 py-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft size={14} /> Prev
//               </button>
//               <button
//                 onClick={() => goToPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="flex items-center gap-1 text-xs font-medium text-[#64748B] border border-[#E2E8F0] px-3 py-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Next <ChevronRight size={14} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useMemo } from "react";
import { RefreshCcw, Eye, Trash2, ChevronLeft, ChevronRight, Search, X } from "lucide-react";

const PAGE_SIZE = 10;

export default function BusinessList({ users, loading, onRefresh, onView, onDelete, deletingId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // ── SEARCH FILTER — Business Name, Owner, Email, Phone sab me match karo ──
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const businessName = u.companyId?.businessName || "";
      return (
        businessName.toLowerCase().includes(q) ||
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q)
      );
    });
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * PAGE_SIZE;
  const paginatedUsers = filteredUsers.slice(startIdx, startIdx + PAGE_SIZE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // ── search karte hi page 1 pe wapas ──
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-[#0F172A]">All Registered Businesses</h2>
          <p className="text-sm text-[#64748B] mt-0.5">
            Total: <span className="font-medium text-[#0F172A]">{filteredUsers.length}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search name, email, phone..."
              className="w-full h-9 pl-9 pr-8 rounded-lg border border-[#E2E8F0] text-sm outline-none focus:border-[#EA580C] transition-colors"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            onClick={onRefresh}
            className="flex items-center justify-center gap-1.5 border border-[#E2E8F0] text-[#64748B] text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors shrink-0"
          >
            <RefreshCcw size={14} /> Refresh
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm table-fixed">
            <colgroup>
              <col className="w-16" />
              <col className="w-[16%]" />
              <col className="w-[14%]" />
              <col className="w-[20%]" />
              <col className="w-[13%]" />
              <col className="w-[13%]" />
              <col className="w-[16%]" />
            </colgroup>
            <thead>
              <tr className="text-left text-[#64748B] border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="py-3 px-4 font-medium">Sr No.</th>
                <th className="py-3 px-4 font-medium">Business Name</th>
                <th className="py-3 px-4 font-medium">Owner</th>
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium">Phone</th>
                <th className="py-3 px-4 font-medium">Registered</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#64748B]">
                    Loading...
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#64748B]">
                    {search ? "Koi matching business nahi mila." : "Koi registered business nahi mila."}
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((u, idx) => (
                  <tr key={u._id} className="border-b border-[#E2E8F0] last:border-0">
                    <td className="py-3 px-4 text-[#64748B] tabular-num">{startIdx + idx + 1}</td>
                    <td className="py-3 px-4 text-[#0F172A] font-medium truncate">
                      {u.companyId?.businessName || "—"}
                    </td>
                    <td className="py-3 px-4 text-[#0F172A] truncate">{u.name}</td>
                    <td className="py-3 px-4 text-[#64748B] truncate">{u.email}</td>
                    <td className="py-3 px-4 text-[#64748B] tabular-num">{u.phone}</td>
                    <td className="py-3 px-4 text-[#64748B]">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onView(u)}
                          className="flex items-center gap-1 text-xs font-medium text-[#1D4ED8] border border-[#1D4ED8]/20 bg-[#EFF6FF] px-2.5 py-1.5 rounded-lg hover:bg-[#1D4ED8]/10 transition-colors"
                        >
                          <Eye size={13} /> View
                        </button>
                        <button
                          onClick={() => onDelete(u._id, u.name)}
                          disabled={deletingId === u._id}
                          className="flex items-center gap-1 text-xs font-medium text-[#DC2626] border border-[#DC2626]/20 bg-red-50 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={13} /> {deletingId === u._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filteredUsers.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0]">
            <p className="text-xs text-[#64748B]">
              Page <span className="font-medium text-[#0F172A]">{safePage}</span> of{" "}
              <span className="font-medium text-[#0F172A]">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="flex items-center gap-1 text-xs font-medium text-[#64748B] border border-[#E2E8F0] px-3 py-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="flex items-center gap-1 text-xs font-medium text-[#64748B] border border-[#E2E8F0] px-3 py-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}