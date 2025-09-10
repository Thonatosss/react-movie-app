import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_DATA = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/movie/${movieId}`,
        API_DATA
      );
      setMovie(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      <h1>Movie {movieId} page!</h1>
    </>
  );
};
