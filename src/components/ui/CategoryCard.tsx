import React from 'react';

interface CategoryCardProps {
  label: string;
  img: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * "Food / Drinks / Tobacco" category pill — equal-width cards, active card gets amber gradient.
 * Inactive cards use a lighter blue-gray with a subtle border (matches image 2 design).
 */
const CategoryCard: React.FC<CategoryCardProps> = ({ label, img, active = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={[
        'flex flex-col items-center justify-center gap-[8px]',
        'w-[90px] h-[110px] rounded-[10px] box-border',
        active
          ? 'bg-grad-category-active shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
          : 'bg-[#1E3A4F] border border-[rgba(255,255,255,0.08)]',
        onClick ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
    >
      <img
        src={img}
        alt={label}
        className="w-[62px] h-[62px] rounded-full object-cover"
      />
      <span
        className={[
          'font-inter text-[14px] leading-[17px] text-center text-white',
          active ? 'font-semibold' : 'font-medium',
        ].join(' ')}
      >
        {label}
      </span>
    </div>
  );
};

export default CategoryCard;
