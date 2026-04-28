import { useState } from 'react';

export default function CategoryList({ categories, active, onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        width: '320px',
        minWidth: '260px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 40px',
        gap: '2px',
        overflowY: 'auto',
        flexShrink: 0,
      }}
    >
      {categories.map((name, i) => {
        const isActive = i === active;
        const isHovered = i === hovered;
        const dist = Math.abs(i - active);
        const alpha = isActive ? 1 : Math.max(0.2, 0.55 - dist * 0.07);

        return (
          <div
            key={name}
            onClick={() => onSelect(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              cursor: 'pointer',
              padding: '9px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: isActive ? '20px' : isHovered ? '10px' : '0px',
                  height: '2px',
                  background: '#fff',
                  borderRadius: '1px',
                  transition: 'width 0.3s cubic-bezier(.4,0,.2,1)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: isActive ? '24px' : isHovered ? '19px' : '16px',
                  fontWeight: isActive ? 700 : isHovered ? 500 : 400,
                  color: `rgba(255,255,255,${alpha})`,
                  transition: 'font-size 0.3s cubic-bezier(.4,0,.2,1), color 0.3s',
                  lineHeight: 1.25,
                  letterSpacing: isActive ? '-0.3px' : '0',
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
