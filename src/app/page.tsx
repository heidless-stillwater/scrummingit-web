import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { PortfolioSection } from '@/components/sections/portfolio-section';
import { AiToolsSection } from '@/components/sections/ai-tools-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20"> {/* Adjust padding top based on navbar height */}
        <HeroSection id="home" />
        <AboutSection id="about" />
        <PortfolioSection id="portfolio" />
        <AiToolsSection id="ai-tools" />
        <ContactSection id="contact" />
      </main>
      <Footer />
    </div>
  );
}
