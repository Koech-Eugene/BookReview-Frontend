import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";
import { useNavigate } from "react-router-dom";

function DisplayBooks() {
  const [books, setBooks] = useState([]);
  const [hoveredBook, setHoveredBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          "https://example-data.draftbit.com/books?_limit=240"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    }
    fetchBooks();
  }, []);

  const renderStars = (rating) => {
    const starCount = Math.round(rating);
    return "⭐".repeat(starCount) + "★".repeat(5 - starCount);
  };

  const handleHover = (book) => {
    setHoveredBook(book);
  };

  const handleHoverOut = () => {
    setHoveredBook(null);
  };

  return (
    <div className="sm:flex md:flex lg:flex flex-wrap p-4 flex-1 mt-16">
      {books.map((book) => (
        <div
          key={book.id}
          className="w-1/2 md:w-1/4 p-2 "
          onMouseEnter={() => handleHover(book)}
          onMouseLeave={handleHoverOut}
        >
          <div className="bg-gray-800 rounded-lg shadow-lg p-2 items-center justify-center">
            <img
              src={book.image_url}
              alt=""
              className="w-[160px] sm:w-[200px] md:2-[240px] lg:w-[280px] inline-block cursor-pointer p-2 hover:scale-105 object-cover h-[280px] items-center justify-center rounded-lg"
              onClick={() => navigate(`/book/${book.id}`)}
            />
            {hoveredBook && hoveredBook.id === book.id && (
              <PopUp book={hoveredBook} />
            )}
            <p className="truncate ml-2 text-gray-400">{book.title}</p>
            <p className="ml-2">{renderStars(book.rating)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayBooks;
