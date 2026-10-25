 import { useEffect, useState } from 'react';
 import { services } from '../../data/services';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';
import kidsHero from '../../assets/hero-kids-v2.png';
import adultHero from '../../assets/hero-adults-v2.png';
import './Hero.css';
 

const slides = [
  {
    id: 'adults',
    label: 'Adult physiotherapy at home',
    eyebrow: 'EXPERT CARE. RIGHT AT YOUR DOORSTEP.',
    title: 'Move Better.',
    highlight: 'Recover at Home.',
    description:
      'Personalized physiotherapy for pain relief, mobility and rehabilitation—in the comfort of your home. Our team supports your recovery with care shaped around your needs.',
    image: adultHero,
    alt: 'AI illustration of an adult receiving physiotherapy support',
    assurance: 'Home visits for adults',
    note: 'Expert care, closer to you',
    detail: 'Your recovery. Your familiar space.',
    button: 'Book a Home Visit',
    serviceId: 'at-home-physiotherapy-services',
  },
  {
    id: 'children',
    label: 'Child development care at home',
    eyebrow: 'LITTLE STEPS. IN A FAMILIAR SPACE.',
    title: 'Helping Little Ones Grow,',
    highlight: 'Right at Home.',
    description:
      'Gentle pediatric physiotherapy and neuro developmental support in your child’s familiar surroundings—with parents involved every step of the way.',
    image: kidsHero,
    alt: 'AI illustration of a child practicing movement with a therapist and parent',
    assurance: 'Home visits for children',
    note: 'Growing with confidence',
    detail: 'Care at your child’s pace',
    button: 'Book Your Child’s Home Visit',
    serviceId: 'pediatric-physiotherapy',
  },
];

const SLIDE_INTERVAL = 3000;

export default function Hero() {
  const { openEnquiry } = useEnquiry();
  const reduced = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  const slide = slides[index];
  function bookHomeVisit() {
  const service = services.find(item => item.id === slide.serviceId);

  openEnquiry(service, {
    purpose: 'appointment',
    visitType: 'home',
  });
}

  useEffect(() => {
    slides.forEach(({ image }) => {
      const preload = new Image();
      preload.src = image;
    });

    const updateVisibility = () => {
      setVisible(!document.hidden);
    };

    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
  if (reduced || paused || hovered || focused || !visible) return;

  const timer = window.setTimeout(() => {
    setIndex(current => (current + 1) % slides.length);
   }, SLIDE_INTERVAL);

  return () => window.clearTimeout(timer);
}, [index, reduced, paused, hovered, focused, visible]);

const changeSlide = direction => {
  setIndex(current =>
    (current + direction + slides.length) % slides.length
  );
};
  return (
    <section
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
      id="home"
      className="hero-carousel shell"
      aria-roledescription="carousel"
      aria-label="Care for children and adults"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
    >
      <div
        className="hero-slide-stage"
        aria-live={paused || reduced || focused ? 'polite' : 'off'}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slide.id}
            className="hero-section hero-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
          >
            <div className="hero-copy">
              <span className="eyebrow">
                <span className="status-dot" />
                {slide.eyebrow}
              </span>

              <h1>
                {slide.title}
                <br />
                <span>{slide.highlight}</span>
              </h1>

              <p>{slide.description}</p>

               <div className="hero-actions">
  <button
    type="button"
    className="button"
    onClick={bookHomeVisit}
  >
    {slide.button}
    <ArrowUpRight size={18} />
  </button>

  <a className="button button-outline" href="#services">
    Explore Our Services
    <ArrowDown size={17} />
  </a>
</div>

              <div className="hero-assurance">
                <span>
                  <Heart size={17} />
                  Care with patience
                </span>
                <span>
                  <ShieldCheck size={17} />
                  {slide.assurance}
                </span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-orbit" aria-hidden="true" />

              <motion.img
                src={slide.image}
                alt={slide.alt}
                className="hero-illustration"
                width="1024"
                height="1024"
                animate={reduced ? {} : { y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <div className="floating-note note-growth">
                <Sparkles size={22} />
                <span>{slide.note}</span>
              </div>

              <div className="floating-note note-care">
                <Heart size={22} />
                <span>
                  {slide.label}
                  <small>{slide.detail}</small>
                </span>
              </div>

        
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {!reduced && (
        <button
          type="button"
          className="hero-autoplay-toggle"
          onClick={() => setPaused(current => !current)}
        >
          {paused ? 'Resume slideshow' : 'Pause slideshow'}
        </button>
      )}

      <button
  type="button"
  className="hero-overlay-arrow hero-overlay-prev"
  aria-label="Previous slide"
  onClick={() => changeSlide(-1)}
>
  <ChevronLeft size={32} strokeWidth={1.5} />
</button>

<button
  type="button"
  className="hero-overlay-arrow hero-overlay-next"
  aria-label="Next slide"
  onClick={() => changeSlide(1)}
>
  <ChevronRight size={32} strokeWidth={1.5} />
</button>
    </section>
  );
}