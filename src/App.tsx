import { useState } from 'react';
import MenuScreen from './MenuScreen';
import SpecialsScreen from './SpecialsScreen';
import DrinksScreen from './DrinksScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'specials' | 'menu' | 'drinks'>('specials');

  return (
    <>
      {currentScreen === 'specials' ? (
        <SpecialsScreen onNavigateToMenu={() => setCurrentScreen('menu')} />
      ) : currentScreen === 'menu' ? (
        <MenuScreen 
          onNavigateToSpecials={() => setCurrentScreen('specials')} 
          onNavigateToDrinks={() => setCurrentScreen('drinks')}
        />
      ) : (
        <DrinksScreen 
          onNavigateToSpecials={() => setCurrentScreen('specials')}
          onNavigateToFood={() => setCurrentScreen('menu')}
        />
      )}
    </>
  );
}

export default App;
