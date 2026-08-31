import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MagicDust from "@/components/MagicDust";

export default function Home() {
  return (
    <>
      <MagicDust />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
