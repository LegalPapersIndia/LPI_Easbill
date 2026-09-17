// // import { Link } from "react-router-dom";
// // import {
// //   Receipt,
// //   ArrowRight,
// //   Zap,
// //   FileText,
// //   Wallet,
// //   BarChart3,
// //   CheckCircle2,
// //   Sparkles,
// // } from "lucide-react";

// // const floatingIcons = [
// //   { icon: FileText, style: "top-4 left-4 sm:left-8", delay: "0s" },
// //   { icon: Wallet, style: "top-1/2 -right-3 sm:-right-6", delay: "1.2s" },
// //   { icon: BarChart3, style: "bottom-6 left-6 sm:left-12", delay: "2.1s" },
// // ];

// // export default function Hero() {
// //   return (
// //     <section className="relative">
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="blob-anim absolute -top-20 -left-20 w-72 h-72 bg-[#1D4ED8]/15 rounded-full blur-3xl" />
// //         <div className="blob-anim-slow absolute top-16 -right-16 w-80 h-80 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
// //         <div className="blob-anim absolute bottom-0 left-1/3 w-64 h-64 bg-[#16A34A]/5 rounded-full blur-3xl" />
// //       </div>

// //       <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
// //         <div className="text-center lg:text-left fade-up">
// //           <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#1D4ED8] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#1D4ED8]/10 mb-5">
// //             <Zap className="w-3.5 h-3.5" />
// //             Billing, simplified
// //           </div>

// //           <h1 className="text-3xl sm:text-5xl font-bold text-[#0F172A] leading-tight tracking-tight mb-4">
// //             Invoicing & Billing
// //             <br />
// //             <span className="bg-linear-to-r from-[#1D4ED8] to-[#1E3A8A] bg-clip-text text-transparent">
// //               built for growing businesses
// //             </span>
// //           </h1>

// //           <p className="text-[#64748B] text-sm sm:text-base max-w-lg mx-auto lg:mx-0 mb-8">
// //             Create invoices, manage contacts, track payments, and stay
// //             GST-ready — all from one clean dashboard. No spreadsheets, no
// //             chaos.
// //           </p>

// //           <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
// //             <Link
// //               to="/register"
// //               className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-[#F97316] to-[#EA580C] text-white font-semibold text-sm shadow-md shadow-[#F97316]/30 hover:shadow-lg hover:shadow-[#F97316]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
// //             >
// //               Get Started Free
// //               <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
// //             </Link>
// //             <Link
// //               to="/login"
// //               className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] font-semibold text-sm hover:border-[#F97316]/30 hover:bg-[#F8FAFC] transition-colors duration-200"
// //             >
// //               I already have an account
// //             </Link>
// //           </div>

// //           <div className="flex items-center gap-4 justify-center lg:justify-start mt-7 text-xs text-[#64748B]">
// //             <span className="flex items-center gap-1.5">
// //               <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
// //               Easy to get started
// //             </span>
// //             <span className="flex items-center gap-1.5">
// //               <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
// //               Setup in minutes
// //             </span>
// //           </div>
// //         </div>

// //         <div className="relative h-80 sm:h-96 lg:h-104 flex items-center justify-center">
// //           <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-[#EFF6FF] via-white to-[#EFF6FF] border border-[#E2E8F0] overflow-hidden">
// //             <div
// //               className="absolute inset-0 opacity-[0.4]"
// //               style={{
// //                 backgroundImage: "radial-gradient(#1D4ED8 1px, transparent 1px)",
// //                 backgroundSize: "22px 22px",
// //               }}
// //             />
// //             <div className="blob-anim absolute -top-10 -left-10 w-48 h-48 bg-[#1D4ED8]/10 rounded-full blur-3xl" />
// //             <div className="blob-anim-slow absolute -bottom-10 -right-10 w-48 h-48 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
// //           </div>

// //           <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-white/60 backdrop-blur-sm border border-[#E2E8F0] shadow-2xl shadow-[#1D4ED8]/15 flex flex-col items-center justify-center gap-3">
// //             <div className="relative flex items-center justify-center">
// //               <div className="absolute w-20 h-20 rounded-full bg-[#1D4ED8]/20 blur-xl" />
// //               <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] flex items-center justify-center shadow-lg shadow-[#1D4ED8]/40 float-anim">
// //                 <Receipt className="w-8 h-8 text-white" />
// //               </div>
// //             </div>
// //             <p className="text-sm font-semibold text-[#0F172A]">
// //               Billing, on autopilot
// //             </p>
// //             <p className="text-xs text-[#64748B] flex items-center gap-1">
// //               <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
// //               Simple. Fast. Reliable.
// //             </p>
// //           </div>

// //           {floatingIcons.map(({ icon: Icon, style, delay }, i) => (
// //             <div
// //               key={i}
// //               style={{ animationDelay: delay }}
// //               className={`float-anim absolute ${style} z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg shadow-[#1D4ED8]/15 border border-white flex items-center justify-center`}
// //             >
// //               <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D4ED8]" />
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }




// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   Zap,
//   FileText,
//   Wallet,
//   BarChart3,
//   CheckCircle2,
// } from "lucide-react";
// import dashboardPreview from "../../Asset/hero.png";

// const floatingIcons = [
//   { icon: FileText, style: "top-6 -left-4 sm:-left-8", delay: "0s" },
//   { icon: Wallet, style: "bottom-10 -right-4 sm:-right-8", delay: "1.4s" },
// ];

