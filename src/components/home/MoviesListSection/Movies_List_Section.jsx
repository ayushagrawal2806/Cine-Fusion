import { useEffect, useState } from "react";
import "./Movies_List_Section.css";
import { ApiCall } from "../../../api/api";
import { NavLink } from "react-router-dom";

const Movies_List_Section = () => {
  const [topmovies, setTopMovies] = useState(null);
  const [newmovies, setNewMovies] = useState(null);
  const [justadded, setJustAdded] = useState(null);
  const topMovies = () => {
    ApiCall("discover/movie?sort_by=popularity.desc").then((response) =>
      setTopMovies([...response.results])
    );
  };

  const newMovies = () => {
    ApiCall("movie/now_playing").then((response) => {
      console.log("====================================");
      console.log(response.results);
      console.log("====================================");
      setNewMovies([...response.results]);
    });
  };

  const justAdded = () => {
    ApiCall("movie/upcoming").then((response) =>
      setJustAdded([...response.results])
    );
  };

  useEffect(() => {
    topMovies();
    newMovies();
    justAdded();
  }, []);

  return (
    <div className="top-movies-section">
      <div className="top-10-Movies">
        <div className="heading">
          <h1>Top 10 Movies</h1>
        </div>
        <div className="results">
          <ul>
            {topmovies
              ? topmovies.map((element, index) => {
                  if (index <= 9) {
                    return (
                      <li key={element.id}>
                        {" "}
                        •{" "}
                        <NavLink
                          to={`/movieDetail/${element.id}`}
                          className="navlink"
                        >
                          {element.title}
                        </NavLink>{" "}
                      </li>
                    );
                  }
                })
              : ""}
          </ul>
        </div>
      </div>
      <div className="new-Movies">
        <div className="heading">
          <h1>New Movies</h1>
        </div>
        <div className="results">
          <ul>
            {newmovies
              ? newmovies.map((element, index) => {
                  if (index <= 9) {
                    return (
                      <li key={element.id}>
                        {" "}
                        •{" "}
                        <NavLink
                          to={`/movieDetail/${element.id}`}
                          className="navlink"
                        >
                          {element.title}
                        </NavLink>{" "}
                      </li>
                    );
                  }
                })
              : ""}
          </ul>
        </div>
      </div>
      <div className="just-Added">
        <div className="heading">
          <h1>Just Added</h1>
        </div>
        <div className="results">
          <ul>
            {justadded
              ? justadded.map((element, index) => {
                  if (index <= 9) {
                    return (
                      <li key={element.id}>
                        {" "}
                        •{" "}
                        <NavLink
                          to={`/movieDetail/${element.id}`}
                          className="navlink"
                        >
                          {element.title}
                        </NavLink>{" "}
                      </li>
                    );
                  }
                })
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Movies_List_Section;
