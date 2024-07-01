import { useState } from 'react';
import Head from 'next/head';
import { PrismaClient } from '@prisma/client';
import { FaStar } from 'react-icons/fa';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import Reservations from '../components/Reservations';
import ContactUs from '../components/ContactUs';

const prisma = new PrismaClient();

const Home = ({ initialReviews, initialReservations }) => {
    const [reviews, setReviews] = useState(initialReviews);
    const [reservations, setReservations] = useState(initialReservations);

    const addReview = (newReview) => setReviews([...reviews, newReview]);
    const addReservation = (newReservation) => setReservations([...reservations, newReservation]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-200">
            <Head>
                <title>SEA Salon</title>
                <meta name="description" content="Beauty and Elegance Redefined" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="text-center py-12 bg-white shadow-lg">
                <h1 className="text-5xl font-bold text-purple-600">SEA Salon</h1>
                <p className="text-xl italic mt-2 text-gray-600">Beauty and Elegance Redefined</p>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Services />
                <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Reviews reviews={reviews} addReview={addReview} />
                    <Reservations reservations={reservations} addReservation={addReservation} />
                </div>
                <ContactUs />
            </main>
        </div>
    );
};

export const getServerSideProps = async () => {
    const reviews = await prisma.review.findMany();
    const reservations = await prisma.reservation.findMany();

    const serializedReservations = reservations.map((reservation) => ({
        ...reservation,
        dateTime: reservation.dateTime.toISOString(),
    }));

    return {
        props: {
            initialReviews: reviews,
            initialReservations: serializedReservations,
        },
    };
};

export default Home;
