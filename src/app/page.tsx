"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const HeroSection = dynamic(
  () => import("@/components/site/hero-section").then((mod) => ({ default: mod.HeroSection })),
  { ssr: false }
);
const AboutSection = dynamic(
  () => import("@/components/site/about-section").then((mod) => ({ default: mod.AboutSection })),
  { ssr: false }
);
const ServicesSection = dynamic(
  () => import("@/components/site/services-section").then((mod) => ({ default: mod.ServicesSection })),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/components/site/contact-section").then((mod) => ({ default: mod.ContactSection })),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
