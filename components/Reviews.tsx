import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { paginate } from '../utils/pagination';
import Pagination from './Pagination';

const Reviews = ({ reviews, addReview }) => {
    const [customerName, setCustomerName] = useState('');
    const [starRating, setStarRating] = useState(0);
    const [comment, setComment] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerName, starRating, comment }),
        });
        const newReview = await response.json();
        addReview(newReview);
        setCustomerName('');
        setStarRating(0);
        setComment('');
    };

    const paginatedReviews = paginate(reviews, pageSize, currentPage);

    return (
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center text-purple-600">Customer Reviews</h2>
            <form onSubmit={handleSubmitReview} className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">Name</label>
                    <input
                        type="text"
                        id="customerName"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                    <div className="flex">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <FaStar
                                    key={index}
                                    className="cursor-pointer"
                                    color={ratingValue <= starRating ? "#ffc107" : "#e4e5e9"}
                                    size={24}
                                    onClick={() => setStarRating(ratingValue)}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">Submit Review</button>
            </form>
            <div className="space-y-4">
                {paginatedReviews.map((review, index) => (
                    <div key={index} className="bg-purple-50 p-4 rounded-lg">
                        <p className="font-semibold text-purple-700">{review.customerName}</p>
                        <div className="flex my-1">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} color={i < review.starRating ? "#ffc107" : "#e4e5e9"} size={16} />
                            ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                    </div>
                ))}
            </div>
            <Pagination
                itemsCount={reviews.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
            {/* Ensure pagination always stays at the bottom */}
            <style jsx>{`
                section {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                }
            `}</style>
        </section>
    );
};

export default Reviews;
