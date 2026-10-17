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

export function useMouseGlow() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const move = (e) => {
      const root = document.documentElement.style;
      root.setProperty('--mx', `${e.clientX}px`);
      root.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
}

export function Reveal({ as: Tag = 'div', className = '', ...rest }) {
  const [ref, inView] = useInView();
  return <Tag ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} {...rest} />;
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

export function Counter({ value }) {
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, '');
  const [ref, inView] = useInView(0.6);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    let start;
    const step = (ts) => {
      if (start === undefined) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setN(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <span ref={ref}>{n}{suffix}</span>;
}

export function Marquee({ items }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((x, i) => (
          <span key={i}>{x}</span>
        ))}
      </div>
    </div>
  );
}

export function Rating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="rating" role="radiogroup">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          className={n <= shown ? 'on' : ''}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          aria-label={`${n}`}
        >
          ★
        </button>
      ))}
    </div>
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

export function ProjectCard({ p, soon, label }) {
  if (soon) {
    return (
      <div className="project soon">
        <h3>{label}</h3>
      </div>
    );
  }
  return (
    <a href={p.url} target="_blank" rel="noreferrer" className="project tilt-card" {...tilt}>
      <h3 className="p-name">{p.name}</h3>
      <p>{p.desc}</p>
      <span className="p-stack">{p.stack}</span>
    </a>
  );
}

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
  const [paused, setPaused] = useState(false);
  return (
    <div className={`solar ${paused ? 'paused' : ''}`}>
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
              <div
                className="planet"
                data-name={s.name}
                style={{ '--c': s.c }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {s.name}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}


// ---------- v8: курсор, магнит, терминал, таймлайн, пасхалка ----------

export function useInteractions() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.documentElement.classList.add('custom-cursor');
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf;

    const hoverSel = 'a, button, input, textarea, .planet, .project, .soft-card, .step-card, .stat, .review';

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;

      // Магнитные кнопки: тянутся к курсору, когда он рядом
      const btn = e.target.closest ? e.target.closest('.btn') : null;
      document.querySelectorAll('.btn.magnet').forEach((b) => {
        if (b !== btn) b.style.translate = '0px 0px';
      });
      if (btn) {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
        btn.classList.add('magnet');
        btn.style.translate = `${x}px ${y}px`;
      }
    };

    const onOver = (e) => {
      if (e.target.closest && e.target.closest(hoverSel)) ring.classList.add('hover');
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(hoverSel)) ring.classList.remove('hover');
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      dot.remove();
      ring.remove();
      document.documentElement.classList.remove('custom-cursor');
    };
  }, []);
}

export function useKonami(onTrigger) {
  useEffect(() => {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === seq[idx]) {
        idx += 1;
        if (idx === seq.length) {
          idx = 0;
          onTrigger(true);
        }
      } else {
        idx = key === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onTrigger]);
}

export function Terminal({ t }) {
  const [lines, setLines] = useState([{ cmd: null, out: t.terminal.intro }]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const submit = (e) => {
    e.preventDefault();
    const cmd = value.trim().toLowerCase();
    setValue('');
    setHIdx(-1);
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 50));
    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    const out = t.terminal.commands[cmd] ?? t.terminal.unknown;
    setLines((l) => [...l, { cmd, out }]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      setHIdx(next);
      setValue(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = hIdx - 1;
      setHIdx(next);
      setValue(next >= 0 ? history[next] : '');
    }
  };

  return (
    <div className="terminal">
      <div className="term-bar">
        <span />
        <span />
        <span />
        <em>{t.terminal.title}</em>
      </div>
      <div className="term-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <div key={i} className="term-line">
            {l.cmd && (
              <div>
                <span className="prompt">$</span> <span className="cmd">{l.cmd}</span>
              </div>
            )}
            <pre className="term-out">{l.out}</pre>
          </div>
        ))}
      </div>
      <form className="term-form" onSubmit={submit}>
        <span className="prompt">$</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t.terminal.placeholder}
          aria-label="terminal input"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}

export function Timeline({ items }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max((window.innerHeight * 0.6 - r.top) / r.height, 0), 1);
      el.style.setProperty('--fill', p.toFixed(3));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="timeline" ref={ref}>
      {items.map((it) => (
        <Reveal key={it.label} className="tl-item">
          <h4>{it.label}</h4>
          <p>{it.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

// Кнопка "наверх" появляется после 600px прокрутки
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => setShow(window.scrollY > 600);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <button
      className={`to-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
