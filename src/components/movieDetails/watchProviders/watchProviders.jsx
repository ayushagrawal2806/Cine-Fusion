import { useEffect, useState } from "react";
import { ApiCall } from "../../../api/api";
import "./watchProviders.css";
const WatchProviders = (props) => {
  let Obj = props;
  let Movieid = Obj.movieid;
  let movieData = Obj.moviedata;
  const ImageUrl = "https://image.tmdb.org/t/p/original/";
  const [watchProviders, setWatchProviders] = useState(null);
  const WatchProvider = () => {
    ApiCall(`movie/${Movieid}/watch/providers`).then((Response) =>
      setWatchProviders({ ...Response.results })
    );
  };
  useEffect(() => {
    WatchProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Movieid]);
  return (
    <div className="watchProviders">
      <div className="heading">
        <h2>Watch {movieData && (movieData.title || movieData.name)} Online</h2>
      </div>
      <div className="providers">
        {watchProviders &&
        watchProviders.IN &&
        (watchProviders.IN.flatrate ||
          watchProviders.IN.rent ||
          watchProviders.IN.buy) ? (
          <>
            {watchProviders &&
              watchProviders.IN &&
              (watchProviders.IN.flatrate ||
                watchProviders.IN.rent ||
                watchProviders.IN.buy) && (
                <p>
                  You can now watch{" "}
                  {movieData && (movieData.title || movieData.name)} online on
                  the following streaming providers in India:
                </p>
              )}

            <div className="providersImage">
              {watchProviders &&
                watchProviders.IN &&
                watchProviders.IN.flatrate &&
                watchProviders.IN.flatrate.map((Element, index) => (
                  <img
                    src={`${ImageUrl}${Element.logo_path}`}
                    alt=""
                    key={index}
                  />
                ))}

              {watchProviders &&
                watchProviders.IN &&
                watchProviders.IN.rent &&
                watchProviders.IN.rent.map((Element, index) => (
                  <img
                    src={`${ImageUrl}${Element.logo_path}`}
                    alt=""
                    key={index}
                  />
                ))}
            </div>

            {watchProviders &&
              (watchProviders.IN || !watchProviders.IN) &&
              !watchProviders.IN.flatrate &&
              !watchProviders.IN.rent &&
              !watchProviders.IN.buy && (
                <p>
                  No watch providers available for{" "}
                  {movieData && (movieData.title || movieData.name)} in India.
                </p>
              )}
          </>
        ) : (
          <p>
            No watch providers available for{" "}
            {movieData && (movieData.title || movieData.name)} in India.
          </p>
        )}
      </div>
    </div>
  );
};

export default WatchProviders;
