import { MovieShort } from "../../types/omd";
import styles from "./MovieListItem.module.scss";
import poster from "../../assets/movie-poster.png";
import poster2x from "../../assets/movie-poster@2x.png";

export interface MovieListItemProps {
  movie: MovieShort;
  onSelect: (movie: MovieShort) => void;
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie, onSelect }) => {
  const handleClick = () => {
    onSelect(movie);
  };

  return (
    <article className={styles.listItem} onClick={handleClick}>
      {movie.Poster === "N/A" ? (
        <img src={poster} srcSet={`${poster2x} 2x`} alt={movie.Title} />
      ) : (
        <img
          src={movie.Poster}
          srcSet={`${movie.Poster} 2x`}
          alt={movie.Title}
        />
      )}
      <section className={styles.meta}>
        <h2 className={styles.title}>{movie.Title}</h2>
        <p className={styles.genre}>{movie.Year}</p>
        <div className={styles.rating}>
          <span className={styles.hearts}>
            <span className={styles.heart} />
            <span className={styles.heart} />
            <span className={styles.heart} />
            <span className={styles.heart} />
            <span className={styles.heart} />
          </span>
          <span className={styles.value}>5,9/10</span>
        </div>
      </section>
    </article>
  );
};

export default MovieListItem;
