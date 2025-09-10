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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    movie && (
      <section className="wrapper movie-details-card mt-20">
        <h1 className="text-gradient">{movie.title}</h1>
        <div className="text-white flex justify-center p-10 gap-10">
          <img
            className="rounded-xl"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                : "/src/assets/No-Poster.png"
            }
          ></img>
          <div className="flex flex-col gap-5 w-[45%]">
            {movie.adult && <p>18+</p>}
            <ul className="flex gap-2">
              <p>
                <span className="font-bold">Genres:</span>{" "}
              </p>
              {movie.genres.map(({ name }) => (
                <li>{name}</li>
              ))}
            </ul>
            <p>
              <span className="font-bold">Release date: </span>
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </p>
            <p>
              <span className="font-bold">Budget:</span> {movie.budget}$
            </p>
            <p>
              <span className="font-bold">Runtime:</span> {movie.runtime}{" "}
              minutes
            </p>
            <p>
              <span className="font-bold">IMDB rating: </span>

              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </p>
            <p>
              <span className="font-bold">Country:</span> {movie.origin_country}
            </p>
            <p className="text-white">{movie.overview}</p>
          </div>
        </div>
      </section>
    )
  );
};
