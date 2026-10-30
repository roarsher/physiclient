//  import { useState } from 'react';
// import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
// import { House as HouseHeart, ArrowUpRight } from 'lucide-react';

// import { SiteProvider } from './context/SiteContext';
// import {
//   EnquiryProvider,
//   useEnquiry,
// } from './context/EnquiryContext';
// import { services } from './data/services';

// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// import Hero from './components/home/Hero';
// import About from './components/home/About';
// import WhyUs from './components/home/WhyUs';
// import Gallery from './components/home/Gallery';
// import Stats from './components/home/Stats';
// import Reviews from './components/home/Reviews';
// import CTABanner from './components/home/CTABanner';
// import Contact from './components/contact/Contact';
// import Reveal from './components/animations/Reveal';
// import ServicesSection from './components/services/ServicesSection';
// import ServiceDetails from './components/services/ServiceDetails';
// import FloatingEnquiry from './components/enquiry/FloatingEnquiry';
// import EnquiryModal from './components/enquiry/EnquiryModal';
// import AdminDashboard from './components/admin/AdminDashboard';

// function Website() {
//   const [selected, setSelected] = useState(null);
//   const { enquiry, openEnquiry } = useEnquiry();
//   const reduced = useReducedMotion();

//   function enquire(service) {
//     setSelected(null);
//     openEnquiry(service);
//   }

//   function requestHomeVisit() {
//     const homeService = services.find(service => service.homeVisit);

//     openEnquiry(homeService, {
//       purpose: 'appointment',
//       visitType: 'home',
//     });
//   }

//   return (
//     <>
//       <a href="#main-content" className="skip-link">
//         Skip to content
//       </a>

//       <Header />

//       <motion.main
//         id="main-content"
//         initial={reduced ? false : { opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Hero />

//         <section
//           id="home-visits"
//           aria-label="Physiotherapy home visits"
//           style={{ scrollMarginTop: '110px' }}
//         >
//           <Reveal className="home-visits-banner shell">
//             <div className="home-visit-heading">
//               <span className="home-icon">
//                 <HouseHeart size={28} />
//               </span>

//               <div>
//                 <span className="eyebrow">
//                   HOME PHYSIOTHERAPY FOR EVERY AGE
//                 </span>

//                 <h2>
//                   Professional care. Your familiar surroundings.
//                 </h2>

//                 <p>
//                   From adult pain relief and rehabilitation to
//                   children’s movement and developmental care,
//                   request a therapist visit at home.
//                 </p>

//                 <p>
//                   Request a visit → We confirm availability →
//                   Your therapist visits
//                 </p>

//                 <p>
//                   Area coverage, visit timings and charges are
//                   confirmed by our team. Clinic appointments
//                   are also available.
//                 </p>
//               </div>
//             </div>

//             <button
//               type="button"
//               className="button"
//               onClick={requestHomeVisit}
//             >
//               Request a Home Visit
//               <ArrowUpRight size={18} />
//             </button>
//           </Reveal>
//         </section>

//         <Stats />
//         <About />
//         <ServicesSection onSelect={setSelected} />
//         <WhyUs />
//         <Gallery />
//         <Reviews />
//         <CTABanner />
//         <Contact />
//       </motion.main>

//       <Footer />
//       <FloatingEnquiry />

//       {selected && (
//         <ServiceDetails
//           service={selected}
//           onClose={() => setSelected(null)}
//           onEnquire={enquire}
//         />
//       )}

//       {enquiry && <EnquiryModal />}
//     </>
//   );
// }

// export default function App() {
//   const isAdmin =
//     typeof window !== 'undefined' &&
//     window.location.pathname.replace(/\/+$/, '') === '/admin';

//   return (
//     <SiteProvider>
//       <MotionConfig reducedMotion="user">
//         {isAdmin ? (
//           <AdminDashboard />
//         ) : (
//           <EnquiryProvider>
//             <Website />
//           </EnquiryProvider>
//         )}
//       </MotionConfig>
//     </SiteProvider>
//   );
// }

import { useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { House, ArrowUpRight } from 'lucide-react';

import { SiteProvider, useSite } from './context/SiteContext';
import {
  EnquiryProvider,
  useEnquiry,
} from './context/EnquiryContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero, { HomeSectionTabs } from './components/home/Hero';
import About from './components/home/About';
import WhyUs from './components/home/WhyUs';
import Gallery from './components/home/Gallery';
import Stats from './components/home/Stats';
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

  const { services } = useSite();
  const { enquiry, openEnquiry } = useEnquiry();
  const reduced = useReducedMotion();

  function enquire(service) {
    setSelected(null);
    openEnquiry(service);
  }

  function requestHomeVisit() {
    const homeService = services.find(service => service.homeVisit);

    openEnquiry(homeService || null, {
      purpose: 'appointment',
      visitType: 'home',
    });
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
        transition={{ duration: reduced ? 0 : 0.4 }}
      >
        <Hero />

        <HomeSectionTabs />

        <section
          id="home-visits"
          aria-label="Physiotherapy home visits"
          className="profile-home-visits"
          style={{ scrollMarginTop: '160px' }}
        >
          <Reveal className="home-visits-banner shell">
            <div className="home-visit-heading">
              <span className="home-icon">
                <House size={28} />
              </span>

              <div>
                <span className="eyebrow">
                  HOME PHYSIOTHERAPY FOR EVERY AGE
                </span>

                <h2>
                  Professional care.
                  Your familiar surroundings.
                </h2>

                <p>
                  Adult pain relief, rehabilitation and children’s
                  developmental care—with therapist visits at home.
                </p>

                <p>
                  Request a visit → We confirm availability →
                  Your therapist visits
                </p>

                <p>
                  Our team confirms area coverage, timings and charges.
                  Clinic appointments are also available.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="button"
              onClick={requestHomeVisit}
            >
              Request a Home Visit
              <ArrowUpRight size={18} />
            </button>
          </Reveal>
        </section>

        <div
          id="overview"
          style={{ scrollMarginTop: '160px' }}
        >
          <Stats />
          <About />
        </div>

        <ServicesSection onSelect={setSelected} />

        <WhyUs />
        <Gallery />
        <Reviews />
        <CTABanner />
        <Contact />
      </motion.main>

      <Footer />
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