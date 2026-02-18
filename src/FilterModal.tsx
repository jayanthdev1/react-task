import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (count: number) => void;
}

const FilterModal = ({ isOpen, onClose, onApply }: FilterModalProps) => {
  const [activeTab, setActiveTab] = useState('Price');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortOrder, setSortOrder] = useState<'lowToHigh' | 'highToLow' | null>(null);
  const [selectedPrepTime, setSelectedPrepTime] = useState<string | null>(null);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const categories = ['Price', 'Prep time', 'Allergies', 'Diet & preparation'];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleApply = () => {
    let count = 0;
    if (priceRange[0] !== 0 || priceRange[1] !== 2000) count++;
    if (sortOrder) count++;
    if (selectedPrepTime) count++;
    count += selectedAllergies.length;
    count += selectedDiet.length;
    count += selectedPreferences.length;
    
    onApply(count);
    onClose();
  };

  if (!isOpen) return null;

  const handleAllergyToggle = (allergy: string) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
    );
  };

  const handleDietToggle = (diet: string) => {
    setSelectedDiet(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const handlePreferenceToggle = (pref: string) => {
    setSelectedPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Bottom Sheet Container */}
      <div className="bg-[#fcfbf7] w-full max-w-md h-[65vh] rounded-t-[2rem] overflow-hidden relative animate-slideUp flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 shrink-0">
          <h2 className="text-xl font-bold text-[#1a3a47] font-serif tracking-wide">Filters</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content - Flex container for Sidebar + Main */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Sidebar */}
          <div className="w-1/3 bg-[#f5f5f5] border-r border-gray-200 overflow-y-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`w-full text-left px-4 py-5 text-xs font-semibold uppercase tracking-wider transition-colors border-l-4 ${
                  activeTab === cat
                    ? 'bg-white text-[#cd853f] border-[#cd853f]'
                    : 'text-gray-500 hover:bg-gray-100 border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-5 overflow-y-auto bg-[#fcfbf7]">
            {activeTab === 'Price' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h3 className="text-[#1a3a47] font-medium mb-6">Select your price range</h3>
                  <div className="relative pt-6 pb-2">
                    <div className="text-center font-bold text-[#b06d30] mb-2">₹{priceRange[0]} - ₹{priceRange[1]}</div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-1 bg-[#dcdcdc] rounded-lg appearance-none cursor-pointer accent-[#b06d30]"
                    />
                    <div className="flex justify-between text-xs text-[#b06d30] font-semibold mt-1">
                      <span>₹0</span>
                      <span>₹2000</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-gray-600 group-hover:text-[#1a3a47] font-medium">Low to high</span>
                    <input
                      type="radio"
                      name="sort"
                      checked={sortOrder === 'lowToHigh'}
                      onChange={() => setSortOrder('lowToHigh')}
                      className="w-5 h-5 text-[#b06d30] border-gray-300 focus:ring-[#b06d30] accent-[#b06d30]"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-gray-600 group-hover:text-[#1a3a47] font-medium">High to low</span>
                    <input
                      type="radio"
                      name="sort"
                      checked={sortOrder === 'highToLow'}
                      onChange={() => setSortOrder('highToLow')}
                      className="w-5 h-5 text-[#b06d30] border-gray-300 focus:ring-[#b06d30] accent-[#b06d30]"
                    />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'Prep time' && (
              <div className="space-y-5 animate-fadeIn">
                {['Quick bites', '5-10 mins', '10-15 mins', '15+ mins'].map((time) => (
                  <label key={time} className="flex items-center justify-between cursor-pointer group">
                    <span className="text-gray-600 group-hover:text-[#1a3a47] font-medium">{time}</span>
                    <input
                      type="radio"
                      name="prepTime"
                      checked={selectedPrepTime === time}
                      onChange={() => setSelectedPrepTime(time)}
                      className="w-5 h-5 text-[#b06d30] border-gray-300 focus:ring-[#b06d30] accent-[#b06d30]"
                    />
                  </label>
                ))}
              </div>
            )}

            {activeTab === 'Allergies' && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="text-[#1a3a47] font-medium mb-2">Choose allergies to avoid</h3>
                {['Milk/diary', 'Peanuts', 'Eggs', 'Soy', 'Shellfish(prawns, crabs, lobster)', 'Fish', 'Sesame'].map((allergy) => (
                  <label key={allergy} className="flex items-center justify-between cursor-pointer py-2 group border-b border-gray-50/50 last:border-0">
                    <span className="text-gray-600 group-hover:text-[#1a3a47] text-sm">{allergy}</span>
                    <input
                      type="checkbox"
                      checked={selectedAllergies.includes(allergy)}
                      onChange={() => handleAllergyToggle(allergy)}
                      className="w-5 h-5 rounded border-gray-300 text-[#b06d30] focus:ring-[#b06d30] accent-[#b06d30]"
                    />
                  </label>
                ))}
              </div>
            )}

            {activeTab === 'Diet & preparation' && (
              <div className="space-y-8 animate-fadeIn">
                 <div className="space-y-3">
                  <h3 className="text-[#1a3a47] font-medium border-b border-gray-100 pb-2">Diet type</h3>
                  {['Eggetarian', 'Vegan', 'Gluten-free'].map((diet) => (
                    <label key={diet} className="flex items-center justify-between cursor-pointer group">
                      <span className="text-gray-600 group-hover:text-[#1a3a47]">{diet}</span>
                      <input
                        type="checkbox"
                        checked={selectedDiet.includes(diet)}
                        onChange={() => handleDietToggle(diet)}
                        className="w-5 h-5 rounded border-gray-300 text-[#b06d30] focus:ring-[#b06d30] accent-[#b06d30]"
                      />
                    </label>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="text-[#1a3a47] font-medium border-b border-gray-100 pb-2">Preparation preferences</h3>
                  {['Less oil', 'No onion, no garlic', 'Baked'].map((pref) => (
                    <label key={pref} className="flex items-center justify-between cursor-pointer group">
                      <span className="text-gray-600 group-hover:text-[#1a3a47]">{pref}</span>
                      <input
                        type="checkbox"
                        checked={selectedPreferences.includes(pref)}
                        onChange={() => handlePreferenceToggle(pref)}
                        className="w-5 h-5 rounded border-gray-300 text-[#b06d30] focus:ring-[#b06d30] accent-[#b06d30]"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-[#f9f9f9] flex gap-4 shrink-0">
          <button 
            onClick={() => {
              setPriceRange([0, 2000]);
              setSortOrder(null);
              setSelectedPrepTime(null);
              setSelectedAllergies([]);
              setSelectedDiet([]);
              setSelectedPreferences([]);
            }}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          >
            Clear All
          </button>
          <button 
            onClick={handleApply}
            className="flex-1 py-3 px-4 rounded-xl bg-[#b06d30] text-white font-semibold shadow-lg hover:bg-[#8f5624] transition-colors"
          >
            Apply filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
