import React from "react";

function PopUp({ book, position }) {
  return (
    <div className={`absolute bottom-0 left-0 ${position}`} style={{ width: '100%' }}>
      <div className="bg-white rounded-lg p-4 max-w-sm overflow-y-auto z-50 h-[200px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{book.title}</h2>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-gray-700">
            Rating: {book.rating} ({book.rating_count} ratings)
          </p>
          <p className="text-sm text-gray-700">Genres: {book.genre_list}</p>
          <p className="text-sm text-gray-700 truncate">
            Description: {book.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
