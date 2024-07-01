const ContactUs = () => (
    <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-purple-600">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
                { name: 'Thomas', phone: '08123456789' },
                { name: 'Sekar', phone: '08164829372' },
            ].map((contact) => (
                <div key={contact.name} className="bg-purple-100 rounded-lg p-4 text-center">
                    <h3 className="text-xl font-medium text-purple-700">{contact.name}</h3>
                    <p className="text-gray-600">{contact.phone}</p>
                </div>
            ))}
        </div>
    </section>
);

export default ContactUs;
