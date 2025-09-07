import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import { HashLoader } from "react-spinners";
import MovieCard from "./components/MovieCard";

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

  const fetchMovies = async () => {
    setIsLoading(true);
    setError("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_DATA);
      if (!response.ok) throw new Error("Failed to fetch movies!");
      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error || "Failed to fetch movies");
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
    } catch (error) {
      console.log(error);
      setError("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(API_KEY);
    fetchMovies();
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
