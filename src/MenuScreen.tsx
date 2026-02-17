import { Search, SlidersHorizontal, UtensilsCrossed } from 'lucide-react';

interface MenuScreenProps {
  onNavigateToSpecials: () => void;
}

export default function MenuScreen({ onNavigateToSpecials }: MenuScreenProps) {
  return (
    <div className="min-h-screen bg-[#1a3a47] text-white pb-20">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center py-6">
          <img src="/logo.png" alt="CSAT" className="h-12" />
        </div>

        <div className="px-4 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#c17a4a] rounded-xl p-4 text-center">
<div className="w-14 h-14 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white/20">
                <img
                  src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Food"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold">Food</p>
            </div>
            <div className="bg-[#374b5a] rounded-xl p-4 text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gray-700">
                <img
                  src="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Drinks"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold">Drinks</p>
            </div>
            <div className="bg-[#374b5a] rounded-xl p-4 text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gray-700">
                <img
                  src="https://images.pexels.com/photos/4969832/pexels-photo-4969832.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Tobacco"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold">Tobacco</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="bg-[#c17a4a] text-white px-8 py-2 rounded-full font-semibold">
              ALL
            </button>
            <button className="bg-transparent border border-gray-500 text-white px-6 py-2 rounded-full">
              VEG
            </button>
            <button className="bg-transparent border border-gray-500 text-white px-6 py-2 rounded-full">
              NON-VEG
            </button>
          </div>

          <div className="flex gap-4 border-b border-gray-600 pb-2">
            <button
              onClick={onNavigateToSpecials}
              className="text-gray-300 flex items-center gap-1"
            >
              <span className="text-lg">✨</span> Offers for you
            </button>
            <button className="text-[#c17a4a] border-b-2 border-[#c17a4a] pb-2">Starters</button>
            <button className="text-gray-300">Mains</button>
            <button className="text-gray-300">Dess</button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              className="w-full bg-[#0f2830] text-white pl-12 pr-12 py-3 rounded-xl placeholder-gray-400 focus:outline-none"
            />
            <SlidersHorizontal className="absolute right-4 top-3 w-5 h-5 text-[#c17a4a]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0f2830] rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Galouti kebab"
className="w-full h-36 object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-[#c17a4a] text-white text-xs px-2 py-1 rounded">
                  Highly recommended
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-bold mb-1">Galouti kebab</h3>
                <div className="flex items-center gap-2 text-sm mb-2">
<span className="text-white flex items-center gap-2">
  <span className="border border-red-500 p-[2px] flex items-center justify-center w-4 h-4 rounded-sm">
    <span className="w-2 h-2 rounded-full bg-red-500"></span>
  </span>
  ₹250
</span>                  <span className="text-gray-400 flex items-center gap-1">
                    <span className="w-4 h-4">🕐</span> 20 mins
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Melt-in-the-mouth kebab with aromatic spices.
                </p>
              </div>
            </div>

            <div className="bg-[#0f2830] rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Saffron biryani"
                  className="w-full h-32 object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-[#c17a4a] text-white text-xs px-2 py-1 rounded">
                  Highly recommended
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-bold mb-1">Saffron biryani</h3>
                <div className="flex items-center gap-2 text-sm mb-2">
<span className="text-white flex items-center gap-2">
  <span className="border border-red-500 p-[2px] flex items-center justify-center w-4 h-4 rounded-sm">
    <span className="w-2 h-2 rounded-full bg-red-500"></span>
  </span>
  ₹250
</span>                  <span className="text-gray-400 flex items-center gap-1">
                    <span className="w-4 h-4">🕐</span> 26 mins
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Aged basmati cooked with saffron strands and goat.
                </p>
              </div>
            </div>

            <div className="bg-[#0f2830] rounded-xl overflow-hidden">
              <div className="relative">
                <img
src="https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Truffle naan"
                  className="w-full h-32 object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-[#8b6f47] text-white text-xs px-2 py-1 rounded">
                  Chef's special
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-bold mb-1">Truffle naan</h3>
                <div className="flex items-center gap-2 text-sm mb-2">
<span className="text-white flex items-center gap-2">
  <span className="border border-green-500 p-[2px] flex items-center justify-center w-4 h-4 rounded-sm">
    <span className="w-2 h-2 rounded-full bg-green-500"></span>
  </span>
  ₹250
</span>                  <span className="text-gray-400 flex items-center gap-1">
                    <span className="w-4 h-4">🕐</span> 20 mins
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Burnt garlic naan infused with white truffle oil.
                </p>
              </div>
            </div>

            <div className="bg-[#0f2830] rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Dal bhun"
                  className="w-full h-32 object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-[#c17a4a] text-white text-xs px-2 py-1 rounded">
                  Highly recommended
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-bold mb-1">Dal bhun</h3>
                <div className="flex items-center gap-2 text-sm mb-2">
<span className="text-white flex items-center gap-2">
  <span className="border border-green-500 p-[2px] flex items-center justify-center w-4 h-4 rounded-sm">
    <span className="w-2 h-2 rounded-full bg-green-500"></span>
  </span>
  ₹250
</span>                </div>
                <p className="text-xs text-gray-400">
                  Lentils simmered overnight with aromatic fire.
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
