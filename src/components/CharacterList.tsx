import { FC } from "react";
import { CharacterFragment as Character } from "../generated/graphql";
import { CharacterListItem } from "./CharacterListItem";

type Props = {
  characters: Character[];
  favourites: string[];
  onFavouriteClick: (id: string) => void;
};

export const CharacterList: FC<Props> = ({
  characters,
  favourites,
  onFavouriteClick,
}) => {
  return (
    <>
      {characters.map((character) => {
        const isFavourite =
          favourites.findIndex((id) => id === character.id) !== -1;

        return (
          <CharacterListItem
            key={character.id}
            character={character}
            isFavourite={isFavourite}
            onFavouriteClick={() => onFavouriteClick(character.id)}
          />
        );
      })}
    </>
  );
};
