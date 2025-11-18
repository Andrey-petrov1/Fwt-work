import { useState, type ChangeEvent } from 'react';
import clsx from 'clsx';
import SearchLightLogo from '../Svg/Logo/SearchLogo/SearchLightLogo'
import SearchDarkLogo from '../Svg/Logo/SearchLogo/SearchDarkLogo'
import XDark from '../Svg/Logo/X/XDark';
import XLight from '../Svg/Logo/X/XLight';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (value: string) => void;
  theme: string;
}

export default function SearchBar({ onSearch, theme }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

 const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
     <div
      className={clsx(
    styles.search,
    {
      [styles['search-light']]: theme === 'light',
      [styles['search-dark']]: theme === 'dark'
    }
  )}


    >
      {theme === 'dark' ? <SearchDarkLogo /> : <SearchLightLogo />}
      <input
    
        type="text"
        placeholder="Painting title"
        value={query}
        onChange={handleChange}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.clearButton}
          aria-label="Clear search"
        >
        {theme === 'dark' ? <XDark /> : <XLight />}
        </button>
      )}
    </div>
  );
}
