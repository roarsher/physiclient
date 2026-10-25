 import { useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { submitEnquiry } from '../../services/api';

export default function EnquiryForm({
  service = null,
  purpose = 'appointment',
  initialVisitType = 'clinic',
  onDone,
}) {
  const [saved, setSaved] = useState(null);

  const [visitType, setVisitType] = useState(
    service?.homeVisit || initialVisitType === 'home'
      ? 'home'
      : 'clinic'
  );

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const sending = useRef(false);

  async function submit(event) {
    event.preventDefault();

    if (sending.current) return;

    const form = new FormData(event.currentTarget);

    sending.current = true;
    setBusy(true);
    setError('');

    try {
      const result = await submitEnquiry({
        name: String(form.get('name')).trim(),
        phone: String(form.get('phone')).trim(),
        email: String(form.get('email') || '').trim(),
        serviceId: service?.id || null,
        message: String(form.get('message')).trim(),
        visitType,
        homeAddress:
          visitType === 'home'
            ? String(form.get('homeAddress') || '').trim()
            : '',
        requestedFor: purpose,
      });

      setSaved(result);
    } catch (err) {
      setError(err.message || 'Unable to send. Please try again.');
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  if (saved) {
    return (
      <div className="enquiry-success" role="status">
        <CheckCircle2 size={42} />

        <h3>Thank you for reaching out.</h3>

        <p>
          The centre has received your enquiry and can contact you
          using the number you provided.
        </p>

        <p className="muted">Reference: {saved.id}</p>

        <p className="fineprint">
          An enquiry does not confirm an appointment. The team will
          confirm availability.
        </p>

        {onDone && (
          <button
            type="button"
            className="button full"
            onClick={onDone}
          >
            Done
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="enquiry-form"
      aria-busy={busy}
    >
      {service && (
        <p className="selected-service">
          Enquiry for {service.name}
        </p>
      )}

      {purpose === 'free-assessment' && (
        <p className="selected-service">
          Free assessment request
        </p>
      )}

      <div className="form-row">
        <label>
          Your name / parent’s name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            placeholder="Your full name"
          />
        </label>

        <label>
          Mobile number
          <input
            name="phone"
            autoComplete="tel"
            type="tel"
            inputMode="tel"
            required
            maxLength={24}
            placeholder="Your contact number"
          />
        </label>
      </div>

      <label>
        Email <span className="optional">(optional)</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          maxLength={160}
          placeholder="Your email address"
        />
      </label>

      {service?.homeVisit ? (
        <p className="selected-service">Home visit enquiry</p>
      ) : (
        <label>
          Visit preference
          <select
            value={visitType}
            onChange={event => setVisitType(event.target.value)}
          >
            <option value="clinic">Visit the centre</option>
            <option value="home">Request a home visit</option>
          </select>
        </label>
      )}

      {visitType === 'home' && (
        <>
          <label>
            Home address
            <textarea
              name="homeAddress"
              autoComplete="street-address"
              required
              minLength={10}
              maxLength={300}
              rows={3}
              placeholder="House / flat, street, locality and city"
            />
          </label>

          <p className="fineprint">
            The team will confirm area coverage, availability and
            home-visit charges.
          </p>
        </>
      )}

      <label>
        How can we help?{' '}
        <span className="optional">(optional)</span>
        <textarea
          name="message"
          rows={3}
          maxLength={500}
          placeholder="Tell us what you would like to discuss."
        />
      </label>

      <p className="fineprint">
        Submitting shares your contact details with the centre so
        it can respond. Please avoid sharing medical records here.
      </p>

      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      <button
        className="button full"
        disabled={busy}
        type="submit"
      >
        {busy ? 'Sending…' : 'Send appointment request'}
        <ArrowUpRight size={18} />
      </button>
    </form>
  );
}