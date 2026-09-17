// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowRight, CheckCircle2, ArrowRightLeft } from "lucide-react";

// const trustPoints = ["No hidden costs", "GST-ready by default", "Setup in minutes"];

// export default function CtaBanner() {
//   return (
//     <section className="relative py-16 bg-[#0F172A] text-white overflow-hidden">
//       {/* Background glow */}
//       <div className="absolute inset-0">
//         <div className="absolute w-96 h-96 bg-blue-600/20 blur-[120px] -top-20 left-0" />
//         <div className="absolute w-96 h-96 bg-orange-500/15 blur-[120px] bottom-0 right-0" />
//       </div>

//       {/* Subtle grid pattern */}
//       <div
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage:
//             "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
//           backgroundSize: "48px 48px",
//         }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-3">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-blue-400/30 rounded-[2rem] px-8 py-10 md:px-14 md:py-12 text-center overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(96,165,250,0.15)]"
//         >
//           {/* Corner accent lines — grow + glow on hover */}
//           <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/40 rounded-tl-[2rem] transition-all duration-500 group-hover:w-28 group-hover:h-28 group-hover:border-blue-400/80" />
//           <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-orange-400/40 rounded-br-[2rem] transition-all duration-500 group-hover:w-28 group-hover:h-28 group-hover:border-orange-400/80" />

//           {/* Eyebrow */}
//           <motion.span
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="inline-block text-blue-400 uppercase tracking-[0.4em] text-xs font-bold mb-4"
//           >
//             Get Started
//           </motion.span>

//           {/* Heading */}
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             className="text-2xl md:text-4xl font-black leading-tight mb-4"
//           >
//             Ready to simplify{" "}
//             <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-orange-400 bg-clip-text text-transparent">
//               your billing?
//             </span>
//           </motion.h2>

//           {/* Subtext */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm md:text-base"
//           >
//             Join businesses using BillFlow to stay organized, GST-ready, and
//             get paid faster.
//           </motion.p>

//           {/* Trust points */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8"
//           >
//             {trustPoints.map((point) => (
//               <div key={point} className="flex items-center gap-2">
//                 <CheckCircle2 className="text-blue-400 w-3.5 h-3.5" />
//                 <span className="text-gray-300 text-xs md:text-sm">{point}</span>
//               </div>
//             ))}
//           </motion.div>

//           {/* Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.4 }}
//             className="flex flex-col sm:flex-row justify-center gap-3"
//           >
//             <Link
//               to="/register"
//               className="group/btn bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-[#F97316] px-7 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-orange-900/40 hover:shadow-orange-700/50 hover:-translate-y-0.5"
//             >
//               Create Free Account
//               <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
//             </Link>

//             <Link
//               to="/login"
//               className="border border-white/20 hover:border-blue-400/60 hover:bg-white/5 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
//             >
//               I already have an account
//               <ArrowRightLeft className="w-3.5 h-3.5" />
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }



import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ArrowRightLeft } from "lucide-react";

const trustPoints = ["No hidden costs", "GST-ready by default", "Setup in minutes"];

export default function CtaBanner() {
  return (
    <section className="relative py-16 bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-white/10 blur-[120px] -top-20 left-0" />
        <div className="absolute w-96 h-96 bg-[#F97316]/20 blur-[120px] bottom-0 right-0" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-3">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group relative bg-white/10 backdrop-blur-2xl border border-white/15 hover:border-white/30 rounded-[2rem] px-8 py-10 md:px-14 md:py-12 text-center overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]"
        >
          {/* Corner accent lines — grow + glow on hover */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/40 rounded-tl-[2rem] transition-all duration-500 group-hover:w-28 group-hover:h-28 group-hover:border-white/80" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-orange-300/50 rounded-br-[2rem] transition-all duration-500 group-hover:w-28 group-hover:h-28 group-hover:border-orange-300/90" />

          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-white text-[#1D4ED8] uppercase tracking-[0.3em] text-xs font-bold px-4 py-1.5 rounded-full mb-4"
          >
            Get Started
          </motion.span>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl md:text-4xl font-black leading-tight mb-4"
          >
            Ready to simplify{" "}
            <span className="text-orange-300">your billing?</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-blue-100 max-w-2xl mx-auto mb-6 text-sm md:text-base"
          >
            Join businesses using BillFlow to stay organized, GST-ready, and
            get paid faster.
          </motion.p>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8"
          >
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle2 className="text-orange-300 w-3.5 h-3.5" />
                <span className="text-blue-100 text-xs md:text-sm">{point}</span>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <Link
              to="/register"
              className="group/btn bg-linear-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-[#F97316] px-7 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-black/40 hover:-translate-y-0.5"
            >
              Create Free Account
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>

            <Link
              to="/login"
              className="border border-white/30 hover:border-white/60 hover:bg-white/10 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              I already have an account
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}