import React, { useMemo, useState } from "react";
import { useGetCharacters } from "./hooks/useGetCharacters";
import styled from "@emotion/styled";
import { LoadingSpinner } from "./components/LoadingSpinner";
import {
  getFilteredCharacters,
  isObjectEmpty,
  toggleElementInArray,
  updateFilterByType,
} from "./utils/helpers";
import { Filter, FilterType } from "./utils/filter.model";
import { FiltersPanel } from "./components/FiltersPanel";
import { tabletSize } from "./utils/constants";
import { ErrorMessage } from "./components/ErrorMessage";
import { CharacterList } from "./components/CharacterList";

function App() {
  const { characters, loading, error } = useGetCharacters();
  const [favourites, setFavourites] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filter>();

  const handleFavouriteClick = (id: string) => {
    setFavourites((oldFavourites) => toggleElementInArray(oldFavourites, id));
  };

  const handleFilterUpdate = (filterType: FilterType, value: string) => {
    setFilters((oldFilters) => {
      const isEmptyFilters = !oldFilters || isObjectEmpty(oldFilters);
      if (!isEmptyFilters) {
        return updateFilterByType(oldFilters, filterType, value);
      }

      return { [filterType]: [value] };
    });
  };

  const filteredCharacters = useMemo(
    () => getFilteredCharacters(characters, filters),
    [characters, filters]
  );

  return (
    <Container>
      <Title>Star Wars characters</Title>
      <ListContainer>
        <FiltersPanel onFilterUpdate={handleFilterUpdate} />
        <Content>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage>Error while loading characters</ErrorMessage>
          ) : !filteredCharacters.length ? (
            <ErrorMessage>There are no characters</ErrorMessage>
          ) : (
            <CharacterList
              characters={filteredCharacters}
              favourites={favourites}
              onFavouriteClick={handleFavouriteClick}
            ></CharacterList>
          )}
        </Content>
      </ListContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 980px;
  margin: auto;
  padding: ${({ theme }) => `${theme.spacing(5)} ${theme.spacing(2)}`};
  overflow: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: ${tabletSize}px) {
    height: auto;
    padding-top: ${({ theme }) => theme.spacing(3)};
    padding-bottom: ${({ theme }) => theme.spacing(3)};
  }
`;

const ListContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  overflow: auto;

  @media (max-width: ${tabletSize}px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  @media (max-width: ${tabletSize}px) {
    font-size: 24px;
  }
`;
