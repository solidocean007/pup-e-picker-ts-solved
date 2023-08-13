import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";


export const FunctionalDogs = ({
  allDogs,
  dogArray,
  setAllDogs,
  isLoading,
  setIsLoading,
}: {
  allDogs: Dog[];
  dogArray: Dog[];
  setAllDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
 

  return (
    <>
      <h1>{isLoading ? "Loading..." : null}</h1>

      {dogArray.map((dog, index) => (
        <DogCard
          dog={dog}
          key={index}
          onTrashIconClick={() => {
            Requests.deleteDog(dog.id)
              .then(() => {
                setIsLoading(true);
                const updatedDogs = allDogs.filter((d) => d.id !== dog.id);
                setAllDogs(updatedDogs);
              })
              .then(() => setIsLoading(false));
          }}
          onHeartClick={() => {
            const updatedDog = { ...dog, isFavorite: false };
            Requests.updateDog(dog.id, updatedDog)
              .then(() => {
                setIsLoading(true);
                const updatedDogs = allDogs.map((d) =>
                  d.id === dog.id ? updatedDog : d
                );
                setAllDogs(updatedDogs);
              })
              .then(() => setIsLoading(false));
          }}
          onEmptyHeartClick={() => {
            const updatedDog = { ...dog, isFavorite: true };
            Requests.updateDog(dog.id, updatedDog)
              .then(() => {
                setIsLoading(true);
                const updatedDogs = allDogs.map((d) =>
                  d.id === dog.id ? updatedDog : d
                );
                setAllDogs(updatedDogs);
              })
              .then(() => setIsLoading(false));
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};
