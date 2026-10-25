 import { useEffect, useMemo, useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { serviceMenuItems } from '../layout/ServicesDropdown';
import ServiceCard from './ServiceCard';
import Reveal from '../animations/Reveal';

const short = [
  'All Services',
  'Child & Development',
  'Pain & Orthopedic',
  'Neurological Care',
  'Sports & More',
];

export default function ServicesSection({ onSelect }) {
  const { services, categories } = useSite();

  const [category, setCategory] = useState('All services');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let scrollFrame;

    function handleCategoryNavigation() {
      const hash = window.location.hash.slice(1);

      const selectedItem = serviceMenuItems.find(
        item => item.hash === hash
      );

      if (hash !== 'services' && !selectedItem) return;

      setCategory(selectedItem?.category || 'All services');
      setQuery('');
      setExpanded(Boolean(selectedItem));

      window.cancelAnimationFrame(scrollFrame);

      scrollFrame = window.requestAnimationFrame(() => {
        const reducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        document.getElementById('services')?.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    }

    handleCategoryNavigation();

    window.addEventListener(
      'hashchange',
      handleCategoryNavigation
    );

    return () => {
      window.removeEventListener(
        'hashchange',
        handleCategoryNavigation
      );

      window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  const filtered = useMemo(() => {
    const search = query.toLowerCase().trim();

    return services.filter(service => {
      const matchesCategory =
        category === 'All services' ||
        service.category === category;

      const matchesSearch = service.name
        .toLowerCase()
        .includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [services, category, query]);

  const groups =
    category === 'All services'
      ? categories.slice(1)
      : [category];

  const hasMoreServices = groups.some(
    group =>
      filtered.filter(service => service.category === group)
        .length > 4
  );

  return (
    <section
      id="services"
      className="section services-section shell"
    >
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">CARE FOR EVERY AGE</span>

          <h2>
            The right care.
            <br />
            <span>For your next step.</span>
          </h2>
        </div>

        <label className="search">
          <span className="sr-only">Search services</span>

          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search pain, therapy or rehabilitation…"
          />
        </label>
      </Reveal>

      <div className="filters" aria-label="Service categories">
        {categories.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setCategory(item);
              setExpanded(false);
            }}
            className={category === item ? 'active' : ''}
            aria-pressed={category === item}
          >
            {short[index] || item}
          </button>
        ))}
      </div>

      <p className="results" role="status">
        {filtered.length} services available to explore
      </p>

      {groups.map(group => {
        const all = filtered.filter(
          service => service.category === group
        );

        if (!all.length) return null;

        const shown =
          expanded || query.trim() ? all : all.slice(0, 4);

        return (
          <div key={group} className="service-group">
            <h3 className="service-group-title">{group}</h3>

            <div className="service-grid">
              {shown.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        );
      })}

      {!filtered.length && (
        <p className="empty">
          No matching services. Try a different search.
        </p>
      )}

      {!expanded && !query.trim() && hasMoreServices && (
        <div className="all-services-action">
          <button
            type="button"
            className="button button-outline"
            onClick={() => setExpanded(true)}
          >
            View all {filtered.length} services
          </button>
        </div>
      )}
    </section>
  );
}