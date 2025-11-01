import {useState} from 'react';
import Gallery from './pages/Gallery';
import Header from './components/Header/Header';
import ThemeContext from './context/themeContext';
import './App.css';
import clsx from 'clsx';


function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  return (
    <ThemeContext.Provider value={theme}>
       <div className={clsx('app', `app-${theme}`)}>
        <Header handleTheme={toggleTheme} />
        <Gallery />
        </div>
    </ThemeContext.Provider>
  );
}

export default App;
