import React from "react";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import { FetchStatus } from "../../types";
import { MovieShort } from "../../types/omd";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import LoadMore from "../LoadMore";
import MovieDetails from "../MovieDetails";
import MovieList from "../MovieList";
import styles from "./MovieOverview.module.scss";

const MovieOverview: React.FC = () => {
  const { error, loadNextPage, movies, status, totalMovies } =
    useSearchMovies("superhero");
  const [selectedMovie, setSelectedMovie] =
    React.useState<MovieShort | null>(null);

  const handleClose = () => {
    setSelectedMovie(null);
  };

  const handleLoadMore = () => {
    loadNextPage();
  };

  const handleSelect = (movie: MovieShort) => {
    setSelectedMovie(movie);
  };

  return (
    <div className={styles.overview}>
      {status === FetchStatus.Error && <ErrorMessage message={error} />}
      {status === FetchStatus.Fetching && <Loader />}
      {!selectedMovie && movies.length > 0 && (
        <>
          <MovieList movies={movies} onSelect={handleSelect} />
          {movies.length < totalMovies && (
            <LoadMore
              loading={status === FetchStatus.Fetching}
              onClick={handleLoadMore}
            />
          )}
        </>
      )}
      {selectedMovie && (
        <MovieDetails movieId={selectedMovie.imdbID} onClose={handleClose} />
      )}
    </div>
  );
};

export default MovieOverview;
