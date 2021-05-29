import React from "react";
import { searchMovies } from "../api/omd";
import { FetchStatus } from "../types";
import { MovieShort } from "../types/omd";

/**
 * Searches movies given a keyword in the Open Movie Database.
 *
 * @param keyword The search keyword
 * @param page The page number to return
 * @returns Fetch status; a list of movies and the total number of movies if the fetch succeeded;
 *          an error message if the fetch failed
 */
export const useSearchMovies = (keyword: string) => {
  const [error, setError] = React.useState("");
  const [movies, setMovies] = React.useState<MovieShort[]>([]);
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState(FetchStatus.Idle);
  const [totalMovies, setTotalMovies] = React.useState(0);

  React.useEffect(() => {
    let active = true;

    setStatus(FetchStatus.Fetching);

    searchMovies(keyword, page)
      .then((res) => {
        if (active) {
          setMovies((movies) => [...movies, ...res.data]);
          setTotalMovies(res.totalResults);
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
  }, [keyword, page]);

  const loadNextPage = React.useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  const reset = React.useCallback(() => {
    setMovies([]);
    setPage(1);
    setTotalMovies(0);
  }, []);

  return { error, loadNextPage, movies, reset, status, totalMovies };
};
