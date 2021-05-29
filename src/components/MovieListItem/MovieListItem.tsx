import { MovieShort } from "../../types/omd";
import styles from "./MovieListItem.module.scss";

export interface MovieListItemProps {
  movie: MovieShort;
  onSelect: (movie: MovieShort) => void;
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie, onSelect }) => {
  const handleClick = () => {
    onSelect(movie);
  };

  return (
    <li className={styles.listItem} onClick={handleClick}>
      <span className={styles.title}>{movie.Title}</span>
      <span className={styles.subtitle}>
        <span className={styles.year}>{movie.Year}</span>
      </span>
    </li>
  );
};

export default MovieListItem;
