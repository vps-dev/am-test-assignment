export const mockFilter = {
  data: {
    films: {
      films: [
        {
          id: "film1",
          title: "Film 1",
        },
        {
          id: "film2",
          title: "Film 2",
        },
      ],
    },
    characters: {
      characters: [
        {
          id: "character1",
          name: "Character 1",
          filmConnection: {
            films: [
              {
                id: "film1",
                title: "Film 1",
              },
            ],
          },
        },
        {
          id: "character2",
          name: "Character 2",
          filmConnection: {
            films: [
              {
                id: "film2",
                title: "Film 2",
              },
            ],
          },
        },
        {
          id: "character3",
          name: "Character 3",
          filmConnection: {
            films: [
              {
                id: "film1",
                title: "Film 1",
              },
              {
                id: "film2",
                title: "Film 2",
              },
            ],
          },
        },
      ],
    },
  },
  filterId: "film2",
  expectedResult: ["Character 2", "Character 3"],
};

export const mockFavourites = {
  data: {
    films: {
      films: [],
    },
    characters: {
      characters: [
        {
          id: "character1",
          name: "Character 1",
        },
        {
          id: "character2",
          name: "Character 2",
        },
        {
          id: "character3",
          name: "Character 3",
        },
      ],
    },
  },
  favouriteId: "character2",
};
