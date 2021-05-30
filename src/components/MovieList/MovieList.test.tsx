import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieShort } from "../../types/omd";
import MovieList from "./MovieList";

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

describe("<MovieList />", () => {
  it("should call onSelect on click", () => {
    const handleSelect = jest.fn();

    render(<MovieList movies={movies} onSelect={handleSelect} />);

    const items = screen.getAllByRole("article");

    userEvent.click(items[0]);
    userEvent.click(items[1]);

    expect(handleSelect).toHaveBeenCalledTimes(2);
    expect(handleSelect).toHaveBeenNthCalledWith(1, movies[0]);
    expect(handleSelect).toHaveBeenNthCalledWith(2, movies[1]);
  });
});
