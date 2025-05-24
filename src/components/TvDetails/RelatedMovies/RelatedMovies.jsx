import { useEffect, useState } from "react";
import { ApiCall } from "../../../api/api";
import "./RelatedMovies.css";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loader from "../../../assets/loadingold.svg";
const RelatedMovies = (props) => {
  let obj = props;
  let TvShowid = obj.tvshowid;
  const [relatedtvshows, setRelatedTvShows] = useState(null);
  const ImageUrl = "https://image.tmdb.org/t/p/original/";
  let relatedMovies = () => {
    ApiCall(`tv/${TvShowid}/similar`).then((response) =>
      setRelatedTvShows([...response.results])
    );
  };
  useEffect(() => {
    relatedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TvShowid]);
  return (
    <div className="relatedMovies">
      <div className="heading">
        <h2>Related Tv Shows</h2>
      </div>
      <div className="results">
        {relatedtvshows && relatedtvshows.length ? (
          relatedtvshows.map((Element, index) =>
            index < 10 ? (
              <div className="box" key={Element.id}>
                <div className="image">
                  <NavLink to={`/TvShowDetail/${Element.id}`}>
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
                  <p className="year">{Element.first_air_date.slice(0, 4)}</p>
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
          <p className="notfound">No Related Tv Shows Found</p>
        )}
      </div>
    </div>
  );
};

export default RelatedMovies;
