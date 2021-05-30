import { FetchResponse, SearchResponse } from "../types/omd";
import { fetchMovieById, searchMovies } from "./omd";

const fetchMovieResponse: FetchResponse = {
  Title: "Superhero",
  Year: "2000",
  Rated: "N/A",
  Released: "N/A",
  Runtime: "1 min",
  Genre: "Short",
  Director: "Darren Walsh",
  Writer: "Ian Dagger, Darren Walsh",
  Actors: "David Holt, Darren Walsh",
  Plot: "Angry Kid is a superhero in his own mind. He is Captain Buggernuts, to be precise. Wearing a mask and cape, sitting atop his trusty bicycle, er, hydro-chopper, he is sworn to protect the ...",
  Language: "English",
  Country: "UK",
  Awards: "N/A",
  Poster: "N/A",
  Ratings: [{ Source: "Internet Movie Database", Value: "5.8/10" }],
  Metascore: "N/A",
  imdbRating: "5.8",
  imdbVotes: "33",
  imdbID: "tt0295644",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "N/A",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};

const fetchMovieFailureResponse: FetchResponse = {
  Response: "False",
  Error: "Error getting data.",
};

const searchMoviesResponse: SearchResponse = {
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
  if (url.includes("i=tt0295644&")) {
    return {
      ok: true,
      status: 200,
      json: async () => fetchMovieResponse,
    };
  }

  if (url.includes("i=xxx&")) {
    return {
      ok: true,
      status: 200,
      json: async () => fetchMovieFailureResponse,
    };
  }

  if (url.includes("s=superhero&")) {
    return {
      ok: true,
      status: 200,
      json: async () => searchMoviesResponse,
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

describe("fetchMovies()", () => {
  it("should return a movie", async () => {
    const movie = await fetchMovieById("tt0295644");

    expect(movie).toBe(fetchMovieResponse);
  });

  it("should return an error", async () => {
    await expect(fetchMovieById("xxx")).rejects.toStrictEqual(
      "Error getting data."
    );
  });
});

describe("searchMovies()", () => {
  it("should return movies", async () => {
    const { data, totalResults } = await searchMovies("superhero");

    expect(data).toHaveLength(10);
    expect(totalResults).toBe(184);
  });

  it("should return an error", async () => {
    await expect(searchMovies("xxx")).rejects.toStrictEqual("Movie not found!");
  });
});
