import React, { useState } from 'react';
import SearchOverlay from '../SearchOverlay';
import FilterModal from '../FilterModal';
import MenuCategoriesModal from '../MenuCategoriesModal';
import DishDetailModal from '../DishDetailModal';
import { drinks, type DrinkItem } from '../data/drinks';
import CategoryCard from '../components/ui/CategoryCard';
import MenuFab from '../components/ui/MenuFab';

interface DrinksScreenProps {
  onNavigateToSpecials: () => void;
  onNavigateToFood: () => void;
}

const DRINK_TABS = ['Cocktails', 'Brewed drinks', 'Desserts', 'Drinks', 'Breads'];

export default function DrinksScreen({ onNavigateToSpecials, onNavigateToFood }: DrinksScreenProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<DrinkItem | null>(null);
  const [activeFilters, setActiveFilters] = useState(0);
  const [alcoholicMode, setAlcoholicMode] = useState<'ALCOHOLIC' | 'NON-ALCOHOLIC'>('ALCOHOLIC');
  const [activeTab, setActiveTab] = useState('cocktails');

  return (
    <div className="min-h-screen bg-brand-bg text-white pb-[100px] relative">
      <SearchOverlay
        isOpen={isSearchActive}
        onClose={() => setIsSearchActive(false)}
        onSearch={() => setIsSearchActive(false)}
      />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(count) => setActiveFilters(count)}
        type="drinks"
      />
      <MenuCategoriesModal
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        onCategorySelect={() => { setIsCategoriesModalOpen(false); }}
        type="drinks"
      />
      {selectedDrink && (
        <DishDetailModal
          isOpen={!!selectedDrink}
          onClose={() => setSelectedDrink(null)}
          dish={selectedDrink}
          type="drink"
        />
      )}

      {/* Header */}
      <div className="max-w-[393px] mx-auto relative px-[21px] box-border">

        {/* Logo */}
        <div className="flex justify-center pt-[29px] pb-[10px]">
          <img src="/logo.png" alt="CSAT" className="w-[100px] h-[35px] object-contain" />
        </div>

        {/* Category cards */}
        <div className="flex flex-row items-center gap-[25px] w-[320px] h-[110px] mx-auto mb-5">
          <CategoryCard
            label="Food"
            img="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200"
            onClick={onNavigateToFood}
          />
          <CategoryCard
            label="Drinks"
            img="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=200"
            active
          />
          <CategoryCard
            label="Tobacco"
            img="https://images.pexels.com/photos/4969832/pexels-photo-4969832.jpeg?auto=compress&cs=tinysrgb&w=200"
          />
        </div>

        {/* Alcoholic / Non-alcoholic toggle */}
        <div className="box-border w-[351px] h-[32px] bg-[linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)),rgba(22,43,57,0.2)] border-[0.2px] border-[rgba(214,147,73,0.4)] shadow-[2px_2px_3px_rgba(5,20,30,0.4)] rounded-[50px] p-[3px] flex items-center mx-auto">
          <div className="flex flex-row items-center gap-[11px] w-[339px] h-[26px]">
            {/* ALCOHOLIC pill */}
            <button
              onClick={() => setAlcoholicMode('ALCOHOLIC')}
              className={[
                'box-border h-[29px] rounded-[50px] flex justify-center items-center cursor-pointer font-inter font-semibold text-[14px] leading-[17px] text-white shrink-0',
                alcoholicMode === 'ALCOHOLIC'
                  ? 'bg-grad-active-pill border-[0.2px] border-[rgba(125,121,121,0.7)]'
                  : 'bg-[linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)),#162B39] border-0',
              ].join(' ')}
              style={{ width: alcoholicMode === 'ALCOHOLIC' ? '162px' : '166px' }}
            >
              ALCOHOLIC
            </button>
            {/* NON-ALCOHOLIC pill */}
            <button
              onClick={() => setAlcoholicMode('NON-ALCOHOLIC')}
              className={[
                'box-border h-[29px] rounded-[50px] flex justify-center items-center cursor-pointer font-inter font-semibold text-[14px] leading-[17px] text-white shrink-0',
                alcoholicMode === 'NON-ALCOHOLIC'
                  ? 'bg-grad-active-pill border-[0.2px] border-[rgba(125,121,121,0.7)]'
                  : 'bg-[linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)),#162B39] border-0',
              ].join(' ')}
              style={{ width: alcoholicMode === 'NON-ALCOHOLIC' ? '168px' : '166px' }}
            >
              NON-ALCOHOLIC
            </button>
          </div>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="max-w-[393px] mx-auto mt-3">
        <div className="flex flex-row items-start gap-[30px] pl-[15px] pr-[15px] overflow-x-auto [scrollbar-width:none] w-[377.96px] box-border">
          {DRINK_TABS.map((tab) => {
            const tabKey = tab.toLowerCase().replace(/ /g, '');
            const isActive = activeTab === tabKey;
            return (
              <div key={tab} className="flex flex-col items-center gap-[2px] shrink-0">
                <button
                  onClick={() => setActiveTab(tabKey)}
                  className={[
                    'bg-transparent border-0 cursor-pointer p-0 font-inter font-medium text-[16px] leading-[19px] whitespace-nowrap',
                    isActive ? 'text-brand-amberLight' : 'text-white',
                  ].join(' ')}
                >
                  {tab}
                </button>
                {isActive && (
                  <div className="w-[80px] h-0 border-t-[3px] border-brand-amberLight" />
                )}
              </div>
            );
          })}
        </div>
        <div className="h-px bg-brand-divider mt-[2px]" />
      </div>

      {/* Scrollable content */}
      <div className="max-w-[393px] mx-auto px-[21px] box-border pt-4">

        {/* Search bar */}
        <div className="box-border w-full h-[35px] bg-brand-dark border-[0.6px] border-[rgba(208,138,60,0.6)] shadow-[4px_4px_2px_#0D2433] rounded-[50px] mb-5 flex flex-row justify-between items-center py-[7px] px-[14px]">
          <div className="flex flex-row justify-between items-center w-full">
            <div
              className="flex flex-row items-center gap-[10px] cursor-pointer flex-1"
              onClick={() => setIsSearchActive(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="rgba(208,138,60,0.8)" strokeWidth="1.5" />
                <line x1="11" y1="11" x2="15" y2="15" stroke="rgba(208,138,60,0.8)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-roboto font-normal text-[12px] text-[rgba(255,255,255,0.55)]">Search items...</span>
            </div>
            {/* Filter icon + badge */}
            <div
              className="relative w-[23px] h-[19.5px] cursor-pointer shrink-0"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="absolute left-0 top-[6.5px]">
                <line x1="1" y1="2.5" x2="12" y2="2.5" stroke={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="4" cy="2.5" r="1.5" fill={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} />
                <line x1="1" y1="6.5" x2="12" y2="6.5" stroke={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="9" cy="6.5" r="1.5" fill={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} />
                <line x1="1" y1="10.5" x2="12" y2="10.5" stroke={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="6" cy="10.5" r="1.5" fill={activeFilters > 0 ? '#A9712F' : 'rgba(208,138,60,0.8)'} />
              </svg>
              {activeFilters > 0 && (
                <div className="absolute left-[9px] top-0 w-[14px] h-[15px]">
                  <div className="absolute left-0 top-[1px] w-[14px] h-[14px] rounded-full bg-brand-amber" />
                  <span className="absolute left-[3px] top-[1px] font-roboto font-normal text-[9px] text-white leading-[14px]">
                    {activeFilters}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Drink grid */}
        <div className="flex flex-col items-center gap-5 w-[314px] mx-auto">

          {/* Row 1 — staggered 2-col */}
          <div className="relative w-[314px] h-[212px] shrink-0">
            {[drinks[0], drinks[1]].map((drink, colIdx) => (
              <DrinkCard
                key={drink.name}
                drink={drink}
                colIdx={colIdx}
                onClick={() => setSelectedDrink(drink)}
              />
            ))}
          </div>

          {/* Clear filters pill */}
          {activeFilters > 0 && (
            <div className="flex justify-center w-full">
              <button
                onClick={() => setActiveFilters(0)}
                className="w-[146px] h-[33px] bg-brand-amber rounded-[80px] border-0 cursor-pointer flex justify-center items-center px-[10px]"
              >
                <span className="font-inter font-semibold text-[13px] leading-[16px] text-white">Clear filters</span>
              </button>
            </div>
          )}

          {/* Row 2 — dimmed when filters active */}
          <div
            className="relative w-[314px] h-[212px] shrink-0"
            style={{ opacity: activeFilters > 0 ? 0.8 : 1 }}
          >
            {[drinks[2], drinks[3]].map((drink, colIdx) => (
              <DrinkCard
                key={drink.name}
                drink={drink}
                colIdx={colIdx}
                onClick={() => setSelectedDrink(drink)}
                row2
              />
            ))}
          </div>

          {/* Buy 1 Get 1 special card */}
          <div
            className="box-border relative overflow-hidden w-[351px] h-[162px] bg-brand-cream border border-[#848181] shadow-[5px_6px_4px_rgba(0,0,0,0.2)] rounded-[5px] shrink-0 cursor-pointer"
            style={{ opacity: activeFilters > 0 ? 0.8 : 1 }}
            onClick={onNavigateToSpecials}
          >
            <div className="absolute left-4 top-[17px] flex flex-col gap-[10px] w-[172px] h-[140px]">
              <span className="font-playfair font-medium text-[25px] leading-[30px] text-brand-bg">
                Buy 1, get 1 special
              </span>
              <span className="font-inter font-normal text-[12px] leading-[18px] tracking-[0.02em] text-brand-bg">
                Buy a cocktail of above ₹250, and get another cocktails for absolutely free.
              </span>
            </div>
            <div
              className="absolute w-[217px] h-[217px] rounded-full overflow-hidden shadow-[-4px_-5px_9px_rgba(22,43,57,0.2)]"
              style={{ left: '194px', top: '-15px' }}
            >
              <img src="/drinks.png" alt="Buy 1 Get 1" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Row 3 — dimmed when filters active */}
          <div
            className="relative w-[314px] h-[212px] shrink-0"
            style={{ opacity: activeFilters > 0 ? 0.8 : 1 }}
          >
            {[drinks[4], drinks[5]].map((drink, colIdx) => (
              <DrinkCard
                key={drink.name}
                drink={drink}
                colIdx={colIdx}
                onClick={() => setSelectedDrink(drink)}
              />
            ))}
          </div>

        </div>
      </div>

      <MenuFab onClick={() => setIsCategoriesModalOpen(true)} />
    </div>
  );
}

// ── Shared drink card sub-component ──────────────────────────────────────────
function DrinkCard({
  drink,
  colIdx,
  onClick,
  row2 = false,
}: {
  drink: DrinkItem;
  colIdx: number;
  onClick: () => void;
  row2?: boolean;
}) {
  // Row 2 col 0 image is offset left:13.23; rows 1&3 col 0 image is left:0
  const imgLeft = row2 || colIdx === 1 ? '13.23px' : '0px';

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start gap-[2px] absolute w-[127px] h-[198px] cursor-pointer"
      style={{
        left: colIdx === 0 ? '0px' : '187px',
        top: colIdx === 0 ? '0px' : '14px',
      }}
    >
      {/* Image container */}
      <div
        className="relative shrink-0 h-[123px]"
        style={{ width: colIdx === 0 && !row2 ? '109px' : '122.23px' }}
      >
        <div
          className="box-border absolute w-[109px] h-[109px] top-0 border-[0.4px] border-[rgba(125,121,121,0.7)] rounded-[3px] overflow-hidden"
          style={{ left: imgLeft }}
        >
          <img src={drink.image} alt={drink.name} className="w-full h-full object-cover" />
        </div>
        {/* Signature badge */}
        <div
          className="flex flex-row justify-center items-center px-[3px] gap-[10px] absolute w-[91px] h-[20px] top-[103px] bg-brand-amber rounded-[2px]"
          style={{ left: colIdx === 0 && !row2 ? '7.77px' : '0px' }}
        >
          <span className="font-playfair font-semibold text-[12px] leading-[14px] text-white">Signature</span>
        </div>
      </div>
      {/* Text block */}
      <div className="flex flex-col items-start gap-[3px] w-[127px]">
        <div className="flex flex-col items-start gap-[1px] w-[155px]">
          <span className="font-playfair font-medium text-[18px] leading-[22px] text-white block">
            {drink.name}
          </span>
          <div className="flex flex-row items-center gap-[20px] w-[123px] h-[15px]">
            <span className="font-roboto font-normal text-[13px] leading-[15px] text-white">₹{drink.price}</span>
          </div>
        </div>
        <p className="font-inter font-normal text-[12px] leading-[18px] tracking-[0.02em] text-[rgba(255,255,255,0.8)] m-0 w-[127px]">
          {drink.description}
        </p>
      </div>
    </div>
  );
}
