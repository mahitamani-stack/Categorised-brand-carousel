import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';

const spring = { type: 'spring', bounce: 0, duration: 0.4 };

export default function CategoryList({ categories, active, onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        width: '45%',
        minWidth: '360px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 64px',
        gap: '12px',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <LayoutGroup>
        {categories.map((name, i) => {
          const isActive = i === active;
          const isHovered = i === hovered && !isActive;

          const fontSize  = isActive ? 52 : isHovered ? 32 : 26;
          const color     = isActive ? '#ffffff' : isHovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)';
          const wght      = isActive ? 700 : isHovered ? 450 : 300;

          return (
            <motion.div
              key={name}
              layout
              transition={spring}
              onClick={() => onSelect(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <motion.span
                animate={{ fontSize, color }}
                transition={spring}
                style={{
                  display: 'block',
                  fontVariationSettings: `'wght' ${wght}`,
                  lineHeight: 1.15,
                  letterSpacing: '-0.5px',
                  whiteSpace: 'nowrap',
                  transition: 'font-variation-settings 0.4s cubic-bezier(.4,0,.2,1)',
                }}
              >
                {name}
              </motion.span>
            </motion.div>
          );
        })}
      </LayoutGroup>
    </div>
  );
}
