import { render, screen } from "@testing-library/react";
import * as useSearchMovies from "../../hooks/useSearchMovies";
import { MovieShort } from "../../types/omd";
import MovieOverview from "./MovieOverview";

const movies: MovieShort[] = [
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
];

beforeEach(() => {
  jest.resetModules();
});

describe("<MovieOverview />", () => {
  it("should render loading message", () => {
    jest.spyOn(useSearchMovies, "useSearchMovies").mockReturnValue({
      error: "",
      loadNextPage: jest.fn(),
      reset: jest.fn(),
      movies: [],
      status: 1,
      totalMovies: 0,
    });

    render(<MovieOverview />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render movie details", async () => {
    jest.spyOn(useSearchMovies, "useSearchMovies").mockReturnValue({
      error: "",
      loadNextPage: jest.fn(),
      movies,
      reset: jest.fn(),
      status: 2,
      totalMovies: 2,
    });

    render(<MovieOverview />);

    expect(await screen.findByText(movies[0].Title)).toBeInTheDocument();
  });

  it("should render error", async () => {
    jest.spyOn(useSearchMovies, "useSearchMovies").mockReturnValue({
      error: "Error getting data.",
      loadNextPage: jest.fn(),
      movies: [],
      reset: jest.fn(),
      status: 3,
      totalMovies: 0,
    });

    render(<MovieOverview />);

    expect(await screen.findByText("Error getting data.")).toBeInTheDocument();
  });
});
