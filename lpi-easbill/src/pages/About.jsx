import Navbar from "../components/home/Navbar";
import AboutHero from "../components/about/AboutHero";
import MissionSection from "../components/about/MissionSection";
import ValuesSection from "../components/about/ValuesSection";
import CtaBanner from "../components/home/CtaBanner";
import Footer from "../components/home/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-display">
      <Navbar />
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <CtaBanner />
      <Footer />
    </div>
  );
}