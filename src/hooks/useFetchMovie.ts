import React from "react";
import { fetchMovieById } from "../api/omd";
import { FetchStatus } from "../types";
import { MovieLong } from "../types/omd";

/**
 * Fetches movie details from Open Movie Database.
 *
 * @param movieId The IMDB id of the movie
 * @returns Fetch status; the movie if the fetch succeeded; an error message if the fetch failed
 */
export const useFetchMovie = (movieId: string) => {
  const [error, setError] = React.useState("");
  const [movie, setMovie] = React.useState<MovieLong | null>(null);
  const [status, setStatus] = React.useState(FetchStatus.Idle);

  React.useEffect(() => {
    let active = true;

    setStatus(FetchStatus.Fetching);

    fetchMovieById(movieId)
      .then((res) => {
        if (active) {
          setMovie(res);
          setStatus(FetchStatus.Fetched);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err);
          setStatus(FetchStatus.Error);
        }
      });

    return () => {
      active = false;
    };
  }, [movieId]);

  return { error, movie, status };
};
