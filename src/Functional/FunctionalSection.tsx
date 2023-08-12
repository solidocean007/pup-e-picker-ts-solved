// you can use this type for react children if you so choose
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";
import { DogsToShowType } from "./FunctionalDogs";

interface FunctionalSectionProps {
  children: React.ReactNode;
  allDogs: Dog[] | null;
  // setAllDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  // setDogsToShow : DogsToShowType;
  // dogArray: Dog[];
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showCreateDog: boolean;
  setShowCreateDog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FunctionalSection: React.FC<FunctionalSectionProps> = ({
  children, allDogs, showCreateDog, setShowCreateDog
}) => {
  // State of dogs shown based on all dogs, favorite or unfavorite dogs.
  const [dogsToShow, setDogsToShow] = useState<DogsToShowType>("ShowAllDogs");

  // Variables to filter the allDogs array by their 'isFavorite' property.
  const everyFavoriteDog = allDogs?.filter((pup: Dog) => pup.isFavorite || []);
  const unFavoriteDog = allDogs?.filter((pup: Dog) => !pup.isFavorite || []);

  // DogArray will be equal to the variables above dependent on the state of the users selection.
  let dogArray: Dog[] = [];
  dogsToShow === "ShowAllDogs"
    ? (dogArray = allDogs)
    : dogsToShow === "ShowFavoriteDogs"
    ? (dogArray = everyFavoriteDog)
    : (dogArray = unFavoriteDog);

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              dogsToShow === "ShowFavoriteDogs" ? "active" : null
            }`}
            onClick={() => {
              // Create Ternary statement to switch between 'ShowFavoriteDogs' and 'ShowAllDogs'
              setDogsToShow(
                dogsToShow === "ShowFavoriteDogs"
                  ? "ShowAllDogs"
                  : "ShowFavoriteDogs"
              );
            }}
          >
            favorited ( {everyFavoriteDog?.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              dogsToShow === "ShowUnfavoriteDogs" ? "active" : null
            }`}
            onClick={() => {
              // Create Ternary statement to switch between 'ShowUnFavoriteDogs' and 'ShowAllDogs'
              setDogsToShow(
                dogsToShow === "ShowUnfavoriteDogs"
                  ? "ShowAllDogs"
                  : "ShowUnfavoriteDogs"
              );
            }}
          >
            unfavorited ( {unFavoriteDog?.length} )
          </div>
          <div
            className={`selector ${showCreateDog ? "active" : null}`}
            onClick={() => {
              setShowCreateDog(showCreateDog ? false : true);
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
