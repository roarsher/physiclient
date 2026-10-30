//  import { useEffect, useState } from 'react';
//  import { services } from '../../data/services';
// import {
//   AnimatePresence,
//   motion,
//   useReducedMotion,
// } from 'framer-motion';
// import {
//   ArrowDown,
//   ArrowUpRight,
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   ShieldCheck,
//   Sparkles,
// } from 'lucide-react';
// import { useEnquiry } from '../../context/EnquiryContext';
// import kidsHero from '../../assets/hero-kids-v2.png';
// import adultHero from '../../assets/hero-adults-v2.png';
// import './Hero.css';
 

// const slides = [
//   {
//     id: 'adults',
//     label: 'Adult physiotherapy at home',
//     eyebrow: 'EXPERT CARE. RIGHT AT YOUR DOORSTEP.',
//     title: 'Move Better.',
//     highlight: 'Recover at Home.',
//     description:
//       'Personalized physiotherapy for pain relief, mobility and rehabilitation—in the comfort of your home. Our team supports your recovery with care shaped around your needs.',
//     image: adultHero,
//     alt: 'AI illustration of an adult receiving physiotherapy support',
//     assurance: 'Home visits for adults',
//     note: 'Expert care, closer to you',
//     detail: 'Your recovery. Your familiar space.',
//     button: 'Book a Home Visit',
//     serviceId: 'at-home-physiotherapy-services',
//   },
//   {
//     id: 'children',
//     label: 'Child development care at home',
//     eyebrow: 'LITTLE STEPS. IN A FAMILIAR SPACE.',
//     title: 'Helping Little Ones Grow,',
//     highlight: 'Right at Home.',
//     description:
//       'Gentle pediatric physiotherapy and neuro developmental support in your child’s familiar surroundings—with parents involved every step of the way.',
//     image: kidsHero,
//     alt: 'AI illustration of a child practicing movement with a therapist and parent',
//     assurance: 'Home visits for children',
//     note: 'Growing with confidence',
//     detail: 'Care at your child’s pace',
//     button: 'Book Your Child’s Home Visit',
//     serviceId: 'pediatric-physiotherapy',
//   },
// ];

// const SLIDE_INTERVAL = 3000;

// export default function Hero() {
//   const { openEnquiry } = useEnquiry();
//   const reduced = useReducedMotion();

//   const [index, setIndex] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [focused, setFocused] = useState(false);
//   const [visible, setVisible] = useState(true);
//   const [hovered, setHovered] = useState(false);

//   const slide = slides[index];
//   function bookHomeVisit() {
//   const service = services.find(item => item.id === slide.serviceId);

//   openEnquiry(service, {
//     purpose: 'appointment',
//     visitType: 'home',
//   });
// }

//   useEffect(() => {
//     slides.forEach(({ image }) => {
//       const preload = new Image();
//       preload.src = image;
//     });

//     const updateVisibility = () => {
//       setVisible(!document.hidden);
//     };

//     updateVisibility();
//     document.addEventListener('visibilitychange', updateVisibility);

//     return () => {
//       document.removeEventListener('visibilitychange', updateVisibility);
//     };
//   }, []);

//   useEffect(() => {
//   if (reduced || paused || hovered || focused || !visible) return;

//   const timer = window.setTimeout(() => {
//     setIndex(current => (current + 1) % slides.length);
//    }, SLIDE_INTERVAL);

//   return () => window.clearTimeout(timer);
// }, [index, reduced, paused, hovered, focused, visible]);

// const changeSlide = direction => {
//   setIndex(current =>
//     (current + direction + slides.length) % slides.length
//   );
// };
//   return (
//     <section
//     onMouseEnter={() => setHovered(true)}
//     onMouseLeave={() => setHovered(false)}
//       id="home"
//       className="hero-carousel shell"
//       aria-roledescription="carousel"
//       aria-label="Care for children and adults"
//       onFocusCapture={() => setFocused(true)}
//       onBlurCapture={event => {
//         if (!event.currentTarget.contains(event.relatedTarget)) {
//           setFocused(false);
//         }
//       }}
//     >
//       <div
//         className="hero-slide-stage"
//         aria-live={paused || reduced || focused ? 'polite' : 'off'}
//       >
//         <AnimatePresence initial={false} mode="wait">
//           <motion.div
//             key={slide.id}
//             className="hero-section hero-slide"
//             role="group"
//             aria-roledescription="slide"
//             aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
//             initial={reduced ? false : { opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
//             transition={{ duration: reduced ? 0 : 0.3 }}
//           >
//             <div className="hero-copy">
//               <span className="eyebrow">
//                 <span className="status-dot" />
//                 {slide.eyebrow}
//               </span>

