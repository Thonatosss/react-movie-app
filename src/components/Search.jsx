import React from "react";

function Search({ search, setSearch }) {
  return (
    <div className="search">
      <div>
        <img src="/src/assets/search.svg"></img>
        <input
          type="text"
          placeholder="Search through thousands of movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default Search;
