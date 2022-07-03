import { FilmFragment, useFilmsQuery } from "../generated/graphql";
import { isNotNullable } from "../utils/helpers";

export const useGetFilms = () => {
  const { data, fetchMore, ...query } = useFilmsQuery();

  const films: FilmFragment[] =
    data?.allFilms?.films?.filter(isNotNullable) || [];

  return {
    films: films,
    ...query,
  };
};
