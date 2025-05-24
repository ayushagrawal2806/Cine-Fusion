import "./LatestMovieSection.css";
import { ApiCall } from "../../../api/api";
import { useEffect, useState } from "react";
import CommonSectionMovie from "../../CommonSection/CommonSectionMovies";
import { NavLink } from "react-router-dom";
const LatestMoviesSection = () => {
  const [latestmoviedata, setLatestMovieData] = useState(null);
  const Latest_Movies = () => {
    ApiCall("movie/upcoming").then((response) =>
      setLatestMovieData([...response.results])
    );
  };

  useEffect(() => {
    Latest_Movies();
  }, []);

  return (
    <div className="latestMovieSection">
      <CommonSectionMovie data={latestmoviedata} heading="Latest Movies" />
      <div className="button">
        <NavLink to={`/movies/${"Featured Movies"}`} className="navlink">
          MORE MOVIES
        </NavLink>
      </div>
    </div>
  );
};

export default LatestMoviesSection;
