import { useState, useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";

export const FunctionalDogs = () => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  useEffect(() => {
    console.log(allDogs);
  }, [allDogs]);

  return (
    <>
      {allDogs.map((dog, index) => (
        <DogCard
          dog={dog}
          key={index}
          onTrashIconClick={() => {
            alert("clicked trash");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};
