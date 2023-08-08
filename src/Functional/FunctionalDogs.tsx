import { useState, useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

export const FunctionalDogs = ({
  allDogs,
  setAllDogs,
  dogArray,
}: {
  allDogs: Dog[];
  setAllDogs: (allDogs: Dog[]) => void;
  dogArray: Dog[];
}) => {

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
