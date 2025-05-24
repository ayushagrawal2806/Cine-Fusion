import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { ApiCall } from "../../../api/api.js";
import "./Trailers.css";
const Trailers = (props) => {
  let obj = props;
  let TvShowid = obj.tvshowid;
  let tvshowData = obj.tvshowdata;
  const [trailer, setTrailer] = useState(null);
  const Trailer = () => {
    ApiCall(`tv/${TvShowid}/videos`).then((Response) =>
      setTrailer([...Response.results])
    );
  };
  useEffect(() => {
    Trailer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TvShowid]);

  const trailerObject =
    trailer &&
    trailer.filter(
      (Element) => Element.type === "Trailer" || Element.type === "clip"
    );

  return (
    <div className="trailer">
      <div className="heading">
        <h2>{tvshowData && (tvshowData.title || tvshowData.name)} Trailer</h2>
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
