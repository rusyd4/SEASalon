const Services = () => (
    <section className="mb-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-purple-600">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Haircuts and Styling', 'Manicure and Pedicure', 'Facial Treatments'].map((service) => (
                <div key={service} className="bg-purple-100 rounded-lg p-4 text-center">
                    <h3 className="text-xl font-medium text-purple-700">{service}</h3>
                </div>
            ))}
        </div>
    </section>
);

export default Services;
