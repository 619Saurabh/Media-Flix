import React, { useEffect, useState } from "react";
import axios from "axios";
import useGenres from "../../hooks/useGenres";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres";
import '../Trending/Trending.css';

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();

  //Creating two states to implement genre filter feature
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const genreforURL = useGenres(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    // console.log(data);
    setContent(data.results);
    setNumberOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scrollTo(0,0);
    fetchSeries();
    //eslint-disable-next-line
  }, [page, genreforURL]);
  return (
    <div>
      <span className="pageTitle">TV Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>

      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Series;
