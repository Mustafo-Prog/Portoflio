import { useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export function useScrollVars() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const root = document.documentElement.style;
      root.setProperty('--scroll', y);
      root.setProperty('--progress', max > 0 ? y / max : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export function Reveal({ as: Tag = 'div', className = '', ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`}
      {...rest}
    />
  );
}

export function TypeOnView({ text, speed = 40, className = '' }) {
  const [ref, inView] = useInView(0.5);
  const [out, setOut] = useState('');

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    setOut('');
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed]);

  const done = out.length >= text.length;

  return (
    <span ref={ref} className={className}>
      {out}
      <span className={`caret ${done ? 'done' : ''}`}>|</span>
    </span>
  );
}

export const tilt = {
  onMouseMove: (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--rx', `${-y * 14}deg`);
    e.currentTarget.style.setProperty('--ry', `${x * 14}deg`);
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  },
};

// Каждый навык — планета. k = доля от размера системы (радиус орбиты).
export const SKILL_ORBITS = [
  {
    k: 0.2,
    dur: 18,
    skills: [
      { name: 'HTML', c: '#e34f26' },
      { name: 'CSS', c: '#1572b6' },
      { name: 'JS', c: '#f7df1e' },
    ],
  },
  {
    k: 0.32,
    dur: 26,
    skills: [
      { name: 'React', c: '#61dafb' },
      { name: 'TypeScript', c: '#3178c6' },
      { name: 'Tailwind', c: '#38bdf8' },
    ],
  },
  {
    k: 0.44,
    dur: 36,
    skills: [
      { name: 'Node.js', c: '#83cd29' },
      { name: 'Express', c: '#a1a1aa' },
      { name: 'NestJS', c: '#e0234e' },
      { name: 'MongoDB', c: '#47a248' },
      { name: 'PostgreSQL', c: '#336791' },
    ],
  },
];

export function SolarSystem({ sunLabel = 'MM' }) {
  return (
    <div className="solar">
      <div className="sun">{sunLabel}</div>
      {SKILL_ORBITS.map((orbit, oi) =>
        orbit.skills.map((s, si) => {
          const start = (si / orbit.skills.length) * 360 + oi * 25;
          return (
            <div
              key={s.name}
              className="orbit"
              style={{
                '--r': `calc(var(--solar-size) * ${orbit.k})`,
                '--dur': `${orbit.dur}s`,
                '--start': `${start}deg`,
              }}
            >
              <div className="planet" title={s.name} style={{ '--c': s.c }}>
                {s.name}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
