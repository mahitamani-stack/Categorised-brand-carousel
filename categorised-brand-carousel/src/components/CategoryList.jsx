import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';

const spring = { type: 'spring', bounce: 0, duration: 0.4 };

export default function CategoryList({ categories, active, onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        width: '400px',
        minWidth: '300px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 32px',
        overflowY: 'auto',
        flexShrink: 0,
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Clientele
      </p>

      <LayoutGroup>
        {categories.map((name, i) => {
          const isActive = i === active;
          const isHovered = i === hovered;
          const dist = Math.abs(i - active);
          const alpha = isActive ? 1 : Math.max(0.18, 0.52 - dist * 0.06);

          return (
            <motion.div
              key={name}
              layout
              transition={spring}
              onClick={() => onSelect(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0, transition: { ...spring, delay: i * 0.04 } }}
              style={{
                cursor: 'pointer',
                padding: '3px 0',
                position: 'relative',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                userSelect: 'none',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="indicator"
                  transition={spring}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '-32px',
                    right: '-32px',
                    background: 'rgba(255,255,255,0.04)',
                    borderLeft: '1.5px solid rgba(255,255,255,0.45)',
                    pointerEvents: 'none',
                  }}
                />
              )}

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <motion.span
                  animate={{
                    color: isActive ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)',
                  }}
                  transition={spring}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    letterSpacing: '0.1em',
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.span>

                <motion.span
                  animate={{
                    fontSize: isActive ? '26px' : isHovered ? '16px' : '11px',
                    color: `rgba(255,255,255,${alpha})`,
                  }}
                  transition={spring}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: isActive ? 700 : 300,
                    fontStyle: 'normal',
                    textTransform: 'uppercase',
                    lineHeight: 1.2,
                    letterSpacing: isActive ? '0.06em' : '0.1em',
                    whiteSpace: 'nowrap',
                    display: 'block',
                  }}
                >
                  {name}
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </LayoutGroup>
    </div>
  );
}
