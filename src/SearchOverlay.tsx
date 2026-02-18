import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (text: string) => void;
  initialQuery?: string;
}

const popularSearches = [
  "Pina colada",
  "Beer",
  "Cosmopolitan",
  "Margarita",
  "Red wine"
];

const SearchOverlay = ({ isOpen, onClose, onSearch, initialQuery = '' }: SearchOverlayProps) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus input on open
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Search Panel */}
      <div className="fixed top-0 left-0 right-0 z-[70] bg-[#fcfbf7] rounded-b-[2rem] shadow-2xl animate-slideDown flex flex-col max-h-[70vh] font-sans overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 pt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800" />
            <form onSubmit={handleSearchSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search items, categories....."
                className="w-full bg-white border border-gray-300 rounded-full py-2.5 pl-10 pr-10 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-gray-400 text-sm shadow-sm"
              />
            </form>
            {query && (
              <button 
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-gray-900 font-medium text-sm hover:text-gray-700 whitespace-nowrap"
          >
            Cancel
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-4 pb-6">
          <h3 className="text-[#3a4b5a] font-serif text-lg mb-4 tracking-wide font-medium">Popular searches</h3>
          
          <div className="space-y-1">
            {popularSearches.map((term, index) => (
              <div 
                key={index}
                onClick={() => {
                  setQuery(term);
                  onSearch(term);
                  onClose();
                }}
                className="flex items-center justify-between py-3 cursor-pointer group hover:bg-gray-100 rounded-lg -mx-2 px-2 transition-colors"
              >
                <span className="text-gray-500 text-sm group-hover:text-gray-900">{term}</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchOverlay;
