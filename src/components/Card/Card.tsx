import styles from './Card.module.scss';

interface CardProps {
  name: string;
  created: string;
  imageUrl: string;
}

export default function Card({ name, created, imageUrl }: CardProps) {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>{created}</p>
      </div>
    </div>
  );
}
