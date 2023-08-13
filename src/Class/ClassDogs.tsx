import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

interface ClassDogsProps {
  allDogs: Dog[];
  dogArray: Dog[];
  setAllDogs: (value: Dog[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<ClassDogsProps> {

  handleUpdateButton = (id: number, dog: Dog) => {
    const { setIsLoading, setAllDogs, allDogs } = this.props;

    Requests.updateDog(id, dog)
      .then(() => {
        setIsLoading(true);
        const updatedDogs = allDogs.map((d: Dog) =>
          d.id === dog.id ? dog : d
        );
        setAllDogs(updatedDogs);
      })
      .then(() => setIsLoading(false));
  };

  render() {
    const { allDogs, dogArray, setAllDogs, isLoading, setIsLoading } =
      this.props;
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
              this.handleUpdateButton(dog.id, updatedDog);
            }}
            onEmptyHeartClick={() => {
              const updatedDog = { ...dog, isFavorite: true };
              this.handleUpdateButton(dog.id, updatedDog);
            }}
            isLoading={false}
          />
        ))}
      </>
    );
  }
}
