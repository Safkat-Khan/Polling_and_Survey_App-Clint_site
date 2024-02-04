

const Contact = () => {
    return (
        <div className=" bg-lime-100">
        <h1 className="p-8 text-center font-serif text-5xl font-bold text-blue-600 underline">Contact Us</h1>
       <div className="grid-cols-1 lg:flex justify-between mx-8">
       <div>
       <h1 className="py-4 text-center text-2xl font-bold text-purple-500">Call us :</h1>
        <p className="mb-8 text-center text-xl font-bold text-blue-600">Mobile: 01791234674</p>
       </div>
       <div>
        <h1 className="py-4 text-center text-2xl font-bold text-lime-500">Address:</h1>
        <p className="mb-8 text-center text-xl font-bold text-blue-600">Darussalam, Mirpur-1
Dhaka-1216</p>
       </div>
       <div>
        <h1 className="py-4 text-center text-2xl font-bold text-pink-500">Email:</h1>
        <p className="pb-8 text-center text-xl font-bold text-blue-600">surveyswift46@gmail.com</p>
       </div>
       </div>
       <p className="py-4 text-center text-3xl font-bold text-sky-800">(Open : Sat - Fri, 8:00 AM to 11:00 PM)</p>

    </div>
    );
};

export default Contact;