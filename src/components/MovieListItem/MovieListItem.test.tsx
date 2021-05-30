import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieShort } from "../../types/omd";
import MovieListItem from "./MovieListItem";

const movie: MovieShort = {
  Title: "Superhero Movie",
  Year: "2008",
  imdbID: "tt0426592",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMTc0Njc1MTU5Nl5BMl5BanBnXkFtZTcwMjA4NDE2MQ@@._V1_SX300.jpg",
};

describe("<MovieListItem />", () => {
  it("should call onSelect on click", () => {
    const handleSelect = jest.fn();

    render(<MovieListItem movie={movie} onSelect={handleSelect} />);

    userEvent.click(screen.getByRole("article"));

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(movie);
  });
});
