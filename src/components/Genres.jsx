import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  //Creating two functions handleAdd() and handleRemove()
  //handleAdd() function will add the clicked genres in selectedGenres state and remove it from genres state

  const handleAdd = (genre) => {
    //1)Adding selected genre in selecteGenres array
    setSelectedGenres([...selectedGenres, genre]);
    //2)Removing selected genres from genres array
    setGenres(genres.filter((gen) => gen.id !== genre.id));
    setPage(1);
  };

  //handleRemove() function removes the selected genres from selectedGenres array and add it back to the genres array state
  const handleRemove = (genre) => {
    //1)Removing the selected genres from selectedGenres array
    setSelectedGenres(
      selectedGenres.filter((selectedGenre) => selectedGenre.id !== genre.id)
    );
    //2)Adding selected genre back to the genres array state
    setGenres([...genres, genre]);
    setPage(1);
  };

  //Fetching all the genres from API
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {//cleanup function which will be triggered when <Genres/> component will be unmounted.
      setGenres([]); //emptying the genres state
    };
    // eslint-disable-next-line
  }, []);

  return (
    //Creating chip component
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            clickable
            color="primary"
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {
        genres &&
          genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              style={{ margin: 2 }}
              size="small"
              clickable
              color="success"
              onClick={() => handleAdd(genre)}
            />
          ))
      }
    </div>
  );
};

export default Genres;


