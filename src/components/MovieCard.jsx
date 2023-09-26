import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

export function MovieCard({ movie }) {
  // const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  return (
    <li className={styles.movieCard}>
      <Link to={"/movies/" + movie.idDrink}>
        <img
          width={230}
          height={345}
          className={styles.movieImage}
          src={movie.strDrinkThumb}
          alt={movie.strDrink}
        />
        <div>{movie.strDrink}</div>
      </Link>
    </li>
  );
}
