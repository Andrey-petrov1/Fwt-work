import { useQuery } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { getAllPaintings } from '../api/PicturesApi';
import type { Painting, Author, Location } from '../configs/interfaces';
import { BASE_URL, API_CONSTANTS } from '../configs/constants';
import SearchBar from '../components/Search/Search';
import { getAllAuthors } from '../api/AuthorsApi';
import { getAllLocations } from '../api/LocationsApi';
import Pagination from '../components/Pagination/Pagination';
import Card from '../components/Card/Card';
import styles from './Gallery.module.scss';
import ThemeContext from '../context/themeContext';
import clsx from 'clsx';

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useContext(ThemeContext);

 
  const { data: authors } = useQuery({
    queryKey: ['authors'],
    queryFn: getAllAuthors,
  });

  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: getAllLocations,
  });


 const {
  data: paintingsResponse = { paintings: [], total: 0 },
  isLoading,
  isFetching,
} = useQuery({
  queryKey: ['paintings', currentPage, searchQuery],

 
  queryFn: async () =>
    await getAllPaintings({
      page: currentPage,
      limit: API_CONSTANTS.INITIAL_LIMIT,
      search: searchQuery.trim(),
    }),


  placeholderData: (prev) => prev,
});


  const visiblePaintings: Painting[] | undefined = paintingsResponse?.paintings;
  const total = paintingsResponse?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / API_CONSTANTS.INITIAL_LIMIT));

  const noResults = !isLoading && visiblePaintings && visiblePaintings.length === 0;

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.toolbar}>
        <SearchBar
          onSearch={(value) => {
            setSearchQuery(value);
            setCurrentPage(1); 
          }}
          theme={theme}
        />
      </div>

      {noResults ? (
        <div
          className={clsx(styles.noResults, {
            [styles['noResults-light']]: theme === 'light',
            [styles['noResults-dark']]: theme === 'dark',
          })}
        >
          <h2>
            No matches for{' '}
            <span className={styles.highlight}>"{searchQuery}"</span>
          </h2>
          <p>Please try again with a different spelling or keywords.</p>
        </div>
      ) : (
        <>
          <div className={styles.gallery}>
            {isLoading && <p>Loading...</p>}
            {visiblePaintings?.map((p: Painting) => {
              const author = authors?.find((a: Author) => a.id === p.authorId);
              const location = locations?.find(
                (l: Location) => l.id === p.locationId
              );

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
            })}
          </div>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => {
           
                if (page === currentPage) return;
                setCurrentPage(page);
              }}
            />
          )}

      
          {isFetching && !isLoading && <div className={styles.fetching}>Updating...</div>}
        </>
      )}
    </div>
  );
}
