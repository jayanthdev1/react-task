import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import FilterModal from './FilterModal';
import MenuCategoriesModal from './MenuCategoriesModal';
import DishDetailModal from './DishDetailModal';

interface DrinksScreenProps {
  onNavigateToSpecials: () => void;
  onNavigateToFood: () => void;
}

interface DrinkItem {
  name: string;
  image: string;
  price: number;
  time: string;
  description: string;
  ingredients: string[];
  addons: { name: string; price: number; image: string }[];
  isVeg: boolean;
}

const DRINK_TABS = ['Cocktails', 'Brewed drinks', 'Desserts', 'Drinks', 'Breads'];

export default function DrinksScreen({ onNavigateToSpecials, onNavigateToFood }: DrinksScreenProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<DrinkItem | null>(null);
  const [activeFilters, setActiveFilters] = useState(0);
  const [alcoholicMode, setAlcoholicMode] = useState<'ALCOHOLIC' | 'NON-ALCOHOLIC'>('ALCOHOLIC');
  const [activeTab, setActiveTab] = useState('cocktails');

  const drinks: DrinkItem[] = [
    {
      name: "Pina colada",
      image: "https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: 250,
      time: "5-10 mins",
      description: "Rum, coconut cream, and pineapple.",
      ingredients: ["White rum", "Coconut cream", "Pineapple juice", "Ice"],
      addons: [
        { name: "Extra coconut cream", price: 5, image: "https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=100" },
        { name: "Fresh pineapple wedge", price: 5, image: "https://images.pexels.com/photos/1109062/pexels-photo-1109062.jpeg?auto=compress&cs=tinysrgb&w=100" },
        { name: "Maraschino cherry", price: 5, image: "https://images.pexels.com/photos/209594/pexels-photo-209594.jpeg?auto=compress&cs=tinysrgb&w=100" }
      ],
      isVeg: true
    },
    {
      name: "Moscow mule",
      image: "https://images.pexels.com/photos/1109062/pexels-photo-1109062.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: 250,
      time: "5-10 mins",
      description: "Rum, coconut cream, and pineapple.",
      ingredients: ["Vodka", "Ginger beer", "Lime juice", "Ice"],
      addons: [],
      isVeg: true
    },
    {
      name: "Cosmopolitan",
      image: "https://images.pexels.com/photos/209594/pexels-photo-209594.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: 250,
      time: "5-10 mins",
      description: "Rum, coconut cream, and pineapple.",
      ingredients: ["Vodka", "Triple sec", "Cranberry juice", "Lime juice"],
      addons: [],
      isVeg: true
    },
    {
      name: "Margarita",
      image: "https://images.pexels.com/photos/605408/pexels-photo-605408.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: 250,
      time: "5-10 mins",
      description: "Rum, coconut cream, and pineapple.",
      ingredients: ["Tequila", "Orange liqueur", "Lime juice", "Salt"],
      addons: [],
      isVeg: true
    },
    {
      name: "Martini",
      image: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: 250,
      time: "5-10 mins",
      description: "Rum, coconut cream, and pineapple.",
      ingredients: ["Gin", "Vermouth", "Olive"],
      addons: [],
      isVeg: true
    },
    {
      name: "Blue lagoon",
      image: "https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: 250,
      time: "5-10 mins",
      description: "Rum, coconut cream, and pineapple.",
      ingredients: ["Vodka", "Blue curacao", "Lemonade"],
      addons: [],
      isVeg: true
    },
  ];

  return (
    /* home screen: #162B39 bg, 393px */
    <div style={{ minHeight: '100vh', backgroundColor: '#162B39', color: 'white', paddingBottom: '100px', position: 'relative' }}>
      <SearchOverlay
        isOpen={isSearchActive}
        onClose={() => setIsSearchActive(false)}
        onSearch={() => setIsSearchActive(false)}
      />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(count) => setActiveFilters(count)}
        type="drinks"
      />
      <MenuCategoriesModal
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        onCategorySelect={(category) => {
          setIsCategoriesModalOpen(false);
        }}
        type="drinks"
      />
      {selectedDrink && (
        <DishDetailModal
          isOpen={!!selectedDrink}
          onClose={() => setSelectedDrink(null)}
          dish={selectedDrink}
        />
      )}

      {/* Frame 201: top header area 393×351, #162B39 */}
      <div style={{ maxWidth: '393px', margin: '0 auto', position: 'relative', padding: '0 21px', boxSizing: 'border-box' }}>

        {/* Logo — centered, top:29px */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '29px', paddingBottom: '10px' }}>
          <img src="/logo.png" alt="CSAT" style={{ width: '100px', height: '35px', objectFit: 'contain' }} />
        </div>

        {/* Frame 154: Category Boxes — 290×100, gap:25 */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '25px', width: '290px', height: '100px', margin: '0 auto 20px' }}>
          {[
            { label: 'Food', img: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200', active: false, onClick: onNavigateToFood },
            { label: 'Drinks', img: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=200', active: true },
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
                cursor: onClick ? 'pointer' : 'default',
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

        {/* Frame 155: ALCOHOLIC / NON-ALCOHOLIC toggle — 351×32 */}
        <div style={{
          boxSizing: 'border-box',
          width: '351px', height: '32px',
          background: 'linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05)), rgba(22,43,57,0.2)',
          border: '0.2px solid rgba(214,147,73,0.4)',
          boxShadow: '2px 2px 3px rgba(5,20,30,0.4)',
          borderRadius: '50px',
          padding: '3px',
          display: 'flex', alignItems: 'center',
          margin: '0 auto 0',
        }}>
          {/* Frame 5: inner row */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '11px', width: '339px', height: '26px' }}>
            {/* Frame 5/2: ALCOHOLIC pill — active: 162px gradient, inactive: 166px dark */}
            <button
              onClick={() => setAlcoholicMode('ALCOHOLIC')}
              style={{
                boxSizing: 'border-box',
                width: alcoholicMode === 'ALCOHOLIC' ? '162px' : '166px',
                height: '29px',
                background: alcoholicMode === 'ALCOHOLIC'
                  ? 'linear-gradient(90deg, #DE994D 0%, #A56C2D 93.75%)'
                  : 'linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05)), #162B39',
                border: alcoholicMode === 'ALCOHOLIC' ? '0.2px solid rgba(125,121,121,0.7)' : 'none',
                borderRadius: '50px',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '17px',
                color: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              ALCOHOLIC
            </button>
            {/* Frame 2/5: NON-ALCOHOLIC pill — active: 168px gradient+border, inactive: 166px dark */}
            <button
              onClick={() => setAlcoholicMode('NON-ALCOHOLIC')}
              style={{
                boxSizing: 'border-box',
                width: alcoholicMode === 'NON-ALCOHOLIC' ? '168px' : '166px',
                height: '29px',
                background: alcoholicMode === 'NON-ALCOHOLIC'
                  ? 'linear-gradient(90deg, #DE994D 0%, #A56C2D 93.75%)'
                  : 'linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05)), #162B39',
                border: alcoholicMode === 'NON-ALCOHOLIC' ? '0.2px solid rgba(125,121,121,0.7)' : 'none',
                borderRadius: '50px',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '17px',
                color: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              NON-ALCOHOLIC
            </button>
          </div>
        </div>
      </div>

      {/* Nav tabs row + divider — Group 9 */}
      <div style={{ maxWidth: '393px', margin: '0 auto', marginTop: '12px' }}>
        {/* Frame 6: tabs row — scrollable, gap:30 */}
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
          gap: '30px', paddingLeft: '15px', paddingRight: '15px',
          overflowX: 'auto', scrollbarWidth: 'none',
          width: '377.96px', boxSizing: 'border-box',
        }}>
          {DRINK_TABS.map((tab) => {
            const tabKey = tab.toLowerCase().replace(/ /g, '');
            const isActive = activeTab === tabKey;
            return (
              <div key={tab} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
                <button
                  onClick={() => setActiveTab(tabKey)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: 'Inter, sans-serif', fontWeight: 500,
                    fontSize: '16px', lineHeight: '19px',
                    color: isActive ? '#D08A3C' : '#FFFFFF',
                    whiteSpace: 'nowrap',
                  }}
                >{tab}</button>
                {isActive && (
                  <div style={{ width: '80px', height: 0, borderTop: '3px solid #D08A3C' }} />
                )}
              </div>
            );
          })}
        </div>
        {/* Line 1 divider */}
        <div style={{ height: '1px', background: '#E5E1DA', marginTop: '2px' }} />
      </div>

      {/* Main scrollable content area — Frame 64 */}
      <div style={{
        maxWidth: '393px', margin: '0 auto',
        padding: '0 21px', boxSizing: 'border-box',
        paddingTop: '16px',
      }}>

        {/* Frame 156: Search bar — 337×35, #112D40, border-radius:50px */}
        <div style={{
          boxSizing: 'border-box',
          width: '100%', height: '35px',
          background: '#112D40',
          border: '0.6px solid rgba(208,138,60,0.6)',
          boxShadow: '4px 4px 2px #0D2433',
          borderRadius: '50px',
          marginBottom: '20px',
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          padding: '7px 14px',
        }}>
          {/* Frame 157 inner row */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            {/* Frame 68: search icon + placeholder */}
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
            {/* Filter sliders icon — matching MenuScreen reference */}
            <div
              style={{ position: 'relative', width: '23px', height: '19.5px', cursor: 'pointer', flexShrink: 0 }}
              onClick={() => setIsFilterModalOpen(true)}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ position: 'absolute', left: 0, top: '6.5px' }}>
                {/* 3 horizontal slider lines */}
                <line x1="1" y1="2.5" x2="12" y2="2.5" stroke={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="4" cy="2.5" r="1.5" fill={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} />
                <line x1="1" y1="6.5" x2="12" y2="6.5" stroke={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="9" cy="6.5" r="1.5" fill={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} />
                <line x1="1" y1="10.5" x2="12" y2="10.5" stroke={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="6" cy="10.5" r="1.5" fill={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} />
              </svg>
              {activeFilters > 0 && (
                <div style={{ position: 'absolute', left: '9px', top: 0, width: '14px', height: '15px' }}>
                  <div style={{ position: 'absolute', left: 0, top: '1px', width: '14px', height: '14px', borderRadius: '50%', background: '#A9712F' }} />
                  <span style={{ position: 'absolute', left: '3px', top: '1px', fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '9px', color: '#FFFFFF', lineHeight: '14px' }}>{activeFilters}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Frame 64: Drink cards grid — 314px wide, 2-column, gap:20, scrollable */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          width: '314px',
          margin: '0 auto',
        }}>

          {/* Group 14: Row 1 — Pina colada + Moscow mule */}
          <div style={{ position: 'relative', width: '314px', height: '212px', flexShrink: 0 }}>
            {[drinks[0], drinks[1]].map((drink, colIdx) => (
              <div
                key={drink.name}
                onClick={() => setSelectedDrink(drink)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  gap: '2px',
                  position: 'absolute',
                  width: '127px',
                  height: '198px',
                  left: colIdx === 0 ? '0px' : '187px',
                  top: colIdx === 0 ? '0px' : '14px',
                  cursor: 'pointer',
                }}
              >
                {/* Group 3: image container */}
                <div style={{ position: 'relative', width: colIdx === 0 ? '109px' : '122.23px', height: '123px', flexShrink: 0 }}>
                  <div style={{
                    boxSizing: 'border-box',
                    position: 'absolute',
                    width: '109px', height: '109px',
                    left: colIdx === 0 ? '0px' : '13.23px',
                    top: '0px',
                    border: '0.4px solid rgba(125,121,121,0.7)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <img src={drink.image} alt={drink.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    padding: '0px 3px', gap: '10px',
                    position: 'absolute',
                    width: '91px', height: '20px',
                    left: colIdx === 0 ? '7.77px' : '0px',
                    top: '103px',
                    background: '#A9712F',
                    borderRadius: '2px',
                  }}>
                    <span style={{ fontFamily: 'Playfair, "Playfair Display", serif', fontWeight: 600, fontSize: '12px', lineHeight: '14px', color: '#FFFFFF' }}>Signature</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px', width: '127px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px', width: '155px' }}>
                    <span style={{ fontFamily: 'Playfair, "Playfair Display", serif', fontWeight: 500, fontSize: '18px', lineHeight: '22px', color: '#FFFFFF', display: 'block' }}>{drink.name}</span>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', width: '123px', height: '15px' }}>
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '15px', color: '#FFFFFF' }}>₹{drink.price}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '18px', letterSpacing: '0.02em', color: 'rgba(255,255,255,0.8)', margin: 0, width: '127px' }}>{drink.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Clear filters pill — shown between row 1 and row 2 when filters active */}
          {activeFilters > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button
                onClick={() => setActiveFilters(0)}
                style={{
                  width: '146px', height: '33px',
                  background: '#A9712F', borderRadius: '80px',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  padding: '10px',
                }}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', lineHeight: '16px', color: '#FFFFFF' }}>Clear filters</span>
              </button>
            </div>
          )}

          {/* Row 2 — Cosmopolitan + Margarita (dimmed when filters active) */}
          <div style={{ position: 'relative', width: '314px', height: '212px', flexShrink: 0, opacity: activeFilters > 0 ? 0.8 : 1 }}>
            {[drinks[2], drinks[3]].map((drink, colIdx) => (
              <div
                key={drink.name}
                onClick={() => setSelectedDrink(drink)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  gap: '2px',
                  position: 'absolute',
                  width: '127px',
                  height: '198px',
                  left: colIdx === 0 ? '0px' : '187px',
                  top: colIdx === 0 ? '0px' : '14px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'relative', width: colIdx === 0 ? '109px' : '122.23px', height: '123px', flexShrink: 0 }}>
                  <div style={{
                    boxSizing: 'border-box',
                    position: 'absolute',
                    width: '109px', height: '109px',
                    left: colIdx === 0 ? '13.23px' : '13.23px',
                    top: '0px',
                    border: '0.4px solid rgba(125,121,121,0.7)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <img src={drink.image} alt={drink.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    padding: '0px 3px', gap: '10px',
                    position: 'absolute',
                    width: '91px', height: '20px',
                    left: '0px', top: '103px',
                    background: '#A9712F', borderRadius: '2px',
                  }}>
                    <span style={{ fontFamily: 'Playfair, "Playfair Display", serif', fontWeight: 600, fontSize: '12px', lineHeight: '14px', color: '#FFFFFF' }}>Signature</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px', width: '142px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px', width: '155px' }}>
                    <span style={{ fontFamily: 'Playfair, "Playfair Display", serif', fontWeight: 500, fontSize: '18px', lineHeight: '22px', color: '#FFFFFF' }}>{drink.name}</span>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', width: '123px', height: '15px' }}>
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '15px', color: '#FFFFFF' }}>₹{drink.price}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '18px', letterSpacing: '0.02em', color: 'rgba(255,255,255,0.8)', margin: 0, width: '142px' }}>{drink.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Frame 60: Buy 1 get 1 special card — 351×162, #FAF7F2 (dimmed when filters active) */}
          <div style={{
            boxSizing: 'border-box',
            position: 'relative', overflow: 'hidden',
            width: '351px', height: '162px',
            background: '#FAF7F2',
            border: '1px solid #848181',
            boxShadow: '5px 6px 4px rgba(0,0,0,0.2)',
            borderRadius: '5px',
            flexShrink: 0,
            cursor: 'pointer',
            opacity: activeFilters > 0 ? 0.8 : 1,
          }} onClick={onNavigateToSpecials}>
            {/* Frame 61: text block */}
            <div style={{ position: 'absolute', left: '16px', top: '17px', display: 'flex', flexDirection: 'column', gap: '10px', width: '172px', height: '140px' }}>
              <span style={{
                fontFamily: 'Playfair, "Playfair Display", serif',
                fontWeight: 500, fontSize: '25px', lineHeight: '30px', color: '#162B39',
              }}>Buy 1, get 1 special</span>
              <span style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 400,
                fontSize: '12px', lineHeight: '18px', letterSpacing: '0.02em', color: '#162B39',
              }}>Buy a cocktail of above ₹250, and get another cocktails for absolutely free.</span>
            </div>
            {/* Ellipse 7: circular image — 217×217, right side */}
            <div style={{
              position: 'absolute',
              width: '217px', height: '217px',
              left: '194px', top: '-15px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '-4px -5px 9px rgba(22,43,57,0.2)',
            }}>
              <img src="/drinks.png" alt="Buy 1 Get 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Group 13: Row 3 — Martini + Blue lagoon (dimmed when filters active) */}
          <div style={{ position: 'relative', width: '314px', height: '212px', flexShrink: 0, opacity: activeFilters > 0 ? 0.8 : 1 }}>
            {[drinks[4], drinks[5]].map((drink, colIdx) => (
              <div
                key={drink.name}
                onClick={() => setSelectedDrink(drink)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  gap: '2px',
                  position: 'absolute',
                  width: '127px',
                  height: '198px',
                  left: colIdx === 0 ? '0px' : '187px',
                  top: colIdx === 0 ? '0px' : '14px',
                  cursor: 'pointer',
                }}
              >
                {/* Group 3: image container */}
                <div style={{ position: 'relative', width: '122.23px', height: '123px', flexShrink: 0 }}>
                  <div style={{
                    boxSizing: 'border-box',
                    position: 'absolute',
                    width: '109px', height: '109px',
                    left: '13.23px', top: '0px',
                    border: '0.4px solid rgba(125,121,121,0.7)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <img src={drink.image} alt={drink.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    padding: '0px 3px', gap: '10px',
                    position: 'absolute',
                    width: '91px', height: '20px',
                    left: '0px', top: '103px',
                    background: '#A9712F', borderRadius: '2px',
                  }}>
                    <span style={{
                      fontFamily: 'Playfair, "Playfair Display", serif',
                      fontWeight: 600, fontSize: '12px', lineHeight: '14px', color: '#FFFFFF',
                    }}>Signature</span>
                  </div>
                </div>
                {/* Frame 45: text block */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px', width: '142px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px', width: '155px' }}>
                    <span style={{
                      fontFamily: 'Playfair, "Playfair Display", serif',
                      fontWeight: 500, fontSize: '18px', lineHeight: '22px', color: '#FFFFFF',
                    }}>{drink.name}</span>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', width: '123px', height: '15px' }}>
                      <span style={{
                        fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '15px', color: '#FFFFFF',
                      }}>₹{drink.price}</span>
                    </div>
                  </div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '18px',
                    letterSpacing: '0.02em', color: 'rgba(255,255,255,0.8)',
                    margin: 0, width: '142px',
                  }}>{drink.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>


      </div>

      {/* Frame 82: Menu FAB — 85×85 circle, gradient, bottom-right */}
      <button
        onClick={() => setIsCategoriesModalOpen(true)}
        style={{
          position: 'fixed', bottom: '24px', right: '16px',
          width: '85px', height: '85px', borderRadius: '50%',
          background: 'linear-gradient(180deg, #F0A450 0%, #CF8838 88.47%)',
          border: '1px solid rgba(240,164,80,0.8)',
          boxShadow: '2px 2px 4px rgba(199,106,58,0.4)',
          cursor: 'pointer', zIndex: 50,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 0,
          filter: 'drop-shadow(2px 2.5px 3px rgba(155,98,34,0.3))',
        }}
      >
        {/* Frame 80: icon + label */}
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
