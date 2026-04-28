import { useState, useCallback, useEffect, useMemo } from 'react';

const CARD_W = 322;
const CARD_H = 202;
const GAP = 36;
const SCALE_STEP = 0.14;
const Z_STEP = 36;
const PERSPECTIVE = 700;
const ROTATE_STEP = 10;
const Y_STEP = 22;

export default function LogoCarousel({ images, categoryName }) {
  const [index, setIndex] = useState(0);
  const [btnDown, setBtnDown] = useState('');
  const total = images.length;

  useEffect(() => { setIndex(0); }, [categoryName]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  const cards = useMemo(
    () =>
      images.map((img, i) => {
        let rel = i - index;
        if (rel < -Math.floor(total / 2)) rel += total;
        if (rel > Math.floor(total / 2)) rel -= total;
        const absRel = Math.abs(rel);

        const x = rel * GAP;
        const y = rel * Y_STEP;
        const z = -absRel * Z_STEP;
        const scale = 1 / (1 + absRel * SCALE_STEP);
        const rotate = rel * ROTATE_STEP;
        const opacity = rel === 0 ? 1 : Math.max(0.08, 0.65 - absRel * 0.12);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: CARD_W,
              height: CARD_H,
              transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) translateZ(${z}px) scale(${scale}) rotateZ(${rotate}deg)`,
              zIndex: 100 - absRel,
              borderRadius: 12,
              overflow: 'hidden',
              opacity,
              transition: 'transform 0.5s cubic-bezier(.4,2,.3,1), opacity 0.4s',
              background: 'var(--card-bg)',
              boxShadow:
                rel === 0
                  ? '0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)'
                  : '0 4px 14px rgba(0,0,0,0.30)',
              pointerEvents: rel === 0 ? 'auto' : 'none',
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '10px',
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

  const btnBase = {
    position: 'absolute',
    top: '50%',
    zIndex: 200,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: '50%',
    width: 36,
    height: 36,
    cursor: 'pointer',
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(6px)',
    transition: 'transform 0.12s cubic-bezier(.6,1.5,.5,1), background 0.15s',
  };

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <p
        style={{
          position: 'absolute',
          top: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {categoryName} &mdash; {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>

      <div
        style={{
          width: CARD_W + 140,
          height: CARD_H + 140,
          position: 'relative',
          perspective: `${PERSPECTIVE}px`,
          pointerEvents: 'none',
        }}
      >
        {cards}
      </div>

      <button
        aria-label="Previous"
        onClick={prev}
        onMouseDown={() => setBtnDown('prev')}
        onMouseUp={() => setBtnDown('')}
        onMouseLeave={() => setBtnDown('')}
        style={{
          ...btnBase,
          left: 16,
          transform: `translateY(-50%)${btnDown === 'prev' ? ' scale(0.88)' : ''}`,
        }}
      >
        &#8249;
      </button>

      <button
        aria-label="Next"
        onClick={next}
        onMouseDown={() => setBtnDown('next')}
        onMouseUp={() => setBtnDown('')}
        onMouseLeave={() => setBtnDown('')}
        style={{
          ...btnBase,
          right: 16,
          transform: `translateY(-50%)${btnDown === 'next' ? ' scale(0.88)' : ''}`,
        }}
      >
        &#8250;
      </button>
    </div>
  );
}
