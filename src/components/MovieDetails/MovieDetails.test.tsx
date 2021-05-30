import { render, screen } from "@testing-library/react";
import * as useFetchMovie from "../../hooks/useFetchMovie";
import { MovieLong } from "../../types/omd";
import MovieDetails from "./MovieDetails";

const movie: MovieLong = {
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
};

beforeEach(() => {
  jest.resetModules();
});

describe("<MovieDetails />", () => {
  it("should render loading message", () => {
    jest.spyOn(useFetchMovie, "useFetchMovie").mockReturnValue({
      error: "",
      movie: null,
      status: 1,
    });

    render(<MovieDetails movieId="tt0295644" onClose={() => {}} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render movie details", async () => {
    jest.spyOn(useFetchMovie, "useFetchMovie").mockReturnValue({
      error: "",
      movie,
      status: 2,
    });

    render(<MovieDetails movieId="tt0295644" onClose={() => {}} />);

    expect(await screen.findByText(movie.Title)).toBeInTheDocument();
  });

  it("should render error", async () => {
    jest.spyOn(useFetchMovie, "useFetchMovie").mockReturnValue({
      error: "Error getting data.",
      movie: null,
      status: 3,
    });

    render(<MovieDetails movieId="xxx" onClose={() => {}} />);

    expect(await screen.findByText("Error getting data.")).toBeInTheDocument();
  });
});
