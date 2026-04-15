function EnquiryForm() {
  return (
    <div className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Form */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Enquiry Form</h2>
          <p className="text-gray-500 mb-6">
            As the complexity of buildings to increase
          </p>

          <form className="space-y-4">
            
            {/* Select */}
            <select className="w-full border p-3 rounded-md">
              <option>Inquiry Type</option>
            </select>

            {/* Row */}
            <div className="grid grid-cols-2 gap-4">
              <select className="border p-3 rounded-md">
                <option>How to address</option>
              </select>

              <input
                type="text"
                placeholder="Your Name"
                className="border p-3 rounded-md"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full border p-3 rounded-md"
            />

            {/* Role */}
            <select className="w-full border p-3 rounded-md">
              <option>Personal Role</option>
            </select>

            {/* Price + Size */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="$ 90"
                className="border p-3 rounded-md"
              />
              <input
                type="text"
                placeholder="Min Size (Sq ft)"
                className="border p-3 rounded-md"
              />
            </div>

            {/* Button */}
            <button className="w-full bg-gray-900 text-white py-3 rounded-md">
              Submit
            </button>
          </form>
        </div>

        {/* Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
            alt="interior"
            className="w-full h-[500px] object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default EnquiryForm;