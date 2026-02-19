import { Search, SlidersHorizontal, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';

interface MenuScreenProps {
  onNavigateToSpecials: () => void;
}

const CATEGORY_TABS = ['Offers for you', 'Starters', 'Mains', 'Desserts', 'Drinks', 'Breads'];

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Royal Thali combo',
    price: '₹250',
    isVeg: true,
    time: '25 mins',
    desc: 'Thali brings together a perfect blend of flavors with aromatic rice, soft breads, rich curries, dal, fresh salad, dessert, and accompaniments.',
    img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    section: 'Combo offers',
  },
  {
    id: 2,
    name: 'Nawabi Kebab Platter',
    price: '₹250',
    isVeg: false,
    time: '30 mins',
    desc: 'A luxurious assortment of melt-in-the-mouth kebabs inspired by royal Mughlai kitchens. Featuring a selection of perfectly grilled kebabs.',
    img: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400',
    section: 'Combo offers',
  },
];

const ONE_PLUS_ONE = [
  {
    id: 1,
    title: 'Burger + Mojito Blast',
    desc: 'Buy 1 Burger and get a refreshing Mojito FREE!',
    img1: '/burger-drink.png',
    img2: '/drinks.png',
  },
  {
    id: 2,
    title: 'Biryani Bonus Treat',
    desc: 'Buy 1 Chicken Biryani and get Chicken 65 FREE!',
    img1: '/biryani.png',
    img2: '/food.png',
  },
  {
    id: 3,
    title: 'Pizza & Garlic Bread Combo',
    desc: 'Buy 1 Pizza and enjoy Garlic Bread on the house.',
    img1: '/food.png',
    img2: '/cake.png',
  },
  {
    id: 4,
    title: 'Shawarma Fries Fiesta',
    desc: "Buy 1 Shawarma Roll and get Crispy Fries FREE!",
    img1: '/food.png',
    img2: '/drinks.png',
  },
];

// ── Veg indicator dot ──────────────────────────────────────────────────────────
function VegBadge({ isVeg }: { isVeg: boolean }) {
  const color = isVeg ? '#22c55e' : '#E6423C';
  return (
    <span style={{
      border: `1px solid ${color}`,
      padding: '2px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '14px',
      height: '14px',
      borderRadius: '2px',
      flexShrink: 0,
    }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
    </span>
  );
}

// ── Section heading (orange vertical line + label) ─────────────────────────────
function SectionHeading({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '5px', marginBottom: '4px' }}>
      <span style={{ display: 'inline-block', width: '1px', height: '16px', background: '#D08A3C' }} />
      <span style={{
        fontFamily: '"Playfair Display", serif',
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '20px',
        letterSpacing: '0.03em',
        color: '#D08A3C',
      }}>{label}</span>
    </div>
  );
}

// ── Menu item row ──────────────────────────────────────────────────────────────
function MenuItem({ item }: { item: typeof MENU_ITEMS[0] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '7px', width: '362px' }}>
      {/* Image */}
      <img
        src={item.img}
        alt={item.name}
        style={{ width: '75px', height: '75px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
      />
      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          <span style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '21px',
            letterSpacing: '0.03em',
            color: '#FFFFFF',
          }}>{item.name}</span>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
            <VegBadge isVeg={item.isVeg} />
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: '13px',
              lineHeight: '15px',
              color: '#FFFFFF',
            }}>{item.price}</span>
          </div>
        </div>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.02em',
          color: 'rgba(255,255,255,0.8)',
          margin: 0,
        }}>{item.desc}</p>
      </div>
    </div>
  );
}

