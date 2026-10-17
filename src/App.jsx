import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { translations } from './i18n';
import { Reveal, useScrollVars, useMouseGlow, useInteractions, useKonami, BackToTop } from './components';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Reviews from './pages/Reviews';
import NotFound from './pages/NotFound';

const LINKS = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'skills', to: '/skills' },
  { key: 'projects', to: '/projects' },
  { key: 'reviews', to: '/reviews' },
];

const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/mustafodev/' },
  { name: 'GitHub', href: 'https://github.com/Mustafo-Prog' },
  { name: 'Telegram', href: 'https://t.me/mustafoprog' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafo-murtazaev-807a60443/' },
  { name: 'Email', href: 'mailto:mustafomurtazaev7@gmail.com' },
];

const LANGS = ['uz', 'ru', 'en'];

function Layout({ t, lang, setLang, theme, setTheme }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="stars" />
      <div className="progress" />
      <div className="blob" />
      <div className="blob blob-2" />
      <div className="mouse-glow" />

      <header className="navbar">
        <Link to="/" className="logo">
          MM<span>.</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {LINKS.map((l) => (
            <NavLink
              key={l.key}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              end={l.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {t.nav[l.key]}
            </NavLink>
          ))}
        </nav>

        <div className="nav-tools">
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? '✕' : '☰'}
          </button>
          <div className="lang-switch">
            {LANGS.map((l) => (
              <button key={l} className={l === lang ? 'active' : ''} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="theme-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main>
        <div key={pathname} className="page">
          <Outlet context={{ t, lang }} />
        </div>
      </main>

      <BackToTop />

      <Reveal as="footer" className="footer">
        <div className="socials">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="social"
              aria-label={s.name}
            >
              {s.name}
            </a>
          ))}
        </div>
        <p>
          © {new Date().getFullYear()} Mustafo Murtazaev · {t.footer.rights}
        </p>
      </Reveal>
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ru');
  const t = translations[lang];

  useScrollVars();
  useMouseGlow();
  useInteractions();

  const [party, setParty] = useState(false);
  useKonami(setParty);

  useEffect(() => {
    document.documentElement.classList.toggle('party', party);
    if (!party) return;
    const id = setTimeout(() => setParty(false), 8000);
    return () => clearTimeout(id);
  }, [party]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <>
    <Routes>
      <Route
        element={<Layout t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />}
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="skills" element={<Skills />} />
        <Route path="projects" element={<Projects />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    {party && <div className="toast">{t.easter}</div>}
    </>
  );
}
