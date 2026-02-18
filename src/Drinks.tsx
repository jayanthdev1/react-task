import { useState } from 'react';
import { Search, SlidersHorizontal, UtensilsCrossed } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

interface DrinksScreenProps {
  onNavigateToSpecials: () => void;
}

export default function DrinksScreen({ onNavigateToSpecials }: DrinksScreenProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a3a47] text-white pb-20">
      <SearchOverlay 
        isOpen={isSearchActive} 
        onClose={() => setIsSearchActive(false)} 
        onSearch={(text) => console.log('Searching for:', text)}
      />

      <div className="max-w-md mx-auto">
        <div className="flex justify-center py-6">
          <img src="/logo.png" alt="CSAT" className="h-12" />
        </div>

        <div className="px-4 space-y-6">
          {/* Categories */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#374b5a] rounded-xl p-4 text-center opactiy-60">
              <div className="w-14 h-14 mx-auto mb-2 rounded-full overflow-hidden bg-gray-700">
                <img
                  src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Food"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              <p className="font-semibold text-gray-400">Food</p>
            </div>
            <div className="bg-[#c17a4a] rounded-xl p-4 text-center transform scale-105 shadow-lg z-10">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white/20">
                <img
                  src="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Drinks"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold">Drinks</p>
            </div>
            <div className="bg-[#374b5a] rounded-xl p-4 text-center">
              <div className="w-14 h-14 mx-auto mb-2 rounded-full overflow-hidden bg-gray-700">
                <img
                  src="https://images.pexels.com/photos/4969832/pexels-photo-4969832.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Tobacco"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              <p className="font-semibold text-gray-400">Tobacco</p>
            </div>
          </div>

          {/* Main Filters */}
          <div className="flex bg-[#233a46] rounded-full p-1">
            <button className="flex-1 bg-[#c17a4a] text-white py-2 rounded-full font-semibold text-sm">
              ALCOHOLIC
            </button>
            <button className="flex-1 bg-transparent text-gray-400 py-2 rounded-full font-semibold text-sm">
              NON-ALCOHOLIC
            </button>
          </div>

          {/* Sub Navigation */}
          <div className="flex gap-6 border-b border-gray-600 pb-2 overflow-x-auto no-scrollbar">
            <button className="text-[#c17a4a] border-b-2 border-[#c17a4a] pb-2 font-medium whitespace-nowrap">Cocktails</button>
            <button className="text-gray-400 font-medium whitespace-nowrap">Brewed drinks</button>
            <button className="text-gray-400 font-medium whitespace-nowrap">Desserts</button>
            <button className="text-gray-400 font-medium whitespace-nowrap">Drinks</button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-[#c17a4a]" />
            <input
              type="text"
              readOnly
              onClick={() => setIsSearchActive(true)}
              placeholder="Search items..."
              className="w-full bg-[#0f2830] text-white pl-12 pr-12 py-3 rounded-xl placeholder-gray-400 focus:outline-none border border-transparent focus:border-[#c17a4a]/50 cursor-pointer"
            />
            <SlidersHorizontal className="absolute right-4 top-3 w-5 h-5 text-[#c17a4a]" />
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Item 1 */}
            <div className="bg-[#0f2830] rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Pina colada"
                  className="w-full h-40 object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-[#b06d30] text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                  Signature
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-serif text-lg leading-tight mb-1">Pina colada</h3>
                <div className="mb-2">
                  <span className="text-white font-bold text-sm">₹250</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Rum, coconut cream, and pineapple.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-[#0f2830] rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1109062/pexels-photo-1109062.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Moscow mule"
                  className="w-full h-40 object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-[#b06d30] text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                  Signature
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-serif text-lg leading-tight mb-1">Moscow mule</h3>
                <div className="mb-2">
                  <span className="text-white font-bold text-sm">₹250</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Rum, coconut cream, and pineapple.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-[#0f2830] rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/209594/pexels-photo-209594.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Cosmopolitan"
                  className="w-full h-40 object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-[#b06d30] text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                  Signature
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-serif text-lg leading-tight mb-1">Cosmopolitan</h3>
                <div className="mb-2">
                  <span className="text-white font-bold text-sm">₹250</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Rum, coconut cream, and pineapple.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="bg-[#0f2830] rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/605408/pexels-photo-605408.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Margarita"
                  className="w-full h-40 object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-[#b06d30] text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                  Signature
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-serif text-lg leading-tight mb-1">Margarita</h3>
                <div className="mb-2">
                  <span className="text-white font-bold text-sm">₹250</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Rum, coconut cream, and pineapple.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button className="fixed bottom-6 right-6 bg-[#c17a4a] text-white rounded-full p-4 shadow-lg flex items-center gap-2 pr-6 z-50">
          <UtensilsCrossed className="w-6 h-6" />
          <span className="font-semibold">Menu</span>
        </button>
      </div>
    </div>
  );
}
