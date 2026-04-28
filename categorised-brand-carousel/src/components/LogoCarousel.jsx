import { useState, useCallback, useEffect, useMemo } from 'react';

const CARD_W = 320;
const CARD_H = 200;
const GAP = 55;
const SCALE_STEP = 0.14;
const Z_STEP = 50;
const PERSPECTIVE = 800;
const ROTATE_STEP = 10;
const Y_STEP = 45;

export default function LogoCarousel({ images, categoryName }) {
  const [index, setIndex] = useState(0);
  const [btnDown, setBtnDown] = useState('');
  const total = images.length;

  useEffect(() => { setIndex(0); }, [categoryName]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  const cards = useMemo(() =>
    images.map((img, i) => {
      let rel = i - index;
      if (rel < -Math.floor(total / 2)) rel += total;
      if (rel > Math.floor(total / 2))  rel -= total;
      const absRel = Math.abs(rel);

      const x      = rel * GAP;
      const y      = rel * Y_STEP;
      const z      = -absRel * Z_STEP;
      const scale  = 1 / (1 + absRel * SCALE_STEP);
      const rotate = rel * ROTATE_STEP;
      const opacity = rel === 0 ? 1 : Math.max(0.07, 0.62 - absRel * 0.13);

      return (
        <div key={i} style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: CARD_W, height: CARD_H,
          transform: `translate(-50%,-50%) translateX(${x}px) translateY(${y}px) translateZ(${z}px) scale(${scale}) rotateZ(${rotate}deg)`,
          zIndex: 100 - absRel,
          borderRadius: 20,
          overflow: 'hidden',
          opacity,
          transition: 'transform 0.5s cubic-bezier(.4,2,.3,1), opacity 0.4s',
          background: 'var(--card-bg)',
          boxShadow: rel === 0
            ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,151,74,0.15)'
            : '0 6px 20px rgba(0,0,0,0.3)',
          pointerEvents: rel === 0 ? 'auto' : 'none',
        }}>
          <img
            src={img.src} alt={img.alt}
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain',
              padding: '28px',
              display: 'block',
              boxSizing: 'border-box',
            }}
            draggable={false}
          />
        </div>
      );
    }),
    [images, index, total],
  );

  const btn = (side, isDown) => ({
    position: 'absolute',
    [side]: 24,
    top: '50%',
    transform: `translateY(-50%)${isDown ? ' scale(0.88)' : ''}`,
    zIndex: 200,
    background: 'rgba(200,151,74,0.08)',
    border: '1px solid rgba(200,151,74,0.30)',
    borderRadius: '50%',
    width: 42, height: 42,
    cursor: 'pointer',
    fontSize: 20,
    color: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.12s cubic-bezier(.6,1.5,.5,1), background 0.2s',
  });

  return (
    <div style={{
      flex: 1, height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Counter */}
      <p style={{
        position: 'absolute', top: 40,
        left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(200,151,74,0.45)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        {String(index + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
      </p>

      {/* 3-D stage */}
      <div style={{
        width: CARD_W + 180, height: CARD_H + 180,
        position: 'relative',
        perspective: `${PERSPECTIVE}px`,
        pointerEvents: 'none',
      }}>
        {cards}
      </div>

      <button aria-label="Previous" onClick={prev}
        onMouseDown={() => setBtnDown('prev')}
        onMouseUp={() => setBtnDown('')}
        onMouseLeave={() => setBtnDown('')}
        style={btn('left', btnDown === 'prev')}>&#8249;</button>

      <button aria-label="Next" onClick={next}
        onMouseDown={() => setBtnDown('next')}
        onMouseUp={() => setBtnDown('')}
        onMouseLeave={() => setBtnDown('')}
        style={btn('right', btnDown === 'next')}>&#8250;</button>
    </div>
  );
}
