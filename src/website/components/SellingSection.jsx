function SellingSection() {
  return (
    <div className="bg-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Let’s Find The Right Selling Option For You
          </h2>

          <p className="text-gray-600 mb-6">
            As the complexity of buildings to increase, the field architecture.
          </p>

          {/* Points */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                ✓
              </span>
              <p>Find excellent deals</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                ✓
              </span>
              <p>Friendly host & Fast support</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                ✓
              </span>
              <p>List your own property</p>
            </div>
          </div>

          {/* Button */}
          <button className="border border-gray-400 px-6 py-3 rounded-full flex items-center gap-2">
            Learn More ↗
          </button>
        </div>

        {/* Right Images */}
        <div className="flex gap-6">
          
          {/* Small Image */}
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
            alt="house"
            className="w-1/2 h-64 object-cover rounded-xl"
          />

          {/* Large Image */}
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
            alt="couple"
            className="w-1/2 h-80 object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default SellingSection;