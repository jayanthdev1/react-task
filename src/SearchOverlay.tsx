import { useState, useEffect, useRef } from 'react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (text: string) => void;
  initialQuery?: string;
}

// All popular searches — filtered live as the user types
const ALL_POPULAR = [
  'Saffron biryani',
  'Paneer makhani',
  'Pizzas',
  'Dal bhukara',
  'Saffron biryani',
  'Dal makhani',
  'Dal tadka',
  'Dal fry',
];

// Arrow icon — glyphs:arrow-bold rotated -30deg
function ArrowBold() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      style={{ transform: 'rotate(-30deg)', flexShrink: 0 }}
    >
      <path
        d="M2.5 6.5H10.5M7.5 3.5L10.5 6.5L7.5 9.5"
        stroke="rgba(85,85,85,0.8)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SearchOverlay = ({ isOpen, onClose, onSearch, initialQuery = '' }: SearchOverlayProps) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => { inputRef.current?.focus(); }, 100);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const isTyping = query.length > 0;

  // When typing: filter suggestions by query; when empty: show first 5
  const suggestions = isTyping
    ? ALL_POPULAR.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : ALL_POPULAR.slice(0, 5);

  const handleSelect = (term: string) => {
    setQuery(term);
    onSearch(term);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    onClose();
  };

  return (
    <>
      {/* Backdrop — rgba(22,43,57,0.55) over home screen */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(22,43,57,0.55)' }}
        onClick={onClose}
      />

      {/*
        iPhone 16-3 search panel
        393×338px, #FAF7F2, border-radius: 0 0 10px 10px
      */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '393px', minHeight: '200px', maxHeight: '338px',
        background: '#FAF7F2',
        borderRadius: '0px 0px 10px 10px',
        zIndex: 70,
        overflow: 'hidden',
        animation: 'slideDown 0.22s ease',
      }}>

        {/*
          Frame 133: column gap:10
          Empty:  360×206.79 at left:13, top:30
          Typing: 360×115.27 at left:13, top:30
        */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          gap: '10px',
          position: 'absolute', left: '13px', top: '30px',
          width: '360px',
        }}>

          {/* ── Frame 134: input row + Cancel ── */}
          <div style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',
            gap: '10px', width: '360px', height: '30px',
          }}>

            {/*
              Frame 67 (input pill)
              Empty:  width 360px
              Typing: width 298px (room for "Cancel")
            */}
            <form
              onSubmit={handleSubmit}
              style={{
                boxSizing: 'border-box', position: 'relative',
                width: isTyping ? '298px' : '360px', height: '30px',
                background: '#FAF7F2',
                border: '0.6px solid rgba(125,121,121,0.7)',
                borderRadius: '50px',
                transition: 'width 0.18s ease',
                flexShrink: 0,
              }}
            >
              {/* Frame 68: search icon + text, left:9 top:7 */}
              <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                gap: '5px',
                position: 'absolute', left: '9px', top: '7px',
                width: isTyping ? '260px' : '342px', height: '16px',
              }}>
                {/* Search icon 16×16, #162B39 */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="4.3" stroke="#162B39" strokeWidth="1.5" />
                  <line x1="10.3" y1="10.3" x2="14" y2="14" stroke="#162B39" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                {/* Typing state: typed text + vertical separator */}
                {isTyping && (
                  <>
                    {/* "Dal" typed text — Roboto 400 12px rgba(22,43,57,0.6) */}
                    <span style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                      fontSize: '12px', lineHeight: '14px',
                      color: 'rgba(22,43,57,0.6)',
                      whiteSpace: 'nowrap',
                    }}>{query}</span>
                    {/* Line 9: vertical separator, 14px tall */}
                    <div style={{
                      width: '1px', height: '14px',
                      background: '#162B39', flexShrink: 0,
                    }} />
                  </>
                )}

                {/* Invisible real input (always present for focus/typing) */}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isTyping ? '' : 'Search items, categories.....'}
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                    fontSize: '12px', lineHeight: '14px',
                    color: 'rgba(22,43,57,0.6)',
                    width: '100%',
                    caretColor: '#162B39',
                    // Hide text visually (we show it as <span> above when typing)
                    opacity: isTyping ? 0 : 1,
                    position: isTyping ? 'absolute' : 'static',
                    pointerEvents: 'auto',
                  }}
                />
              </div>

              {/* material-symbols:cancel — clear button, only when typing */}
              {isTyping && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                  style={{
                    position: 'absolute', right: '7px', top: '7px',
                    width: '16px', height: '16px',
                    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {/* X circle in #555555 */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" fill="#555555" />
                    <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                    <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </form>

            {/* "Cancel" button — only shown when typing, Roboto 400 14px black */}
            {isTyping && (
              <button
                onClick={onClose}
                style={{
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                  fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                  fontSize: '14px', lineHeight: '16px',
                  color: '#000000', whiteSpace: 'nowrap',
                  width: '43px', height: '16px',
                  flexShrink: 0,
                }}
              >
                Cancel
              </button>
            )}
          </div>

          {/* ── Frame 132: suggestions section ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            gap: '15px', width: '360px',
          }}>

            {/* "Popular searches" heading — only shown when NOT typing */}
            {!isTyping && (
              <span style={{
                fontFamily: 'Playfair Display, Playfair, serif',
                fontWeight: 500, fontSize: '16px', lineHeight: '19px',
                color: '#555555', width: '360px',
              }}>Popular searches</span>
            )}

            {/* Frame 128: suggestion rows, column gap:11 */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              gap: '11px', width: '360px',
            }}>
              {suggestions.map((term, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(term)}
                  style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center',
                    width: '360px', height: '17.76px', cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontFamily: 'Playfair Display, Playfair, serif',
                    fontWeight: 400, fontSize: '13px', lineHeight: '16px',
                    color: 'rgba(85,85,85,0.8)',
                  }}>{term}</span>
                  <ArrowBold />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-100%); }
          to   { transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default SearchOverlay;
