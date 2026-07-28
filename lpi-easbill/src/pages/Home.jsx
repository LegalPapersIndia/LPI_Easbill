import { Link } from "react-router-dom";
import { Receipt } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#1D4ED8] flex items-center justify-center mb-5 shadow-lg">
          <Receipt className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] font-display mb-2">
          BillFlow
        </h1>
        <p className="text-[#64748B] text-sm mb-8">
          Billing & Invoicing made simple
        </p>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-lg border border-[#E2E8F0] text-[#0F172A] font-medium text-sm hover:bg-white transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2.5 rounded-lg bg-[#1D4ED8] text-white font-medium text-sm hover:bg-[#1E3A8A] transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}