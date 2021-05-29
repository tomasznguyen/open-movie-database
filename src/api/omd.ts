import { MovieLong, MovieShort } from "../types/omd";

const OMD_APIKEY = "d7a26a70";

/**
 * Fetches a movie from the Open Movie Database.
 *
 * @param id The IMDB id of the movie
 * @returns The movie
 */
export const fetchMovieById = (id: string): Promise<MovieLong> => {
  return fetch(
    `http://www.omdbapi.com/?apikey=${OMD_APIKEY}&i=${id}&plot=full&type=movie`
  )
    .then(async (res) => {
      if (!res.ok) {
        return Promise.reject(await res.json());
      }

      return res.json();
    })
    .then((res) => {
      if (res.Response === "True") {
        return res;
      }

      return Promise.reject(res.Error);
    });
};

/**
 * Searches movies given a keyword in the Open Movie Database.
 *
 * @param keyword The search keyword
 * @param page The page number to return
 * @returns A list of movies matching the keyword and the total number of movies matching the keyword
 */
export const searchMovies = (
  keyword: string,
  page: number = 1
): Promise<{
  data: MovieShort[];
  totalResults: number;
}> => {
  return fetch(
    `http://www.omdbapi.com/?apikey=${OMD_APIKEY}&page=${page}&s=${keyword}&type=movie`
  )
    .then(async (res) => {
      if (!res.ok) {
        return Promise.reject(await res.json());
      }

      return res.json();
    })
    .then((res) => {
      if (res.Response === "True") {
        return {
          data: res.Search,
          totalResults: Number(res.totalResults),
        };
      }

      return Promise.reject(res.Error);
    });
};
