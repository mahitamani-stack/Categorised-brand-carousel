import { useState } from 'react';
import CategoryList from './components/CategoryList.jsx';
import LogoCarousel from './components/LogoCarousel.jsx';
import { categories } from './data/categories.js';

export default function App() {
  const [active, setActive] = useState(0);

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        background: '#111',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <CategoryList
        categories={categories.map((c) => c.name)}
        active={active}
        onSelect={setActive}
      />
      <div style={{ width: '1px', background: 'rgba(255,255,255,0.07)', flexShrink: 0 }} />
      <LogoCarousel images={categories[active].logos} categoryName={categories[active].name} />
    </div>
  );
}
