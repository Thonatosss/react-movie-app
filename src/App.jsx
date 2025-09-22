import { useEffect, useRef, useState } from "react";
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);

  const fetchPopularMovies = async (pageNum = 1) => {
    setIsLoading(true);
    setError("");
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${pageNum}`;

    try {
      const { data } = await axios.get(endpoint, API_DATA);
      setMovies((prev) => {
        const seen = new Set(prev.map((m) => m.id));
        const next = data.results.filter((m) => !seen.has(m.id));
        return [...prev, ...next];
      });
      setHasMore(pageNum < data.total_pages);
      setPage(pageNum);
      console.log(movies);
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
  const handleSearch = async () => {
    setIsLoading(true);
    setError("");
    let endpoint = `${API_BASE_URL}/search/movie?query=${search}`;
    try {
      const { data } = await axios.get(endpoint, API_DATA);
      setMovies(data.results);
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
    fetchPopularMovies(1);
  }, []);
  useEffect(() => {
    if (!search) {
      setMovies([]);
      fetchPopularMovies(1);
      return;
    }

    const delay = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage(page + 1);
          console.log(page);
          fetchPopularMovies(page + 1);
        }
      },
      { root: null, rootMargin: "500px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, isLoading, page]);
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
            <div className="w-full flex justify-center items-center">
              <HashLoader color="red" size={100} />
            </div>
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
        {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
      </div>
    </main>
  );
}

export default App;
