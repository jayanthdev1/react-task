import { useEffect } from 'react';

interface Addon {
  name: string;
  price: number;
  image: string;
}

interface Dish {
  name: string;
  image: string;
  price: number;
  time: string;
  description?: string;
  isVeg?: boolean;
  calories?: string;
  ingredients?: string[];
  addons?: Addon[];
}

interface DishDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dish: Dish;
}

// ── Veg/Non-veg dot (matches menu screen spec) ───────────────────────────────
function VegDot({ isVeg }: { isVeg: boolean }) {
  const color = isVeg ? '#14AE5C' : '#E6423C';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '16px', height: '16px',
      border: `1px solid ${color}`, borderRadius: '3px', flexShrink: 0,
    }}>
      <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: color }} />
    </span>
  );
}

const DishDetailModal = ({ isOpen, onClose, dish }: DishDetailModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const addons: Addon[] = dish.addons || [
    { name: 'Cut Onions',    price: 5, image: 'https://images.pexels.com/photos/144206/pexels-photo-144206.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { name: 'Lemon wedges', price: 5, image: 'https://images.pexels.com/photos/1414110/pexels-photo-1414110.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { name: 'Mint dip',      price: 5, image: 'https://images.pexels.com/photos/4061502/pexels-photo-4061502.jpeg?auto=compress&cs=tinysrgb&w=100' },
  ];

  const ingredients: string[] = dish.ingredients || [
    'Minced lamb meat',
    'Raw papaya paste',
    'Kebab chinni',
    'Ghee & saffron',
  ];

  const description =
    dish.description ||
    'Traditional melt-in-mouth kebab made with finely minced meat, marinated in a secret blend of spices, and slow-cooked to perfection.';

  return (
    <>
      {/* ── Backdrop (left 70% of screen, semi-opaque #162B39 at opacity 0.7) */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 80,
          background: 'rgba(22,43,57,0.7)',
        }}
        onClick={onClose}
      />

      {/* ── iPhone 16 - 4: right-side panel ── */}
      {/* Figma: width:270, border-radius: 30px 0 0 30px, bg:#FAF7F2 */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: '270px',
        background: '#FAF7F2',
        borderRadius: '30px 0px 0px 30px',
        zIndex: 90,
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
      }}>

        {/* ── Frame 110: top bar — left:23, top:35, 230×32, space-between ── */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          width: '230px', height: '32px',
          margin: '35px 0 0 23px',
        }}>
          {/* charm:cross — 32×32 white circle */}
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px',
              background: '#FFFFFF',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
              borderRadius: '100px',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {/* X icon — 1.5px solid #555555 */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="2" y1="2" x2="12" y2="12" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="2" x2="2" y2="12" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Frame 99: calories badge — 93×29, rgba(22,43,57,0.8), border-radius:5px */}
          <div style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'center', alignItems: 'center',
            gap: '10px',
            width: '93px', height: '29px',
            background: 'rgba(22,43,57,0.8)',
            border: '0.7px solid rgba(22,43,57,0.6)',
            borderRadius: '5px',
            flexShrink: 0,
          }}>
            {/* Frame 100: flame icon + "450 kcal" */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0 }}>
              {/* lets-icons:calories — simplified flame SVG 18×18 */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                <path d="M9 2C9 2 11.5 5 10.5 7.5C12 6.5 12.5 4.5 12.5 4.5C13.5 6 14 8 13 10.5C12.2 12.5 10.5 14 9 14C7.5 14 5.8 12.5 5 10.5C4 8 4.5 6 6 4.5C6 4.5 6.5 7 8 7.5C7 5 9 2 9 2Z"
                  stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 500,
                fontSize: '14px', lineHeight: '16px', color: '#FFFFFF',
              }}>450 kcal</span>
            </div>
          </div>
        </div>

        {/* ── Frame 111: dish image + name/price — top:102 relative to panel ── */}
        {/* Figma: width:208, left:calc(50%-208/2-8px) = left:20 on 270px panel */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', gap: '5px',
          width: '208px',
          margin: '20px 0 0 20px',
        }}>
          {/* image 28 — 208×180, border 0.5px rgba(169,113,47,0.2), border-radius:10px */}
          <div style={{
            width: '208px', height: '180px',
            border: '0.5px solid rgba(169,113,47,0.2)',
            borderRadius: '10px',
            overflow: 'hidden', boxSizing: 'border-box', flexShrink: 0,
          }}>
            <img
              src={dish.image} alt={dish.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Frame 104: name + price/time */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', gap: '13px',
            width: '216px',
          }}>
            {/* Frame 101: dish name + veg dot */}
            <div style={{
              display: 'flex', flexDirection: 'row',
              alignItems: 'flex-end', gap: '5px',
              width: '216px',
            }}>
              <span style={{
                fontFamily: 'Playfair, "Playfair Display", serif',
                fontWeight: 500, fontSize: '30px', lineHeight: '36px',
                color: '#162B39',
              }}>{dish.name}</span>
              <VegDot isVeg={!!dish.isVeg} />
            </div>

            {/* Frame 103: price + time */}
            <div style={{
              display: 'flex', flexDirection: 'row',
              alignItems: 'center', gap: '25px',
              width: '141px', height: '19px',
            }}>
              <span style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                fontSize: '16px', lineHeight: '19px', color: '#A9712F',
              }}>₹{dish.price}</span>

              {/* Frame 102: clock icon + time */}
              <div style={{
                display: 'flex', flexDirection: 'row',
                alignItems: 'center', gap: '3px',
              }}>
                {/* mingcute:time-line 16×16 */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#A9712F" strokeWidth="1.4" />
                  <path d="M8 5V8.5L10.5 10" stroke="#A9712F" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <span style={{
                  fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                  fontSize: '16px', lineHeight: '19px', color: '#A9712F',
                }}>{dish.time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Frame 118: scrollable content sections — top:375 (margin from top) ── */}
        {/* Figma: width:213, left:23, gap:35 between sections */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', gap: '35px',
          width: '213px',
          margin: '28px 0 40px 23px',
        }}>

          {/* ── Frame 106: Description ── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', gap: '10px',
            width: '213px',
          }}>
            {/* Section heading row */}
            <div style={{
              display: 'flex', flexDirection: 'row',
              alignItems: 'center', gap: '5px',
            }}>
              {/* ix:book icon 22×22 */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 4.5C4 3.4 4.9 2.5 6 2.5H17V17.5H6C4.9 17.5 4 18.4 4 19.5V4.5Z"
                  stroke="rgba(22,43,57,0.8)" strokeWidth="1.3" />
                <path d="M4 19.5C4 18.4 4.9 17.5 6 17.5H17" stroke="rgba(22,43,57,0.8)" strokeWidth="1.3" />
                <line x1="7.5" y1="7" x2="14" y2="7" stroke="rgba(22,43,57,0.8)" strokeWidth="1.1" strokeLinecap="round" />
                <line x1="7.5" y1="10" x2="14" y2="10" stroke="rgba(22,43,57,0.8)" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <span style={{
                fontFamily: 'Playfair, "Playfair Display", serif',
                fontWeight: 500, fontSize: '20px', lineHeight: '24px',
                color: 'rgba(22,43,57,0.8)',
              }}>Description</span>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 400,
              fontSize: '12px', lineHeight: '18px',
              textAlign: 'justify', color: '#555555',
              margin: 0, width: '213px',
            }}>{description}</p>
          </div>

          {/* ── Add-ons ── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '10px',
            width: '213px',
          }}>
            {/* Heading */}
            <div style={{
              display: 'flex', flexDirection: 'row',
              alignItems: 'center', gap: '5px',
              width: '213px',
            }}>
              {/* gridicons:add 22×22 */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <line x1="11" y1="4" x2="11" y2="18" stroke="rgba(22,43,57,0.8)" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="4" y1="11" x2="18" y2="11" stroke="rgba(22,43,57,0.8)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span style={{
                fontFamily: 'Playfair, "Playfair Display", serif',
                fontWeight: 500, fontSize: '20px', lineHeight: '24px',
                color: 'rgba(22,43,57,0.8)',
              }}>Add-ons</span>
            </div>

            {/* Addon rows */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', gap: '6px',
              width: '213px',
            }}>
              {addons.map((addon, idx) => (
                <div key={idx} style={{
                  display: 'flex', flexDirection: 'row',
                  alignItems: 'center', gap: '5px',
                  width: '213px', height: '35px',
                }}>
                  {/* Group 18: circle image — 35×35 */}
                  <div style={{ position: 'relative', width: '35px', height: '35px', flexShrink: 0 }}>
                    {/* Ellipse 12: white border circle */}
                    <div style={{
                      position: 'absolute', left: 0, top: 0,
                      width: '35px', height: '35px', borderRadius: '50%',
                      background: '#FFFFFF',
                      border: '0.6px solid rgba(22,43,57,0.5)',
                      overflow: 'hidden',
                    }}>
                      {/* Ellipse 11: inner food image 30.25×30.25 */}
                      <img
                        src={addon.image} alt={addon.name}
                        style={{
                          position: 'absolute',
                          left: '2.59px', top: '2.59px',
                          width: '30.25px', height: '30.25px',
                          borderRadius: '50%', objectFit: 'cover',
                        }}
                      />
                    </div>
                  </div>

                  {/* Frame 120: name + price */}
                  <div style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '167px', height: '32px',
                    justifyContent: 'center',
                  }}>
                    <span style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                      fontSize: '12px', lineHeight: '14px', color: '#555555',
                    }}>{addon.name}</span>
                    <span style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                      fontSize: '12px', lineHeight: '18px',
                      color: 'rgba(22,43,57,0.8)',
                    }}>+₹{addon.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Frame 107: Main ingredients ── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', gap: '10px',
            width: '213px',
          }}>
            {/* Heading */}
            <div style={{
              display: 'flex', flexDirection: 'row',
              alignItems: 'center', gap: '5px',
            }}>
              {/* material-symbols:food-bank-rounded 22×22 */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="3" y="3" width="16" height="16" rx="2" stroke="rgba(22,43,57,0.8)" strokeWidth="1.3" />
                <path d="M7 8H15M7 11H15M7 14H11" stroke="rgba(22,43,57,0.8)" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <span style={{
                fontFamily: 'Playfair, "Playfair Display", serif',
                fontWeight: 500, fontSize: '20px', lineHeight: '24px',
                color: 'rgba(22,43,57,0.8)',
              }}>Main ingredients</span>
            </div>

            {/* Frame 108: ingredient list */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', gap: '5px',
              width: '213px',
            }}>
              {ingredients.map((ing, idx) => (
                <span key={idx} style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 400,
                  fontSize: '12px', lineHeight: '18px',
                  letterSpacing: '0.02em', textAlign: 'justify',
                  color: '#555555', width: '213px',
                }}>{ing}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default DishDetailModal;
