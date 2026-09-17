import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

const socialLinks = [
  { icon: Facebook, url: "#", label: "Facebook" },
  { icon: Instagram, url: "#", label: "Instagram" },
  { icon: Linkedin, url: "#", label: "LinkedIn" },
];

// TODO: real WhatsApp number daalna hai yahan
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const text = `New inquiry from BillFlow website:%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    setTimeout(() => {
      setLoading(false);
      setStatus("Redirecting you to WhatsApp...");
      window.open(whatsappUrl, "_blank");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-display">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#FFF7ED]">
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(#1D4ED8 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="blob-anim absolute -top-24 -left-20 w-80 h-80 bg-[#1D4ED8]/15 rounded-full blur-3xl" />
          <div className="blob-anim-slow absolute top-6 -right-16 w-80 h-80 bg-[#F97316]/12 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-[#1D4ED8] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#1D4ED8]/15 shadow-sm mb-5">
            Get in touch
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight tracking-tight mb-4">
            Questions? We're happy to help.
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base max-w-2xl mx-auto">
            Whether it's a question about billing, a feature request, or
            something isn't working right — send us a message.
          </p>
        </motion.div>
      </section>

      {/* ================= FORM + INFO ================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-2 sm:px-3">
          {/* LEFT: FORM */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-7 sm:p-9"
          >
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Get In Touch</h2>
            <p className="text-[#64748B] text-sm mb-7">
              Fill the form and we'll get back to you on WhatsApp right away.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#E2E8F0] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[#E2E8F0] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-[#E2E8F0] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all"
              />
              <textarea
                rows="4"
                name="message"
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-[#E2E8F0] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-[#F97316] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md shadow-orange-900/20 transition-all duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <Send className="w-4 h-4" />
                {loading ? "Redirecting..." : "Send Message"}
              </motion.button>

              {status && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#16A34A] text-sm mt-2"
                >
                  {status}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* RIGHT: CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] rounded-2xl p-7 sm:p-9 relative overflow-hidden"
          >
            <div className="blob-anim absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="relative text-xl font-bold text-white mb-2">
              Contact Information
            </h3>
            <p className="relative text-blue-100 text-sm mb-8">
              Reach out to us anytime. We're here to help you grow.
            </p>

            <div className="relative space-y-6">
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-orange-300 mt-0.5 shrink-0" />
                <p className="text-blue-50 text-sm">
                  <span className="font-semibold block text-white">Office Address</span>
                  Legal Papers India
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <Mail className="w-5 h-5 text-orange-300 mt-0.5 shrink-0" />
                <p className="text-blue-50 text-sm">
                  <span className="font-semibold block text-white">Email</span>
                  support@legalpapersindia.com
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <Phone className="w-5 h-5 text-orange-300 mt-0.5 shrink-0" />
                <p className="text-blue-50 text-sm">
                  <span className="font-semibold block text-white">Mobile</span>
                  +91 XXXXX XXXXX
                </p>
              </div>
            </div>

            <div className="relative mt-10 pt-8 border-t border-white/15">
              <p className="text-sm text-blue-100 mb-4">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full h-[350px] sm:h-[400px] border-t border-[#E2E8F0]"
      >
        <iframe
          title="Office Location"
          src="https://www.google.com/maps?q=Legal%20Papers%20India&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </motion.div>

      <Footer />
    </div>
  );
}