import React, { useState, useEffect } from "react";
import Comments from "./Comments"

function Review({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch reviews for a particular book
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reviews?book_id=${bookId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      // Fetch username for each review
      const reviewsWithUsernames = await Promise.all(data.map(async review => {
        const userName = await fetchUserName(review.user_id);
        return { ...review, userName };
      }));
      setReviews(reviewsWithUsernames);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Function to fetch user's name for a given user ID
  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users?user_id=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      // Assuming data is an array of users, pick the first user (if available) and return their username
      return data.length > 0 ? data[0].username : "Unknown User";
    } catch (error) {
      console.error("Error fetching user:", error);
      return "Unknown User";
    }
  };
  

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  // Function to handle posting a new review
  const postReview = async () => {
    if (newReview.trim() === "") {
      alert("Please enter a review before posting.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book_id: bookId, comment: newReview }),
      });
      if (!response.ok) {
        throw new Error("Failed to post review");
      }
      const data = await response.json();
      setReviews([...reviews, data]);
      setNewReview("");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div>
          <Comments reviews={reviews} />
        </div>
      )}
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

export default Review;