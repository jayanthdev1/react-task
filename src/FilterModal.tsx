import { useState, useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (count: number) => void;
  type?: 'food' | 'drinks';
}

// ── Custom radio button (Figma: 13×13 circle, #A9712F fill when selected) ──
function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '13px', height: '13px',
      borderRadius: '50%',
      background: '#FAF7F2',
      border: selected ? '1px solid #555555' : '1.3px solid #555555',
      boxSizing: 'border-box', flexShrink: 0,
    }}>
      {selected && (
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#A9712F' }} />
      )}
    </span>
  );
}

// ── Custom checkbox (square, #A9712F fill when selected) ──
function CheckBox({ selected }: { selected: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '13px', height: '13px',
      borderRadius: '2px',
      background: selected ? '#A9712F' : '#FAF7F2',
      border: '1px solid #555555',
      boxSizing: 'border-box', flexShrink: 0,
    }}>
      {selected && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3L3.5 5.5L8 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

const FilterModal = ({ isOpen, onClose, onApply, type = 'food' }: FilterModalProps) => {
  const [activeTab, setActiveTab] = useState(type === 'drinks' ? 'Price range' : 'Price');
  const [priceMax, setPriceMax] = useState(2000);
  const [sortOrder, setSortOrder] = useState<'lowToHigh' | 'highToLow' | null>('lowToHigh');
  const [selectedPrepTime, setSelectedPrepTime] = useState<string | null>(null);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>('Mid range');

  const categories = type === 'food'
    ? ['Price', 'Prep time', 'Allergies', 'Diet & preparation']
    : ['Price range', 'Serving type', 'Occasion'];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    let count = 0;
    if (type === 'food') {
      if (priceMax !== 2000) count++;
      if (sortOrder) count++;
      if (selectedPrepTime) count++;
      count += selectedAllergies.length + selectedDiet.length + selectedPreferences.length;
    } else {
      if (selectedPriceRange) count++;
      if (selectedPrepTime) count++;
      if (selectedOccasion) count++;
    }
    onApply(count);
    onClose();
  };

  const handleClear = () => {
    setPriceMax(2000);
    setSortOrder(null);
    setSelectedPrepTime(null);
    setSelectedOccasion(null);
    setSelectedAllergies([]);
    setSelectedDiet([]);
    setSelectedPreferences([]);
    setSelectedPriceRange(null);
  };

  const toggleList = (list: string[], item: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  };

  // ── The panel is 393px wide, 435px tall, bottom-anchored ──
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 60,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      background: 'rgba(22,43,57,0.7)',
    }} onClick={onClose}>
      {/* iPhone 16 - 2: bottom sheet 393×435, #FAF7F2, border-radius:15px 15px 0 0 */}
      <div
        style={{
          position: 'relative',
          width: '393px', height: '435px',
          background: '#FAF7F2',
          borderRadius: '15px 15px 0px 0px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── Frame 24: header — top:24, width:350, space-between ── */}
        <div style={{
          position: 'absolute',
          width: '350px', height: '24px',
          left: 'calc(50% - 350px/2 - 6.5px)',
          top: '24px',
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          {/* "Filters" — Inter 600 20px #555555 */}
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: '20px', lineHeight: '24px', color: '#555555',
          }}>Filters</span>

          {/* charm:cross — 24×24, #F8F1ED, border-radius:100px */}
          <button
            onClick={onClose}
            style={{
              width: '24px', height: '24px',
              background: '#F8F1ED', borderRadius: '100px',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <line x1="1.5" y1="1.5" x2="9.5" y2="9.5" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9.5" y1="1.5" x2="1.5" y2="9.5" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Line 3: horizontal divider at top:64 ── */}
        <div style={{
          position: 'absolute', left: 0, top: '64px',
          width: '393px', height: 0,
          borderTop: '1px solid #B6B4B1',
        }} />

        {/* ── Line 4: vertical divider at left:107 (64–264 = 200px tall content area) ── */}
        <div style={{
          position: 'absolute', left: '107px', top: '64px',
          width: '1px', height: '284px',
          background: '#B6B4B1',
        }} />

        {/* ── Frame 27: left sidebar — 106×200, top:64 ── */}
        <div style={{
          position: 'absolute', left: 0, top: '64px',
          width: '106px',
          display: 'flex', flexDirection: 'column',
        }}>
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  boxSizing: 'border-box',
                  width: '106px', height: '50px',
                  background: isActive ? '#A9712F' : '#FAF7F2',
                  border: isActive ? 'none' : '0.35px solid #B6B4B1',
                  display: 'flex', alignItems: 'center',
                  padding: '10px 15px', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 400,
                  fontSize: '14px', lineHeight: '17px',
                  color: isActive ? '#FAF7F2' : '#555555',
                }}>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* ── Right content area — left:118, top:64, width:calc(393-118)=275 ── */}
        <div style={{
          position: 'absolute', left: '118px', top: '64px',
          width: '258px',
          overflowY: 'auto', height: '284px', scrollbarWidth: 'none',
        }}>

          {/* ── PRICE RANGE TAB (drinks) — Mid range / Premium / Luxury radio ── */}
          {activeTab === 'Price range' && (
            <div style={{ marginTop: '11px' }}>
              {['Mid range', 'Premium', 'Luxury'].map(item => (
                <div
                  key={item}
                  style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center',
                    width: '238px', height: '16px', marginBottom: '15px', cursor: 'pointer',
                  }}
                  onClick={() => setSelectedPriceRange(item)}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#555555' }}>{item}</span>
                  <RadioDot selected={selectedPriceRange === item} />
                </div>
              ))}
            </div>
          )}

          {/* ── PRICE TAB (food only) ── */}
          {activeTab === 'Price' && (
            <div>
              {/* "Select your price range" — Inter 500 15px #555555, top:75-64=11 */}
              <span style={{
                display: 'block',
                fontFamily: 'Inter, sans-serif', fontWeight: 500,
                fontSize: '15px', lineHeight: '18px', color: '#555555',
                marginTop: '11px',
              }}>Select your price range</span>

              {/* "₹0 - ₹{priceMax}" — Inter 500 14px #A9712F, top:108-64=44 */}
              <span style={{
                display: 'block', textAlign: 'center',
                fontFamily: 'Inter, sans-serif', fontWeight: 500,
                fontSize: '14px', lineHeight: '17px', color: '#A9712F',
                marginTop: '11px',
              }}>₹0 - ₹{priceMax}</span>

              {/* Frame 15: slider — top:122-64=58, width:243 */}
              <div style={{
                position: 'relative', width: '243px',
                marginTop: '8px',
              }}>
                {/* Group 13: track */}
                <div style={{ position: 'relative', height: '15px', width: '229px', marginLeft: '7px' }}>
                  {/* Line 8: track line at vertical center */}
                  <div style={{
                    position: 'absolute', left: 0, top: '7px',
                    width: '229px', height: 0,
                    borderTop: '2px solid rgba(169,113,47,0.5)',
                  }} />
                  {/* Active fill */}
                  <div style={{
                    position: 'absolute', left: 0, top: '7px',
                    width: `${(priceMax / 2000) * 229}px`, height: 0,
                    borderTop: '2px solid #A9712F',
                  }} />
                  {/* Thumb: Ellipse 2 — 15×15 circle #A9712F */}
                  <div style={{
                    position: 'absolute',
                    left: `${(priceMax / 2000) * 214}px`,
                    top: 0,
                    width: '15px', height: '15px',
                    borderRadius: '50%', background: '#A9712F',
                  }} />
                  {/* Real input[range] overlaid invisibly for interaction */}
                  <input
                    type="range" min={0} max={2000} step={50}
                    value={priceMax}
                    onChange={e => setPriceMax(parseInt(e.target.value))}
                    style={{
                      position: 'absolute', left: 0, top: 0,
                      width: '229px', height: '15px',
                      opacity: 0, cursor: 'pointer', margin: 0, padding: 0,
                    }}
                  />
                </div>

                {/* Frame 14: ₹0 / ₹2000 labels */}
                <div style={{
                  display: 'flex', flexDirection: 'row',
                  justifyContent: 'space-between', alignItems: 'center',
                  width: '241px', marginTop: '4px',
                }}>
                  <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '14px', color: '#A9712F' }}>₹0</span>
                  <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '14px', color: '#A9712F' }}>₹2000</span>
                </div>
              </div>

              {/* Frame 28: "Low to high" — top:183-64=119 */}
              <div
                style={{
                  display: 'flex', flexDirection: 'row',
                  justifyContent: 'space-between', alignItems: 'center',
                  width: '230px', height: '16px', marginTop: '26px', cursor: 'pointer',
                }}
                onClick={() => setSortOrder('lowToHigh')}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#555555' }}>Low to high</span>
                <RadioDot selected={sortOrder === 'lowToHigh'} />
              </div>

              {/* Frame 29: "High to low" — top:209-64=145 */}
              <div
                style={{
                  display: 'flex', flexDirection: 'row',
                  justifyContent: 'space-between', alignItems: 'center',
                  width: '230px', height: '16px', marginTop: '10px', cursor: 'pointer',
                }}
                onClick={() => setSortOrder('highToLow')}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#555555' }}>High to low</span>
                <RadioDot selected={sortOrder === 'highToLow'} />
              </div>
            </div>
          )}

          {/* ── PREP TIME TAB (food) / SERVING TYPE TAB (drinks) ── */}
          {(activeTab === 'Prep time' || activeTab === 'Serving type') && (
            <div style={{ marginTop: '11px' }}>
              {(type === 'food'
                ? ['Quick bites', '5-10 mins', '10-15 mins', '15+ mins']
                : ['By glass', 'By bottle', 'Pitcher']
              ).map(item => (
                <div
                  key={item}
                  style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center',
                    width: '230px', height: '16px', marginBottom: '16px', cursor: 'pointer',
                  }}
                  onClick={() => setSelectedPrepTime(item)}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#555555' }}>{item}</span>
                  <RadioDot selected={selectedPrepTime === item} />
                </div>
              ))}
            </div>
          )}

          {/* ── ALLERGIES TAB ── */}
          {activeTab === 'Allergies' && (
            <div style={{ marginTop: '11px' }}>
              {['Milk/dairy', 'Peanuts', 'Eggs', 'Soy', 'Shellfish(prawns, crabs, lobster)', 'Fish', 'Sesame'].map(item => (
                <div
                  key={item}
                  style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center',
                    width: '230px', minHeight: '16px', marginBottom: '14px', cursor: 'pointer',
                  }}
                  onClick={() => toggleList(selectedAllergies, item, setSelectedAllergies)}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#555555' }}>{item}</span>
                  <CheckBox selected={selectedAllergies.includes(item)} />
                </div>
              ))}
            </div>
          )}

          {/* ── DIET & PREPARATION TAB ── */}
          {activeTab === 'Diet & preparation' && (
            <div style={{ marginTop: '11px' }}>
              <span style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '13px', color: '#555555', marginBottom: '10px' }}>Diet type</span>
              {['Eggetarian', 'Vegan', 'Gluten-free'].map(item => (
                <div
                  key={item}
                  style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center',
                    width: '230px', height: '16px', marginBottom: '14px', cursor: 'pointer',
                  }}
                  onClick={() => toggleList(selectedDiet, item, setSelectedDiet)}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#555555' }}>{item}</span>
                  <CheckBox selected={selectedDiet.includes(item)} />
                </div>
              ))}
              <span style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '13px', color: '#555555', margin: '6px 0 10px' }}>Preparation</span>
              {['Less oil', 'No onion, no garlic', 'Baked'].map(item => (
                <div
                  key={item}
                  style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center',
                    width: '230px', height: '16px', marginBottom: '14px', cursor: 'pointer',
                  }}
                  onClick={() => toggleList(selectedPreferences, item, setSelectedPreferences)}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#555555' }}>{item}</span>
                  <CheckBox selected={selectedPreferences.includes(item)} />
                </div>
              ))}
            </div>
          )}

          {/* ── OCCASION TAB (drinks) ── */}
          {activeTab === 'Occasion' && (
            <div style={{ marginTop: '11px' }}>
              {['Party picks', 'Casual', 'Celebrations'].map(item => (
                <div
                  key={item}
                  style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center',
                    width: '230px', height: '16px', marginBottom: '16px', cursor: 'pointer',
                  }}
                  onClick={() => setSelectedOccasion(item)}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#555555' }}>{item}</span>
                  <RadioDot selected={selectedOccasion === item} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Line 5: divider above buttons at top:348 ── */}
        <div style={{
          position: 'absolute', left: 0, top: '348px',
          width: '393px', height: 0,
          borderTop: '1px solid #B6B4B1',
        }} />

        {/* ── Frame 31: buttons at top:369, width:250, centered ── */}
        <div style={{
          position: 'absolute',
          width: '250px', height: '30px',
          left: 'calc(50% - 250px/2 + 0.5px)', top: '369px',
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          gap: '20px',
        }}>
          {/* Frame 30: Clear All — 114×30, border:#555555 */}
          <button
            onClick={handleClear}
            style={{
              boxSizing: 'border-box',
              width: '114px', height: '30px',
              background: '#FAF7F2',
              border: '0.5px solid #555555',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
          >
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              fontSize: '14px', lineHeight: '17px', color: '#555555',
            }}>Clear All</span>
          </button>

          {/* Frame 25: Apply filter — 114×30, #A9712F */}
          <button
            onClick={handleApply}
            style={{
              width: '114px', height: '30px',
              background: '#A9712F',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
          >
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              fontSize: '14px', lineHeight: '17px', color: '#FAF7F2',
            }}>Apply filter</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterModal;
