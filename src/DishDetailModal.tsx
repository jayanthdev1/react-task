import { X, Clock, BookOpen, Plus, Utensils, ChefHat } from 'lucide-react';
import { useEffect } from 'react';

interface Dish {
  name: string;
  image: string;
  price: number;
  time: string;
  description?: string;
  isVeg?: boolean;
  calories?: string;
}

interface DishDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dish: Dish;
}

const DishDetailModal = ({ isOpen, onClose, dish }: DishDetailModalProps) => {
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

  if (!isOpen) return null;

  // Mock data for the specific "Galouti Kebab" look, or generic fallback
  const addons = [
    { name: "Cut Onions", price: 5, image: "https://images.pexels.com/photos/144206/pexels-photo-144206.jpeg?auto=compress&cs=tinysrgb&w=100" },
    { name: "Lemon wedges", price: 5, image: "https://images.pexels.com/photos/1414110/pexels-photo-1414110.jpeg?auto=compress&cs=tinysrgb&w=100" },
    { name: "Mint dip", price: 5, image: "https://images.pexels.com/photos/4061502/pexels-photo-4061502.jpeg?auto=compress&cs=tinysrgb&w=100" }
  ];

  const ingredients = [
    "Minced lamb meat",
    "Raw papaya paste",
    "Kebab chinni",
    "Ghee & saffron"
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md top-12 z-[90] bg-[#fcfbf7] rounded-t-[2.5rem] overflow-hidden flex flex-col shadow-2xl animate-slideUp font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 absolute top-0 left-0 right-0 z-10">
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="bg-[#4a5568] text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-sm">
            <span className="text-orange-300">🔥</span>
            <span>450 kcal</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 pb-24 no-scrollbar">
            {/* Image Section */}
            <div className="pt-20 px-6 pb-6 flex justify-center">
                <div className="w-64 h-64 rounded-[2rem] overflow-hidden shadow-2xl rotate-3 bg-white p-1">
                    <img 
                        src={dish.image} 
                        alt={dish.name} 
                        className="w-full h-full object-cover rounded-[1.8rem]"
                    />
                </div>
            </div>

            <div className="px-8 space-y-8">
                {/* Title & Price */}
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                        <h2 className="text-3xl font-serif text-[#1a202c] leading-tight">
                            {dish.name}
                        </h2>
                        <div className={`mt-2 border ${dish.isVeg ? 'border-green-600' : 'border-red-600'} p-0.5 w-5 h-5 flex items-center justify-center rounded-[4px] flex-shrink-0`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-serif">
                        <span className="text-[#b06d30] text-xl font-bold">₹{dish.price}</span>
                        <div className="flex items-center text-[#b06d30] gap-1 text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            <span>{dish.time}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#4a5568] font-serif text-lg">
                        <BookOpen className="w-5 h-5" />
                        <h3 className="font-medium">Description</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        {dish.description || "Traditional melt-in-mouth kebab made with finely minced meat, marinated in a secret blend of spices, and slow-cooked to perfection."}
                    </p>
                </div>

                {/* Add-ons */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#4a5568] font-serif text-lg">
                        <Plus className="w-5 h-5" />
                        <h3 className="font-medium">Add-ons</h3>
                    </div>
                    <div className="space-y-3">
                        {addons.map((addon, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                    <img src={addon.image} alt={addon.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-gray-700 font-medium text-sm flex-1">{addon.name}</span>
                                <span className="text-gray-500 text-sm font-semibold">+₹{addon.price}</span>
                                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:border-[#b06d30]">
                                    {/* Empty radio/checkbox styling */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Ingredients */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#4a5568] font-serif text-lg">
                        <ChefHat className="w-5 h-5" />
                        <h3 className="font-medium">Main ingredients</h3>
                    </div>
                    <ul className="space-y-2 pl-2">
                        {ingredients.map((ing, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-500 text-sm">
                                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                {ing}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        {/* Floating Menu Button (if needed to match context) or simple bottom bar? */}
        {/* The screenshot doesn't show a bottom action bar, but usually there's 'Add to Cart'. 
            However, the prompt image focuses on the content layout. 
            I'll leave it clean as per screenshot 1. 
        */}
      </div>
    </>
  );
};

export default DishDetailModal;
