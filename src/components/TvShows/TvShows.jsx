import { useParams } from "react-router-dom";
import CommonSectionTvShows from "../CommonSection/CommonSectionTvShows";
import { ApiCall } from "../../api/api";
import { useEffect, useState } from "react";
import "./TvShows.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TvShows = () => {
  const value = useParams();
  const [totalPages, setTotalPages] = useState(null);
  const [TvData, setTvData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const Apicall = () => {
    ApiCall(`discover/tv?page=${currentPage}&with_genres=${value.id}`).then(
      (Response) => {
        setTvData([...Response.results]);
        setTotalPages(Response.total_pages);
      }
    );
  };

  const total_pages = () => {
    ApiCall(`discover/tv?with_genres=${value.id}`).then((Response) => {
      setTotalPages(Response.total_pages);
      setCurrentPage(1);
    });
  };

  useEffect(() => {
    total_pages();
    Apicall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.id]);
  useEffect(() => {
    Apicall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="tvShows">
      <CommonSectionTvShows data={TvData} heading={`${value.name} Shows`} />
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

export default TvShows;
