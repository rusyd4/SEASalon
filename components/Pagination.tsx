import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex items-center space-x-2">
                {/* Left arrow button */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200 ${currentPage === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-purple-600 hover:bg-purple-100'
                            }`}
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                </li>

                {/* Page buttons */}
                {pages.map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200 ${page === currentPage
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white text-purple-600 hover:bg-purple-100'
                                }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Right arrow button */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === pageCount}
                        className={`w-10 h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200 ${currentPage === pageCount
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-purple-600 hover:bg-purple-100'
                            }`}
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;