//               <h1>
//                 {slide.title}
//                 <br />
//                 <span>{slide.highlight}</span>
//               </h1>

//               <p>{slide.description}</p>

//                <div className="hero-actions">
//   <button
//     type="button"
//     className="button"
//     onClick={bookHomeVisit}
//   >
//     {slide.button}
//     <ArrowUpRight size={18} />
//   </button>

//   <a className="button button-outline" href="#services">
//     Explore Our Services
//     <ArrowDown size={17} />
//   </a>
// </div>

//               <div className="hero-assurance">
//                 <span>
//                   <Heart size={17} />
//                   Care with patience
//                 </span>
//                 <span>
//                   <ShieldCheck size={17} />
//                   {slide.assurance}
//                 </span>
//               </div>
//             </div>

//             <div className="hero-visual">
//               <div className="hero-orbit" aria-hidden="true" />

//               <motion.img
//                 src={slide.image}
//                 alt={slide.alt}
//                 className="hero-illustration"
//                 width="1024"
//                 height="1024"
//                 animate={reduced ? {} : { y: [0, -8, 0] }}
//                 transition={{
//                   duration: 6,
//                   repeat: Infinity,
//                   ease: 'easeInOut',
//                 }}
//               />

//               <div className="floating-note note-growth">
//                 <Sparkles size={22} />
//                 <span>{slide.note}</span>
//               </div>

