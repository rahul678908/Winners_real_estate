function CTASection() {
  return (
    <div className="relative w-full h-[350px]">
      
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
        alt="cta"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white px-4">
        
        <p className="uppercase text-sm mb-2">BUY OR SELL</p>

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Looking to Buy a new property or sell an existing one?
          <br />
          Winner Homes provides an awesome solution!
        </h2>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-orange-500 px-6 py-3 rounded-full">
            Sell a Property ↗
          </button>

          <button className="bg-white text-black px-6 py-3 rounded-full">
            Buy a Property ↗
          </button>
        </div>
      </div>
    </div>
  );
}

export default CTASection;