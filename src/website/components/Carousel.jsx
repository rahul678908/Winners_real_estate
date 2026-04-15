import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCarouselItems } from "../services/carouselService";

function Carousel() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarousel();
  }, []);

  useEffect(() => {
    if (carouselItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselItems]);

  const fetchCarousel = async () => {
    try {
      setLoading(true);
      const data = await getCarouselItems();
      setCarouselItems(data || []);
    } catch (error) {
      console.error("Failed to fetch carousel:", error);
    } finally {
      setLoading(false);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] bg-slate-200 animate-pulse flex items-center justify-center">
        <p className="text-slate-500 text-lg">Loading carousel...</p>
      </div>
    );
  }

  if (!carouselItems.length) {
    return (
      <div className="w-full h-[600px] bg-slate-900 flex items-center justify-center text-white">
        <p className="text-lg">No carousel items found</p>
      </div>
    );
  }

  const currentSlide = carouselItems[currentIndex];

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background Image */}
      <img
        src={
          currentSlide.image_url ||
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        }
        alt={currentSlide.title}
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-center text-white px-4">
        <p className="uppercase tracking-widest text-sm mb-2">
          THE BEST WAY TO
        </p>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">
          {currentSlide.title || "Find Your Dream Property"}
        </h1>

        <p className="text-lg text-gray-200 max-w-2xl">
          {currentSlide.subtitle ||
            "We’ve more than 745,000 apartments, place & plot."}
        </p>
      </div>

      {/* Left Button */}
      {carouselItems.length > 1 && (
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Right Button */}
      {carouselItems.length > 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Dots */}
      {carouselItems.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;