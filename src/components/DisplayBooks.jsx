import React, { useEffect, useState } from "react";

function DisplayBooks() {

    const [books, setBooks] = useState([]);

    const URL_API =  "https://example-data.draftbit.com/books?_limit=240"
    
    useEffect(() => {
        async function fetchBooks() {
          try {
            const response = await fetch(URL_API);
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


  return (
    <div className="flex flex-wrap p-4 flex-1 mt-16">
    {books.map((book) => (
      <div key={book.id} className="w-1/2 md:w-1/4 p-2">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-gray-600">{book.author}</p>
          <img src={book.image_url} alt="" />
        </div>
      </div>
    ))}
  </div>
  )
}
export default DisplayBooks