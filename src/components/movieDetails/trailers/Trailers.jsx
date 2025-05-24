import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { ApiCall } from "../../../api/api";
import "./Trailers.css";
const Trailers = (props) => {
  let obj = props;
  let Movieid = obj.movieid;
  let movieData = obj.moviedata;
  const [trailer, setTrailer] = useState(null);
  const Trailer = () => {
    ApiCall(`movie/${Movieid}/videos`).then((Response) =>
      setTrailer([...Response.results])
    );
  };
  useEffect(() => {
    Trailer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Movieid]);

  const trailerObject =
    trailer && trailer.filter((Element) => Element.type === "Trailer");

  return (
    <div className="trailer">
      <div className="heading">
        <h2>{movieData && (movieData.title || movieData.name)} Trailer</h2>
      </div>
      <div className="reactPlayer">
        {trailerObject && trailerObject.length > 0 ? (
          <ReactPlayer
            url={
              trailerObject[0].site === "YouTube"
                ? `https://www.youtube.com/watch?v=${trailerObject[0].key}`
                : ` https://vimeo.com/${trailerObject[0].key}`
            }
            width="100%"
          />
        ) : (
          <p>Trailer is not available right now</p>
        )}
      </div>
    </div>
  );
};

export default Trailers;
