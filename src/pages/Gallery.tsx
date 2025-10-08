import { useQuery } from '@tanstack/react-query';
import { getPaintings, type Painting } from '../api/PicturesApi';
import Card from '../components/Card/Card';
import styles from './Gallery.module.scss';

export default function Gallery() {
  const { data: paintings, isLoading } = useQuery({
    queryKey: ['paintings'],
    queryFn: getPaintings,
  });

  if (isLoading) return <p>Загрузка...</p>;


  const limitedPaintings = paintings?.slice(0, 6);

  return (
    <div className={styles.gallery}>
      {limitedPaintings?.map((p: Painting) => (
        <Card
          key={p.id}
          name={p.name}
          created={p.created}
          imageUrl={`https://test-front.framework.team${p.imageUrl}`}
        />
      ))}
    </div>
  );
}
