import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import FeaturesGrid from "../components/home/FeaturesGrid";
import GstSection from "../components/home/GstSection";
import StepsSection from "../components/home/StepsSection";
import CtaBanner from "../components/home/CtaBanner";
import Footer from "../components/home/Footer";
import FaqSection from "../components/home/FaqSection";
import AudienceSection from "../components/home/AudienceSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-display">
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

      <Navbar />
      <Hero />
      <AudienceSection />
      <FeaturesGrid />
      <GstSection />
      <StepsSection />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </div>
  );
}