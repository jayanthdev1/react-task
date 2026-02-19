import { useEffect } from 'react';
import VegDot from './components/ui/VegDot';

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
  type?: 'food' | 'drink';
}

// ── Reusable section heading row (icon + label) ──
function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-row items-center gap-[5px]">
      {icon}
      <span className="font-playfair font-medium text-[20px] leading-[24px] text-[rgba(22,43,57,0.8)]">
        {label}
      </span>
    </div>
  );
}

const DishDetailModal = ({ isOpen, onClose, dish, type = 'food' }: DishDetailModalProps) => {
  const isDrink = type === 'drink';

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const addons: Addon[] = dish.addons || [
    { name: 'Cut Onions',   price: 5, image: 'https://images.pexels.com/photos/144206/pexels-photo-144206.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { name: 'Lemon wedges', price: 5, image: 'https://images.pexels.com/photos/1414110/pexels-photo-1414110.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { name: 'Mint dip',     price: 5, image: 'https://images.pexels.com/photos/4061502/pexels-photo-4061502.jpeg?auto=compress&cs=tinysrgb&w=100' },
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80] bg-[rgba(22,43,57,0.7)]"
        onClick={onClose}
      />

      {/* Right-side panel — 270px, rounded left corners */}
      <div className="fixed top-0 right-0 bottom-0 w-[270px] bg-[#FAF7F2] rounded-l-[30px] z-[90] overflow-y-auto overflow-x-hidden [scrollbar-width:none]">

        {/* ── Top bar: close × + kcal badge ── */}
        <div className="flex flex-row justify-between items-center w-[230px] h-[32px] mt-[35px] ml-[23px]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.25)] rounded-full border-none cursor-pointer flex items-center justify-center shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="2" y1="2" x2="12" y2="12" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="2" x2="2" y2="12" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Kcal badge — amber for drink, dark navy for food */}
          <div
            className={[
              'flex flex-row justify-center items-center gap-[4px] w-[93px] h-[29px] rounded-[5px] shrink-0',
              isDrink
                ? 'bg-[rgba(208,138,60,0.8)] border-[0.7px] border-[rgba(208,138,60,0.8)]'
                : 'bg-[rgba(22,43,57,0.8)] border-[0.7px] border-[rgba(22,43,57,0.6)]',
            ].join(' ')}
          >
            <div className="flex flex-row items-center gap-[2px]">
              {/* Flame icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
                <path
                  d="M9 2C9 2 11.5 5 10.5 7.5C12 6.5 12.5 4.5 12.5 4.5C13.5 6 14 8 13 10.5C12.2 12.5 10.5 14 9 14C7.5 14 5.8 12.5 5 10.5C4 8 4.5 6 6 4.5C6 4.5 6.5 7 8 7.5C7 5 9 2 9 2Z"
                  stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              <span className="font-roboto font-medium text-[14px] leading-[16px] text-white">450 kcal</span>
            </div>
          </div>
        </div>

        {/* ── Image + name/price block ── */}
        <div className="flex flex-col items-start gap-[5px] w-[208px] mt-[20px] ml-[20px]">

          {/* Dish image */}
          <div
            className={[
              'w-[208px] h-[180px] overflow-hidden box-border shrink-0',
              isDrink ? '' : 'border-[0.5px] border-[rgba(169,113,47,0.2)] rounded-[10px]',
            ].join(' ')}
          >
            <img
              src={dish.image} alt={dish.name}
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Name + price/time */}
          <div className="flex flex-col items-start gap-[13px] w-[216px]">

            {/* Name + veg dot (veg dot hidden for drinks) */}
            <div className="flex flex-row items-end gap-[5px] w-[216px]">
              <span className="font-playfair font-medium text-[30px] leading-[36px] text-brand-bg">
                {dish.name.replace(/\b\w/g, c => c.toUpperCase())}
              </span>
              {!isDrink && <VegDot isVeg={!!dish.isVeg} />}
            </div>

            {/* Price + time (time hidden for drinks) */}
            <div className="flex flex-row items-center gap-[25px] w-[141px] h-[19px]">
              <span className="font-roboto font-normal text-[16px] leading-[19px] text-brand-amber">
                ₹{dish.price}
              </span>
              {!isDrink && (
                <div className="flex flex-row items-center gap-[3px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="#A9712F" strokeWidth="1.4" />
                    <path d="M8 5V8.5L10.5 10" stroke="#A9712F" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span className="font-roboto font-normal text-[16px] leading-[19px] text-brand-amber">
                    {dish.time}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Scrollable content sections ── */}
        <div className="flex flex-col items-start gap-[35px] w-[213px] mt-[28px] mb-[40px] ml-[23px]">

          {/* Description */}
          <div className="flex flex-col items-start gap-[10px] w-[213px]">
            <SectionHeading
              label="Description"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 4.5C4 3.4 4.9 2.5 6 2.5H17V17.5H6C4.9 17.5 4 18.4 4 19.5V4.5Z" stroke="rgba(22,43,57,0.8)" strokeWidth="1.3" />
                  <path d="M4 19.5C4 18.4 4.9 17.5 6 17.5H17" stroke="rgba(22,43,57,0.8)" strokeWidth="1.3" />
                  <line x1="7.5" y1="7" x2="14" y2="7" stroke="rgba(22,43,57,0.8)" strokeWidth="1.1" strokeLinecap="round" />
                  <line x1="7.5" y1="10" x2="14" y2="10" stroke="rgba(22,43,57,0.8)" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              }
            />
            <p
              className={[
                'font-normal text-[12px] leading-[18px] text-justify text-[#555555] m-0 w-[213px]',
                isDrink ? 'font-roboto' : 'font-inter',
              ].join(' ')}
            >
              {description}
            </p>
          </div>

          {/* Add-ons */}
          <div className="flex flex-col items-center gap-[10px] w-[213px]">
            <SectionHeading
              label="Add-ons"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <line x1="11" y1="4" x2="11" y2="18" stroke="rgba(22,43,57,0.8)" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="4" y1="11" x2="18" y2="11" stroke="rgba(22,43,57,0.8)" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              }
            />
            {/* Addon rows */}
            <div className="flex flex-col items-start gap-[6px] w-[213px]">
              {addons.map((addon, idx) => (
                <div key={idx} className="flex flex-row items-center gap-[5px] w-[213px] h-[35px]">
                  {/* Circle image */}
                  <div className="relative w-[35px] h-[35px] shrink-0">
                    <div
                      className={[
                        'absolute inset-0 rounded-full bg-white overflow-hidden',
                        isDrink
                          ? 'border-[0.6px] border-[rgba(208,138,60,0.5)]'
                          : 'border-[0.6px] border-[rgba(22,43,57,0.5)]',
                      ].join(' ')}
                    >
                      <img
                        src={addon.image}
                        alt={addon.name}
                        className="absolute rounded-full object-cover"
                        style={{ left: '2.59px', top: '2.59px', width: '30.25px', height: '30.25px' }}
                      />
                    </div>
                  </div>
                  {/* Name + price */}
                  <div className="flex flex-col items-start justify-center w-[167px] h-[32px]">
                    <span className="font-roboto font-normal text-[12px] leading-[14px] text-[#555555]">
                      {addon.name}
                    </span>
                    <span
                      className={[
                        'font-roboto font-normal text-[12px] leading-[18px]',
                        isDrink ? 'text-[rgba(208,138,60,0.8)]' : 'text-[rgba(22,43,57,0.8)]',
                      ].join(' ')}
                    >
                      +₹{addon.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main ingredients */}
          <div className="flex flex-col items-start gap-[10px] w-[213px]">
            <SectionHeading
              label="Main ingredients"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="3" y="3" width="16" height="16" rx="2" stroke="rgba(22,43,57,0.8)" strokeWidth="1.3" />
                  <path d="M7 8H15M7 11H15M7 14H11" stroke="rgba(22,43,57,0.8)" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              }
            />
            <div className="flex flex-col items-start gap-[5px] w-[213px]">
              {ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="font-inter font-normal text-[12px] leading-[18px] tracking-[0.02em] text-justify text-[#555555] w-[213px]"
                >
                  • {ing}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default DishDetailModal;
