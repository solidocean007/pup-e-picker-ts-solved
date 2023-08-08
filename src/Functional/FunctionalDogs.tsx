import { useState, useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

export const FunctionalDogs = ({
  allDogs,
  setAllDogs,
  dogsToShow,
}: {
  allDogs: Dog[];
  setAllDogs: (allDogs: Dog[]) => void;
  dogsToShow: string;
}) => {
  //I need an array of dogs selected based on dogsToShow state.
  //If dogsToShow is 'ShowAll' then 'allDogs' are shown.

  //If favoriteDogs then a variable that equals the dogs with the 'favorite: true' property
  const everyFavoriteDog = allDogs.filter((pup) => pup.isFavorite == true);
  const unFavoriteDog = allDogs.filter((pup) => pup.isFavorite == false);

  let dogArray: Dog[] = [];
  if (dogsToShow === "ShowAllDogs") {
    dogArray = allDogs;
  } else if (dogsToShow === "ShowFavoriteDogs") {
    dogArray = everyFavoriteDog;
  } else {
    dogArray = unFavoriteDog;
  }

  return (
    <>
      {dogArray.map((dog, index) => (
        <DogCard
          dog={dog}
          key={index}
          onTrashIconClick={() => {
            Requests.deleteDog(dog.id).then(() => {
              const updatedDogs = allDogs.filter((d) => d.id !== dog.id);
              setAllDogs(updatedDogs);
            });
            alert("clicked trash");
          }}
          onHeartClick={() => {
            const updatedDog = { ...dog, isFavorite: false };
            Requests.updateDog(dog.id, updatedDog).then(() => {
              // Update local state to reflect the change
              const updatedDogs = allDogs.map((d) =>
                d.id === dog.id ? updatedDog : d
              );
              setAllDogs(updatedDogs);
            });
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            const updatedDog = { ...dog, isFavorite: true };
            Requests.updateDog(dog.id, updatedDog).then(() => {
              // Update local state to reflect the change
              const updatedDogs = allDogs.map((d) =>
                d.id === dog.id ? updatedDog : d
              );
              setAllDogs(updatedDogs);
            });
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};
