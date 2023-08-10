import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";

export type TNewDog = {
  name: string;
  description: string;
  image: string;
  isFavorite: boolean;
};

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  allDogs,
  setAllDogs,
  setShowCreateDog,
}: {
  allDogs: Dog[];
  setAllDogs: (allDogs: Dog[]) => void;
  setShowCreateDog: (arg: boolean) => void;
}) => {
  const [newDog, setNewDog] = useState<Omit<Dog, "id">>({
    name: "",
    description: "",
    image: defaultSelectedImage,
    isFavorite: true,
  });

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        Requests.postDog(newDog)
          .then((createdDog) => {
            const updatedDogs = [...allDogs, createdDog];
            setAllDogs(updatedDogs);
          })
        setShowCreateDog(false);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={newDog?.name}
        onChange={(e) => setNewDog((dog) => ({ ...dog, name: e.target.value }))}
        disabled={false}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        value={newDog?.description}
        onChange={(e) =>
          setNewDog((dog) => ({ ...dog, description: e.target.value }))
        }
        id=""
        cols={80}
        rows={10}
        disabled={false}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) =>
          setNewDog((prevDog) => ({
            ...prevDog,
            image: e.target.value,
          }))
        }
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={false} />
    </form>
  );
};
