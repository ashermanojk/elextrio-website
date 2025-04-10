import Image from "next/image";
import Hero from "@/components/home/Hero";
import MissionVision from "@/components/home/MissionVision";
import Services from "@/components/home/Services";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import Values from "@/components/home/Values";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <MissionVision />
      <Services />
      <ProjectsShowcase />
      <Values />
      <CTASection />
    </main>
  );
}
