import { useState } from 'react';
import MenuScreen from './MenuScreen';
import SpecialsScreen from './SpecialsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'specials' | 'menu'>('specials');

  return (
    <>
      {currentScreen === 'specials' ? (
        <SpecialsScreen onNavigateToMenu={() => setCurrentScreen('menu')} />
      ) : (
        <MenuScreen onNavigateToSpecials={() => setCurrentScreen('specials')} />
      )}
    </>
  );
}

export default App;