//               <div className="floating-note note-care">
//                 <Heart size={22} />
//                 <span>
//                   {slide.label}
//                   <small>{slide.detail}</small>
//                 </span>
//               </div>

        
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {!reduced && (
//         <button
//           type="button"
//           className="hero-autoplay-toggle"
//           onClick={() => setPaused(current => !current)}
//         >
//           {paused ? 'Resume slideshow' : 'Pause slideshow'}
//         </button>
//       )}

//       <button
//   type="button"
//   className="hero-overlay-arrow hero-overlay-prev"
//   aria-label="Previous slide"
//   onClick={() => changeSlide(-1)}
// >
//   <ChevronLeft size={32} strokeWidth={1.5} />
// </button>

// <button
//   type="button"
//   className="hero-overlay-arrow hero-overlay-next"
//   aria-label="Next slide"
//   onClick={() => changeSlide(1)}
// >
//   <ChevronRight size={32} strokeWidth={1.5} />
// </button>
//     </section>
//   );
// }








import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  House,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
  Star,
} from 'lucide-react';

import { useSite } from '../../context/SiteContext';
import { useEnquiry } from '../../context/EnquiryContext';

import logo from '../../assets/abhi-logo.png';
import './Hero.css';

const centreName =
  'Abhi Physiotherapy and Child Neuro Development Centre';

const sectionLinks = [
  ['Home Visits', 'home-visits'],
  ['Overview', 'overview'],
  ['Services', 'services'],
  ['Gallery', 'gallery'],
  ['Reviews', 'reviews'],
  ['Contact', 'contact'],
];

export function HomeSectionTabs() {
  const [active, setActive] = useState('home-visits');

  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio
          );

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: '-150px 0px -35% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    sectionLinks.forEach(([, id]) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="profile-section-tabs"
      aria-label="Explore the centre"
    >
      <div className="profile-tabs-inner shell">
        {sectionLinks.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? 'active' : ''}
            aria-current={active === id ? 'location' : undefined}
            onClick={() => setActive(id)}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default function Hero() {
  const { settings, reviews = [] } = useSite();
  const { openEnquiry } = useEnquiry();

  const reduced = useReducedMotion();

  const [notice, setNotice] = useState('');
  const [copied, setCopied] = useState(false);

  const address = settings.address?.trim() || '';

  const phone = String(settings.phone || '').replace(
    /[^\d+]/g,
    ''
  );

  const whatsapp = String(settings.whatsapp || '').replace(
    /\D/g,
    ''
  );

  const directionsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${centreName}, ${address}`
      )}`
    : '';

  const rating = useMemo(() => {
    const validReviews = reviews.filter(
      review =>
        Number(review.rating) >= 1 &&
        Number(review.rating) <= 5
    );

    if (!validReviews.length) return null;

    const total = validReviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );

    return {
      average: (total / validReviews.length).toFixed(1),
      count: validReviews.length,
    };
  }, [reviews]);

  useEffect(() => {
    if (!notice && !copied) return;

    const timer = window.setTimeout(() => {
      setNotice('');
      setCopied(false);
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [notice, copied]);

  function bookHomeVisit() {
    openEnquiry(null, {
      purpose: 'appointment',
      visitType: 'home',
    });
  }

  async function copyAddress() {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard unavailable');
      }

      await navigator.clipboard.writeText(address);
      setCopied(true);
      setNotice('Address copied.');
    } catch {
      setNotice('Please select and copy the address shown below.');
    }
  }

  async function shareCentre() {
    const url = window.location.origin + '/';

    try {
      if (navigator.share) {
        await navigator.share({
          title: centreName,
          text: 'Physiotherapy and child development care in Patna.',
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setNotice('Website link copied.');
      } else {
        setNotice(`Share this website: ${url}`);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        setNotice(`Share this website: ${url}`);
      }
    }
  }

  return (
    <section
      id="home"
      className="centre-profile"
      aria-labelledby="centre-profile-title"
    >
      <div className="shell">
        <motion.div
          className="centre-profile-card"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45 }}
        >
          <div className="centre-profile-top">
            <div className="centre-profile-copy">
              <span className="centre-profile-eyebrow">
                PHYSIOTHERAPY & CHILD DEVELOPMENT
              </span>

              <h1 id="centre-profile-title">
                Abhi Physiotherapy
                <span>
                  and Child Neuro Development Centre
                </span>
              </h1>

              <p className="centre-location">
                <MapPin size={18} aria-hidden="true" />
                Ram Krishna Nagar, Patna
              </p>

              <div className="centre-rating-row">
                {rating ? (
                  <a
                    href="#reviews"
                    className="centre-rating-link"
                  >
                    <span className="centre-rating-score">
                      {rating.average}
                      <Star
                        size={15}
                        fill="currentColor"
                        aria-hidden="true"
                      />
                    </span>

                    <span>
                      Based on {rating.count} displayed{' '}
                      {rating.count === 1 ? 'review' : 'reviews'}
                    </span>
                  </a>
                ) : (
                  <a
                    href="#reviews"
                    className="centre-first-review"
                  >
                    <Star size={18} aria-hidden="true" />
                    Be the first to share your experience
                  </a>
                )}
              </div>

              <div className="centre-care-tags">
                <span>
                  <House size={16} aria-hidden="true" />
                  Home visits
                </span>

                <span>Adults & children</span>
                <span>Clinic appointments</span>
              </div>
            </div>

            <a
              className="centre-profile-logo"
              href="#gallery"
              aria-label="Explore the centre gallery"
            >
              <img
                src={logo}
                alt="Abhi Physiotherapy centre logo"
                width="144"
                height="144"
              />
            </a>
          </div>

          <p className="centre-profile-intro">
            Caring support for movement, recovery and everyday life.
            Explore physiotherapy for adults and developmental care
            for children—at our centre or in your home.
          </p>

          {settings.hours && (
            <p className="centre-profile-hours">
              <Clock size={18} aria-hidden="true" />
              <span>{settings.hours}</span>
            </p>
          )}

          <div className="centre-profile-actions">
            {phone ? (
              <a
                className="profile-action profile-action-primary"
                href={`tel:${phone}`}
              >
                <Phone size={19} aria-hidden="true" />
                Call Now
              </a>
            ) : (
              <button
                type="button"
                className="profile-action profile-action-primary"
                onClick={bookHomeVisit}
              >
                <Phone size={19} aria-hidden="true" />
                Request a Call
              </button>
            )}

            {whatsapp && (
              <a
                className="profile-action profile-action-whatsapp"
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} aria-hidden="true" />
                WhatsApp
              </a>
            )}

            <button
              type="button"
              className="profile-action"
              onClick={bookHomeVisit}
            >
              <House size={19} aria-hidden="true" />
              Book Home Visit
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="profile-action profile-share-action"
              onClick={shareCentre}
            >
              <Share2 size={19} aria-hidden="true" />
              Share
            </button>
          </div>

          {address && (
            <div className="centre-address-panel">
              <div className="centre-address-copy">
                <MapPin size={21} aria-hidden="true" />

                <div>
                  <h2>Visit our centre</h2>
                  <p>{address}</p>
                </div>
              </div>

              <div className="centre-address-actions">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation size={17} aria-hidden="true" />
                  Directions
                </a>

                <button
                  type="button"
                  onClick={copyAddress}
                >
                  {copied ? (
                    <Check size={17} aria-hidden="true" />
                  ) : (
                    <Copy size={17} aria-hidden="true" />
                  )}

                  {copied ? 'Copied' : 'Copy address'}
                </button>
              </div>
            </div>
          )}

          {notice && (
            <p className="centre-profile-notice" role="status">
              {notice}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}