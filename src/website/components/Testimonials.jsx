const testimonials = [
  {
    name: "Ali Tufan",
    role: "Marketing",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
  },
  {
    name: "Albert Flores",
    role: "Designer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    name: "Robert Fox",
    role: "Developer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.",
  },
];

function Testimonials() {
  return (
    <div className="bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header */}
        <h2 className="text-2xl font-bold mb-2">
          People Love Living With Realtor
        </h2>
        <p className="text-gray-500 mb-10">
          Aliquam lacinia diam quis lacus euismod
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm text-left"
            >
              {/* User */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;