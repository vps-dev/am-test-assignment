import { FC } from "react";
import styled from "@emotion/styled/macro";
import { CharacterFragment as Character } from "../generated/graphql";
import { ReactComponent as Favourite } from "../assets/icon-favourite.svg";
import { useTheme } from "@emotion/react";

type Props = {
  character: Character;
  isFavourite: boolean;
  onFavouriteClick: () => void;
};

export const CharacterListItem: FC<Props> = ({
  character,
  isFavourite,
  onFavouriteClick,
}) => {
  const theme = useTheme();
  return (
    <Container>
      <Content>
        <Name data-testid={`character-name-${character.id}`}>
          {character.name}
        </Name>
        {character.filmConnection?.films?.length ? (
          <FilmList>
            {character.filmConnection?.films?.map((f) => f?.title).join(", ")}
          </FilmList>
        ) : null}
      </Content>
      <Actions>
        <ActionButton
          data-testid={`character-favourite-button-${character.id}`}
          onClick={onFavouriteClick}
        >
          <IconFavourite
            data-testid={`character-favourite-icon-${character.id}`}
            width={32}
            fill={isFavourite ? theme.colors.yellow : "transparent"}
          />
        </ActionButton>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.spacing(1.5)};
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 8%);
  padding: ${({ theme }) => theme.spacing(2)};

  & + & {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`;

const Name = styled.h4`
  font-size: 18px;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing()};
`;

const FilmList = styled.div``;

const Content = styled.div`
  flex: 1;
`;

const Actions = styled.div`
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

const IconFavourite = styled(Favourite)``;

const ActionButton = styled.div`
  cursor: pointer;
  &:hover {
    ${IconFavourite} {
      fill: ${({ theme }) => theme.colors.yellowDark};
    }
  }
`;
