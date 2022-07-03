import { CharacterFragment, useCharactersQuery } from "../generated/graphql";
import { isNotNullable } from "../utils/helpers";

export const useGetCharacters = () => {
  const { data, fetchMore, ...query } = useCharactersQuery();

  const characters: CharacterFragment[] =
    data?.allPeople?.people?.filter(isNotNullable) || [];

  return {
    characters: characters,
    ...query,
  };
};
