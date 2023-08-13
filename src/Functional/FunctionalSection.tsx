import { Link } from "react-router-dom";
import { Dog } from "../types";
import { DogsToShowType } from "../types";

interface FunctionalSectionProps {
  children: React.ReactNode;
  allDogs: Dog[];
  dogsToShow: DogsToShowType;
  setDogsToShow: React.Dispatch<React.SetStateAction<DogsToShowType>>;
  showCreateDog: boolean;
  setShowCreateDog: React.Dispatch<React.SetStateAction<boolean>>;
  everyFavoriteDog: Dog[];
  unFavoriteDogs: Dog[];
}

export const FunctionalSection: React.FC<FunctionalSectionProps> = ({
  children,
  dogsToShow,
  setDogsToShow,
  showCreateDog,
  setShowCreateDog,
  everyFavoriteDog,
  unFavoriteDogs,
}) => {

  function handleClick(button:string) {
    return ()=>{
      setShowCreateDog(false);
    if (button === "favoriteButton") {
      setDogsToShow(
        dogsToShow === "ShowFavoriteDogs" ? "ShowAllDogs" : "ShowFavoriteDogs"
      );
    } else {
      setDogsToShow(
        dogsToShow === "ShowUnfavoriteDogs" ? "ShowAllDogs" : "ShowUnfavoriteDogs"
      );
    }
    }
  }

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              dogsToShow === "ShowFavoriteDogs" && !showCreateDog? "active" : null
            }`}
            onClick={handleClick("favoriteButton")}
          >
            favorited ( {everyFavoriteDog?.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              dogsToShow === "ShowUnfavoriteDogs" && !showCreateDog? "active" : null
            }`}
            onClick={handleClick("unFavoriteButton")}
          >
            unfavorited ( {unFavoriteDogs?.length} )
          </div>
          <div
            className={`selector ${showCreateDog ? "active" : null}`}
            onClick={() => {
              setShowCreateDog(showCreateDog ? false : true);
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