// export default function Hero() {
//   return (
//     <section className="relative">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="blob-anim absolute -top-20 -left-20 w-72 h-72 bg-[#1D4ED8]/15 rounded-full blur-3xl" />
//         <div className="blob-anim-slow absolute top-16 -right-16 w-80 h-80 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
//         <div className="blob-anim absolute bottom-0 left-1/3 w-64 h-64 bg-[#16A34A]/5 rounded-full blur-3xl" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-2 sm:px-3 pt-14 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
//         <div className="text-center lg:text-left fade-up">
//           <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#1D4ED8] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#1D4ED8]/10 mb-5">
//             <Zap className="w-3.5 h-3.5" />
//             Billing, simplified
//           </div>

//           <h1 className="text-3xl sm:text-5xl font-bold text-[#0F172A] leading-tight tracking-tight mb-4">
//             Invoicing & Billing
//             <br />
//             <span className="bg-linear-to-r from-[#1D4ED8] to-[#1E3A8A] bg-clip-text text-transparent">
//               built for growing businesses
//             </span>
//           </h1>

//           <p className="text-[#64748B] text-sm sm:text-base max-w-lg mx-auto lg:mx-0 mb-8">
//             Create invoices, manage contacts, track payments, and stay
//             GST-ready — all from one clean dashboard. No spreadsheets, no
//             chaos.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
//             <Link
//               to="/register"
//               className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-[#F97316] to-[#EA580C] text-white font-semibold text-sm shadow-md shadow-[#F97316]/30 hover:shadow-lg hover:shadow-[#F97316]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
//             >
//               Get Started Free
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//             </Link>
//             <Link
//               to="/login"
//               className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] font-semibold text-sm hover:border-[#F97316]/30 hover:bg-[#F8FAFC] transition-colors duration-200"
//             >
//               I already have an account
//             </Link>
//           </div>

//           <div className="flex items-center gap-4 justify-center lg:justify-start mt-7 text-xs text-[#64748B]">
//             <span className="flex items-center gap-1.5">
//               <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
//               Easy to get started
//             </span>
//             <span className="flex items-center gap-1.5">
//               <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
//               Setup in minutes
//             </span>
//           </div>
//         </div>

//         {/* Right: real dashboard screenshot, in a browser-frame mockup */}
//         <div className="relative flex items-center justify-center px-2 sm:px-6">
//           <div className="blob-anim absolute -top-8 -right-8 w-56 h-56 bg-[#1D4ED8]/10 rounded-full blur-3xl pointer-events-none" />
//           <div className="blob-anim-slow absolute -bottom-8 -left-8 w-56 h-56 bg-[#1E3A8A]/10 rounded-full blur-3xl pointer-events-none" />

//           <div className="relative w-full max-w-xl rounded-2xl bg-white border border-[#E2E8F0] shadow-2xl shadow-[#1D4ED8]/15 overflow-hidden">
//             {/* browser chrome bar */}
//             <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
//               <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
//               <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
//               <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
//               <div className="ml-3 flex-1 h-6 rounded-md bg-white border border-[#E2E8F0] text-[11px] text-[#94A3B8] flex items-center px-3">
//                 app.billflow.in/dashboard
//               </div>
//             </div>

//             {/* dashboard screenshot */}
//             <img
//               src={dashboardPreview}
//               alt="BillFlow dashboard showing sales trend, stats, and low stock alerts"
//               className="w-full h-auto block"
//             />
//           </div>

//           {floatingIcons.map(({ icon: Icon, style, delay }, i) => (
//             <div
//               key={i}
//               style={{ animationDelay: delay }}
//               className={`float-anim absolute ${style} z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-lg shadow-[#1D4ED8]/15 border border-[#E2E8F0] flex items-center justify-center`}
//             >
//               <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D4ED8]" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  FileText,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import dashboardPreview from "../../Asset/hero.png";

const floatingIcons = [
  { icon: FileText, style: "top-2 -left-6 sm:-left-10", delay: "0s" },
  { icon: Wallet, style: "bottom-4 -right-6 sm:-right-10", delay: "1.4s" },
];

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-anim absolute -top-20 -left-20 w-72 h-72 bg-[#1D4ED8]/15 rounded-full blur-3xl" />
        <div className="blob-anim-slow absolute top-16 -right-16 w-80 h-80 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
        <div className="blob-anim absolute bottom-0 left-1/3 w-64 h-64 bg-[#16A34A]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-3 pt-14 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
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
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-[#F97316] to-[#EA580C] text-white font-semibold text-sm shadow-md shadow-[#F97316]/30 hover:shadow-lg hover:shadow-[#F97316]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] font-semibold text-sm hover:border-[#F97316]/30 hover:bg-[#F8FAFC] transition-colors duration-200"
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

        {/* Right: dashboard mockup image (already has its own browser/laptop frame) */}
        <div className="relative flex items-center justify-center px-8 sm:px-14 py-6">
          <div className="blob-anim absolute -top-8 -right-8 w-56 h-56 bg-[#1D4ED8]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="blob-anim-slow absolute -bottom-8 -left-8 w-56 h-56 bg-[#1E3A8A]/10 rounded-full blur-3xl pointer-events-none" />

          <img
            src={dashboardPreview}
            alt="BillFlow dashboard showing sales trend, stats, and low stock alerts"
            className="relative z-10 w-full max-w-xl h-auto drop-shadow-2xl"
          />

          {floatingIcons.map(({ icon: Icon, style, delay }, i) => (
            <div
              key={i}
              style={{ animationDelay: delay }}
              className={`float-anim absolute ${style} z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-lg shadow-[#1D4ED8]/15 border border-[#E2E8F0] flex items-center justify-center`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D4ED8]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}