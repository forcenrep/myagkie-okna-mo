import { Contact } from "./components/Contact";
import { Estimate } from "./components/Estimate";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Material } from "./components/Material";
import { Process } from "./components/Process";
import { Projects } from "./components/Projects";
import { Value } from "./components/Value";

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Value />
        <Projects />
        <Estimate />
        <Material />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
