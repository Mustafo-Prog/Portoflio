import { useOutletContext } from 'react-router-dom';
import { Reveal, TypeOnView, ProjectCard } from '../components';

export default function Projects() {
  const { t } = useOutletContext();

  return (
    <Reveal as="section" className="section">
      <h2 className="section-title">
        <TypeOnView text={t.projects.title} />
      </h2>
      <div className="project-grid">
        {t.projects.list.map((p) => (
          <ProjectCard key={p.url} p={p} />
        ))}
        <ProjectCard soon label={t.projects.card} />
      </div>
    </Reveal>
  );
}
