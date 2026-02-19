/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#162B39',
          amber: '#A9712F',
          amberLight: '#D08A3C',
          dark: '#112D40',
          darker: '#0D2433',
          cream: '#FAF7F2',
          divider: '#E5E1DA',
        },
      },
      backgroundImage: {
        'grad-active-pill': 'linear-gradient(90deg, #DE994D 0%, #A56C2D 93.75%)',
        'grad-category-active': 'linear-gradient(180deg, #DE994D 29.33%, #A56C2D 100%)',
        'grad-category-idle': 'linear-gradient(0deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 100%), #162B39',
        'grad-fab': 'linear-gradient(180deg, #F0A450 0%, #CF8838 88.47%)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        playfair: ['"Playfair Display"', 'Playfair', 'serif'],
      },
    },
  },
  plugins: [],
};
