import { useParams } from "react-router-dom";
import CommonSectionMovie from "../CommonSection/CommonSectionMovies";
import { ApiCall } from "../../api/api";
import { useEffect, useState } from "react";
import "./genre.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Genre = () => {
  const value = useParams();
  const [totalPages, setTotalPages] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const Apicall = () => {
    ApiCall(`discover/movie?page=${currentPage}&with_genres=${value.id}`).then(
      (Response) => {
        setMovieData([...Response.results]);
      }
    );
  };

  const total_pages = () => {
    ApiCall(`discover/movie?with_genres=${value.id}`).then((Response) => {
      setTotalPages(Response.total_pages);
      setCurrentPage(1);
    });
  };

  useEffect(() => {
    Apicall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.id, currentPage]);

  useEffect(() => {
    total_pages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.id]);

  const handleChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="genre">
      <CommonSectionMovie data={movieData} heading={`${value.name} Movies`} />
      <div className="pagination">
        <Stack spacing={200}>
          <Pagination
            count={totalPages > 500 ? 500 : totalPages}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            className="page"
          />
        </Stack>
      </div>
    </div>
  );
};

export default Genre;
