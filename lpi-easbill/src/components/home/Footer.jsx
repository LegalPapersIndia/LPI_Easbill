import { Link } from "react-router-dom";
import {
  Receipt,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#F8FAFC] text-[#475569] pt-16 pb-8 overflow-hidden border-t border-[#E2E8F0]">
      {/* Subtle animated background glow, matching Hero/CTA */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-anim absolute -top-24 left-10 w-72 h-72 bg-[#1D4ED8]/10 rounded-full blur-3xl" />
        <div className="blob-anim-slow absolute -bottom-20 right-10 w-80 h-80 bg-[#F97316]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-3 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] flex items-center justify-center shadow-md shadow-[#1D4ED8]/30">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-[#0F172A] tracking-tight">
              BillFlow
            </span>
          </div>

          <p className="text-[#64748B] mb-4 text-sm leading-relaxed">
            GST billing built for Indian wholesalers, traders, and small
            businesses. A product by Legal Papers India.
          </p>

          <div className="flex gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 flex items-center justify-center bg-white border border-[#E2E8F0] rounded-full hover:bg-[#1D4ED8] hover:border-[#1D4ED8] transition-colors cursor-pointer text-[#475569] hover:text-white"
              >
                <Icon className="w-4 h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#0F172A] font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#F97316] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#F97316] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#F97316] transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-[#F97316] transition-colors">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-[#0F172A] font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/#features" className="hover:text-[#F97316] transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="/#gst" className="hover:text-[#F97316] transition-colors">
                GST Compliance
              </a>
            </li>
            <li>
              <a href="/#steps" className="hover:text-[#F97316] transition-colors">
                How it works
              </a>
            </li>
            <li>
              <Link to="/register" className="hover:text-[#F97316] transition-colors">
                Start Free
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-[#0F172A] font-semibold mb-4">Contact</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#F97316] shrink-0" />
              <p>Legal Papers India</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#F97316] shrink-0" />
              <p>+91 XXXXX XXXXX</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#F97316] shrink-0" />
              <p>support@legalpapersindia.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[#E2E8F0] mt-10 pt-6 text-center text-sm text-[#94A3B8]">
        © {new Date().getFullYear()} Legal Papers India. All rights reserved.
      </div>
    </footer>
  );
}