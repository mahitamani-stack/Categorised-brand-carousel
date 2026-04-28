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
        width: '100%',
        height: '100%',
        background: 'var(--bg)',
        overflow: 'hidden',
        fontFamily: 'var(--font-display)',
      }}
    >
      <CategoryList
        categories={categories.map((c) => c.name)}
        active={active}
        onSelect={setActive}
      />
      <div
        key={active}
        style={{
          flex: 1,
          height: '100%',
          animation: 'fadeRight 0.4s cubic-bezier(.4,0,.2,1)',
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
