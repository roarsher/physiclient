 import { useState } from 'react';
import {
  MotionConfig,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { House as HouseHeart, ArrowUpRight } from 'lucide-react';

import { SiteProvider } from './context/SiteContext';
import {
  EnquiryProvider,
  useEnquiry,
} from './context/EnquiryContext';
import { services } from './data/services';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SectionDots from './components/layout/SectionDots';

import Hero from './components/home/Hero';
import Stats from './components/home/Stats';
import About from './components/home/About';
import WhyUs from './components/home/WhyUs';
import Gallery from './components/home/Gallery';
import Reviews from './components/home/Reviews';
import CTABanner from './components/home/CTABanner';

import Contact from './components/contact/Contact';
import Reveal from './components/animations/Reveal';
import ServicesSection from './components/services/ServicesSection';
import ServiceDetails from './components/services/ServiceDetails';

import FloatingEnquiry from './components/enquiry/FloatingEnquiry';
import EnquiryModal from './components/enquiry/EnquiryModal';
import AdminDashboard from './components/admin/AdminDashboard';

function Website() {
  const [selected, setSelected] = useState(null);
  const { enquiry, openEnquiry } = useEnquiry();
  const reduced = useReducedMotion();

  function enquire(service) {
    setSelected(null);
    openEnquiry(service);
  }

  function requestHomeVisit() {
    const homeService = services.find(service => service.homeVisit);
    openEnquiry(homeService);
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Header />

      <motion.main
        id="main-content"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Stats />
        <About />

        <ServicesSection onSelect={setSelected} />

        <Reveal className="home-visits-banner shell">
          <div className="home-visit-heading">
            <span className="home-icon">
              <HouseHeart size={28} />
            </span>

            <div>
              <span className="eyebrow">
                CARE CLOSER TO HOME
              </span>

              <h2>Home visits, with care.</h2>

              <p>
                Prefer a visit at home? Share your address and
                we’ll confirm availability and charges.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="button button-outline"
            onClick={requestHomeVisit}
          >
            Request a home visit
            <ArrowUpRight size={18} />
          </button>
        </Reveal>

        <WhyUs />
        <Gallery />
        <Reviews />
        <CTABanner />
        <Contact />
      </motion.main>

      <Footer />

      <SectionDots />
      <FloatingEnquiry />

      {selected && (
        <ServiceDetails
          service={selected}
          onClose={() => setSelected(null)}
          onEnquire={enquire}
        />
      )}

      {enquiry && <EnquiryModal />}
    </>
  );
}

export default function App() {
  const isAdmin =
    typeof window !== 'undefined' &&
    window.location.pathname.replace(/\/+$/, '') === '/admin';

  return (
    <SiteProvider>
      <MotionConfig reducedMotion="user">
        {isAdmin ? (
          <AdminDashboard />
        ) : (
          <EnquiryProvider>
            <Website />
          </EnquiryProvider>
        )}
      </MotionConfig>
    </SiteProvider>
  );
}