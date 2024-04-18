import React, { useState } from "react";
import Comments from "./Comments"

function Review() {
  const [reviews, setReviews] = useState([
    { user: "John Doe", comment: "Great book, highly recommended!" },
    { user: "Jane Smith", comment: "Enjoyed reading it, 5 stars!" },
    { user: "Sam Johnson", comment: "Interesting plot, could not put it down." },
  ]);
  const [newReview, setNewReview] = useState("");

  // Function to handle posting a new review
  const postReview = () => {
    if (newReview.trim() === "") {
      alert("Please enter a review before posting.");
      return;
    }
    const updatedReviews = [...reviews, { user: "You", comment: newReview }];
    setReviews(updatedReviews);
    setNewReview("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <div>
        <Comments reviews={reviews}/>
      </div>
      {/* Input form for posting a new review */}
      <div className="mt-4">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full h-24 px-4 py-2 border rounded-md"
        ></textarea>
        <button
          onClick={postReview}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Post Review
        </button>
      </div>
    </div>
  );
}
export default Review