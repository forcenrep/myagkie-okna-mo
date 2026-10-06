import { useState } from "react";
import { Contact } from "./components/Contact";
import { Estimate } from "./components/Estimate";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Material } from "./components/Material";
import { Process } from "./components/Process";
import { RealCases } from "./components/RealCases";
import { Value } from "./components/Value";
import { ServiceArea } from "./components/ServiceArea";
import { LeadModal } from "./components/LeadModal";
import { FloatingContacts } from "./components/FloatingContacts";
import { CookieBanner } from "./components/CookieBanner";
import { LegalPage } from "./components/LegalPage";
import { Metrica } from "./components/Metrica";
import { AdminPage } from "./components/AdminPage";

export function App() {
  const [leadOpen, setLeadOpen] = useState(false);
  const path = window.location.pathname.replace(/^\//, "");
  if (["privacy", "consent", "cookies", "analytics-consent", "requisites"].includes(path)) return <><LegalPage type={path} /><CookieBanner /><Metrica /></>;
  if (path.startsWith("admin")) return <AdminPage />;
  return (
    <>
      <Header onLead={() => setLeadOpen(true)} />
      <main>
        <Hero onLead={() => setLeadOpen(true)} />
        <Value />
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
      <CookieBanner />
      <Metrica />
    </>
  );
}
