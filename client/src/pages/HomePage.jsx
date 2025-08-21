import React from "react";
import pic1 from "../assets/pic1.png"; 
import pic2 from "../assets/pic2.png"; 
import pic3 from "../assets/pic3.png"; 
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
// Testimonials data
const testimonials = [
  {
    name: "Alex Johnson",
    role: "Frequent Traveler",
    photo: pic1,
    quote:
      "PackWise made my travel planning so easy! The packing lists keep me organized, and I never forget anything important.",
  },
  {
    name: "Sophia Lee",
    role: "Digital Nomad",
    photo: pic2,
    quote:
      "The intuitive interface and smart features helped me plan complex trips effortlessly. Highly recommend to all travelers!",
  },
  {
    name: "Michael Chen",
    role: "Adventure Seeker",
    photo: pic3,
    quote:
      "Finally a travel app that combines itinerary and packing in one place. PackWise keeps me ready for every adventure.",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen text-white font-sans scroll-smooth bg-gradient-to-b from-black via-gray-900 to-purple-950">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-[70vh] flex flex-col justify-center items-center px-6 text-center relative"
      >
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 leading-tight max-w-4xl drop-shadow-lg">
          Welcome to PackWise 🌍
          <span className="block h-1 w-28 bg-purple-500 rounded-full mt-3 mx-auto animate-pulse" />
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-300 tracking-wide leading-relaxed">
          Effortlessly plan your trips with PackWise — the ultimate travel companion designed to
          organize your itineraries, streamline packing, and keep every detail of your journey in
          one sleek, intuitive platform.
        </p>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-[60vh] flex flex-col justify-center bg-black bg-opacity-80 px-8 md:px-20 lg:px-40 py-16"
      >
        <h2 className="text-4xl font-semibold text-purple-400 mb-6 border-l-4 border-purple-600 pl-4 max-w-xl">
          About PackWise
        </h2>
        <p className="text-gray-300 max-w-3xl mb-4 leading-relaxed text-lg tracking-wide">
          PackWise empowers travelers to create detailed itineraries and comprehensive packing
          lists, making preparation seamless and stress-free. From remembering your essentials
          to planning your day-to-day activities, we keep everything organized and accessible.
        </p>
        <p className="text-gray-300 max-w-3xl leading-relaxed text-lg tracking-wide">
          Built with modern, responsive design principles, PackWise offers a smooth experience
          across all devices — whether you're planning at your desk or checking your list on the go.
        </p>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="min-h-[60vh] bg-gradient-to-b from-gray-900 via-purple-950 to-black px-8 md:px-20 lg:px-40 py-16"
      >
        <h2 className="text-4xl font-semibold text-purple-400 mb-8 text-center tracking-wide">
          Features
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Smart Packing",
              desc: "Create custom packing lists to never forget your essentials.",
              img: avatar1,
              icon: (
                <svg
                  className="w-10 h-10 text-purple-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7" />
                  <path d="M17 8l-5-5-5 5" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              ),
            },
            {
              title: "Trip Planning",
              desc: "Organize destinations and activities effortlessly.",
              img: avatar2,
              icon: (
                <svg
                  className="w-10 h-10 text-purple-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"images
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
            },
            {
              title: "Travel Essentials",
              desc: "Keep track of tickets, gadgets, and important documents.",
              img: avatar3,
              icon: (
                <svg
                  className="w-10 h-10 text-purple-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              ),
            },
          ].map(({ title, desc, img, icon }) => (
            <div
              key={title}
              className="rounded-xl overflow-hidden shadow-lg border border-purple-700 bg-gray-900 hover:shadow-purple-500 transition-shadow duration-300 transform hover:scale-105"
            >
              <img src={img} alt={title} className="w-full h-48 object-cover" />
              <div className="p-6">
                {icon}
                <h3 className="text-xl font-semibold text-purple-400 mb-2">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="min-h-[60vh] bg-black bg-opacity-80 flex flex-col justify-center px-8 py-16"
      >
        <h2 className="text-4xl font-semibold text-purple-400 mb-12 text-center">
          What Our Users Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, photo, quote }) => (
            <div
              key={name}
              className="bg-gray-900 rounded-xl p-6 shadow-lg border border-purple-700 hover:shadow-purple-500 transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={photo}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-purple-400">{name}</h3>
                  <p className="text-gray-400 text-sm">{role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">“{quote}”</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
