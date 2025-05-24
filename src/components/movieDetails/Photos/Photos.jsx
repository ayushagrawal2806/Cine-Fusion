import { useEffect, useState } from "react";
import { ApiCall } from "../../../api/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loader from "../../../assets/loadingold.svg";
import "./Photos.css";

const Photos = (props) => {
  let obj = props;
  let Movieid = obj.movieid;
  let movieData = obj.moviedata;
  const ImageUrl = "https://image.tmdb.org/t/p/original/";
  const [images, setImages] = useState(null);
  let PhotosCall = () => {
    ApiCall(`movie/${Movieid}/images`).then((response) =>
      setImages([...response.posters])
    );
  };
  useEffect(() => {
    PhotosCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Movieid]);
  return (
    <div className="photos">
      <div className="heading">
        <h2>{movieData && (movieData.title || movieData.name)} Photos</h2>
      </div>
      <div className="result">
        {images &&
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
          )}
      </div>
    </div>
  );
};

export default Photos;
