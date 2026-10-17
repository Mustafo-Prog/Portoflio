import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Reveal, TypeOnView, Rating } from '../components';

const KEY = 'portfolio-reviews';
const EMPTY = { name: '', company: '', message: '', rating: 5 };

function loadReviews() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export default function Reviews() {
  const { t, lang } = useOutletContext();
  const [reviews, setReviews] = useState(loadReviews);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null);

  const update = (field) => (e) => {
    setStatus(null);
    setForm({ ...form, [field]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setStatus('err');
      return;
    }
    const item = {
      id: Date.now(),
      name: form.name.trim(),
      company: form.company.trim(),
      message: form.message.trim(),
      rating: form.rating,
      date: new Date().toISOString(),
    };
    const next = [item, ...reviews];
    setReviews(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    setForm(EMPTY);
    setStatus('ok');
  };

  return (
    <Reveal as="section" className="section">
      <h2 className="section-title">
        <TypeOnView text={t.reviews.title} />
      </h2>
      <p className="section-hint">{t.reviews.hint}</p>

      <form className="review-form" onSubmit={submit}>
        <label className="field-label">
          {t.reviews.form.name}
          <input maxLength={60} value={form.name} onChange={update('name')} />
        </label>
        <label className="field-label">
          {t.reviews.form.company}
          <input maxLength={80} value={form.company} onChange={update('company')} />
        </label>
        <label className="field-label">
          {t.reviews.form.message}
          <textarea maxLength={500} value={form.message} onChange={update('message')} />
        </label>
        <div className="field-label">
          {t.reviews.form.rating}
          <Rating value={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
        </div>
        <button type="submit" className="btn">
          {t.reviews.form.submit}
        </button>
        {status === 'ok' && <p className="form-msg">{t.reviews.form.ok}</p>}
        {status === 'err' && <p className="form-err">{t.reviews.form.err}</p>}
      </form>

      {reviews.length === 0 ? (
        <p className="section-hint">{t.reviews.empty}</p>
      ) : (
        <div className="review-list">
          {reviews.map((r) => (
            <article key={r.id} className="review">
              <div className="r-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              <h4>{r.name}</h4>
              <div className="meta">
                {r.company && `${r.company} · `}
                {new Date(r.date).toLocaleDateString(lang)}
              </div>
              <p>{r.message}</p>
            </article>
          ))}
        </div>
      )}
    </Reveal>
  );
}
