// Navbar.jsx
import { useState } from "react";
import {FlightModal} from "./FlightModal";


export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between fixed w-full">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://images.vexels.com/media/users/3/259478/isolated/preview/fc8a8afdde334416b927086153b838f2-detailed-airplane-silhouette.png"
            alt="Book Sultan"
            className="h-8 w-auto"
          />
          <p className="text-blue-900 font-bold text-xl">
            Book <span className="text-blue-600">Airline</span>
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700">
          <li>
            <a href="#" className="hover:text-blue-600">
              My Booking
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Tour & Attractions
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              KWD{" "}
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Register / Login
            </a>
          </li>
        </ul>

        {/* Add Flight Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="ml-4 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Add Flight
        </button>

        
      </nav>

      {modalOpen && <FlightModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
