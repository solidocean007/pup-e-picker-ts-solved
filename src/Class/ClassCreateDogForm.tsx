import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export type TNewDog = {
  name: string;
  description: string;
  image: string;
  isFavorite: boolean;
};

interface ClassCreateDogFormProps {
  allDogs: Dog[];
  setAllDogs: (allDogs: Dog[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<ClassCreateDogFormProps> {
  state = {
    newDog: {
      name: "",
      description: "",
      image: defaultSelectedImage,
      isFavorite: false,
    },
  };

  formReset = () => {
    this.setState({
      newDog: {
        name: "",
        description: "",
        image: defaultSelectedImage,
        isFavorite: false,
      },
    });
  };

  render() {
    const { newDog } = this.state;
    const validEntry = newDog.name.length > 0 && newDog.description.length >0;
    const { setIsLoading, allDogs, setAllDogs, isLoading } = this.props;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (validEntry) {
              Requests.postDog(newDog)
                  .then((createdDog) => {
                      setIsLoading(true);
                      const updatedDogs = [...allDogs, createdDog];
                      setAllDogs(updatedDogs);
                  })
                  .then(() => {
                      toast.success(`Created ${newDog.name}`);
                  })
                  .finally(() => setIsLoading(false));
              this.formReset();
          } else {
              toast.error('Please fill out both the name and description.');  // Optional: Provide feedback to the user
          }
      }}
      
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={newDog?.name}
          onChange={(e) =>
            this.setState({
              newDog: {...newDog, name: e.target.value}
            })
          }
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          value={newDog?.description}
          onChange={(e) =>
            this.setState({
              newDog: {...newDog, description : e.target.value}
            })
          }
          id=""
          cols={80}
          rows={10}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) =>
            this.setState({
              newDog: {...newDog, image: e.target.value}
            })
          }
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
