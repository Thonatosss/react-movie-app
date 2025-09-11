import React from "react";
import { Link } from "react-router";

function MovieCard({ movie }) {
  const {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  } = movie;
  return (
    <Link to={`/details/${id}`}>
      <li
        
        className="movie-card text-white transition-transform duration-150 ease-in hover:scale-105 "
      >
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/src/assets/No-Poster.png"
          }
          alt={title}
        ></img>
        <div className="mt-4">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating">
              <img src="/src/assets/star.svg" alt="Star icon"></img>
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>
            <span>•</span>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default MovieCard;
