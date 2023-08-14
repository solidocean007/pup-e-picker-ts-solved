import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { Dog } from "../types";
import { DogsToShowType } from "../types";

export class ClassApp extends Component {
  state = {
    showCreateDog: false,
    allDogs: [],
    isLoading: false,
    dogsToShow: "ShowAllDogs" as DogsToShowType,
  };

  componentDidMount(): void {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((response) => {
        this.setState({ allDogs: response, isLoading: false });
      }
    ).catch((error)=>{
      console.log(error)
      this.setState({ isLoading: false})
    })
  }

  setDogsToShow = (dogsToShow: DogsToShowType) => {
    this.setState({ dogsToShow });
  };

  setShowCreateDog = (showCreateDog: boolean) => {
    this.setState({ showCreateDog });
  };

  setAllDogs = (allDogs: Dog[]) => {
    this.setState({ allDogs });
  };

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  render() {
    const { showCreateDog, allDogs, dogsToShow } = this.state;
    // Variables to filter the allDogs array by their 'isFavorite' property.
    const everyFavoriteDog = allDogs?.filter((pup: Dog) => pup.isFavorite);
    const unFavoriteDogs = allDogs?.filter((pup: Dog) => !pup.isFavorite);

    // DogArray will be equal to the variables above dependent on the state of the users selection.
    let dogArray: Dog[] = [];
    dogsToShow === "ShowAllDogs"
      ? (dogArray = allDogs)
      : dogsToShow === "ShowFavoriteDogs"
      ? (dogArray = everyFavoriteDog)
      : (dogArray = unFavoriteDogs);

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={allDogs}
          dogsToShow={this.state.dogsToShow}
          setDogsToShow={this.setDogsToShow}
          showCreateDog={showCreateDog}
          setShowCreateDog={this.setShowCreateDog}
          everyFavoriteDog={everyFavoriteDog}
          unFavoriteDogs={unFavoriteDogs}
        >
          {/* should be inside of the ClassSection component using react children */}
          {!showCreateDog ? (
            <ClassDogs
              allDogs={allDogs}
              dogArray={dogArray}
              setAllDogs={this.setAllDogs}
              isLoading={this.state.isLoading}
              setIsLoading={this.setIsLoading}
            />
          ) : (
            <ClassCreateDogForm
              allDogs={allDogs}
              setAllDogs={this.setAllDogs}
              isLoading={this.state.isLoading}
              setIsLoading={this.setIsLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
