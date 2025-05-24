import { useEffect, useState } from "react";
import { ApiCall } from "../../../api/api";
import "./RelatedMovies.css";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loader from "../../../assets/loadingold.svg";
const RelatedMovies = (props) => {
  let obj = props;
  let Movieid = obj.movieid;
  const [relatedMovie, setRelatedMovie] = useState(null);
  const ImageUrl = "https://image.tmdb.org/t/p/original/";
  let relatedMovies = () => {
    ApiCall(`movie/${Movieid}/similar`).then((response) =>
      setRelatedMovie([...response.results])
    );
  };
  useEffect(() => {
    relatedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Movieid]);
  return (
    <div className="relatedMovies">
      <div className="heading">
        <h2>Related Movies</h2>
      </div>
      <div className="results">
        {relatedMovie && relatedMovie.length ? (
          relatedMovie.map((Element, index) =>
            index < 10 ? (
              <div className="box" key={Element.id}>
                <div className="image">
                  <NavLink to={`/movieDetail/${Element.id}`}>
                    <LazyLoadImage
                      src={`${ImageUrl}${Element.poster_path}`}
                      alt=""
                      placeholderSrc={loader}
                      onError={(e) =>
                        (e.target.src =
                          "https://www.azmovies.net/images/noposter.png")
                      }
                    />
                  </NavLink>
                </div>
                <div className="details">
                  <NavLink
                    to={`/movieDetail/${Element.id}`}
                    className="navlink"
                  >
                    {Element.title || Element.name}
                  </NavLink>
                  <p className="year">{Element.release_date.slice(0, 4)}</p>
                  <div className="rating-star">
                    <p className="star">⭐</p>
                    <p className="rating">
                      {Number(Element.vote_average).toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )
        ) : (
          <p className="notfound">No Related Movies Found</p>
        )}
      </div>
    </div>
  );
};

export default RelatedMovies;
