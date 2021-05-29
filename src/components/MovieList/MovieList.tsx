import { MovieShort } from "../../types/omd";
import MovieListItem from "../MovieListItem";
import styles from "./MovieList.module.scss";

export interface MovieListProps {
  movies: MovieShort[];
  onSelect: (movie: MovieShort) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onSelect }) => {
  return (
    <section className={styles.list}>
      {movies.map((movie) => (
        <MovieListItem key={movie.imdbID} movie={movie} onSelect={onSelect} />
      ))}
    </section>
  );
};

export default MovieList;
