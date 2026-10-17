import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Reveal, TypeOnView, Timeline } from '../components';

export default function About() {
  const { t, lang } = useOutletContext();
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <>
      <Reveal as="section" className="section">
        <h2 className="section-title">
          <TypeOnView text={t.info.title} />
        </h2>
        {t.info.items.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={`${lang}-${i}`} className={`acc-item ${open ? 'open' : ''}`}>
              <button className="acc-btn" aria-expanded={open} onClick={() => setOpenIdx(open ? -1 : i)}>
                <span>{item.title}</span>
                <span className="acc-icon">+</span>
              </button>
              <div className="acc-body">
                {item.tags ? (
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>{item.text}</p>
                )}
              </div>
            </div>
          );
        })}
      </Reveal>

      <Reveal as="section" className="section">
        <h3 className="sub-title">{t.timeline.title}</h3>
        <Timeline items={t.timeline.items} />
      </Reveal>

      <Reveal as="section" className="section">
        <h3 className="sub-title">{t.process.title}</h3>
        <div className="steps">
          {t.process.steps.map((s, i) => (
            <div key={s.name} className="step-card">
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
