import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DisplayBooks from "../components/DisplayBooks";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("http://127.0.0.1:5000/books");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); // Initially set filteredBooks to all books
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    }
    fetchBooks();
  }, []);

  const handleFilter = ({ author, genre }) => {
    let filtered = books;

    if (author) {
      filtered = filtered.filter(
        (book) => book.authors.toLowerCase() === author.toLowerCase()
      );
    }
    if (genre) {
      filtered = filtered.filter((book) =>
        book.genre_list.toLowerCase().includes(genre.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  const handleSearch = (searchTerm) => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <>
      <div className="">
        <div className="flex flex-1">
          <div className="md:w-[20%]">
            <Sidebar  books={books} handleFilter={handleFilter} handleSearch={handleSearch}/>
          </div>
          <div className="md:w-[80%]">
          <DisplayBooks filteredBooks={filteredBooks} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
