import { ChevronRight } from 'lucide-react';

interface SpecialsScreenProps {
  onNavigateToMenu: () => void;
}

export default function SpecialsScreen({ onNavigateToMenu }: SpecialsScreenProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#162B39', color: 'white', paddingBottom: '100px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '390px', margin: '0 auto' }}>

        {/* Logo */}
        <div className="flex justify-center py-6">
          <img src="/logo.png" alt="CSAT" className="h-12" />
        </div>

        <div style={{ padding: '0 16px' }}>

          {/* Dish of the Day Card */}
          <div style={{ background: 'white', color: 'black', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              {/* DISH OF THE DAY label */}
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                color: '#0F0F0FCC',
                textTransform: 'uppercase',
                letterSpacing: '0%',
                lineHeight: '100%',
                margin: '0 0 6px',
              }}>DISH OF THE DAY</p>

              {/* Dish title */}
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '100%',
                letterSpacing: '0%',
                // backgroundColor: '#162B39',
                color: '#162B39',
                margin: '0 0 6px',
                padding: '4px',
                borderRadius: '4px',
                display: 'inline-block',
              }}>Saffron Vegetable Pulao</h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span className="border border-green-500 p-[2px] flex items-center justify-center w-4 h-4 rounded-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </span>
                ₹250
                <span style={{ fontSize: '12px', color: '#D08A3C' }}>🕐 20 mins</span>
              </div>

              {/* Dish description */}
              <p style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: '12px',
                lineHeight: '18px',
                letterSpacing: '2%',
                color: '#0F0F0F80',
                margin: 0,
              }}>
                Fragrant basmati rice gently cooked with saffron, seasonal vegetables, and mild aromatic spices.
              </p>
            </div>
            <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
              <img src="https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Pulao" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Section heading */}
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '32px',
            fontStyle: 'italic',
            fontWeight: '400',
            margin: '0 0 24px',
            color: 'white',
          }}>Specials &amp; Offers</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Special 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: 'Playfair, "Playfair Display", serif',
                  fontWeight: 500,
                  fontSize: '22px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  margin: '0 0 10px',
                  color: 'white',
                }}>2-for-1 Special:</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '18px',
                  letterSpacing: '2%',
                  color: '#b0c8d0',
                  margin: 0,
                }}>Choose for any two starters and pay for only one. The perfect way to begin your feast.</p>
              </div>
              <img src="/food.png" />
            </div>

            {/* Special 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src="/drinks.png" />
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: 'Playfair, "Playfair Display", serif',
                  fontWeight: 500,
                  fontSize: '22px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  margin: '0 0 10px',
                  color: 'white',
                }}>Buy 1, get 1 special</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '18px',
                  letterSpacing: '2%',
                  color: '#b0c8d0',
                  margin: 0,
                }}>Buy a cocktail of above ₹250, and get another cocktails for absolutely free.</p>
              </div>
            </div>

            {/* Special 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: 'Playfair, "Playfair Display", serif',
                  fontWeight: 500,
                  fontSize: '22px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  margin: '0 0 10px',
                  color: 'white',
                }}>2-for-1 Special:</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '18px',
                  letterSpacing: '2%',
                  color: '#b0c8d0',
                  margin: 0,
                }}>Choose for any two starters and pay for only one. The perfect way to begin your feast.</p>
              </div>
              <img src="/cake.png" />
            </div>

          </div>
        </div>

        {/* Step Inside Button */}
        <button
          onClick={onNavigateToMenu}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '50px',
            backgroundColor: '#BA7629',
            color: 'white',
            borderRadius: '50px',
            border: '0.4px solid #BA7629',
            padding: '10px',
            gap: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(186,118,41,0.35)',
          }}
        >
          Step inside
          <ChevronRight style={{ width: '20px', height: '20px' }} />
        </button>
      </div>
    </div>
  );
}