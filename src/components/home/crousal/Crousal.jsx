import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Crousal.css";
import { ApiCall } from "../../../api/api";
import { NavLink } from "react-router-dom";

function SampleNextArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "rgb(0, 134, 200)",
        height: "100%",
        alignItems: "center",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "rgb(0, 134, 200)",
        height: "100%",
        alignItems: "center",
      }}
      onClick={onClick}
    />
  );
}

function Crousal() {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await ApiCall("movie/popular?language=en");
        setMovieData([...response.results]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1095,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 910,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 691,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {movieData
          ? movieData.map((movie) => (
              <NavLink to={`/movieDetail/${movie.id}`} key={movie.id}>
                <div>
                  <div
                    className="inner"
                    style={{
                      backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`,
                    }}
                  >
                    <div className="blacktint">
                      <p className="moviename">{movie.title}</p>
                      <div className="rating">
                        <p>⭐</p>
                        <p className="score">
                          {movie.vote_average
                            ? Number(movie.vote_average).toFixed(1)
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))
          : ""}
      </Slider>
    </div>
  );
}

export default Crousal;
