import { useState, type ChangeEvent } from 'react';
import clsx from 'clsx';
import SearchLogo from '../Svg/Logo/SearchLogo/search_icon'

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

  return (
     <div
      className={clsx(
    styles.search,
    {
      [styles['search-light']]: theme === 'light',
      [styles['search-dark']]: theme === 'dark'
    }
  )}

  //написано иначе чем в пагинации, как менять тему и у свг
    >
       <SearchLogo />
      <input
    
        type="text"
        placeholder="Painting title"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
