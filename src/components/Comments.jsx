function Comments({ reviews }) {
    return (
        <div className="overflow-y-auto h-64">
          {reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold">{review.user}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      );
}
export default Comments