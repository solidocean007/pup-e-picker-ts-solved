// you can use this type for react children if you so choose
import { ReactNode, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Requests } from "../api";

import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Dog } from "../types";

export const FunctionalSection = () => {
  // This is the state of dogs from the database
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  // This is which dogs to show depending on the users selection of 'favorited' or 'unfavorited'. Default is 'ShowAllDogs'
  const [dogsToShow, setDogsToShow] = useState("ShowAllDogs");
  // State of section: show dogs or show create dog
  const [showCreateDog, setShowCreateDog] = useState(false);

  // I think this useEffect gets all of the dogs when the component renders.
  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  // This useEffect simply console.logs the allDogs after each change.
  useEffect(() => {
    console.log(allDogs);
  }, [allDogs]);

  //Variables to filter the allDogs array by their 'isFavorite' property.
  const everyFavoriteDog = allDogs.filter((pup) => pup.isFavorite);
  const unFavoriteDog = allDogs.filter((pup) => !pup.isFavorite);

  // dogArray will be equal to the variables above dependent on the state of the users selection.
  let dogArray: Dog[] = [];
  if (dogsToShow === "ShowAllDogs") {
    dogArray = allDogs;
  } else if (dogsToShow === "ShowFavoriteDogs") {
    dogArray = everyFavoriteDog;
  } else if (dogsToShow === "ShowUnfavoriteDogs") {
    dogArray = unFavoriteDog;
    console.log(dogArray, ": is dogArray");
  }

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
            favorited ( {everyFavoriteDog.length} )
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
            unfavorited ( {unFavoriteDog.length} )
          </div>
          <div
            className={`selector`}
            onClick={() => {
              setShowCreateDog(showCreateDog ? false : true);
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {!showCreateDog ? (
          <FunctionalDogs
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            dogArray={dogArray}
          />
        ) : (
          <FunctionalCreateDogForm allDogs={allDogs} setAllDogs={setAllDogs} />
        )}
      </div>
    </section>
  );
};
