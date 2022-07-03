import { ThemeProvider } from "@emotion/react";
import { fireEvent, render } from "@testing-library/react";
import { mockFavourites, mockFilter } from "./App.fixture";
import { screen } from "@testing-library/dom";
import App from "./App";
import { theme } from "./theme";
import { useGetCharacters } from "./hooks/useGetCharacters";
import { useGetFilms } from "./hooks/useGetFilms";

jest.mock("./hooks/useGetCharacters");
const mockedUseGetCharacters = useGetCharacters as jest.Mock;

jest.mock("./hooks/useGetFilms");
const mockedUseGetFilms = useGetFilms as jest.Mock;

describe("Filtering", () => {
  it("should be possible to filter characters by film", () => {
    mockedUseGetCharacters.mockReturnValue(mockFilter.data.characters);
    mockedUseGetFilms.mockReturnValue(mockFilter.data.films);

    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );

    const filterCheckbox = screen.getByTestId(
      `checkbox-${mockFilter.filterId}`
    );

    fireEvent.click(filterCheckbox);

    const characterList = screen.getAllByTestId(`character-name`, {
      exact: false,
    });

    expect(characterList.map((character) => character.textContent)).toEqual(
      mockFilter.expectedResult
    );
  });
});

describe("Favourites", () => {
  it("should be possible to mark characters as favourites", () => {
    mockedUseGetCharacters.mockReturnValue(mockFavourites.data.characters);
    mockedUseGetFilms.mockReturnValue(mockFavourites.data.films);

    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );

    const favouriteButton = screen.getByTestId(
      `character-favourite-button-${mockFavourites.favouriteId}`
    );

    fireEvent.click(favouriteButton);

    const favouriteIcon = screen.getByTestId(
      `character-favourite-icon-${mockFavourites.favouriteId}`
    );

    expect(favouriteIcon).toHaveAttribute("fill", theme.colors.yellow);
  });
});
