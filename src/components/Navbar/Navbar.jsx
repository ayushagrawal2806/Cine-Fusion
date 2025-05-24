import { useContext, useEffect, useState } from "react";

import "./Navbar.css";
import { ApiCall } from "../../api/api";
import { IoMdArrowDropdown, IoMdSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import movieContext from "../../context/context";
const Navbar = () => {
  const [moviedropdown, setMovieDropdown] = useState(false);
  const [genredropdown, setGenreDropDown] = useState(false);
  const [tvdropdown, setTvDropDown] = useState(false);
  const [genreval, setGenreValue] = useState(null);
  const [tvVal, setTvValue] = useState(null);
  const [smallScreen, setSmallScreen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { setSearchVal } = useContext(movieContext);
  let call = async () => {
    const response = await ApiCall("genre/movie/list");
    setGenreValue([...response.genres]);
  };

  let tvShow = async () => {
    const response = await ApiCall("genre/tv/list");
    setTvValue([...response.genres]);
  };

  useEffect(() => {
    call();
    tvShow();
  }, []);

  return (
    <div className="navbar-cont">
      <div className="navbar">
        <div className="navbar-default">
          <div className="logo">
            <NavLink to={"/"} className="navlink">
              <span className="first">CINE</span>
              <span className="second">FUSION</span>
            </NavLink>
          </div>
          <div className="menu-list">
            <NavLink to={"/"} className="navlink">
              Home
            </NavLink>

            <div
              className="movies-type"
              onClick={() => {
                setMovieDropdown(!moviedropdown);
                setGenreDropDown(false);
                setTvDropDown(false);
              }}
            >
              <div className="movie-tag">
                <p>Movies </p>
                <IoMdArrowDropdown id="tag" />
              </div>
              <div
                className="movie-list"
                style={{ display: moviedropdown ? "block" : "none" }}
              >
                <NavLink
                  to={`/movies/${"Featured Movies"}`}
                  className="navlink"
                >
                  Featured Movies
                </NavLink>
                <NavLink to={`/movies/${"New Movies"}`} className="navlink">
                  New Movies
                </NavLink>
                <NavLink to={`/movies/${"Popular Movies"}`} className="navlink">
                  Popular Movies
                </NavLink>
                <NavLink
                  to={`/movies/${"Top Rated Movies"}`}
                  className="navlink"
                >
                  Top Rated Movies
                </NavLink>
              </div>
            </div>

            <div
              className="genre-list"
              onClick={() => {
                setMovieDropdown(false);
                setTvDropDown(false);
                setGenreDropDown(!genredropdown);
              }}
            >
              <div className="genre-tag">
                <p>Genre </p>
                <IoMdArrowDropdown id="tag" />
              </div>
              <div
                className="genre-list-items"
                style={{ display: genredropdown ? "flex" : "none" }}
              >
                {genreval
                  ? genreval.map((Element) => (
                      <NavLink
                        className="navlink"
                        to={`/genre/${Element.id}/${Element.name}`}
                        key={Element.id}
                      >
                        {Element.name}
                      </NavLink>
                    ))
                  : "not found"}
              </div>
            </div>

            <div
              className="tvShows-list"
              onClick={() => {
                setMovieDropdown(false);
                setGenreDropDown(false);
                setTvDropDown(!tvdropdown);
              }}
            >
              <div className="tvShows-tag">
                <p>Tv Shows </p>
                <IoMdArrowDropdown id="tag" />
              </div>

              <div
                className="tv-shows-genre"
                style={{ display: tvdropdown ? "flex" : "none" }}
              >
                {tvVal
                  ? tvVal.map((Element) => (
                      <NavLink
                        className="navlink"
                        to={`/TvShows/${Element.id}/${Element.name}`}
                        key={Element.id}
                      >
                        {Element.name}
                      </NavLink>
                    ))
                  : "not found"}
              </div>
            </div>
          </div>

          <div className="search">
            <input
              type="text"
              placeholder="Search Movies..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <NavLink to={"/search"}>
              <button
                onClick={() => {
                  setSearchVal(searchValue);
                  setSearchValue("");
                }}
              >
                <IoMdSearch id="search-btn" />
              </button>
            </NavLink>
          </div>
          <div
            className="hamburger-menu"
            onClick={() => setSmallScreen(!smallScreen)}
          >
            <FaBars id="hamburger-bar" />
          </div>
        </div>
      </div>

      <div
        className="navbar-small-screen"
        style={{ height: smallScreen ? "auto" : "0px" }}
      >
        <NavLink to={"/"} className="navlink">
          Home
        </NavLink>
        <div
          className="movies-type"
          onClick={() => {
            setMovieDropdown(!moviedropdown);
            setGenreDropDown(false);
          }}
        >
          <div className="movie-tag">
            <p>Movies </p>
            <IoMdArrowDropdown id="tag" />
          </div>
          <div
            className="movie-list"
            style={{ display: moviedropdown ? "block" : "none" }}
          >
            <NavLink to={`/movies/${"Featured Movies"}`} className="navlink">
              Featured Movies
            </NavLink>
            <NavLink to={`/movies/${"New Movies"}`} className="navlink">
              New Movies
            </NavLink>
            <NavLink to={`/movies/${"Popular Movies"}`} className="navlink">
              Popular Movies
            </NavLink>
            <NavLink to={`/movies/${"Top Rated Movies"}`} className="navlink">
              Top Rated Movies
            </NavLink>
          </div>
        </div>
        <div
          className="genre-list"
          onClick={() => {
            setMovieDropdown(false);
            setGenreDropDown(!genredropdown);
          }}
        >
          <div className="genre-tag">
            <p>Genre </p>
            <IoMdArrowDropdown id="tag" />
          </div>
          <div
            className="genre-list-items"
            style={{ display: genredropdown ? "flex" : "none" }}
          >
            {genreval
              ? genreval.map((Element) => (
                  <NavLink
                    className={"navlink"}
                    to={`/genre/${Element.id}/${Element.name}`}
                    key={Element.id}
                  >
                    {Element.name}
                  </NavLink>
                ))
              : "not found"}
          </div>
        </div>

        <div
          className="tvShows-list"
          onClick={() => {
            setMovieDropdown(false);
            setGenreDropDown(false);
            setTvDropDown(!tvdropdown);
          }}
        >
          <div className="tvShows-tag">
            <p>Tv Shows </p>
            <IoMdArrowDropdown id="tag" />
          </div>

          <div
            className="tv-shows-genre"
            style={{ display: tvdropdown ? "flex" : "none" }}
          >
            {tvVal
              ? tvVal.map((Element) => (
                  <NavLink
                    className="navlink"
                    to={`/TvShows/${Element.id}/${Element.name}`}
                    key={Element.id}
                  >
                    {Element.name}
                  </NavLink>
                ))
              : "not found"}
          </div>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search Movies..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <NavLink to={"/search"}>
            <button
              onClick={() => {
                setSearchVal(searchValue);
                setSearchValue("");
              }}
            >
              <IoMdSearch id="search-btn" />
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
