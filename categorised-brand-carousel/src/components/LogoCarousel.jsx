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
              borderRadius: 24,
              overflow: 'hidden',
              opacity,
              transition: 'transform 0.5s cubic-bezier(.4,2,.3,1), opacity 0.4s',
              background: '#efefef',
              boxShadow: rel === 0 ? '0 16px 48px rgba(0,0,0,0.35)' : '0 4px 16px rgba(0,0,0,0.2)',
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

  const btnBase = {
    position: 'absolute',
    top: '50%',
    zIndex: 200,
    background: 'rgba(255,255,255,0.85)',
    border: '2px solid rgba(0,0,0,0.10)',
    borderRadius: '50%',
    width: 44,
    height: 44,
    cursor: 'pointer',
    fontSize: 22,
    color: '#222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(6px)',
    transition: 'transform 0.12s cubic-bezier(.6,1.5,.5,1)',
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
          top: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.35)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {categoryName} — {index + 1} / {total}
      </p>

      <div
        style={{
          width: CARD_W + 180,
          height: CARD_H + 180,
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
        style={{ ...btnBase, left: 20, transform: `translateY(-50%)${btnDown === 'prev' ? ' scale(0.88)' : ''}` }}
      >
        &#8249;
      </button>

      <button
        aria-label="Next"
        onClick={next}
        onMouseDown={() => setBtnDown('next')}
        onMouseUp={() => setBtnDown('')}
        onMouseLeave={() => setBtnDown('')}
        style={{ ...btnBase, right: 20, transform: `translateY(-50%)${btnDown === 'next' ? ' scale(0.88)' : ''}` }}
      >
        &#8250;
      </button>
    </div>
  );
}
