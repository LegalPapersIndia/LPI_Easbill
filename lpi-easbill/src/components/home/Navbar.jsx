import { Link } from "react-router-dom";
import { Receipt } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-[#F8FAFC]/80 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-3 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] flex items-center justify-center shadow-md shadow-[#1D4ED8]/30">
            <Receipt className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-[#0F172A] tracking-tight">
            BillFlow
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            to="/about"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[#0F172A] hover:bg-white transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[#0F172A] hover:bg-white transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[#0F172A] hover:bg-white transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="ml-2 px-4 py-2 rounded-lg bg-linear-to-r from-[#F97316] to-[#EA580C] text-white text-sm font-semibold shadow-sm shadow-[#F97316]/30 hover:shadow-md hover:shadow-[#F97316]/40 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}