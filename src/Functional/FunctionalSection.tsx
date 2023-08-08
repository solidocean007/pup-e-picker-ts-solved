// you can use this type for react children if you so choose
import { ReactNode, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Requests } from "../api";

import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Dog } from "../types";

export const FunctionalSection = () => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [dogsToShow, setDogsToShow]=useState('ShowAllDogs');

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  useEffect(() => {
    console.log(allDogs);
  }, [allDogs]);

 
  

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div className={`selector`} onClick={() => {setDogsToShow('ShowFavoriteDogs')}}>
            favorited ( 12 )
          </div>

          {/* This should display the unfavorited count */}
          <div className={`selector`} onClick={() => {setDogsToShow('ShowUnfavoriteDogs')}}>
            unfavorited ( 25 )
          </div>
          <div className={`selector`} onClick={() => {}}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        <FunctionalDogs allDogs={allDogs} setAllDogs={setAllDogs} dogsToShow={dogsToShow}/>
        <FunctionalCreateDogForm />
      </div>
    </section>
  );
};
