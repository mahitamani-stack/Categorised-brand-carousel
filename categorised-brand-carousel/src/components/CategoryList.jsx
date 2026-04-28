import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';

const spring = { type: 'spring', bounce: 0, duration: 0.4 };

export default function CategoryList({ categories, active, onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      width: '48%',
      minWidth: '340px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 72px',
      flexShrink: 0,
      overflow: 'hidden',
      gap: 0,
    }}>

      {/* Eyebrow label */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '0.22em',
        color: 'var(--accent)',
        textTransform: 'uppercase',
        marginBottom: '36px',
        opacity: 0.8,
      }}>
        FMCG Brand Index — India
      </p>

      <LayoutGroup id="cat-list">
        {categories.map((name, i) => {
          const isActive  = i === active;
          const isHovered = i === hovered && !isActive;
          const num = String(i + 1).padStart(2, '0');

          return (
            <motion.div
              key={name}
              layout
              transition={spring}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0, transition: { ...spring, delay: i * 0.055 } }}
              onClick={() => onSelect(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: 'pointer',
                userSelect: 'none',
                paddingLeft: '2px',
              }}
            >
              {/* Sliding gold bookmark — shared layout element */}
              {isActive && (
                <motion.div
                  layoutId="bookmark"
                  transition={spring}
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    bottom: '-3px',
                    left: '-28px',
                    right: '-36px',
                    background: 'var(--accent-dim)',
                    borderLeft: '2px solid var(--accent)',
                    zIndex: 0,
                    borderRadius: '0 1px 1px 0',
                  }}
                />
              )}

              {/* Index number */}
              <motion.span
                animate={{ color: isActive ? 'var(--accent)' : 'var(--muted)' }}
                transition={spring}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.04em',
                  zIndex: 1,
                  flexShrink: 0,
                  width: '18px',
                }}
              >
                {num}
              </motion.span>

              {/* Category name */}
              <motion.span
                animate={{
                  fontSize:  isActive ? '50px' : isHovered ? '29px' : '24px',
                  color:     isActive ? '#EDE8DE' : isHovered ? 'rgba(237,232,222,0.52)' : 'rgba(237,232,222,0.22)',
                }}
                transition={spring}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: isActive ? 700 : 300,
                  fontStyle:  isActive ? 'italic' : 'normal',
                  lineHeight: 1.1,
                  letterSpacing: isActive ? '-1px' : '-0.2px',
                  whiteSpace: 'nowrap',
                  zIndex: 1,
                  transition: 'font-weight 0.3s ease, font-style 0s',
                }}
              >
                {name}
              </motion.span>
            </motion.div>
          );
        })}
      </LayoutGroup>

      {/* Footer rule */}
      <div style={{
        marginTop: '40px',
        height: '1px',
        background: 'var(--divider)',
        width: '48px',
        opacity: 0.6,
      }} />
    </div>
  );
}
