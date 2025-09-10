import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import { HashLoader } from "react-spinners";
import MovieCard from "./components/MovieCard";
import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_DATA = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
function App() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPopularMovies = async () => {
    setIsLoading(true);
    setError("");
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    try {
      const { data } = await axios.get(endpoint, API_DATA);
      setMovies(data.results);
      console.log(data.results);
    } catch (err) {
      const message =
        err.response?.data?.status_message ||
        err.message ||
        "Failed to fetch movies.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <main>
      <div className="patttern"></div>
      <div className="wrapper">
        <header>
          <img src="/src/assets/hero-img.png"></img>
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy!
          </h1>
          <Search search={search} setSearch={setSearch} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>

          {isLoading ? (
            <HashLoader color="red" size={100} />
          ) : error ? (
            <p className="text-red-700">{error}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
