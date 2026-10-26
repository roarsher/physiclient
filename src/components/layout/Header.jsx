 import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import { useEnquiry } from '../../context/EnquiryContext';
import logo from '../../assets/abhi-logo.png';
import ServicesDropdown from './ServicesDropdown';

const links = [
  ['Home', 'home'],
  ['Home Visits', 'home-visits'],
  ['Our Services', 'services'],
  ['Why Us', 'why-us'],
  ['About', 'about'],
  ['Gallery', 'gallery'],
  ['Reviews', 'reviews'],
  ['Contact', 'contact'],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const { openEnquiry } = useEnquiry();
  const reduced = useReducedMotion();

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function bookHomeVisit() {
    setOpen(false);

    openEnquiry(null, {
      purpose: 'appointment',
      visitType: 'home',
    });
  }

  return (
    <header className="site-header">
      <div className="navbar shell">
        <a
          className="brand"
          href="#home"
          onClick={() => setOpen(false)}
          aria-label="Abhi Physiotherapy home"
        >
          <img src={logo} alt="" />

          <span>
            Abhi Physiotherapy
            <small>Child Neuro Development Centre</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, id]) =>
            id === 'services' ? (
              <ServicesDropdown key={id} />
            ) : (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            )
          )}

          <a className="admin-nav-link" href="/admin">
            Admin Login
          </a>
        </nav>

        <button
          type="button"
          className="button nav-appointment"
          onClick={bookHomeVisit}
        >
          Book Home Visit
          <ArrowUpRight size={17} />
        </button>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(current => !current)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            {links.map(([label, id]) =>
              id === 'services' ? (
                <ServicesDropdown
                  key={id}
                  onNavigate={() => setOpen(false)}
                />
              ) : (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                  <ArrowUpRight size={16} />
                </a>
              )
            )}

            <a href="/admin" onClick={() => setOpen(false)}>
              Admin Login
            </a>

            <button
              type="button"
              className="button"
              onClick={bookHomeVisit}
            >
              Book Home Visit
              <ArrowUpRight size={17} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}