import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import DishDetailModal from './DishDetailModal';
import MenuCategoriesModal from './MenuCategoriesModal';
import FilterModal from './FilterModal';
import SearchOverlay from './SearchOverlay';

interface MenuScreenProps {
  onNavigateToSpecials: () => void;
  onNavigateToDrinks: () => void;
}

interface Dish {
  name: string;
  image: string;
  price: number;
  time: string;
  description?: string;
  isVeg?: boolean;
  badge?: string;
}

const sampleDishes: Dish[] = [
  {
    name: 'Galouti kebab',
    image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Melt-in-the-mouth kebab with aromatic spices.',
    isVeg: false,
    badge: 'Highly recommended',
  },
  {
    name: 'Saffron biryani',
    image: 'https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Aged basmati cooked with saffron strands and goat.',
    isVeg: false,
    badge: 'Highly recommended',
  },
  {
    name: 'Truffle naan',
    image: 'https://images.pexels.com/photos/2067400/pexels-photo-2067400.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Burnt garlic naan infused with white truffle oil.',
    isVeg: true,
    badge: "Chef's special",
  },
  {
    name: 'Dal bhukara',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Lentils shimmered overnight with charcoal fire.',
    isVeg: true,
    badge: 'Highly recommended',
  },
  {
    name: 'Achaari gobi',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Crispy cauliflower tossed in tangy pickle spices.',
    isVeg: true,
    badge: "Chef's special",
  },
  {
    name: 'Aloo tikki chaat',
    image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Crispy potato patties topped with chutneys and spices.',
    isVeg: true,
    badge: 'Signature',
  },
];

// ── Veg/Non-veg dot ─────────────────────────────────────────────────────────
function VegDot({ isVeg }: { isVeg: boolean }) {
  // Spec: #E6423C for non-veg, #14AE5C for veg
  const color = isVeg ? '#14AE5C' : '#E6423C';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '13px', height: '13px',
      border: `1px solid ${color}`,
      borderRadius: '2px', flexShrink: 0,
    }}>
      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: color }} />
    </span>
  );
}

