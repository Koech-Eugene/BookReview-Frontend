import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";
import { useNavigate } from "react-router-dom";

function DisplayBooks({ filteredBooks }) {
  const [hoveredBook, setHoveredBook] = useState(null);
  const navigate = useNavigate();

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

  const handleBookmark = async (bookId) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Handle success
      console.log("Book bookmarked successfully!");
    } catch (error) {
      console.error("Error bookmarking book:", error);
    }
  };

  return (
    <div className="sm:flex md:flex lg:flex flex-wrap p-4 flex-1 mt-16">
      {filteredBooks.map((book) => (
        <div
          key={book.id}
          className="w-1/2 md:w-1/4 p-2 "
          onMouseEnter={() => handleHover(book)}
          onMouseLeave={handleHoverOut}
        >
          <div className="bg-gray-800 rounded-lg shadow-lg p-2 items-center justify-center">
            <img
              src={book.image}
              alt=""
              className="w-[160px] sm:w-[200px] md:2-[240px] lg:w-[280px] inline-block cursor-pointer p-2 hover:scale-105 object-cover h-[280px] items-center justify-center rounded-lg"
              onClick={() => navigate(`/book/${book.id}`)}
            />
            {/* {hoveredBook && hoveredBook.id === book.id && (
              <PopUp
                book={hoveredBook}
                position="w-[160px] sm:w-[200px] md:2-[240px] lg:w-[280px] left-0"
              />
            )} */}

            <p className="truncate ml-2 text-gray-400">{book.title}</p>
            <p className="ml-2">{renderStars(book.star_rating)}</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mt-2"
              onClick={() => handleBookmark(book.id)}
            >
              Bookmark
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayBooks;
