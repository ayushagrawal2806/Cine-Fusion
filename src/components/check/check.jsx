import "./check.css";
import { FaBars } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { ApiCall } from "../../api/api";
import { NavLink } from "react-router-dom";
const LatestMoviesSections = () => {
  const [layoutchange, setLayoutChange] = useState(false);
  const [latestmoviedata, setLatestMovieData] = useState(null);
  const imageUrl = "https://image.tmdb.org/t/p/original/";
  // const [imageLoad , setImageLoad] = useState(false);
  const Latest_Movies = () => {
    ApiCall("movie/upcoming").then((response) =>
      setLatestMovieData([...response.results])
    );
  };

  useEffect(() => {
    Latest_Movies();
  }, []);
  const styleLayout1 = {
    backgroundColor: !layoutchange ? "#039BE5" : "",
    color: !layoutchange ? "white" : "",
  };
  const styleLayout2 = {
    backgroundColor: layoutchange ? "#039BE5" : "",
    color: layoutchange ? "white" : "",
  };

  return (
    <div className="latestMovies">
      <div className="heading">
        <h1>Latest Movies</h1>
      </div>
      <div className="layout-change-buttons">
        <BsFillGrid3X3GapFill
          className="layout1"
          style={styleLayout1}
          onClick={() => setLayoutChange(false)}
        />
        <FaBars
          className="layout2"
          style={styleLayout2}
          onClick={() => setLayoutChange(true)}
        />
      </div>
      <div className="results">
        {!layoutchange ? (
          <div className="result-layout1 fadeIn">
            {latestmoviedata
              ? latestmoviedata.map((element) => (
                  <div className="card" key={element.id}>
                    <NavLink to={`/movieDetails/${element.id}`}>
                      <div className="poster_rating">
                        {/* {
                                                                    imageLoading ? <div className='loader' ></div> : ""
                                                                    // <img 
                                                                    //         src={ `${imageUrl}${element.poster_path}`} 
                                                                    //         alt=""
                                                                    // />
                                                                } */}
                        <img src={`${imageUrl}${element.poster_path}`} alt="" />

                        <div className="rating">
                          <p className="star">⭐</p>
                          <p className="num">
                            {Number(element.vote_average).toFixed(1)}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                    <div className="name_year">
                      <p className="name">
                        <NavLink
                          to={`/movieDetails/${element.id}`}
                          className="navlink"
                        >
                          {element.title.length > 26
                            ? element.title.slice(0, 26) + "..."
                            : element.title}
                        </NavLink>
                      </p>
                      <p className="year">{element.release_date.slice(0, 4)}</p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        ) : (
          <div className="result-layout2 fadeout">
            {latestmoviedata
              ? latestmoviedata.map((element) => (
                  <div className="card" key={element.id}>
                    <NavLink to={`/movieDetails/${element.id}`}>
                      <div className="image">
                        <img src={`${imageUrl}${element.poster_path}`} alt="" />
                      </div>
                    </NavLink>
                    <div className="details">
                      <div className="name_year">
                        <p className="name">
                          <NavLink
                            to={`/movieDetails/${element.id}`}
                            className="navlink"
                          >
                            {element.title.length > 26
                              ? element.title.slice(0, 26) + "..."
                              : element.title}
                          </NavLink>
                        </p>
                        <p className="year">
                          {element.release_date.slice(0, 4)}
                        </p>
                      </div>
                      <div className="rating">
                        <p className="star">⭐</p>
                        <p className="num">
                          {Number(element.vote_average).toFixed(1)}
                        </p>
                      </div>
                      <div className="overview">
                        <p>{element.overview}</p>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestMoviesSections;
