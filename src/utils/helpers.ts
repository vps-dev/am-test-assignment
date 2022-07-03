import { CharacterFragment as Character } from "../generated/graphql";
import { Filter, FilterType } from "./filter.model";

export const isObjectEmpty = <K extends string, V>(
  obj: Partial<Record<K, V>>
) => !Object.keys(obj).length;

export const toggleElementInArray = <T>(arr: T[], item: T) => {
  const itemIndex = arr.findIndex((arrItem) => arrItem === item);
  const isItemExists = itemIndex !== -1;
  const updatedArr = [...arr];

  if (isItemExists) {
    updatedArr.splice(itemIndex, 1);
  } else {
    updatedArr.push(item);
  }

  return updatedArr;
};

export const updateFilterByType = (
  oldFilters: Filter,
  filterType: FilterType,
  value: string
) => {
  const { [filterType]: currentFilterValues, ...reducedFilters } = oldFilters;

  const updatedFilterValues = currentFilterValues
    ? toggleElementInArray(currentFilterValues, value)
    : [];

  const hasAtLeastOneActiveFilterValue = updatedFilterValues.length;
  const updatedCurrentFilter = hasAtLeastOneActiveFilterValue
    ? { [filterType]: updatedFilterValues }
    : {};

  return { ...updatedCurrentFilter, ...reducedFilters };
};

const sortByName = (a?: string, b?: string) => {
  if (!a) {
    return 1;
  }
  if (!b) {
    return -1;
  }
  return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
};

export const getFilteredCharacters = (
  characters: Character[],
  filter?: Filter
) => {
  const filteredCharacters = filter
    ? characters?.filter(({ filmConnection }) =>
        (Object.entries(filter) as [FilterType, string[]][]).every(
          ([_, filterValues]) => {
            const films = filmConnection?.films;
            return (
              films &&
              films.some((film) => film && filterValues.includes(film.id))
            );
          }
        )
      )
    : characters;

  return filteredCharacters.sort((a, b) =>
    sortByName(a.name ?? undefined, b.name ?? undefined)
  );
};

export const isNotNullable = <T>(item: T | null | undefined): item is T => {
  return !!item;
};
