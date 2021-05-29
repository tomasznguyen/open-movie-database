import { MovieLong } from "../../types/omd";
import styles from "./MovieDetailsInfo.module.scss";

export interface MovieDetailsInfoProps {
  movie: MovieLong;
}

const MovieDetailsInfo: React.FC<MovieDetailsInfoProps> = ({ movie }) => {
  return (
    <div className={styles.info}>
      <h2>Title</h2>
      <p>{movie.Title}</p>
      <h2>Plot</h2>
      <p>{movie.Plot}</p>
      <h2>IMDB</h2>
      <p>
        <a
          href={`https://www.imdb.com/title/${movie.imdbID}/`}
          rel="noreferrer"
          target="_blank"
        >
          https://www.imdb.com/title/{movie.imdbID}/
        </a>
      </p>
    </div>
  );
};

export default MovieDetailsInfo;
