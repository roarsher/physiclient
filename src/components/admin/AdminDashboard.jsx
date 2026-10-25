import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Inbox,
  Star,
  Images,
  Settings,
  LogOut,
  ExternalLink,
  LockKeyhole,
} from 'lucide-react';

import { api } from '../../services/api';
import logo from '../../assets/abhi-logo.png';

import {
  OverviewPanel,
  EnquiriesPanel,
  VisitorsPanel,
  ReviewsPanel,
  GalleryPanel,
  SettingsPanel,
} from './AdminPanels';

const tabs = [
  ['overview', 'Overview', LayoutDashboard],
  ['enquiries', 'Enquiries', Inbox],
  ['visitors', 'Visitors', Users],
  ['reviews', 'Reviews', Star],
  ['gallery', 'Gallery', Images],
  ['settings', 'Contact & Settings', Settings],
];

export default function AdminDashboard() {
  const [auth, setAuth] = useState(null);
  const [tab, setTab] = useState('overview');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;

    api('/api/admin/session')
      .then(() => {
        if (active) setAuth(true);
      })
      .catch(() => {
        if (active) setAuth(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
  function handleSessionExpired() {
    setAuth(false);
    setTab('overview');
    setError('Your session is unavailable. Please sign in again.');
  }

  window.addEventListener(
    'admin-session-expired',
    handleSessionExpired
  );

  return () => {
    window.removeEventListener(
      'admin-session-expired',
      handleSessionExpired
    );
  };
}, []);

async function login(event) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  let credentialsAccepted = false;

  setBusy(true);
  setError('');

  try {
    await api('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({
        email: String(form.get('email') || '').trim(),
        password: String(form.get('password') || ''),
      }),
    });

    credentialsAccepted = true;

    const session = await api('/api/admin/session');

    if (!session?.authenticated) {
      throw new Error('Unable to verify your login session.');
    }

    setTab('overview');
    setError('');
    setAuth(true);
  } catch (error) {
    setAuth(false);

    if (error.status === 401) {
      setError(
        credentialsAccepted
          ? 'Credentials accepted, but the session was not retained.'
          : 'Incorrect admin email or password.'
      );
    } else {
      setError(error.message || 'Unable to sign in.');
    }
  } finally {
    setBusy(false);
  }
}

  async function logout() {
    setBusy(true);
    setError('');

    try {
      await api('/api/admin/logout', {
        method: 'POST',
      });

      setAuth(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  if (auth === null) {
    return (
      <div className="admin-loading" role="status">
        Opening secure dashboard…
      </div>
    );
  }

  if (!auth) {
    return (
      <main className="admin-login-page">
        <div className="admin-login-card">
          <a href="/" className="login-logo">
            <img src={logo} alt="Abhi centre logo" />

            <span>
              Abhi Physiotherapy
              <small>Website administration</small>
            </span>
          </a>

          <span className="login-lock">
            <LockKeyhole size={25} />
          </span>

          <h1>Welcome back.</h1>

          <p>
            Sign in to manage enquiries, reviews, media and
            contact details.
          </p>

          <form className="enquiry-form" onSubmit={login}>
            <label>
              Admin email / username
              <input
                name="email"
                autoComplete="username"
                required
                placeholder="Your admin login"
              />
            </label>

            <label>
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>

            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="button full"
              disabled={busy}
            >
              {busy ? 'Signing in…' : 'Sign in securely'}
            </button>
          </form>

          <a href="/" className="back-link">
            ← Back to website
          </a>
        </div>
      </main>
    );
  }

  const Panel = {
    overview: OverviewPanel,
    enquiries: EnquiriesPanel,
    visitors: VisitorsPanel,
    reviews: ReviewsPanel,
    gallery: GalleryPanel,
    settings: SettingsPanel,
  }[tab];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/" className="admin-brand">
          <img src={logo} alt="" />

          <span>
            Abhi
            <small>Website manager</small>
          </span>
        </a>

        <nav aria-label="Admin sections">
          {tabs.map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={tab === id ? 'active' : ''}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <a
          className="admin-view-site"
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={17} />
          View website
        </a>

        <button
          type="button"
          className="admin-logout"
          disabled={busy}
          onClick={logout}
        >
          <LogOut size={17} />
          Sign out
        </button>
      </aside>

      <main className="admin-content">
        <header className="admin-page-header">
          <div>
            <span className="eyebrow">
              ABHI WEBSITE MANAGER
            </span>

            <h1>{tabs.find(item => item[0] === tab)?.[1]}</h1>
          </div>

          <span className="admin-session-label">
            <span />
            Secure session
          </span>
        </header>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <Panel key={tab} />
      </main>
    </div>
  );
}