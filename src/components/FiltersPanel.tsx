import { FC } from "react";
import styled from "@emotion/styled";
import { tabletSize } from "../utils/constants";
import { FilterType } from "../utils/filter.model";
import { useGetFilms } from "../hooks/useGetFilms";
import { LoadingSpinner } from "./LoadingSpinner";
import { Checkbox } from "./Checkbox";
import { ErrorMessage } from "./ErrorMessage";

type Props = {
  onFilterUpdate: (filterType: FilterType, value: string) => void;
};

export const FiltersPanel: FC<Props> = ({ onFilterUpdate }) => {
  const { films, loading, error } = useGetFilms();

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>Error while loading filters</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <FilterTitle>Filters</FilterTitle>

      {films.length ? (
        <FilterItem>
          <FilterName>Film</FilterName>
          {films.map((film) => (
            <Checkbox
              key={film.id}
              name="film"
              value={film.id}
              label={film.title ?? undefined}
              onChange={(value) => onFilterUpdate("film", value)}
            />
          ))}
        </FilterItem>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.spacing(1.5)};
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 8%);
  padding: ${({ theme }) => theme.spacing(2)};
  margin-right: ${({ theme }) => theme.spacing(3)};

  @media (max-width: ${tabletSize}px) {
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    margin-right: 0;
  }
`;

const FilterTitle = styled.h4`
  font-size: 18px;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const FilterItem = styled.div``;

const FilterName = styled.h5`
  font-size: 16px;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing()};
`;
