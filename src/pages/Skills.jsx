import { useOutletContext } from 'react-router-dom';
import { Reveal, TypeOnView, SolarSystem } from '../components';

export default function Skills() {
  const { t } = useOutletContext();

  return (
    <>
      <Reveal as="section" className="section">
        <h2 className="section-title">
          <TypeOnView text={t.skills.title} />
        </h2>
        <p className="section-hint">{t.skills.hint}</p>
        <SolarSystem sunLabel="MM" />
      </Reveal>

      <Reveal as="section" className="section">
        <h3 className="sub-title">{t.softSkills.title}</h3>
        <div className="soft-grid">
          {t.softSkills.items.map((s, i) => (
            <div key={s.name} className="soft-card">
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </>
  );
}
