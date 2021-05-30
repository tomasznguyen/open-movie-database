import { renderHook } from "@testing-library/react-hooks";
import { FetchStatus } from "../types";
import { FetchResponse } from "../types/omd";
import { useFetchMovie } from "./useFetchMovie";

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

  throw new Error("Unsupported test url");
};

// @ts-ignore
beforeEach(() => window.fetch.mockImplementation(mockFetch));

describe("useFetchMovie()", () => {
  it("should return a movie", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchMovie("tt0295644")
    );

    expect(result.current.status).toEqual(FetchStatus.Fetching);

    await waitForNextUpdate();

    expect(result.current.error).toEqual("");
    expect(result.current.status).toEqual(FetchStatus.Fetched);
    expect(result.current.movie).toBe(fetchMovieResponse);
  });

  it("should return an error", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchMovie("xxx")
    );

    expect(result.current.status).toEqual(FetchStatus.Fetching);

    await waitForNextUpdate();

    expect(result.current.error).toEqual("Error getting data.");
    expect(result.current.status).toEqual(FetchStatus.Error);
    expect(result.current.movie).toBeNull();
  });
});
