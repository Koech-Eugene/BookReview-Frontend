import BookMarkedbooks from "../components/BookMarkedbooks";

import React, { useState, useEffect } from 'react';
import Bookmarks from './Bookmarks';

function App() {
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  useEffect(() => {
    async function fetchBookmarks() {
      try {
        const response = await fetch('http://127.0.0.1:5000/favourites');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookmarkedBooks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    }

    fetchBookmarks();
  }, []);

  return (
    <div>
      <BookMarkedbooks bookmarkedBooks={bookmarkedBooks} />
    </div>
  );
}

export default App;