// ── Dish card ────────────────────────────────────────────────────────────────
function DishCard({ dish, onClick, cardWidth = 138 }: { dish: Dish; onClick: () => void; cardWidth?: number }) {
  const badgeWidth = dish.badge === "Chef's special" || dish.badge === 'Signature' ? '100px' : '117px';
  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px', width: `${cardWidth}px`, cursor: 'pointer' }}
    >
      {/* Group 3: image container 122px wide, image 109px */}
      <div style={{ position: 'relative', width: `${cardWidth}px`, height: '123px', flexShrink: 0 }}>
        {/* Frame 11: bordered image box, left offset ~13px to center */}
        <div style={{
          position: 'absolute', left: '13px', top: 0,
          width: '109px', height: '109px',
          border: '0.4px solid rgba(125,121,121,0.7)',
          borderRadius: '3px', overflow: 'hidden', boxSizing: 'border-box',
        }}>
          <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        {/* Frame 12: badge — left:0, top:103 */}
        {dish.badge && (
          <div style={{
            position: 'absolute', left: 0, top: '103px',
            width: badgeWidth, height: '20px',
            background: '#A9712F', borderRadius: '2px',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '0 3px',
          }}>
            <span style={{
              fontFamily: 'Playfair, "Playfair Display", serif',
              fontWeight: 600, fontSize: '12px', lineHeight: '14px', color: '#FFFFFF',
            }}>{dish.badge}</span>
          </div>
        )}
      </div>

      {/* Frame 45: text column, gap:3 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: `${cardWidth}px` }}>
        {/* Dish name */}
        <span style={{
          fontFamily: 'Playfair, "Playfair Display", serif',
          fontWeight: 500, fontSize: '18px', lineHeight: '22px',
          color: '#FFFFFF', display: 'block',
        }}>{dish.name}</span>
        {/* Frame 44: price + time row */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
          {/* Frame 13: veg dot + price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <VegDot isVeg={!!dish.isVeg} />
            <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '15px', color: '#FFFFFF' }}>₹{dish.price}</span>
          </div>
          {/* Frame 16: clock + time, opacity 0.7 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', opacity: 0.7 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.9)" strokeWidth="1"/>
              <line x1="6" y1="3" x2="6" y2="6.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1" strokeLinecap="round"/>
              <line x1="6" y1="6.5" x2="8" y2="6.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, fontSize: '11px', lineHeight: '17px', color: 'rgba(255,255,255,0.9)' }}>{dish.time}</span>
          </div>
        </div>
        {/* Description */}
        {dish.description && (
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px',
            lineHeight: '18px', letterSpacing: '0.02em',
            color: 'rgba(255,255,255,0.8)', margin: 0,
          }}>{dish.description}</p>
        )}
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function MenuScreen({ onNavigateToSpecials, onNavigateToDrinks }: MenuScreenProps) {
  const [activeTab, setActiveTab] = useState('starters');
  const [filterType, setFilterType] = useState<'ALL' | 'VEG' | 'NON-VEG'>('ALL');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const CATEGORY_TABS = ['Offers for you', 'Starters', 'Mains', 'Desserts', 'Drinks', 'Breads'];

  // Filter dishes by veg/non-veg selection
  const filteredDishes = sampleDishes.filter((d) => {
    if (filterType === 'VEG') return d.isVeg === true;
    if (filterType === 'NON-VEG') return d.isVeg === false;
    return true; // ALL
  });

  return (
    /* home screen: #162B39 bg */
    <div style={{ minHeight: '100vh', backgroundColor: '#162B39', color: 'white', paddingBottom: '100px', position: 'relative' }}>
      <DishDetailModal
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
        dish={selectedDish || { name: '', image: '', price: 0, time: '' }}
      />
      <MenuCategoriesModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        onCategorySelect={(category) => { setIsMenuModalOpen(false); setActiveTab(category.toLowerCase()); }}
      />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(count) => setActiveFilterCount(count)}
      />
      <SearchOverlay
        isOpen={isSearchActive}
        onClose={() => setIsSearchActive(false)}
        onSearch={() => setIsSearchActive(false)}
      />

      <div style={{ maxWidth: '393px', margin: '0 auto', position: 'relative', padding: '0 20px', boxSizing: 'border-box' }}>

        {/* Logo — top: 30px, centered */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', paddingBottom: '10px' }}>
          <img src="/logo.png" alt="CSAT" style={{ width: '100px', height: '35px', objectFit: 'contain' }} />
        </div>

        {/* ── Frame 156: Category Boxes — top:85, width:290, gap:25 ── */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '25px', width: '290px', height: '100px', margin: '0 auto 20px' }}>
          {[
            { label: 'Food', img: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200', active: true },
            { label: 'Drinks', img: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=200', active: false, onClick: onNavigateToDrinks },
            { label: 'Tobacco', img: 'https://images.pexels.com/photos/4969832/pexels-photo-4969832.jpeg?auto=compress&cs=tinysrgb&w=200', active: false },
          ].map(({ label, img, active, onClick }) => (
            <div
              key={label}
              onClick={onClick}
              style={{
                width: '80px', height: '100px', borderRadius: '5px',
                background: active
                  ? 'linear-gradient(180deg, #DE994D 29.33%, #A56C2D 100%)'
                  : 'linear-gradient(0deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15)), #162B39',
                border: active ? 'none' : '0.5px solid rgba(22,43,57,0.4)',
                boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', gap: '5px',
                cursor: 'pointer',
              }}
            >
              <img src={img} alt={label} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', boxShadow: '1px 2px 4px rgba(0,0,0,0.2)' }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: active ? 600 : 500,
                fontSize: '14px', lineHeight: '17px',
                textAlign: 'center', color: '#FFFFFF',
                alignSelf: 'stretch',
              }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── Frame 154: Veg/All/Non-veg bar — top:200, 351×36 ── */}
        <div style={{
          width: '351px', height: '36px',
          borderRadius: '50px',
          border: '0.2px solid rgba(214,147,73,0.4)',
          boxShadow: '2px 2px 3px rgba(5,20,30,0.4)',
          padding: '3px',
          background: 'linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05)), rgba(22,43,57,0.2)',
          boxSizing: 'border-box',
          display: 'flex', alignItems: 'center',
          margin: '0 auto 16px',
        }}>
          {/* Frame 5: inner row 334px, gap:11 */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '11px', width: '334px', height: '30px' }}>
            {(['ALL', 'VEG', 'NON-VEG'] as const).map((f) => {
              const active = filterType === f;
              // NON-VEG active pill is 112px per Figma spec (wider to fit text)
              const pillWidth = active && f === 'NON-VEG' ? '112px' : '104px';
              return (
                <button key={f} onClick={() => setFilterType(f)} style={{
                  width: pillWidth, height: '30px', borderRadius: '50px',
                  background: active
                    ? 'linear-gradient(90deg, #DE994D 0%, #A56C2D 93.75%)'
                    : 'linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05)), #162B39',
                  border: active ? '0.2px solid rgba(125,121,121,0.7)' : 'none',
                  cursor: 'pointer', color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '17px',
                  transition: 'background 0.2s', flexShrink: 0,
                }}>{f}</button>
              );
            })}
          </div>
        </div>

        {/* ── Nav tabs ── */}
        <div style={{ marginLeft: '-20px', marginRight: '-20px' }}>
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
            gap: '28px', paddingLeft: '16px', paddingRight: '16px',
            overflowX: 'auto', scrollbarWidth: 'none',
          }}>
            {CATEGORY_TABS.map((tab) => {
              const isOffers = tab === 'Offers for you';
              const tabKey = tab.toLowerCase().replace(/ /g, '');
              const isActive = activeTab === tabKey;
              return (
                <div key={tab} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3px' }}>
                    {isOffers && (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M10 2L11.8 7.2H17.3L12.9 10.4L14.6 15.6L10 12.4L5.4 15.6L7.1 10.4L2.7 7.2H8.2L10 2Z" fill="#FFFFFF" />
                      </svg>
                    )}
                    <button
                      onClick={() => {
                        if (isOffers) { onNavigateToSpecials(); }
                        else { setActiveTab(tabKey); }
                      }}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        fontFamily: 'Inter, sans-serif', fontWeight: 500,
                        fontSize: '16px', lineHeight: '19px',
                        color: (!isOffers && isActive) ? '#D08A3C' : '#FFFFFF',
                        whiteSpace: 'nowrap',
                      }}
                    >{tab}</button>
                  </div>
                  {isActive && !isOffers && (
                    <div style={{ width: '80px', height: 0, borderTop: '3px solid #D08A3C', borderRadius: '2px' }} />
                  )}
                </div>
              );
            })}
          </div>
          {/* Divider */}
          <div style={{ height: '1px', background: '#E5E1DA', marginTop: '2px', marginBottom: '16px' }} />
        </div>

        {/* ── Search bar ── */}
        <div style={{
          boxSizing: 'border-box', width: '100%', height: '35px',
          background: '#112D40',
          border: '0.6px solid rgba(208,138,60,0.6)',
          boxShadow: '4px 4px 2px #0D2433',
          borderRadius: '50px', marginBottom: '20px',
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          padding: '0 14px',
        }}>
          <div
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1 }}
            onClick={() => setIsSearchActive(true)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="rgba(208,138,60,0.8)" strokeWidth="1.5" />
              <line x1="11" y1="11" x2="15" y2="15" stroke="rgba(208,138,60,0.8)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>Search items...</span>
          </div>
          {/* Group 75: filter icon + count badge — Figma spec */}
          <div
            style={{ position: 'relative', width: '23px', height: '19.5px', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => setIsFilterModalOpen(true)}
          >
            {/* sliders filter icon — 3 horizontal lines with circle knobs */}
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ position: 'absolute', left: 0, top: '6.5px' }}>
              <line x1="1" y1="2.5" x2="12" y2="2.5" stroke={activeFilterCount > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="4" cy="2.5" r="1.5" fill={activeFilterCount > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} />
              <line x1="1" y1="6.5" x2="12" y2="6.5" stroke={activeFilterCount > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="9" cy="6.5" r="1.5" fill={activeFilterCount > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} />
              <line x1="1" y1="10.5" x2="12" y2="10.5" stroke={activeFilterCount > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="6" cy="10.5" r="1.5" fill={activeFilterCount > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} />
            </svg>
            {/* Frame 158: count badge — Ellipse 13 (14×14 #A9712F) + number, left:9 top:0 */}
            {activeFilterCount > 0 && (
              <div style={{ position: 'absolute', left: '9px', top: 0, width: '14px', height: '15px' }}>
                <div style={{
                  position: 'absolute', left: 0, top: '1px',
                  width: '14px', height: '14px', borderRadius: '50%',
                  background: '#A9712F',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                    fontSize: '9px', lineHeight: '10px', color: '#FFFFFF',
                  }}>{activeFilterCount}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Frame 62: Dish grid — Group 10 (first 2 dishes) + 2-for-1 + Group 11 (last 4 dishes) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>

          {filteredDishes.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '40px 0', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
              No {filterType.toLowerCase()} items available
            </div>
          ) : (
            <>
              {/* Group 10: first 2 dishes — staggered, second column top+14px */}
              {filteredDishes.slice(0, 2).length > 0 && (
                <div style={{ position: 'relative', width: '351px', height: '232px', flexShrink: 0 }}>
                  {/* Left card — top: 0 */}
                  {filteredDishes[0] && (
                    <div style={{ position: 'absolute', left: '12.6px', top: 0 }}>
                      <DishCard dish={filteredDishes[0]} onClick={() => setSelectedDish(filteredDishes[0])} />
                    </div>
                  )}
                  {/* Right card — top: 14px (staggered) */}
                  {filteredDishes[1] && (
                    <div style={{ position: 'absolute', left: '200.5px', top: '14px' }}>
                      <DishCard dish={filteredDishes[1]} onClick={() => setSelectedDish(filteredDishes[1])} />
                    </div>
                  )}
                </div>
              )}

              {/* Frame 140: "Clear filters" pill */}
              {activeFilterCount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => setActiveFilterCount(0)}
                    style={{
                      width: '146px', height: '33px',
                      background: '#A9712F', borderRadius: '80px',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      padding: '10px',
                    }}
                  >
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontWeight: 600,
                      fontSize: '13px', lineHeight: '16px', color: '#FFFFFF',
                    }}>Clear filters</span>
                  </button>
                </div>
              )}

              

              {/* Frame 62: Group 11 — dishes 3-6, staggered 2-col */}
              {filteredDishes.slice(2).length > 0 && (
                <div style={{ position: 'relative', width: '351px', height: '500px', flexShrink: 0 }}>
                  {/* Column A: dishes at index 2 and 4 */}
                  {filteredDishes[2] && (
                    <div style={{ position: 'absolute', left: '12.39px', top: 0 }}>
                      <DishCard dish={filteredDishes[2]} onClick={() => setSelectedDish(filteredDishes[2])} />
                    </div>
                  )}
                  {filteredDishes[4] && (
                    <div style={{ position: 'absolute', left: '0px', top: '252px' }}>
                      <DishCard dish={filteredDishes[4]} onClick={() => setSelectedDish(filteredDishes[4])} />
                    </div>
                  )}
                  {/* Column B: dishes at index 3 and 5 — top+14px stagger on first */}
                  {filteredDishes[3] && (
                    <div style={{ position: 'absolute', left: '200.5px', top: '14px' }}>
                      <DishCard dish={filteredDishes[3]} onClick={() => setSelectedDish(filteredDishes[3])} />
                    </div>
                  )}
                  {filteredDishes[5] && (
                    <div style={{ position: 'absolute', left: '187.79px', top: '266px' }}>
                      <DishCard dish={filteredDishes[5]} onClick={() => setSelectedDish(filteredDishes[5])} />
                    </div>
                  )}
                </div>
              )}
              {/* Frame 60: 2-for-1 Special card */}
              <div style={{
                position: 'relative', overflow: 'hidden',
                width: '351px', height: '162px',
                background: '#FAF7F2',
                border: '1px solid #848181',
                boxShadow: '5px 6px 4px rgba(0,0,0,0.2)',
                borderRadius: '5px', boxSizing: 'border-box',
                cursor: 'pointer', flexShrink: 0,
              }} onClick={onNavigateToSpecials}>
                <div style={{ position: 'absolute', left: '16px', top: '11px', display: 'flex', flexDirection: 'column', gap: '10px', width: '172px' }}>
                  <span style={{
                    fontFamily: 'Playfair, "Playfair Display", serif',
                    fontWeight: 500, fontSize: '25px', lineHeight: '30px', color: '#162B39',
                  }}>2-for-1 Special</span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 400,
                    fontSize: '12px', lineHeight: '18px', letterSpacing: '0.02em', color: '#162B39',
                  }}>Choose any two starters and pay for only one. The perfect way to begin your feast.</span>
                </div>
                <div style={{
                  position: 'absolute', right: '-23px', top: '-27px',
                  width: '217px', height: '217px', borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '-3px -6px 7px rgba(22,43,57,0.25)',
                }}>
                  <img src="/food.png" alt="Special" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Frame 81: Menu FAB — Ellipse 85×85, gradient, border, shadow ── */}
      {/* Spec: left:277px from screen left = right:16px on 393px width */}
      <button
        onClick={() => setIsMenuModalOpen(true)}
        style={{
          position: 'fixed', bottom: '24px', right: '16px',
          width: '70px', height: '70px', borderRadius: '50%',
          background: 'linear-gradient(180deg, #F0A450 0%, #CF8838 88.47%)',
          border: '1px solid rgba(240,164,80,0.8)',
          boxShadow: '2px 2.5px 3px rgba(155,98,34,0.3), 2px 2px 4px rgba(199,106,58,0.4)',
          cursor: 'pointer', zIndex: 50,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 0,
          filter: 'drop-shadow(2px 2.5px 3px rgba(155,98,34,0.3))',
        }}
      >
        {/* Frame 80: column, 45×48, centered at left:20, top:19 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '45px', height: '48px', justifyContent: 'center' }}>
          <UtensilsCrossed style={{ width: '30px', height: '30px', color: '#FFFFFF' }} />
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
            fontSize: '15px', lineHeight: '18px',
            textAlign: 'center', color: '#FFFFFF', width: '45px',
          }}>Menu</span>
        </div>
      </button>
    </div>
  );
}
