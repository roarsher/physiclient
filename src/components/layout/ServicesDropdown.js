import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './ServicesDropdown.css';

export const serviceMenuItems = [
  {
    hash: 'services-child',
    label: 'Child Development & Pediatric Care',
    category: 'Child Neuro Development & Pediatric Services',
  },
  {
    hash: 'services-pain',
    label: 'Pain Management & Orthopedic Care',
    category: 'Pain Management & Orthopedic Physiotherapy',
  },
  {
    hash: 'services-neuro',
    label: 'Neurological & Special Care',
    category: 'Neurological & Special Care',
  },
  {
    hash: 'services-sports',
    label: 'Sports & Other Services',
    category: 'Sports & Other Services',
  },
];

export default function ServicesDropdown({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    function handleOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', handleOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  function navigate(hash) {
    // Refresh the selection even when clicking the same category again.
    if (window.location.hash === `#${hash}`) {
      window.dispatchEvent(new Event('hashchange'));
    }

    setOpen(false);
    onNavigate?.();
  }

  return (
    <div
      className="services-dropdown"
      ref={containerRef}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="services-dropdown-trigger"
        aria-expanded={open}
        onClick={() => setOpen(current => !current)}
      >
        Our Services
        <ChevronDown
          size={16}
          className={open ? 'rotated' : ''}
        />
      </button>

      {open && (
        <div className="services-dropdown-panel">
          <a
            href="#services"
            onClick={() => navigate('services')}
          >
            View All Services
          </a>

          {serviceMenuItems.map(item => (
            <a
              key={item.hash}
              href={`#${item.hash}`}
              onClick={() => navigate(item.hash)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}