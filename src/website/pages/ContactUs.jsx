import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaClock,
} from "react-icons/fa";

function ContactUs() {
  return (
    <div className="bg-[#f8f8f8] text-gray-900">

      {/* ================= HERO ================= */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#c89b6d] font-semibold mb-3">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Let’s Start The Conversation
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Have questions about buying, selling, renting, or investing?
            Reach out to us and we’ll be happy to help.
          </p>
        </div>
      </div>

      {/* ================= CONTACT INFO ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#c89b6d] to-[#a67c52] flex items-center justify-center text-white text-2xl mb-4">
              <FaPhoneAlt />
            </div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-500 text-sm">+91 98091 51574</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#c89b6d] to-[#a67c52] flex items-center justify-center text-white text-2xl mb-4">
              <FaEnvelope />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-500 text-sm">winnerhomesinfo@gmail.com</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#c89b6d] to-[#a67c52] flex items-center justify-center text-white text-2xl mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="text-gray-500 text-sm">Winner Homes & Developers
              1st  Floor, Madhava Arcade
              West Fort, Palat Jn
              Palakkad
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#c89b6d] to-[#a67c52] flex items-center justify-center text-white text-2xl mb-4">
              <FaClock />
            </div>
            <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
            <p className="text-gray-500 text-sm">Business Hours / 9:30 AM - 5:30 PM</p>
          </div>

        </div>
      </div>

      {/* ================= CONTACT FORM + IMAGE ================= */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000"
              alt="Contact Us"
              className="rounded-3xl shadow-lg w-full h-[600px] object-cover"
            />

            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-lg p-5 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <FaPhoneAlt className="text-[#c89b6d]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaEnvelope className="text-[#c89b6d]" />
                <span>info@realpro.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaMapMarkerAlt className="text-[#c89b6d]" />
                <span>Kochi, Kerala</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-[#c89b6d] font-semibold mb-3">
              Send Message
            </p>

            <h2 className="text-4xl font-bold mb-3">Get In Touch</h2>
            <p className="text-gray-500 mb-8">
              Fill in the form below and our team will get back to you shortly.
            </p>

            <div className="space-y-5">
              <input
                placeholder="Your Name"
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#c89b6d]"
              />

              <input
                placeholder="Your Email"
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#c89b6d]"
              />

              <input
                placeholder="Phone Number"
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#c89b6d]"
              />

              <textarea
                placeholder="Tell us how we can help you..."
                className="w-full border border-gray-200 p-4 rounded-xl h-36 outline-none focus:ring-2 focus:ring-[#c89b6d]"
              ></textarea>

              <button className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-900 transition flex items-center justify-center gap-2">
                <FaPaperPlane />
                Submit Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAP ================= */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#c89b6d] font-semibold mb-2">
            Visit Us
          </p>
          <h2 className="text-3xl font-bold">Our Location</h2>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980.4214386363556!2d76.67478520913228!3d10.77616558932825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86def27eabc75%3A0x7aaa701a33840f6e!2sWinner%20Homes%20%26%20Developers!5e1!3m2!1sen!2sin!4v1776148743607!5m2!1sen!2sin"
            className="w-full h-[400px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;