import { FunctionalSection } from "./FunctionalSection";
import { useState, useEffect } from "react";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Requests } from "../api";
import { Dog } from "../types";

export function FunctionalApp() {
  // State of section: show dogs or show create dog
  const [showCreateDog, setShowCreateDog] = useState(false);

  // This is the state of dogs from the database
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  // State of loading while fetching data
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // This useEffect gets all of the dogs when the component renders.
  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        showCreateDog={showCreateDog}
        setShowCreateDog={setShowCreateDog}
      >
        {!showCreateDog ? (
          <FunctionalDogs
            allDogs={allDogs}
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
