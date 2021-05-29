import React from "react";
import { useFetchMovie } from "../../hooks/useFetchMovie";
import { FetchStatus } from "../../types";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import MovieDetailsInfo from "../MovieDetailsInfo";
import styles from "./MovieDetails.module.scss";

export interface MovieDetailsProps {
  movieId: string;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId, onClose }) => {
  const { error, movie, status } = useFetchMovie(movieId);

  return (
    <div className={styles.details}>
      <span className={styles.closeButton} onClick={onClose}>
        close
      </span>
      {status === FetchStatus.Error && <ErrorMessage message={error} />}
      {status === FetchStatus.Fetching && <Loader />}
      {status === FetchStatus.Fetched && movie && (
        <MovieDetailsInfo movie={movie} />
      )}
    </div>
  );
};

export default MovieDetails;
