import { useState, useEffect } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Requests } from "../api";
import { Dog } from "../types";
import { DogsToShowType } from "../types";

export function FunctionalApp() {
  const [showCreateDog, setShowCreateDog] = useState(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dogsToShow, setDogsToShow] = useState<DogsToShowType>("ShowAllDogs");

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

   const everyFavoriteDog = allDogs?.filter((pup: Dog) => pup.isFavorite);
   const unFavoriteDogs = allDogs?.filter((pup: Dog) => !pup.isFavorite);
 
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
