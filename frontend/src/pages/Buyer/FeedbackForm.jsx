import React, { useState } from 'react';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (rating === 0 || comments.trim() === '') {
      setError('Please provide a rating and comments.');
      return;
    }

    setError('');
    
    // Simulate form submission (e.g., send data to an API)
    console.log('Feedback submitted:', { rating, comments });
    setSuccess(true);
    setRating(0);
    setComments('');
  };

  return (
    <div className="feedback-form p-6 bg-white shadow-md rounded max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Thank you for your feedback!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="0">Select a rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;