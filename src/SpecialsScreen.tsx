import { ChevronRight } from 'lucide-react';
interface SpecialsScreenProps {
  onNavigateToMenu: () => void;
} 
export default function SpecialsScreen({ onNavigateToMenu }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a3a47', color: 'white', paddingBottom: '100px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '390px', margin: '0 auto' }}>

        {/* Logo */}
        <div className="flex justify-center py-6">
          <img src="/logo.png" alt="CSAT" className="h-12" />
        </div>

        <div style={{ padding: '0 16px' }}>

          {/* Dish of the Day Card */}
          <div style={{ background: 'white', color: 'black', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '24px' }}>
  <div style={{ flex: 1 }}>
    <p style={{ fontSize: '10px', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px' }}>DISH OF THE DAY</p>
    <h2 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 8px', lineHeight: 1.2, color: '#000' }}>Saffron Vegetable Pulao</h2>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
  <span className="border border-green-500 p-[2px] flex items-center justify-center w-4 h-4 rounded-sm">
    <span className="w-2 h-2 rounded-full bg-green-500"></span>
  </span>
  ₹250
      <span style={{ fontSize: '12px', color: '#000' }}>🕐 20 mins</span>
    </div>
    <p style={{ fontSize: '12px', color: '#000', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
      Fragrant basmati rice gently cooked with saffron, seasonal vegetables, and mild aromatic spices.
    </p>
  </div>
  <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
    <img src="https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Pulao" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
</div>

          <h2 style={{ fontSize: '32px', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400', margin: '0 0 24px' }}>Specials & Offers</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

  {/* Special 1 */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ flex: 1 }}>
      <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 10px' }}>2-for-1 Special</h3>
      <p style={{ fontSize: '14px', color: '#b0c8d0', lineHeight: 1.6, margin: 0 }}>Choose for any two starters and pay for only one. The perfect way to begin your feast.</p>
    </div>
    <div style={{ width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '3px solid rgba(255,255,255,0.25)', boxShadow: '0 0 0 1px rgba(255,255,255,0.1)' }}>
      <img src="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=300" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  </div>

  {/* Special 2 */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '3px solid rgba(255,255,255,0.25)', boxShadow: '0 0 0 1px rgba(255,255,255,0.1)' }}>
      <img src="https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=300" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ flex: 1 }}>
      <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 10px' }}>Buy 1, get 1 special</h3>
      <p style={{ fontSize: '14px', color: '#b0c8d0', lineHeight: 1.6, margin: 0 }}>Buy a cocktail of above ₹350, and get another cocktails for absolutely free.</p>
    </div>
  </div>

  {/* Special 3 */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ flex: 1 }}>
      <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 10px' }}>2-for-1 Special</h3>
      <p style={{ fontSize: '14px', color: '#b0c8d0', lineHeight: 1.6, margin: 0 }}>Choose for any two starters and pay for only one. The perfect way to begin your feast.</p>
    </div>
    <div style={{ width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '3px solid rgba(255,255,255,0.25)', boxShadow: '0 0 0 1px rgba(255,255,255,0.1)' }}>
      <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  </div>

</div>
        </div>

         <button
          onClick={onNavigateToMenu}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#c17a4a] text-white rounded-full px-8 py-4 shadow-lg flex items-center gap-2 font-semibold text-lg"
        >
          Step inside
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}