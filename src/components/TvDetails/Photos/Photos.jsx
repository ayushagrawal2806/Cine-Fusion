import { useEffect, useState } from "react";
import { ApiCall } from "../../../api/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loader from "../../../assets/loadingold.svg";
import "./Photos.css";

const Photos = (props) => {
  let obj = props;
  let TvShowid = obj.tvshowid;
  let tvshowData = obj.tvshowdata;
  const ImageUrl = "https://image.tmdb.org/t/p/original/";
  const [images, setImages] = useState(null);
  let PhotosCall = () => {
    ApiCall(`tv/${TvShowid}/images`).then((response) =>
      setImages([...response.posters])
    );
  };
  useEffect(() => {
    PhotosCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TvShowid]);
  return (
    <div className="photos">
      <div className="heading">
        <h2>{tvshowData && (tvshowData.title || tvshowData.name)} Photos</h2>
      </div>
      <div className="result">
        {images && images.length ? (
          images.map((Element, index) =>
            index < 12 ? (
              <LazyLoadImage
                key={index}
                src={`${ImageUrl}${Element.file_path}`}
                alt=""
                placeholderSrc={loader}
                onError={(e) =>
                  (e.target.src =
                    "https://www.azmovies.net/images/noposter.png")
                }
              />
            ) : (
              ""
            )
          )
        ) : (
          <p className="notfound">Photos is not available right now</p>
        )}
      </div>
    </div>
  );
};

export default Photos;
