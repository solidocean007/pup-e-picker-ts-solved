// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";
import { DogsToShowType } from "../types";

interface ClassSectionProps {
  children: ReactNode;
  allDogs: Dog[];
  dogsToShow: DogsToShowType;
  setDogsToShow: (value: DogsToShowType) => void;
  showCreateDog: boolean;
  setShowCreateDog: (value: boolean) => void;
  everyFavoriteDog: Dog[];
  unFavoriteDogs: Dog[];
}

export class ClassSection extends Component<ClassSectionProps> {

  handleClick(button: string) {
    if (button === "favoriteButton") {
      const nextValue = this.props.dogsToShow === "ShowFavoriteDogs" ? "ShowAllDogs" : "ShowFavoriteDogs";
      this.props.setDogsToShow(nextValue);
    } else {
      const nextValue = this.props.dogsToShow === "ShowUnfavoriteDogs" ? "ShowAllDogs" : "ShowUnfavoriteDogs";
      this.props.setDogsToShow(nextValue);
    }
  }
  
  toggleShowCreateDog = () => {
    this.props.setShowCreateDog(!this.props.showCreateDog);
  }
  

  render() {
    const { everyFavoriteDog, unFavoriteDogs, children, dogsToShow, showCreateDog } = this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div className={`selector ${
              dogsToShow === "ShowFavoriteDogs" && !showCreateDog? "active" : null
            }`} onClick={()=>this.handleClick("favoriteButton")}>
              favorited ( {everyFavoriteDog?.length} )
            </div>

            {/* This should display the unfavorited count */}
            <div className={`selector b ${
              dogsToShow === "ShowUnfavoriteDogs" && !showCreateDog? "active" : null
            }`} onClick={()=>this.handleClick("unFavoriteButton")}>
              unfavorited ({unFavoriteDogs?.length})
            </div>
            <div className={`selector ${showCreateDog ? "active" : null}`} onClick={this.toggleShowCreateDog}>
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
