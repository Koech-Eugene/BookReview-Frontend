import React, { useState } from 'react';
function SearchBar({ handleSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleSearch(searchTerm);
    };
  return (
    <div>
        <input
        type="text"
        placeholder="Search..."
        className="w-full px-2 py-2 my-4 text-xl bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
        onChange={handleChange}
      />
    </div>
  )
}
export default SearchBar