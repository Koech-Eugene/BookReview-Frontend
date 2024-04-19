

function BookMarkedbooks( { bookmarkedBooks} ) {
    return (
        <div className="px-4 mt-28 mb-2">
          <h1 className="text-3xl font-semibold mb-6">Bookmarks</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {bookmarkedBooks.map((book) => (
              <div key={book.id} className="bg-gray-800 rounded-lg shadow-lg p-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-400 mb-2">{book.author}</p>
                <p className="text-gray-400">{book.genre}</p>
                <div className="flex justify-between items-center mt-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
                    Read
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer">
                    Remove Bookmark
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  
}
export default BookMarkedbooks