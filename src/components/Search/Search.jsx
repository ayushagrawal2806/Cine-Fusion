import { useContext } from "react";
import movieContext from "../../context/context";
import CommonSectionSearch from "../CommonSection/CommonSectionSearch";
import { ApiCall } from "../../api/api";
import { useEffect, useState } from "react";
import "./Search.css";

const Search = () => {
  const { searchval } = useContext(movieContext);

  const [searchData, setSearchData] = useState(null);

  let url = `search/multi?query=${searchval}`;

  const SearchCall = () => {
    ApiCall(`${url}`).then((Response) => {
      let arr = Response.results.filter(
        (element) =>
          element.media_type === "movie" || element.media_type === "tv"
      );
      setSearchData([...arr]);
    });
  };
  useEffect(() => {
    SearchCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchval]);

  return (
    <div className="Search">
      <CommonSectionSearch
        data={searchData}
        heading={`Search Results For: ${searchval}`}
      />
    </div>
  );
};

export default Search;
