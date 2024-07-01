import { useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { paginate } from '../utils/pagination';
import Pagination from './Pagination';

const Reservations = ({ reservations, addReservation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState('Haircuts and Styling');
    const [dateTime, setDateTime] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;

    const handleSubmitReservation = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, service, dateTime }),
        });
        const newReservation = await response.json();
        addReservation(newReservation);
        setName('');
        setPhone('');
        setService('Haircuts and Styling');
        setDateTime('');
    };

    const paginatedReservations = paginate(reservations, pageSize, currentPage);

    return (
        <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center text-purple-600">Make a Reservation</h2>
            <form onSubmit={handleSubmitReservation} className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">Type of Service</label>
                    <select
                        id="service"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    >
                        <option value="Haircuts and Styling">Haircuts and Styling</option>
                        <option value="Manicure and Pedicure">Manicure and Pedicure</option>
                        <option value="Facial Treatments">Facial Treatments</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateTime">Date and Time</label>
                    <input
                        type="datetime-local"
                        id="dateTime"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">Book Now</button>
            </form>
            <div className="space-y-4">
                {paginatedReservations.map((reservation, index) => (
                    <div key={index} className="bg-purple-50 p-4 rounded-lg">
                        <p className="font-semibold text-purple-700">{reservation.name}</p>
                        <p className="text-gray-600">Phone: {reservation.phone}</p>
                        <p className="text-gray-600">Service: {reservation.service}</p>
                        <p className="text-gray-600">Date and Time: {formatDate(reservation.dateTime)}</p>
                    </div>
                ))}
            </div>
            <Pagination
                itemsCount={reservations.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
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

export default Reservations;
