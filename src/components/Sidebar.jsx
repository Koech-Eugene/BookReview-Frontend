import React, { useState } from "react";
import SearchBar from "./SearchBar";

function Sidebar({ books, handleFilter, handleSearch }) {
  const [showOptions, setShowOptions] = useState(false);
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [resultsNotFound, setResultsNotFound] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleApplyFilter = () => {
    const filteredBooks = books.filter((book) => {
      return (
        (author === "" || book.author.includes(author)) &&
        (genre === "" || book.genre.includes(genre))
      );
    });

    if (filteredBooks.length === 0) {
      setResultsNotFound(true);
    } else {
      setResultsNotFound(false);
      handleFilter({ author, genre });
    }
  };

  return (
    <div className="hidden sm:hidden md:flex flex-col justify-center items-center bottom-36 top-28 left- w-[280px] h-[70vh] fixed bg-gradient-to-b from-black to-gray-800 px-2 text-gray-300">
      <SearchBar />
      <div className="mb-4">
        <label className="text-white">Genre:</label>
        <select
          className="ml-2 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Select Genre</option>
          {Array.from(
            new Set(
              books.flatMap((book) =>
                book.genre_list ? book.genre.split(",") : []
              )
            )
          ).map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="text-white">Author:</label>
        <select
          className="ml-2 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="">Select Author</option>
          {Array.from(new Set(books.map((book) => book.authors))).map(
            (author, index) => (
              <option key={index} value={author}>
                {author}
              </option>
            )
          )}
        </select>
      </div>
      <button
        onClick={handleApplyFilter}
        className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
      >
        Apply Filters
      </button>
    </div>
  );
}
export default Sidebar;
