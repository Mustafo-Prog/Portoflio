import { Link, useOutletContext } from 'react-router-dom';
import { Reveal, TypeOnView, tilt, Counter, Marquee, ProjectCard, Terminal } from '../components';

const TECH = ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Node.js', 'Express', 'NestJS', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'];

export default function Home() {
  const { t } = useOutletContext();

  return (
    <>
      <section className="hero">
        <Reveal className="hero-text">
          <p className="greet">{t.hero.greeting}</p>
          <h1 className="gradient-text">
            <TypeOnView text={t.hero.name} speed={60} />
          </h1>
          <h2 className="role">{t.hero.role}</h2>
          <p className="subtitle">{t.hero.subtitle}</p>
          <a href="#contact" className="btn magnet">
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

      <Marquee items={TECH} />

      <Reveal as="section" className="section stats-section">
        <div className="stats">
          {t.home.stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-value">
                <Counter value={s.value} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <h2 className="section-title">
          <TypeOnView text={t.terminal.title} />
        </h2>
        <Terminal key={t.terminal.intro} t={t} />
      </Reveal>

      <Reveal as="section" className="section">
        <h2 className="section-title">
          <TypeOnView text={t.home.featured} />
        </h2>
        <div className="project-grid">
          {t.projects.list.slice(0, 2).map((p) => (
            <ProjectCard key={p.url} p={p} />
          ))}
        </div>
        <Link to="/projects" className="text-link">
          {t.home.viewAll}
        </Link>
      </Reveal>

      <Reveal as="section" id="contact" className="section contact">
        <h2 className="section-title">
          <TypeOnView text={t.contact.title} />
        </h2>
        <p>{t.contact.text}</p>
        <a href="mailto:mustafomurtazaev7@gmail.com" className="btn magnet">
          {t.contact.mail}
        </a>
      </Reveal>
    </>
  );
}
