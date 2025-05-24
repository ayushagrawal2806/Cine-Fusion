import { NavLink, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loader from "../../assets/loadingold.svg";
import { ApiCall } from "../../api/api.js";
import "./MovieDetails.css";

import { useEffect, useState } from "react";
import WatchProviders from "./watchProviders/watchProviders.jsx";
import Trailers from "./trailers/Trailers.jsx";
import Photos from "./Photos/Photos.jsx";
import CastCrew from "./CastCrewDetails/CastCrew.jsx";
import RelatedMovies from "./RelatedMovies/RelatedMovies.jsx";

const MovieDetail = () => {
  const { Movieid } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [castcrewData, setCastCrewData] = useState(null);

  const ImageUrl = "https://image.tmdb.org/t/p/original/";
  const MovieData = () => {
    ApiCall(`movie/${Movieid}`).then((Response) =>
      setMovieData({ ...Response })
    );
  };
  const cast_CrewData = () => {
    ApiCall(`movie/${Movieid}/credits`).then((Response) =>
      setCastCrewData({ ...Response })
    );
  };

  let calculateHours = movieData && Math.floor(Number(movieData.runtime) / 60);
  let calculateMin =
    movieData && Number(movieData.runtime) - calculateHours * 60;

  useEffect(() => {
    MovieData();
    cast_CrewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Movieid]);

  return (
    <div className="movieDetails">
      <div
        className="fullDetailsBox"
        style={{
          backgroundImage: `url('${ImageUrl}${
            movieData && movieData.backdrop_path
          }')`,
        }}
      >
        <div className="blackoverlay">
          <div className="fullDetails">
            <div className="moviedetail-poster">
              <div className="poster">
                <LazyLoadImage
                  src={`${ImageUrl}${movieData && movieData.poster_path}`}
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
                  {movieData && (movieData.title || movieData.name)}{" "}
                  <span>
                    {movieData &&
                      `(${
                        movieData.release_date
                          ? movieData.release_date.slice(0, 4)
                          : ""
                      })`}
                    {/* movieData.release_date && */}
                  </span>
                </h1>
                <p className="tagline">{movieData && movieData.tagline}</p>
                <div className="movie-genre">
                  <p>Genre:</p>
                  {movieData &&
                    movieData.genres &&
                    movieData.genres.map((Element, index) => (
                      <NavLink
                        to={`/genre/${Element.id}/${Element.name}`}
                        key={Element.id}
                      >{`${Element.name}${
                        index != movieData.genres.length - 1 ? "," : ""
                      }`}</NavLink>
                    ))}
                </div>
                <p className="releaseDate">
                  Release Date:{" "}
                  <span>{movieData && movieData.release_date}</span>
                </p>
                <p className="userRating">
                  User Rating:{" "}
                  <span>
                    {movieData && Number(movieData.vote_average).toFixed(1)}/10
                    from {movieData && movieData.vote_count} ratings
                  </span>
                </p>
                <p className="runtime">
                  Runtime:{" "}
                  <span>
                    {calculateHours}h {calculateMin}min
                  </span>
                </p>
                <p className="language">
                  Language:
                  <span>
                    {movieData &&
                      movieData.spoken_languages &&
                      movieData.spoken_languages.map((Element, index) => (
                        <span key={index}>{` ${Element.name}${
                          index != movieData.spoken_languages.length - 1
                            ? ", "
                            : ""
                        }`}</span>
                      ))}
                  </span>
                </p>
                <p className="productionCompany">
                  Production Company:
                  <span>
                    {movieData &&
                    movieData.production_companies &&
                    movieData.production_companies.length ? (
                      movieData.production_companies.map((Element, index) =>
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
                    {movieData &&
                    movieData.production_countries &&
                    movieData.production_countries.length ? (
                      movieData.production_countries.map((Element, index) =>
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
                  {castcrewData &&
                  castcrewData.crew &&
                  castcrewData.crew.length ? (
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
                  {movieData && Number(movieData.vote_average).toFixed(1)}
                </p>
              </div>
              <p className="overallrating">
                From {movieData && movieData.vote_count} Ratings
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
              {movieData && movieData.overview
                ? movieData.overview
                : "Overview is not available"}
            </p>
          </div>
          <Trailers movieid={Movieid} moviedata={movieData} />
          <WatchProviders movieid={Movieid} moviedata={movieData} />
          <Photos movieid={Movieid} moviedata={movieData} />
          <CastCrew castcrewdata={castcrewData} />
        </div>
        <div className="related-movies">
          <RelatedMovies movieid={Movieid} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
