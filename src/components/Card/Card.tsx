import {memo} from 'react';
import styles from "./Card.module.scss";
import type { CardProps } from "../../configs/interfaces.ts";
import { useState, useContext } from "react";
import ThemeContext from "../../context/themeContext.tsx";
import clsx from "clsx";
import "animate.css";

const Card = memo(function CardItem({
  name,
  created,
  imageUrl,
  authorName,
  locationName,
}: CardProps) {
  const theme = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={name} className={clsx(styles.image, styles[`image--${theme}`])} />

      <div
        className={clsx(
          styles.info,
          theme === "light" ? styles["info-light"] : styles["info-dark"]
        )}
      >
     
      <div
  className={clsx(
    styles.frontInfo,
    "animate__animated",
    isHovered ? "animate__slideOutDown" : "animate__slideInUp",
    isHovered ? styles.animateFastOut : styles.animateFrontIn
  )}
>
  <h3>{name}</h3>
  <p>{created}</p>
</div>

<div
  className={clsx(
    styles.backInfo,
    "animate__animated",
    isHovered ? "animate__slideInLeft" : "animate__slideOutLeft",
    isHovered ? styles.animateBackIn : styles.animateBackOut
  )}
>
  <h3>{authorName}</h3>
  <p className={styles[`cardText-${theme}`]}>{locationName}</p>
</div>

      </div>
    </div>
  );
});

export default Card;