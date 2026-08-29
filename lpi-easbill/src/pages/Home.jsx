

import { Link } from "react-router-dom";
import {
  Receipt,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileText,
  Users,
  BarChart3,
  Wallet,
  Boxes,
  Smartphone,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Instant Invoicing",
    desc: "Create GST-ready invoices and quotations in seconds, from any device.",
  },
  {
    icon: Users,
    title: "Contacts & Parties",
    desc: "Manage customers and suppliers together with balances at a glance.",
  },
  {
    icon: Boxes,
    title: "Inventory & Items",
    desc: "Track stock, pricing, and HSN codes without spreadsheets.",
  },
  {
    icon: Wallet,
    title: "Payments Tracking",
    desc: "Record payments in and out, and always know who owes what.",
  },
  {
    icon: BarChart3,
    title: "Smart Reports",
    desc: "Sales, purchase, GST and stock reports — exportable anytime.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    desc: "Fully responsive — run your billing from mobile, tablet, or desktop.",
  },
];

// const stats = [
//   { value: "100%", label: "GST Compliant" },
//   { value: "3 Roles", label: "Admin, Accountant, Sales" },
//   { value: "Cloud", label: "Access Anywhere, Anytime" },
//   { value: "0", label: "Setup Hassle" },
// ];

const floatingIcons = [
  { icon: FileText, style: "top-4 left-4 sm:left-8", delay: "0s" },
  { icon: Wallet, style: "top-1/2 -right-3 sm:-right-6", delay: "1.2s" },
  { icon: BarChart3, style: "bottom-6 left-6 sm:left-12", delay: "2.1s" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-display">
      {/* Local keyframes for animated background + floating icons */}
      <style>{`
        @keyframes blobMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -25px) scale(1.08); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .blob-anim { animation: blobMove 10s ease-in-out infinite; }
        .blob-anim-slow { animation: blobMove 14s ease-in-out infinite reverse; }
        .float-anim { animation: floatY 4s ease-in-out infinite; }
        .fade-up { animation: fadeInUp 0.6s ease-out both; }
      `}</style>

      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-[#F8FAFC]/80 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] flex items-center justify-center shadow-md shadow-[#1D4ED8]/30">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-[#0F172A] tracking-tight">
              BillFlow
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#0F172A] hover:bg-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-[#1D4ED8] text-white text-sm font-semibold shadow-sm hover:bg-[#1E3A8A] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Animated background blobs — contained, won't block page scroll */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blob-anim absolute -top-20 -left-20 w-72 h-72 bg-[#1D4ED8]/15 rounded-full blur-3xl" />
          <div className="blob-anim-slow absolute top-16 -right-16 w-80 h-80 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
          <div className="blob-anim absolute bottom-0 left-1/3 w-64 h-64 bg-[#16A34A]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left fade-up">
            <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#1D4ED8] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#1D4ED8]/10 mb-5">
              <Zap className="w-3.5 h-3.5" />
              Billing, simplified
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-[#0F172A] leading-tight tracking-tight mb-4">
              Invoicing & Billing
              <br />
              <span className="bg-linear-to-r from-[#1D4ED8] to-[#1E3A8A] bg-clip-text text-transparent">
                built for growing businesses
              </span>
            </h1>

            <p className="text-[#64748B] text-sm sm:text-base max-w-lg mx-auto lg:mx-0 mb-8">
              Create invoices, manage contacts, track payments, and stay
              GST-ready — all from one clean dashboard. No spreadsheets, no
              chaos.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <Link
                to="/register"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-[#1D4ED8] to-[#1E3A8A] text-white font-semibold text-sm shadow-md shadow-[#1D4ED8]/30 hover:shadow-lg hover:shadow-[#1D4ED8]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] font-semibold text-sm hover:border-[#1D4ED8]/30 hover:bg-[#F8FAFC] transition-colors duration-200"
              >
                I already have an account
              </Link>
            </div>

            <div className="flex items-center gap-4 justify-center lg:justify-start mt-7 text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Easy to get started
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Setup in minutes
              </span>
            </div>
          </div>

          {/* Right: Animated illustration (no pricing shown) */}
         <div className="relative h-80 sm:h-96 lg:h-104 flex items-center justify-center">
  {/* Backdrop panel with theme gradient + pattern */}
  <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-[#EFF6FF] via-white to-[#EFF6FF] border border-[#E2E8F0] overflow-hidden">
    {/* Dot grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.4]"
      style={{
        backgroundImage:
          "radial-gradient(#1D4ED8 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />
    {/* Soft glow blobs */}
    <div className="blob-anim absolute -top-10 -left-10 w-48 h-48 bg-[#1D4ED8]/10 rounded-full blur-3xl" />
    <div className="blob-anim-slow absolute -bottom-10 -right-10 w-48 h-48 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
  </div>

  {/* Center glass panel */}
  {/* Center glass panel */}
<div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-orange-50/60 backdrop-blur-sm border border-orange-100/70 shadow-2xl shadow-[#1D4ED8]/15 flex flex-col items-center justify-center gap-3">
    {/* Icon glow ring */}
    <div className="relative flex items-center justify-center">
      <div className="absolute w-20 h-20 rounded-full bg-[#1D4ED8]/20 blur-xl" />
      <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] flex items-center justify-center shadow-lg shadow-[#1D4ED8]/40 float-anim">
        <Receipt className="w-8 h-8 text-white" />
      </div>
    </div>
    <p className="text-sm font-semibold text-[#0F172A]">
      Billing, on autopilot
    </p>
    <p className="text-xs text-[#64748B] flex items-center gap-1">
      <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
      Simple. Fast. Reliable.
    </p>
  </div>

  {/* Floating feature chips around the panel */}
  {floatingIcons.map(({ icon: Icon, style, delay }, i) => (
    <div
      key={i}
      style={{ animationDelay: delay }}
      className={`float-anim absolute ${style} z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg shadow-[#1D4ED8]/15 border border-white flex items-center justify-center`}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D4ED8]" />
    </div>
  ))}
</div>
        </div>
      </section>

      {/* Stats Strip */}
      {/* <section className="border-y border-[#E2E8F0] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-[#1D4ED8] font-mono tabular-nums">
                {s.value}
              </p>
              <p className="text-xs text-[#64748B] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mb-3">
            Everything you need to bill smarter
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base">
            One platform to manage invoices, contacts, inventory, and
            payments — built for how businesses actually work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:border-[#1D4ED8]/30 hover:shadow-lg hover:shadow-[#1D4ED8]/5 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-4 group-hover:bg-[#1D4ED8] transition-colors duration-200">
                <f.icon className="w-5 h-5 text-[#1D4ED8] group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-sm font-semibold text-[#0F172A] mb-1.5">
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] px-6 sm:px-12 py-12 sm:py-14 text-center">
          <div className="blob-anim absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="relative text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
            Ready to simplify your billing?
          </h2>
          <p className="relative text-blue-100 text-sm sm:text-base max-w-md mx-auto mb-8">
            Join businesses using BillFlow to stay organized, GST-ready, and
            get paid faster.
          </p>
          <Link
            to="/register"
            className="relative inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-[#1D4ED8] font-semibold text-sm shadow-lg hover:-translate-y-0.5 transition-transform duration-200"
          >
            Create Free Account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] flex items-center justify-center">
              <Receipt className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-[#0F172A]">
              BillFlow
            </span>
          </div>
          <p className="text-xs text-[#64748B] text-center">
            Powered by{" "}
            <span className="font-medium text-[#0F172A]">
              Legal Papers India
            </span>{" "}
            · © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}