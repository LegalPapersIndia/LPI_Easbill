import { motion } from "framer-motion";
import { Store, Truck, Wrench, Package, Boxes, Users } from "lucide-react";

const audiences = [
  { icon: Store, name: "Retailers" },
  { icon: Truck, name: "Wholesalers" },
  { icon: Package, name: "Traders" },
  { icon: Boxes, name: "Manufacturers" },
  { icon: Wrench, name: "Service Providers" },
  { icon: Users, name: "Growing Teams" },
];

export default function AudienceSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] py-16 sm:py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-anim absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="blob-anim-slow absolute -bottom-20 -right-20 w-80 h-80 bg-[#F97316]/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h4 className="text-orange-300 uppercase tracking-[0.3em] font-bold text-xs sm:text-sm mb-4">
            Who it's for
          </h4>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
            Built for businesses
            <br />
            <span className="bg-linear-to-r from-orange-300 via-orange-400 to-white bg-clip-text text-transparent">
              like yours
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {audiences.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-orange-300/40 hover:shadow-lg hover:shadow-black/20"
            >
              <div className="text-white mb-3 group-hover:scale-125 group-hover:text-orange-300 transition-all duration-300">
                <a.icon className="w-8 h-8" />
              </div>
              <p className="text-xs sm:text-sm text-blue-100 group-hover:text-white transition-colors">
                {a.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}