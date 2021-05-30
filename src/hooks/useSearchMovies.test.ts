import { act, renderHook } from "@testing-library/react-hooks";
import { FetchStatus } from "../types";
import { SearchResponse } from "../types/omd";
import { useSearchMovies } from "./useSearchMovies";

const searchMoviesResponse1: SearchResponse = {
  Search: [
    {
      Title: "Superhero Movie",
      Year: "2008",
      imdbID: "tt0426592",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTc0Njc1MTU5Nl5BMl5BanBnXkFtZTcwMjA4NDE2MQ@@._V1_SX300.jpg",
    },
    {
      Title: "Bhavesh Joshi Superhero",
      Year: "2018",
      imdbID: "tt6129302",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOWYxMGM5NGUtYjE4Mi00NjQ2LTllYjUtNTMyNTdjZGIxZjcxXkEyXkFqcGdeQXVyNzkxOTEyMjI@._V1_SX300.jpg",
    },
    {
      Title: "Death of a Superhero",
      Year: "2011",
      imdbID: "tt1384927",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMzg3MTk3Mjc2NV5BMl5BanBnXkFtZTgwNTgxNjEwMjE@._V1_SX300.jpg",
    },
    {
      Title: "Superhero Fight Club",
      Year: "2015",
      imdbID: "tt4622122",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYzZjZDE1NTgtMTc4Yy00YzYxLWE1ZTItZjAzNzViOWFlNGNiXkEyXkFqcGdeQXVyMjU0OTAwMDc@._V1_SX300.jpg",
    },
    {
      Title: "Confessions of a Superhero",
      Year: "2007",
      imdbID: "tt1016164",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMDRiODE3NzQtNGNiOS00MTdlLTljZGQtNDc0ODEyZmQzNWY3XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    },
  ],
  totalResults: "184",
  Response: "True",
};

const searchMoviesResponse2: SearchResponse = {
  Search: [
    {
      Title: "Superhero Fight Club 2.0",
      Year: "2016",
      imdbID: "tt6107818",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYTE3MGYxYzAtYzVhZi00NWIxLWFkNmQtMDBhOTZmZWI4MDU1XkEyXkFqcGdeQXVyNDA5ODU0NDg@._V1_SX300.jpg",
    },
    {
      Title: "Who Wants to Be a Superhero?",
      Year: "2006–",
      imdbID: "tt0377288",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTgyOTI4NjI4MV5BMl5BanBnXkFtZTcwMjA0OTk0MQ@@._V1_SX300.jpg",
    },
    {
      Title: "Another Superhero Movie",
      Year: "2011",
      imdbID: "tt1997618",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTU4MDM3YmQtMGY4Ny00Mzk3LWEzMjAtYmYyYjQ0YjY2Mzk2XkEyXkFqcGdeQXVyMjUxOTAxNzI@._V1_SX300.jpg",
    },
    {
      Title: "Cool Cat Kids Superhero",
      Year: "2018",
      imdbID: "tt7281994",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMDg3OWY1NDUtZmI1NC00MzQ0LWE0ODItNDlmZmI5ZTExOTVmXkEyXkFqcGdeQXVyMjcwMTQzODA@._V1_SX300.jpg",
    },
    {
      Title: "The Superhero",
      Year: "2007",
      imdbID: "tt0988140",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTYyMTU3NTAzOV5BMl5BanBnXkFtZTcwOTgxMTY0MQ@@._V1_SX300.jpg",
    },
  ],
  totalResults: "184",
  Response: "True",
};

const searchMoviesFailureResponse: SearchResponse = {
  Error: "Movie not found!",
  Response: "False",
};

beforeAll(() => jest.spyOn(window, "fetch"));

const mockFetch = async (url: string) => {
  if (url.includes("page=1&s=superhero&")) {
    return {
      ok: true,
      status: 200,
      json: async () => searchMoviesResponse1,
    };
  }

  if (url.includes("page=2&s=superhero&")) {
    return {
      ok: true,
      status: 200,
      json: async () => searchMoviesResponse2,
    };
  }

  if (url.includes("s=xxx&")) {
    return {
      ok: true,
      status: 200,
      json: async () => searchMoviesFailureResponse,
    };
  }

  throw new Error("Unsupported test url");
};

// @ts-ignore
beforeEach(() => window.fetch.mockImplementation(mockFetch));

describe("useSearchMovies()", () => {
  it("should return a list of movies", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchMovies("superhero")
    );

    expect(result.current.status).toEqual(FetchStatus.Fetching);

    await waitForNextUpdate();

    expect(result.current.error).toEqual("");
    expect(result.current.status).toEqual(FetchStatus.Fetched);
    expect(result.current.movies).toHaveLength(5);
    expect(result.current.totalMovies).toBe(184);
  });

  it("should return an error", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchMovies("xxx")
    );

    expect(result.current.status).toEqual(FetchStatus.Fetching);

    await waitForNextUpdate();

    expect(result.current.error).toEqual("Movie not found!");
    expect(result.current.status).toEqual(FetchStatus.Error);
    expect(result.current.movies).toHaveLength(0);
    expect(result.current.totalMovies).toBe(0);
  });

  it("should load next page and should reset", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchMovies("superhero")
    );

    expect(result.current.status).toEqual(FetchStatus.Fetching);

    await waitForNextUpdate();

    expect(result.current.error).toEqual("");
    expect(result.current.status).toEqual(FetchStatus.Fetched);
    expect(result.current.movies).toHaveLength(5);
    expect(result.current.totalMovies).toBe(184);

    act(() => {
      result.current.loadNextPage();
    });

    expect(result.current.status).toEqual(FetchStatus.Fetching);

    await waitForNextUpdate();

    expect(result.current.error).toEqual("");
    expect(result.current.status).toEqual(FetchStatus.Fetched);
    expect(result.current.movies).toHaveLength(10);
    expect(result.current.totalMovies).toBe(184);

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toEqual(FetchStatus.Fetching);

    await waitForNextUpdate();

    expect(result.current.error).toEqual("");
    expect(result.current.status).toEqual(FetchStatus.Fetched);
    expect(result.current.movies).toHaveLength(5);
    expect(result.current.totalMovies).toBe(184);
  });
});
