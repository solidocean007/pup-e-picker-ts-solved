import { FunctionalSection } from "./FunctionalSection";
import { useState, useEffect } from "react";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Requests } from "../api";
import { Dog } from "../types";
import { DogsToShowType } from "./FunctionalDogs";

export function FunctionalApp() {
  // State of section: show dogs or show create dog
  const [showCreateDog, setShowCreateDog] = useState(false);

  // This is the state of dogs from the database
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  // State of loading while fetching data
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State of dogs shown based on all dogs, favorite or unfavorite dogs.
  const [dogsToShow, setDogsToShow] = useState<DogsToShowType>("ShowAllDogs");

  // This useEffect gets all of the dogs when the component renders.
  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

   // Variables to filter the allDogs array by their 'isFavorite' property.
   const everyFavoriteDog = allDogs?.filter((pup: Dog) => pup.isFavorite);
   const unFavoriteDogs = allDogs?.filter((pup: Dog) => !pup.isFavorite);
 
   // DogArray will be equal to the variables above dependent on the state of the users selection.
   let dogArray: Dog[] = [];
   dogsToShow === "ShowAllDogs"
     ? (dogArray = allDogs)
     : dogsToShow === "ShowFavoriteDogs"
     ? (dogArray = everyFavoriteDog)
     : (dogArray = unFavoriteDogs);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        dogsToShow={dogsToShow}
        setDogsToShow={setDogsToShow}
        showCreateDog={showCreateDog}
        setShowCreateDog={setShowCreateDog}
        everyFavoriteDog={everyFavoriteDog}
        unFavoriteDogs={unFavoriteDogs}
      >
        {!showCreateDog ? (
          <FunctionalDogs
            allDogs={allDogs}
            dogArray={dogArray}
            setAllDogs={setAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <FunctionalCreateDogForm
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
