import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Review from "../components/Review"; 
function BookDetails() {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/books/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    }
    fetchBookDetails();
  }, [id]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="mt-20 p-4 max-w-container-lg">
      <div
        className="cursor-pointer hover:text-blue-600 hover:underline text-xl font-bold font-sans"
        onClick={handleClick}
      >
        {/* <p>⬅ Back to Home</p> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            src={book.image}
            alt={book.title}
            className="rounded-3xl h-72 object-cover"
          />
          <p className="mt-2">{book.description}</p>
        </div>
        <div>
          <Review bookId={id} />
        </div>
      </div>
    </div>
  );
}
export default BookDetails;
