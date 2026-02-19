import { useEffect } from 'react';

interface MenuCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (category: string) => void;
  type?: 'food' | 'drinks';
}

const foodCategories = [
  { name: 'Starters', image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Mains', image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Desserts', image: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Salads', image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Soups', image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Burgers', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Wraps', image: 'https://images.pexels.com/photos/2955819/pexels-photo-2955819.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Barbeque', image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Grills', image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Pizza', image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

// Figma drink categories: Cocktails, Brewed drinks, Wine, Hard liquor, Beer, Shots, Aperitifs
const drinkCategories = [
  { name: 'Cocktails', image: 'https://images.pexels.com/photos/1189257/pexels-photo-1189257.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Brewed drinks', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Wine', image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Hard liquor', image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Beer', image: 'https://images.pexels.com/photos/5537949/pexels-photo-5537949.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Shots', image: 'https://images.pexels.com/photos/4109939/pexels-photo-4109939.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Aperitifs', image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

export default function MenuCategoriesModal({ isOpen, onClose, onCategorySelect, type = 'food' }: MenuCategoriesModalProps) {
  const displayCategories = type === 'food' ? foodCategories : drinkCategories;
  const title = type === 'food' ? 'Menu categories' : 'Drink categories';

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    /* Overlay: #162B39 at 70% opacity behind the sheet */
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        backgroundColor: 'rgba(22,43,57,0.7)',
      }}
      onClick={onClose}
    >
      {/* iPhone 16 - 2: bottom sheet — #FAF7F2, border-radius: 40px 40px 0 0, 393px wide */}
      <div
        style={{
          width: '393px',
          maxHeight: '600px',
          background: '#FAF7F2',
          borderRadius: '40px 40px 0px 0px',
          overflowY: 'auto',
          position: 'relative',
          paddingBottom: '32px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Frame 85: header row — 340px, between title and close — top:26 */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          width: '340px',
          margin: '26px auto 0',
        }}>
          {/* "Drink categories" title */}
          <span style={{
            fontFamily: '"Playfair Display", Playfair, serif',
            fontWeight: 500, fontSize: '18px', lineHeight: '24px',
            color: '#000000',
          }}>{title}</span>

          {/* charm:cross close button — 24×24, #F8F1ED, border-radius:100px */}
          <button
            onClick={onClose}
            style={{
              width: '24px', height: '24px',
              background: '#F8F1ED', borderRadius: '100px',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 0, flexShrink: 0,
            }}
          >
            {/* X icon — lines at 33% inset, 1.5px stroke #555555 */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <line x1="1" y1="1" x2="9" y2="9" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="1" x2="1" y2="9" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Frame 91: categories grid — 305px, gap:15 between rows, left:43 top:83 */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: '15px',
          width: '305px',
          margin: '30px auto 0',
        }}>
          {/* Pair up categories into rows of 2 */}
          {Array.from({ length: Math.ceil(displayCategories.length / 2) }, (_, rowIdx) => {
            const pair = displayCategories.slice(rowIdx * 2, rowIdx * 2 + 2);
            return (
              <div key={rowIdx} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '25px', width: '305px', height: '100px' }}>
                {pair.map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => onCategorySelect && onCategorySelect(cat.name)}
                    style={{
                      position: 'relative',
                      width: '140px', height: '100px',
                      borderRadius: '15px', overflow: 'hidden',
                      cursor: 'pointer', flexShrink: 0,
                    }}
                  >
                    {/* Rectangle 13: background image */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* dark overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
                    {/* Category label — Inter 600 18px #FAF7F2, centered */}
                    <span style={{
                      position: 'absolute',
                      left: '50%', top: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600, fontSize: '18px', lineHeight: '22px',
                      textAlign: 'center',
                      color: '#FAF7F2',
                      width: '90%',
                    }}>{cat.name}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
