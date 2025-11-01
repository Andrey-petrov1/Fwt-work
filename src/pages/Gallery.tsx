import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPaintings, getAllPaintings } from '../api/PicturesApi';
import type { Painting, Author, Location } from '../configs/interfaces';
import { BASE_URL, API_CONSTANTS } from '../configs/constants';
import SearchBar from '../components/Search/Search';
import { getAllAuthors } from '../api/AuthorsApi';
import { getAllLocations } from '../api/LocationsApi';
import Pagination from '../components/Pagination/Pagination';
import Card from '../components/Card/Card';
import styles from './Gallery.module.scss';
import clsx from 'clsx';
import ThemeContext from '../context/themeContext';
import { useContext } from 'react';

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const theme = useContext(ThemeContext);

  const { data: paintings} = useQuery({
    queryKey: ['paintings', currentPage, searchQuery],
    queryFn: () => getPaintings(currentPage, searchQuery),
  });

  const { data: allPaintings} = useQuery({
    queryKey: ['allPaintings'],
    queryFn: () => getAllPaintings(),
  });

  const { data: authors } = useQuery({
    queryKey: ['authors'],
    queryFn: getAllAuthors,
  });

  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: getAllLocations,
  });

  let totalPages;

  if (searchQuery.length === 0) {
    totalPages = allPaintings !== undefined ? Math.floor(Math.round(allPaintings?.length / API_CONSTANTS.INITIAL_LIMIT)) : API_CONSTANTS.DEFAULT_TOTAL_PAGES;
  } else {
    totalPages = paintings !== undefined ? paintings.length : 0;
  }

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.toolbar}>
          <SearchBar onSearch={setSearchQuery} theme={theme}/>
      </div>
      <div className={styles.gallery}>
        {
          paintings?.map((p: Painting) => {
            const author = authors?.find((a: Author) => a.id === p.authorId);
            const location = locations?.find((l: Location) => l.id === p.locationId);

            return (
              <Card
                key={p.id}
                name={p.name}
                created={p.created}
                imageUrl={`${BASE_URL}${p.imageUrl}`}
                authorName={author?.name || ''}
                locationName={location?.location || ''}
              />
            );
          })
        }

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}


