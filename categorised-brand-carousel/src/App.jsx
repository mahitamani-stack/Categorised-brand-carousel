import { useState } from 'react';
import CategoryList from './components/CategoryList.jsx';
import LogoCarousel from './components/LogoCarousel.jsx';
import { categories } from './data/categories.js';

export default function App() {
  const [active, setActive] = useState(0);

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      <CategoryList
        categories={categories.map((c) => c.name)}
        active={active}
        onSelect={setActive}
      />

      {/* Gold divider */}
      <div style={{
        width: '1px',
        background: 'var(--divider)',
        flexShrink: 0,
        margin: '56px 0',
      }} />

      {/* Right panel */}
      <div
        key={active}
        style={{
          flex: 1,
          height: '100%',
          background: 'var(--bg-r)',
          animation: 'fadeRight 0.45s cubic-bezier(.4,0,.2,1)',
        }}
      >
        <LogoCarousel
          images={categories[active].logos}
          categoryName={categories[active].name}
        />
      </div>
    </div>
  );
}
