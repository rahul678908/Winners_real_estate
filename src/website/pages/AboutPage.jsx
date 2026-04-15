import {
  FaHandshake,
  FaUserTie,
  FaRocket,
  FaAward,
  FaHome,
  FaSmile,
} from "react-icons/fa";

function AboutPage() {
  return (
    <div className="bg-[#f8f8f8] text-gray-900">

      {/* ================= HERO / ABOUT US ================= */}
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#c89b6d] font-semibold mb-3">
              About Our Company
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Helping You Find The Perfect Place To Call Home
            </h1>

            <p className="text-gray-600 text-lg leading-8 mb-8">
              We provide smart real estate solutions, connecting clients with
              dream homes, investment opportunities, and trustworthy guidance
              for every step of the journey.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition">
                Explore Properties
              </button>
              <button className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-white transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1400"
              alt="About Real Estate"
              className="w-full h-[450px] object-cover rounded-3xl shadow-lg"
            />

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-5">
              <h3 className="text-2xl font-bold">10+ Years</h3>
              <p className="text-gray-500 text-sm">Of Real Estate Excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= VISION ================= */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <p className="text-sm uppercase tracking-[0.2em] text-[#c89b6d] font-semibold mb-3">
            Our Vision
          </p>

          <h2 className="text-4xl font-bold mb-4">What Drives Us Forward</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-14">
            We believe real estate is more than property — it’s about trust,
            opportunity, and building futures.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-[#f9f9f9] rounded-3xl p-8 shadow-sm hover:shadow-xl transition group">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#c89b6d] to-[#a67c52] flex items-center justify-center text-white text-3xl mb-5 group-hover:scale-110 transition">
                <FaHandshake />
              </div>
              <h3 className="font-semibold text-xl mb-3">
                Creating Lifelong Partnerships
              </h3>
              <p className="text-gray-500 leading-7">
                Fostering trust and strong relationships for long-term success
                in real estate.
              </p>
            </div>

            <div className="bg-[#f9f9f9] rounded-3xl p-8 shadow-sm hover:shadow-xl transition group">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#c89b6d] to-[#a67c52] flex items-center justify-center text-white text-3xl mb-5 group-hover:scale-110 transition">
                <FaUserTie />
              </div>
              <h3 className="font-semibold text-xl mb-3">
                Empowering Smart Decisions
              </h3>
              <p className="text-gray-500 leading-7">
                Providing expert insights to help you make confident and
                informed property choices.
              </p>
            </div>

            <div className="bg-[#f9f9f9] rounded-3xl p-8 shadow-sm hover:shadow-xl transition group">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#c89b6d] to-[#a67c52] flex items-center justify-center text-white text-3xl mb-5 group-hover:scale-110 transition">
                <FaRocket />
              </div>
              <h3 className="font-semibold text-xl mb-3">
                Innovating For Tomorrow
              </h3>
              <p className="text-gray-500 leading-7">
                Driving change and sustainable solutions for a brighter future
                in real estate.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ================= OUR STORY ================= */}
      <div className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-14 items-center">
        
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000"
            alt="Our Story"
            className="rounded-3xl shadow-lg"
          />

          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur rounded-2xl px-5 py-4 shadow-lg">
            <p className="text-sm text-gray-500">Trusted by</p>
            <h3 className="text-xl font-bold">Thousands of Families</h3>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#c89b6d] font-semibold mb-3">
            Our Story
          </p>

          <h2 className="text-4xl font-bold mb-5">
            Building Trust Through Real Estate
          </h2>

          <p className="text-gray-600 mb-5 leading-8">
            RealPro is proud to be a trusted leader in real estate, offering
            comprehensive solutions and professional services in the property
            industry.
          </p>

          <p className="text-gray-600 mb-5 leading-8">
            We are committed to putting clients first, helping them find dream
            homes, smart investments, and secure opportunities.
          </p>

          <p className="text-gray-600 mb-8 leading-8">
            We are more than just a real estate company — we are your reliable
            partner in every property decision.
          </p>

          <button className="bg-black text-white px-7 py-3 rounded-xl hover:bg-gray-900 transition">
            Explore Now
          </button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          
          <div className="bg-[#f9f9f9] rounded-3xl p-10 shadow-sm hover:shadow-lg transition">
            <div className="text-[#c89b6d] text-4xl mb-4 flex justify-center">
              <FaAward />
            </div>
            <h2 className="text-4xl font-bold">4M</h2>
            <p className="text-gray-500 mt-2">Award Winning</p>
          </div>

          <div className="bg-[#f9f9f9] rounded-3xl p-10 shadow-sm hover:shadow-lg transition">
            <div className="text-[#c89b6d] text-4xl mb-4 flex justify-center">
              <FaHome />
            </div>
            <h2 className="text-4xl font-bold">18K</h2>
            <p className="text-gray-500 mt-2">Property Ready</p>
          </div>

          <div className="bg-[#f9f9f9] rounded-3xl p-10 shadow-sm hover:shadow-lg transition">
            <div className="text-[#c89b6d] text-4xl mb-4 flex justify-center">
              <FaSmile />
            </div>
            <h2 className="text-4xl font-bold">23M</h2>
            <p className="text-gray-500 mt-2">Happy Customers</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutPage;