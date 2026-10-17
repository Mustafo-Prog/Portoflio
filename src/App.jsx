import { useEffect, useState } from 'react';
import { translations } from './i18n';
import { Reveal, TypeOnView, tilt } from './components';

const LINKS = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
];

const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/mustafodev/' },
  { name: 'GitHub', href: 'https://github.com/Mustafo-Prog' },
  { name: 'Telegram', href: 'https://t.me/mustafoprog' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafo-dev' },
  { name: 'Email', href: 'mailto:mustafomurtazaev7@gmail.com' },
];

const LANGS = ['uz', 'ru', 'en'];

export default function App() {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ru');
  const [openIdx, setOpenIdx] = useState(0);
  const t = translations[lang];

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
      <div className="blob" />
      <div className="blob blob-2" />

      <header className="navbar">
        <a href="#home" className="logo">
          MM<span>.</span>
        </a>

        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.key} href={l.href} className="nav-link">
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="nav-tools">
          <div className="lang-switch">
            {LANGS.map((l) => (
              <button
                key={l}
                className={l === lang ? 'active' : ''}
                onClick={() => setLang(l)}
              >
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
        <section id="home" className="hero">
          <Reveal className="hero-text">
            <p className="greet">{t.hero.greeting}</p>
            <h1 className="gradient-text">
              <TypeOnView text={t.hero.name} speed={60} />
            </h1>
            <h2 className="role">{t.hero.role}</h2>
            <p className="subtitle">{t.hero.subtitle}</p>
            <a href="#contact" className="btn">
              {t.hero.cta}
            </a>
          </Reveal>

          <Reveal className="hero-visual">
            <div className="tilt" {...tilt}>
              <div className="avatar-card">
                <span className="initials">MM</span>
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal as="section" id="about" className="section">
          <h2 className="section-title">
            <TypeOnView text={t.info.title} />
          </h2>
          {t.info.items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={`${lang}-${i}`} className={`acc-item ${open ? 'open' : ''}`}>
                <button
                  className="acc-btn"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                >
                  <span>{item.title}</span>
                  <span className="acc-icon">+</span>
                </button>
                <div className="acc-body">
                  <p>{item.text}</p>
                </div>
              </div>
            );
          })}
        </Reveal>

        <Reveal as="section" id="projects" className="section">
          <h2 className="section-title">
            <TypeOnView text={t.projects.title} />
          </h2>
          <div className="project-grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="project">
                <h3>{t.projects.card}</h3>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" id="contact" className="section contact">
          <h2 className="section-title">
            <TypeOnView text={t.contact.title} />
          </h2>
          <p>{t.contact.text}</p>
          <a href="mailto:mustafomurtazaev7@gmail.com" className="btn">
            {t.contact.mail}
          </a>
        </Reveal>
      </main>

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
