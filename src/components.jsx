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
