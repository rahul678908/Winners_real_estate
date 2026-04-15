import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0f172a] to-[#020617] text-gray-400 px-6 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="./src/assets/winner_logo-1.png"
              alt="Winners Logo"
              className="w-40 sm:w-52 md:w-64 object-contain"
            />
            <h2 className="text-white text-lg font-semibold"> </h2>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-300">Follow Us</span>
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-10"></div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-5 gap-10">

          {/* Popular Search */}
          <div>
            <h4 className="text-white font-semibold mb-4">Popular Search</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Apartment for Sale</li>
              <li className="hover:text-white cursor-pointer">Apartment for Rent</li>
              <li className="hover:text-white cursor-pointer">Offices for Sale</li>
              <li className="hover:text-white cursor-pointer">Offices for Rent</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Terms of Use</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Our Services</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">FAQs</li>
            </ul>
          </div>

          {/* Discovery */}
          <div>
            <h4 className="text-white font-semibold mb-4">Discovery</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Chicago</li>
              <li className="hover:text-white cursor-pointer">Los Angeles</li>
              <li className="hover:text-white cursor-pointer">New Jersey</li>
              <li className="hover:text-white cursor-pointer">New York</li>
              <li className="hover:text-white cursor-pointer">California</li>
            </ul>
          </div>

          {/* Contact + Subscribe */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-3">
              Total Free Customer Care
            </h4>
            <p className="text-sm mb-4 text-gray-300">+(91) 98091 51574</p>

            <h4 className="text-white font-semibold mb-2">Live Support?</h4>
            <p className="text-sm mb-6 text-gray-300">winnerhomesinfo@gmail.com</p>

            <h4 className="text-white font-semibold mb-3">
              Keep Yourself Up to Date
            </h4>

            {/* Subscribe Input */}
            <div className="flex bg-white rounded-xl overflow-hidden max-w-md">
              <input
                type="email"
                placeholder="Your email"
                className="px-5 py-3 text-black w-full outline-none text-sm"
              />
              <button className="bg-gray-200 px-5 text-sm font-medium hover:bg-gray-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© Winners – All rights reserved</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;