// ── 1+1 Offer card ─────────────────────────────────────────────────────────────
function OnePlusOneCard({ card }: { card: typeof ONE_PLUS_ONE[0] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px', width: '141px' }}>
      {/* Overlapping images */}
      <div style={{ position: 'relative', width: '141px', height: '129px' }}>
        <img src={card.img1} alt="item1" style={{ position: 'absolute', left: 0, top: 0, width: '87.85px', height: '81px', borderRadius: '10px', objectFit: 'cover' }} />
        <img src={card.img2} alt="item2" style={{ position: 'absolute', left: '53.15px', top: '48px', width: '87.85px', height: '81px', borderRadius: '10px', objectFit: 'cover' }} />
        {/* Plus circle */}
        <div style={{
          position: 'absolute',
          left: '52.77px',
          top: '36.32px',
          width: '34.25px',
          height: '34.25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect x="1.5" y="1.5" width="31" height="31" rx="15.5" stroke="white" strokeWidth="3" />
            <line x1="17" y1="8" x2="17" y2="26" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="8" y1="17" x2="26" y2="17" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '141px' }}>
        <span style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.03em',
          color: '#FFFFFF',
          width: '141px',
        }}>{card.title}</span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.02em',
          color: 'rgba(255,255,255,0.8)',
          width: '141px',
        }}>{card.desc}</span>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function MenuScreen({ onNavigateToSpecials }: MenuScreenProps) {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'VEG' | 'NON-VEG'>('ALL');
  const [activeTab, setActiveTab] = useState('Starters');

  const activeBoxGradient = 'linear-gradient(180deg, #DE994D 29.33%, #A56C2D 100%)';
  const inactiveBoxBg = 'linear-gradient(0deg, #162B39, #162B39), linear-gradient(0deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15))';

  const activeBarGradient = 'linear-gradient(90deg, #DE994D 0%, #A56C2D 93.75%)';
  const inactiveBarBg = 'linear-gradient(0deg, #162B39, #162B39), linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05))';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#162B39', color: 'white', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '393px', margin: '0 auto' }}>

        {/* Logo */}
        <div className="flex justify-center py-6">
          <img src="/logo.png" alt="CSAT" className="h-12" />
        </div>

        <div style={{ padding: '0 16px' }}>

          {/* ── Category Boxes ── */}
          {/* Spec: Frame 156 — width:290px, height:100px, gap:25px, centered */}
          <div style={{ display: 'flex', gap: '25px', marginBottom: '20px', justifyContent: 'center', width: '290px', height: '100px', margin: '0 auto 20px' }}>
            {[
              { label: 'Food', img: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200', key: 'food', active: true },
              { label: 'Drinks', img: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=200', key: 'drinks', active: false },
              { label: 'Tobacco', img: 'https://images.pexels.com/photos/4969832/pexels-photo-4969832.jpeg?auto=compress&cs=tinysrgb&w=200', key: 'tobacco', active: false },
            ].map(({ label, img, key, active }) => (
              <div
                key={key}
                style={{
                  width: '80px',
                  height: '100px',
                  borderRadius: '5px',
                  /* Active: linear-gradient(180deg, #DE994D 29.33%, #A56C2D 100%) */
                  /* Inactive: rgba(255,255,255,0.15) overlay on #162B39, border 0.5px */
                  background: active
                    ? 'linear-gradient(180deg, #DE994D 29.33%, #A56C2D 100%)'
                    : 'linear-gradient(0deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15)), #162B39',
                  border: active ? 'none' : '0.5px solid rgba(22,43,57,0.4)',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={img}
                  alt={label}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', boxShadow: '1px 2px 4px rgba(0,0,0,0.2)' }}
                />
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: active ? 600 : 500,
                  fontSize: '14px',
                  lineHeight: '17px',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  alignSelf: 'stretch',
                }}>{label}</span>
              </div>
            ))}
          </div>

          {/* ── Veg / All / Non-Veg Bar ── */}
          {/* Spec: Frame 154 — 351×36, border:0.2px rgba(214,147,73,0.4), shadow, bg overlay */}
          {/* Inner Frame 5: 334px wide, gap:11px; each pill 104×30px */}
          <div style={{
            width: '351px',
            height: '36px',
            borderRadius: '50px',
            border: '0.2px solid rgba(214, 147, 73, 0.4)',
            boxShadow: '2px 2px 3px rgba(5, 20, 30, 0.4)',
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '0px',
            marginBottom: '20px',
            background: 'linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05)), rgba(22,43,57,0.2)',
            boxSizing: 'border-box',
          }}>
            {/* Inner row: 334px wide, gap 11px */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '11px', width: '334px', height: '30px' }}>
              {(['ALL', 'VEG', 'NON-VEG'] as const).map((f) => {
                const active = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{
                      width: '104px',
                      height: '30px',
                      borderRadius: '50px',
                      /* Active: gradient + border 0.2px rgba(125,121,121,0.7) */
                      /* Inactive: rgba(255,255,255,0.05) on #162B39 */
                      background: active
                        ? 'linear-gradient(90deg, #DE994D 0%, #A56C2D 93.75%)'
                        : 'linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05)), #162B39',
                      border: active ? '0.2px solid rgba(125,121,121,0.7)' : 'none',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '17px',
                      transition: 'background 0.2s',
                      flexShrink: 0,
                    }}
                  >{f}</button>
                );
              })}
            </div>
          </div>

          {/* ── Category Tabs (scroll) ── */}
          <div style={{
            position: 'relative',
            width: '378.68px',
            left: '0px',
            marginBottom: '0px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: '30px',
              overflowX: 'scroll',
              scrollbarWidth: 'none',
              paddingBottom: '0px',
            }}>
              {CATEGORY_TABS.map((tab) => {
                const isOffers = tab === 'Offers for you';
                const isActive = activeTab === tab;
                return (
                  <div
                    key={tab}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flexShrink: 0 }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2px' }}>
                      {isOffers && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M10 2L11.8 7.2H17.3L12.9 10.4L14.6 15.6L10 12.4L5.4 15.6L7.1 10.4L2.7 7.2H8.2L10 2Z" fill="#D08A3C" />
                        </svg>
                      )}
                      <button
                        onClick={isOffers ? onNavigateToSpecials : () => setActiveTab(tab)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          fontFamily: 'Inter, sans-serif',
                          fontStyle: isOffers ? 'italic' : 'normal',
                          fontWeight: 500,
                          fontSize: '16px',
                          lineHeight: '19px',
                          color: isOffers ? '#D08A3C' : '#FFFFFF',
                          whiteSpace: 'nowrap',
                        }}
                      >{tab}</button>
                    </div>
                    {/* Active underline */}
                    {isActive && !isOffers && (
                      <div style={{ width: '100%', height: '3px', background: '#D08A3C', borderRadius: '2px' }} />
                    )}
                    {isOffers && (
                      <div style={{ width: '137px', height: '3px', border: '3px solid #D08A3C', borderRadius: '2px', marginLeft: '-20px' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider line */}
          <div style={{ width: '393px', height: '1px', background: '#E5E1DA', marginLeft: '-16px', marginBottom: '20px' }} />

          {/* ── Search Bar ── */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search items..."
              style={{
                width: '100%',
                backgroundColor: '#0f2830',
                color: 'white',
                paddingLeft: '44px',
                paddingRight: '44px',
                paddingTop: '12px',
                paddingBottom: '12px',
                borderRadius: '12px',
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
            <SlidersHorizontal style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#D08A3C' }} />
          </div>

          {/* ── Scrollable Menu List ── */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '35px',
            width: '362px',
            margin: '0 auto',
            overflowY: 'scroll',
            maxHeight: '541px',
            scrollbarWidth: 'none',
          }}>

            {/* Combo offers section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '362px' }}>
              <SectionHeading label="Combo offers" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '19px' }}>
                {MENU_ITEMS.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* 1+1 offers section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '347px' }}>
              <SectionHeading label="1+1 offers" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Pair cards in rows of 2 */}
                {[0, 2].map((startIdx) => (
                  <div key={startIdx} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '55px',
                    width: '347px',
                  }}>
                    {ONE_PLUS_ONE.slice(startIdx, startIdx + 2).map((card) => (
                      <OnePlusOneCard key={card.id} card={card} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Menu FAB ── */}
        {/* Spec: Frame 81 — Ellipse 85×85, gradient #F0A450→#CF8838, border 1px rgba(240,164,80,0.8), drop-shadow */}
        {/* Frame 80 inside: column, 45×48, icon 30×30 + "Menu" Inter 500 15px */}
        <button style={{
          position: 'fixed',
          bottom: '24px',
          right: '16px',
          width: '85px',
          height: '85px',
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #F0A450 0%, #CF8838 88.47%)',
          border: '1px solid rgba(240, 164, 80, 0.8)',
          boxShadow: '2px 2.5px 3px rgba(155, 98, 34, 0.3), 2px 2px 4px rgba(199, 106, 58, 0.4)',
          cursor: 'pointer',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0px',
          padding: '0px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0, width: '45px', height: '48px', justifyContent: 'center', gap: '0px' }}>
            <UtensilsCrossed style={{ width: '30px', height: '30px', color: '#FFFFFF' }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '15px',
              lineHeight: '18px',
              textAlign: 'center',
              color: '#FFFFFF',
              width: '45px',
            }}>Menu</span>
          </div>
        </button>
      </div>
    </div>
  );
}