import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import CtaBanner from "./components/CtaBanner";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-white font-sans text-slate-600 antialiased">
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <Services />
        <WhyUs />
        <Testimonials />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
