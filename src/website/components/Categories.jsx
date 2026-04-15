import { useEffect, useState } from "react";
import { getCategoryItems } from "../services/categoryService";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategoryItems();

      const formattedCategories = data.map((item) => ({
        id: item.id,
        name: item.name,
        img: item.image_url,
        properties: "Properties Available", // temporary text
      }));

      setCategories(formattedCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f7f7f7] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-14">
          <div>
            <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold text-[#1e1e1e] leading-tight tracking-[-1px]">
              Explore Property Categories
            </h2>
            <p className="text-gray-500 mt-3 text-base md:text-lg">
              Find the perfect type of property for your needs
            </p>
          </div>

          <button className="flex items-center gap-2 text-[#1e1e1e] font-semibold text-lg hover:opacity-70 transition">
            All Categories
            <span className="text-2xl">↗</span>
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No categories found
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {categories.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[22px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Image */}
                  <div className="h-[230px] md:h-[250px] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800";
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="px-6 py-5">
                    <h3 className="text-[22px] font-semibold text-[#1e1e1e] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-lg">{item.properties}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-4 mt-14">
              <span className="w-3 h-3 rounded-full bg-black"></span>
              <span className="w-3 h-3 rounded-full bg-gray-300"></span>
              <span className="w-3 h-3 rounded-full bg-gray-300"></span>
              <span className="w-3 h-3 rounded-full bg-gray-300"></span>
              <span className="w-3 h-3 rounded-full bg-gray-300"></span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Categories;