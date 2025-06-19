// FlightModal.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPlane, FaTimes } from "react-icons/fa";

export function FlightModal({ onClose }) {

  const base_url = 'http://localhost:7000/api'
  const [flight, setFlight] = useState({
    flightName: "",
    flightNumber: "",
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    arrivalDate: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...flight,
        flightNumber: Number(flight.flightNumber),
        price: Number(flight.price),
      };

      await axios.post(`${base_url}/flight/add`, data);
      toast.success("Flight added");
      console.log(flight);

      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <FaPlane className="text-white text-xl" />
            <h2 className="text-white text-xl font-bold">Add Flight</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Airline */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                Airline
              </label>
              <input
                name="flightName"
                onChange={handleChange}
                value={flight.flightName}
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Delta Airlines"
                required
              />
            </div>

            {/* Flight Number */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                Flight Number
              </label>
              <input
                name="flightNumber"
                type="number"
                onChange={handleChange}
                value={flight.flightNumber}
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 1234"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                Price ($)
              </label>
              <input
                name="price"
                type="number"
                onChange={handleChange}
                value={flight.price}
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 299"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Departure City */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Departure City
                </label>
                <input
                  name="departureCity"
                  onChange={handleChange}
                  value={flight.departureCity}
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., New York"
                  required
                />
              </div>

              {/* Arrival City */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Arrival City
                </label>
                <input
                  name="arrivalCity"
                  onChange={handleChange}
                  value={flight.arrivalCity}
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., London"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Departure Date */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Departure Date
                </label>
                <input
                  name="departureDate"
                  type="date"
                  onChange={handleChange}
                  value={flight.departureDate}
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Arrival Date */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Arrival Date
                </label>
                <input
                  name="arrivalDate"
                  type="date"
                  onChange={handleChange}
                  value={flight.arrivalDate}
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Departure Time */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Departure Time
                </label>
                <input
                  name="departureTime"
                  type="time"
                  onChange={handleChange}
                  value={flight.departureTime}
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Arrival Time */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Arrival Time
                </label>
                <input
                  name="arrivalTime"
                  type="time"
                  onChange={handleChange}
                  value={flight.arrivalTime}
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 text-base font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-3 text-base font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
