 import { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MessageSquare,
  CalendarHeart,
} from 'lucide-react';

import { useEnquiry } from '../../context/EnquiryContext';
import { useSite } from '../../context/SiteContext';

export default function FloatingEnquiry() {
  const { openEnquiry } = useEnquiry();
  const { settings } = useSite();
  const [notice, setNotice] = useState('');

  function bookHomeVisit() {
    setNotice('');

    openEnquiry(null, {
      purpose: 'appointment',
      visitType: 'home',
    });
  }

  return (
    <>
      <aside className="floating-stack" aria-label="Contact options">
        {notice && (
          <p className="contact-notice" role="status">
            {notice}
          </p>
        )}

        {settings.phone ? (
          <a
            className="float-action call-action"
            href={`tel:${settings.phone}`}
            aria-label="Call Now"
          >
            <Phone size={20} />
            <span>Call Now</span>
          </a>
        ) : (
          <button
            type="button"
            className="float-action call-action"
            aria-label="Call Now"
            onClick={() =>
              setNotice(
                'The centre’s phone number has not been added yet. Please request a home visit using the enquiry button.'
              )
            }
          >
            <Phone size={20} />
            <span>Call Now</span>
          </button>
        )}

        {settings.whatsapp ? (
          <a
            className="float-action whatsapp-action"
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} />
            <span>WhatsApp</span>
          </a>
        ) : (
          <button
            type="button"
            className="float-action whatsapp-action"
            aria-label="WhatsApp"
            onClick={() =>
              setNotice(
                'WhatsApp details are not available yet. Please request a home visit using the enquiry button.'
              )
            }
          >
            <MessageCircle size={20} />
            <span>WhatsApp</span>
          </button>
        )}

        <button
          type="button"
          className="float-action enquiry-action"
          aria-label="Enquiry"
          onClick={bookHomeVisit}
        >
          <MessageSquare size={20} />
          <span>Enquiry</span>
        </button>
      </aside>

      <div className="mobile-book-bar">
        <button
          type="button"
          className="button full"
          onClick={bookHomeVisit}
        >
          <CalendarHeart size={19} />
          Book Home Visit
        </button>
      </div>
    </>
  );
}