import { Link, useOutletContext } from 'react-router-dom';

export default function NotFound() {
  const { t } = useOutletContext();
  return (
    <section className="section notfound">
      <h2 className="section-title">404 · {t.notFound.title}</h2>
      <Link to="/" className="btn">
        {t.notFound.back}
      </Link>
    </section>
  );
}
