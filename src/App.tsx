import { useState } from "react";
import { Contact } from "./components/Contact";
import { Estimate } from "./components/Estimate";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Material } from "./components/Material";
import { Process } from "./components/Process";
import { Projects } from "./components/Projects";
import { RealCases } from "./components/RealCases";
import { Value } from "./components/Value";
import { ServiceArea } from "./components/ServiceArea";
import { LeadModal } from "./components/LeadModal";
import { FloatingContacts } from "./components/FloatingContacts";

export function App() {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <>
      <Header onLead={() => setLeadOpen(true)} />
      <main>
        <Hero onLead={() => setLeadOpen(true)} />
        <Value />
        <Projects />
        <RealCases />
        <ServiceArea />
        <Estimate onLead={() => setLeadOpen(true)} />
        <Material />
        <Process />
        <Faq />
        <Contact onLead={() => setLeadOpen(true)} />
      </main>
      <Footer />
      <FloatingContacts />
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </>
  );
}
