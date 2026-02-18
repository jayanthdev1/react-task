import { useState } from 'react';
import { Search, SlidersHorizontal, UtensilsCrossed, Zap, Clock } from 'lucide-react';
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
  calories?: string;
  badge?: string; // "Highly recommended" | "Chef's special"
}

const sampleDishes: Dish[] = [
  {
    name: "Galouti kebab",
    image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 250,
    time: "20 mins",
    description: "Melt-in-the-mouth kebab with aromatic spices.",
    isVeg: false,
    badge: "Highly recommended"
  },
  {
    name: "Saffron biryani",
    image: "https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 250,
    time: "20 mins",
    description: "Aged basmati cooked with saffron strands and goat.",
    isVeg: false,
    badge: "Highly recommended"
  },
  {
    name: "Truffle naan",
    image: "https://images.pexels.com/photos/2067400/pexels-photo-2067400.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 250,
    time: "20 mins",
    description: "Burnt garlic naan infused with white truffle oil.",
    isVeg: true,
    badge: "Chef's special"
  },
  {
    name: "Dal bhukara",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 250,
    time: "20 mins",
    description: "Lentils simmered overnight with cream and butter.",
    isVeg: true,
    badge: "Highly recommended"
  }
];

export default function MenuScreen({ onNavigateToSpecials, onNavigateToDrinks }: MenuScreenProps) {
  const [activeTab, setActiveTab] = useState('offers');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [filterType, setFilterType] = useState('ALL'); // 'ALL', 'VEG', 'NON-VEG'
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
  };

  const clearFilters = () => {
    setActiveFilterCount(0);
  };

  // Determine what dishes to show based on tabs
  const getDishesForTab = () => {
    if (activeTab === 'offers') return [];
    // For now, return sample dishes for all other tabs to demonstrate the UI
    return sampleDishes;
  };

  return (
    <div className="min-h-screen bg-[#11242e] text-white pb-24 font-sans">
      <DishDetailModal 
        isOpen={!!selectedDish} 
        onClose={() => setSelectedDish(null)} 
        dish={selectedDish || { name: '', image: '', price: 0, time: '' }} 
      />

      <MenuCategoriesModal 
        isOpen={isMenuModalOpen} 
        onClose={() => setIsMenuModalOpen(false)} 
        onCategorySelect={(category) => {
          console.log(`Selected category: ${category}`);
          setIsMenuModalOpen(false);
          setActiveTab(category.toLowerCase());
        }} 
      />

      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        onApply={(count) => setActiveFilterCount(count)}
      />

      <SearchOverlay 
        isOpen={isSearchActive} 
        onClose={() => setIsSearchActive(false)} 
        onSearch={(text) => setIsSearchActive(false)}
      />

      <div className="max-w-md mx-auto relative min-h-screen">
        {/* Header */}
        <div className="flex justify-center pt-6 pb-4">
          <div className="flex justify-center py-6">
          <img src="/logo.png" alt="CSAT" className="h-12" />
        </div>
        </div>

        <div className="px-4 space-y-6">
          {/* Categories */}
          <div className="grid grid-cols-3 gap-3">
            {/* Food - Active Style */}
            <div className="bg-gradient-to-b from-[#e4aaa5] to-[#cd853f] rounded-xl p-3 text-center shadow-lg transform transition-transform cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Food"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-bold text-white tracking-wide text-sm">Food</p>
            </div>
            
            {/* Drinks - Inactive Style */}
            <div 
              onClick={onNavigateToDrinks}
              className="bg-[#2c3e50] rounded-xl p-3 text-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gray-700">
                <img
                  src="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Drinks"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <p className="font-medium text-gray-300 text-sm">Drinks</p>
            </div>

            {/* Tobacco - Inactive Style */}
            <div className="bg-[#2c3e50] rounded-xl p-3 text-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gray-700">
                <img
                  src="https://images.pexels.com/photos/3545426/pexels-photo-3545426.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Tobacco"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <p className="font-medium text-gray-300 text-sm">Tobacco</p>
            </div>
          </div>

          {/* Filter Tabs (Segmented Control) */}
          <div className="bg-[#162d3a] p-1 rounded-full flex mx-auto">
            {['ALL', 'VEG', 'NON-VEG'].map((type) => (
               <button
                 key={type}
                 onClick={() => setFilterType(type)}
                 className={`flex-1 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all ${
                   filterType === type
                     ? 'bg-[#cd853f] text-white shadow-md'
                     : 'text-gray-400 hover:text-gray-200'
                 }`}
               >
                 {type}
               </button>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-2 overflow-x-auto no-scrollbar pt-2">
            <button
              onClick={() => setActiveTab('offers')}
              className={`flex-shrink-0 flex items-center gap-1.5 pb-2 border-b-2 transition-all px-1 ${
                activeTab === 'offers'
                  ? 'text-[#cd853f] border-[#cd853f]'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${activeTab === 'offers' ? 'fill-current' : ''}`} />
              <span className="font-semibold whitespace-nowrap text-sm">Offers for you</span>
            </button>
            
            {['Starters', 'Mains', 'Dessert'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex-shrink-0 pb-2 border-b-2 px-3 transition-all ${
                  activeTab === tab.toLowerCase()
                    ? 'text-[#cd853f] border-[#cd853f]'
                    : 'text-gray-400 border-transparent hover:text-gray-200'
                }`}
              >
                <span className="font-semibold text-sm">{tab}</span>
              </button>
            ))}
          </div>

          {/* Search Bar - Hidden on Offers tab */}
          {/* Search Bar - Hidden on Offers tab */}
          {activeTab !== 'offers' && (
            <div className="relative animate-fadeIn">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cd853f]" />
              <input
                type="text"
                placeholder="Search items..."
                readOnly // Make readOnly to prevent keyboard on mobile before overlay
                onClick={() => setIsSearchActive(true)}
                className="w-full bg-[#162d3a] text-white pl-10 pr-12 py-3 rounded-full border border-[#cd853f]/50 focus:border-[#cd853f] placeholder-gray-400 focus:outline-none text-sm shadow-sm cursor-pointer"
              />
              <div 
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening search overlay when clicking filter
                  setIsFilterModalOpen(true);
                }}
              >
                <SlidersHorizontal className="w-4 h-4 text-[#cd853f]" />
                {activeFilterCount > 0 && (
                   <span className="absolute -top-2 -right-2 bg-[#cd853f] text-white text-[10px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full border border-[#11242e]">
                     {activeFilterCount}
                   </span>
                )}
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="pb-20 min-h-[400px]">
            {activeTab === 'offers' && (activeFilterCount === 0) ? (
              <div className="space-y-8 animate-fadeIn">
                {/* Combo Offers */}
                <section>
                  <div className="flex items-center gap-2 mb-4 border-l-4 border-[#cd853f] pl-3">
                    <h2 className="text-lg font-serif text-[#cd853f] tracking-wide">Combo offers</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Offer Card 1 */}
                    <div 
                      onClick={() => handleDishClick({
                        name: "Royal Thali combo",
                        image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
                        price: 250,
                        time: "25 mins",
                        description: "Thali brings together a perfect blend of flavors with aromatic rice, soft breads, rich curries, dal, fresh salad, dessert, and accompaniments.",
                        isVeg: true
                      })}
                      className="bg-[#1b313d] rounded-xl p-3 flex gap-3 shadow-lg border border-gray-800/50 hover:border-[#cd853f]/30 transition-colors cursor-pointer group"
                    >
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative">
                        <img 
                          src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400" 
                          alt="Royal Thali" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-white text-base font-serif mb-0.5 group-hover:text-[#cd853f] transition-colors">Royal Thali combo</h3>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="border border-green-500 p-[1px] flex items-center justify-center w-3 h-3 rounded-[2px]" title="Veg">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          </span>
                          <span className="text-white font-bold text-sm">₹250</span>
                        </div>
                        <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-3">
                          Thali brings together a perfect blend of flavors with aromatic rice, soft breads, rich curries, dal, fresh salad, dessert, and accompaniments.
                        </p>
                      </div>
                    </div>

                    {/* Offer Card 2 */}
                    <div 
                      onClick={() => handleDishClick({
                        name: "Nawabi Kebab Platter",
                        image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=400",
                        price: 250,
                        time: "30 mins",
                        description: "A luxurious assortment of melt-in-the-mouth kebabs inspired by royal Mughlai kitchens. Featuring a selection of perfectly grilled kebabs.",
                        isVeg: false
                      })}
                      className="bg-[#1b313d] rounded-xl p-3 flex gap-3 shadow-lg border border-gray-800/50 hover:border-[#cd853f]/30 transition-colors cursor-pointer group"
                    >
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative">
                        <img 
                          src="https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=400" 
                          alt="Kebab Platter" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-white text-base font-serif mb-0.5 group-hover:text-[#cd853f] transition-colors">Nawabi Kebab Platter</h3>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="border border-red-500 p-[1px] flex items-center justify-center w-3 h-3 rounded-[2px]" title="Non-Veg">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          </span>
                          <span className="text-white font-bold text-sm">₹250</span>
                        </div>
                        <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-3">
                          A luxurious assortment of melt-in-the-mouth kebabs inspired by royal Mughlai kitchens. Featuring a selection of perfectly grilled kebabs.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 1+1 Offers */}
                <section>
                  <div className="flex items-center gap-2 mb-4 border-l-4 border-[#cd853f] pl-3">
                    <h2 className="text-lg font-serif text-[#cd853f] tracking-wide">1+1 offers</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     {/* 1+1 Card 1 */}
                     <div 
                       onClick={() => handleDishClick({
                        name: "Burger + Mojito Blast",
                        image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400",
                        price: 199,
                        time: "20 mins",
                        description: "Juicy burger patty with fresh veggies and cheese, served with a refreshing mint mojito.",
                        isVeg: false
                       })}
                       className="space-y-2 cursor-pointer group"
                     >
                       <div className="relative rounded-xl overflow-hidden aspect-square border border-gray-800/50">
                         <img 
                           src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400" 
                           alt="Burger" 
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         />
                       </div>
                       
                       <div>
                         <h3 className="text-white font-serif text-base leading-tight mb-1 group-hover:text-[#cd853f] transition-colors">Burger + Mojito Blast</h3>
                         <p className="text-gray-400 text-[10px] leading-relaxed">Buy 1 Burger and get a refreshing Mojito FREE!</p>
                       </div>
                     </div>

                     {/* 1+1 Card 2 */}
                     <div 
                       onClick={() => handleDishClick({
                        name: "Biryani Power Treat",
                        image: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400",
                        price: 349,
                        time: "45 mins",
                        description: "Authentic Hyderabadi Chicken Biryani served with spicy Chicken 65.",
                        isVeg: false
                       })}
                       className="space-y-2 cursor-pointer group"
                     >
                       <div className="relative rounded-xl overflow-hidden aspect-square border border-gray-800/50">
                         <img 
                           src="https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400" 
                           alt="Biryani" 
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         />
                       </div>
                       <div>
                         <h3 className="text-white font-serif text-base leading-tight mb-1 group-hover:text-[#cd853f] transition-colors">Biryani Power Treat</h3>
                         <p className="text-gray-400 text-[10px] leading-relaxed">Buy 1 Chicken Biryani and get Chicken 65 FREE!</p>
                       </div>
                     </div>
                  </div>
                </section>
              </div>
            ) : activeTab !== 'offers' ? (
               /* Grid View for Non-Offer Tabs or Filtered State */
               <div className="space-y-4 animate-slideUp">
                 <div className="grid grid-cols-2 gap-4">
                  {getDishesForTab().map((dish, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleDishClick(dish)}
                      className="cursor-pointer group"
                    >
                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-2 border border-white/10">
                        <img 
                          src={dish.image} 
                          alt={dish.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                         {/* Badge */}
                         {dish.badge && (
                           <div className={`absolute bottom-0 left-0 text-[10px] font-bold px-2 py-0.5 rounded-tr-lg ${dish.badge === "Chef's special" ? 'bg-[#b06d30] text-white' : 'bg-[#cd853f] text-white'}`}>
                             {dish.badge}
                           </div>
                         )}
                      </div>
                      
                      <div>
                        <h3 className="text-white text-base font-serif leading-tight mb-1">{dish.name}</h3>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`border ${dish.isVeg ? 'border-green-500' : 'border-red-500'} p-[1px] flex items-center justify-center w-3 h-3 rounded-[2px]`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dish.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          </span>
                          <span className="text-white font-bold text-sm">₹{dish.price}</span>
                          <div className="flex items-center text-gray-400 text-[10px] ml-auto">
                            <Clock size={10} className="mr-0.5"/>
                            <span>{dish.time}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-2">
                          {dish.description}
                        </p>
                      </div>
                    </div>
                  ))}
                 </div>
                 
                 {/* Clear Filter Button */}
                 {activeFilterCount > 0 && (
                   <div className="flex justify-center pt-4">
                     <button 
                       onClick={clearFilters}
                       className="bg-[#b06d30] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-[#8f5624] transition-colors text-sm"
                     >
                       Clear filters
                     </button>
                   </div>
                 )}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
                <div className="text-6xl mb-4 opacity-20">🍽️</div>
                <p className="text-gray-400 text-center">
                  Select items from the <span className="text-[#cd853f] font-semibold">{activeTab}</span> menu <br/>
                  will appear here.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 opacity-50 pointer-events-none">
                  <div className="w-32 h-32 bg-gray-800 rounded-xl"></div>
                  <div className="w-32 h-32 bg-gray-800 rounded-xl"></div>
                </div>
              </div>
            )}
          </div>

          {/* Floating Action Button */}
          <button 
           onClick={() => setIsMenuModalOpen(true)}
           className="fixed bottom-6 right-6 bg-[#cd853f] text-white rounded-full p-4 shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex items-center gap-2 pr-6 z-50 hover:bg-[#b06d30] transition-colors hover:scale-105 active:scale-95"
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span className="font-bold tracking-wide">Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
