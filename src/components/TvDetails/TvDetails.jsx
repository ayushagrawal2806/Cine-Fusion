import { NavLink, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loader from "../../assets/loadingold.svg";
import { ApiCall } from "../../api/api.js";
import { useEffect, useState } from "react";
import "./TvDetails.css";

import WatchProviders from "./watchProviders/watchProviders.jsx";
import Trailers from "./trailers/Trailers.jsx";
import Photos from "./Photos/Photos.jsx";
import CastCrew from "./CastCrewDetails/CastCrew.jsx";
import RelatedMovies from "./RelatedMovies/RelatedMovies.jsx";

const TvDetails = () => {
  const { TvShowid } = useParams();
  const [tvshowData, setTvShowData] = useState(null);
  const [castcrewData, setCastCrewData] = useState(null);

  const ImageUrl = "https://image.tmdb.org/t/p/original/";
  const TvShowData = () => {
    ApiCall(`tv/${TvShowid}`).then((Response) =>
      setTvShowData({ ...Response })
    );
  };
  const cast_CrewData = () => {
    ApiCall(`tv/${TvShowid}/credits`).then((Response) =>
      setCastCrewData({ ...Response })
    );
  };
  useEffect(() => {
    TvShowData();
    cast_CrewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TvShowid]);

  return (
    <div className="tvshowDetails">
      <div
        className="fullDetailsBox"
        style={{
          backgroundImage: `url('${ImageUrl}${
            tvshowData && tvshowData.backdrop_path
          }')`,
        }}
      >
        <div className="blackoverlay">
          <div className="fullDetails">
            <div className="moviedetail-poster">
              <div className="poster">
                <LazyLoadImage
                  src={`${ImageUrl}${tvshowData && tvshowData.poster_path}`}
                  alt=""
                  placeholderSrc={loader}
                  onError={(e) =>
                    (e.target.src =
                      "https://www.azmovies.net/images/noposter.png")
                  }
                />
              </div>
              <div className="detail">
                <h1 className="movieName">
                  {tvshowData && (tvshowData.title || tvshowData.name)}{" "}
                  <span>
                    {tvshowData && `(${tvshowData.first_air_date.slice(0, 4)})`}
                    {/* movieData.release_date && */}
                  </span>
                </h1>
                <p className="tagline">{tvshowData && tvshowData.tagline}</p>
                <div className="movie-genre">
                  <p>Genre:</p>
                  {tvshowData &&
                    tvshowData.genres.map((Element, index) => (
                      <NavLink
                        to={`/TvShows/${Element.id}/${Element.name}`}
                        key={Element.id}
                      >{`${Element.name}${
                        index != tvshowData.genres.length - 1 ? "," : ""
                      }`}</NavLink>
                    ))}
                </div>
                <p className="releaseDate">
                  Release Date:{" "}
                  <span>{tvshowData && tvshowData.first_air_date}</span>
                </p>
                <p className="userRating">
                  User Rating:{" "}
                  <span>
                    {tvshowData && Number(tvshowData.vote_average).toFixed(1)}
                    /10 from {tvshowData && tvshowData.vote_count} ratings
                  </span>
                </p>
                <p className="number_of_episodes">
                  Total Episodes:{" "}
                  <span>{tvshowData && tvshowData.number_of_episodes}</span>
                </p>
                <p className="number_of_seasons">
                  Total Seasons:{" "}
                  <span>{tvshowData && tvshowData.number_of_seasons}</span>
                </p>

                <p className="language">
                  Language:
                  <span>
                    {tvshowData &&
                      tvshowData.spoken_languages.map((Element, index) => (
                        <span key={index}>{` ${Element.name}${
                          index != tvshowData.spoken_languages.length - 1
                            ? ", "
                            : ""
                        }`}</span>
                      ))}
                  </span>
                </p>
                <p className="productionCompany">
                  Production Company:
                  <span>
                    {tvshowData && tvshowData.production_companies.length ? (
                      tvshowData.production_companies.map((Element, index) =>
                        index < 1 ? (
                          <span key={index}>{` ${Element.name}`}</span>
                        ) : (
                          ""
                        )
                      )
                    ) : (
                      <span> Not Found</span>
                    )}
                  </span>
                </p>
                <p className="ProductionCountry">
                  Production Country:
                  <span>
                    {tvshowData && tvshowData.production_countries.length ? (
                      tvshowData.production_countries.map((Element, index) =>
                        index < 1 ? (
                          <span key={index}>{` ${Element.name}`}</span>
                        ) : (
                          ""
                        )
                      )
                    ) : (
                      <span> Not Found</span>
                    )}
                  </span>
                </p>
                <p className="Director">
                  Director:
                  {castcrewData && castcrewData.crew.length ? (
                    castcrewData.crew.map((Element, index) =>
                      Element.job === "Director" ? (
                        <span key={index}> {Element.name}</span>
                      ) : (
                        ""
                      )
                    )
                  ) : (
                    <span> Not Found</span>
                  )}
                </p>
              </div>
            </div>
            <div className="ratingBox">
              <div className="rating_star">
                <p>⭐</p>
                <p className="rating">
                  {tvshowData && Number(tvshowData.vote_average).toFixed(1)}
                </p>
              </div>
              <p className="overallrating">
                From {tvshowData && tvshowData.vote_count} Ratings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="summary_related">
        <div className="videos-pictures-overview">
          <div className="summary">
            <div className="heading">
              <h2>Summary</h2>
            </div>
            <p>
              {tvshowData && tvshowData.overview
                ? tvshowData.overview
                : "Overview is not available"}
            </p>
          </div>
          <Trailers tvshowid={TvShowid} tvshowdata={tvshowData} />
          <WatchProviders tvshowid={TvShowid} tvshowdata={tvshowData} />
          <Photos tvshowid={TvShowid} tvshowdata={tvshowData} />
          <CastCrew castcrewdata={castcrewData} />
        </div>
        <div className="related-movies">
          <RelatedMovies tvshowid={TvShowid} />
        </div>
      </div>
    </div>
  );
};

export default TvDetails;
