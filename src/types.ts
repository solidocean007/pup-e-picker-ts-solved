// Add your own custom types in here
export type Dog = {
  id: number;
  image: string;
  description: string;
  isFavorite: boolean;
  name: string;
};

export type DogsToShowType =
  | "ShowAllDogs"
  | "ShowFavoriteDogs"
  | "ShowUnfavoriteDogs";
