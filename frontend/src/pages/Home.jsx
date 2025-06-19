// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Flight from "../components/Flight";

export default function Home() {
  // State variables
  const [flights, setFlights] = useState([]);
  const [loading,setLoading] = useState(true)
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minHours, setMinHours] = useState("");
  const [maxHours, setMaxHours] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Fetch flights on intial loading
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/flight/all"
        );
        const flightsWithDuration = addDurationToFlights(
          response?.data?.flights
        );

        setFlights(flightsWithDuration);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchFlights();
  }, []);

  // a helper function to covert the suration
  const addDurationToFlights = (flightsArray) => {
    return flightsArray.map((flight) => {
      const departure = new Date(
        `${flight.departureDate.slice(0, 10)}T${flight.departureTime}`
      );
      const arrival = new Date(
        `${flight.arrivalDate.slice(0, 10)}T${flight.arrivalTime}`
      );

      // Calculate duration in minute
      const timeDifference = arrival - departure;
      const totalMinutes = Math.round(timeDifference / 60000);

      // Converting it to hours and minutes
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return {
        //spreading flight details and adding duration and total minutes
        ...flight,
        duration: `${hours}hours ${minutes}minutes`,
        totalMinutes,
      };
    });
  };

  // Apply filters and sorting
  const getFilteredFlights = () => {
    let result = [...flights];

    // Price filter
    if (minPrice) {
      result = result.filter((flight) => flight.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((flight) => flight.price <= Number(maxPrice));
    }

    // Duration filter (converting hours to minutes)
    if (minHours) {
      const minMinutes = Number(minHours) * 60;
      result = result.filter((flight) => flight.totalMinutes >= minMinutes);
    }
    if (maxHours) {
      const maxMinutes = Number(maxHours) * 60;
      result = result.filter((flight) => flight.totalMinutes <= maxMinutes);
    }

    // Sorting
    if (sortOption) {
      result.sort((a, b) => {
        switch (sortOption) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "duration_asc":
            return a.totalMinutes - b.totalMinutes;
          case "duration_desc":
            return b.totalMinutes - a.totalMinutes;
          case "name_asc":
            return a.flightName.localeCompare(b.flightName);
          case "name_desc":
            return b.flightName.localeCompare(a.flightName);
          default:
            return 0;
        }
      });
    }

    return result;
  };

  const filteredFlights = getFilteredFlights();

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinHours("");
    setMaxHours("");
    setSortOption("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 sm:py-30 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-800 text-center">
            Flight Search
          </h1>
          <p className="text-gray-600 text-center">
            Find the best flights for your journey
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h2 className="font-medium text-gray-800">Filters</h2>
            <div className="flex gap-2">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm p-2 border border-gray-300 rounded"
              >
                <option value="">Sort by</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="duration_asc">Duration: Short to Long</option>
                <option value="duration_desc">Duration: Long to Short</option>
                <option value="name_asc">Flight Name: A-Z</option>
                <option value="name_desc">Flight Name: Z-A</option>
              </select>
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800 px-2"
              >
                Reset All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Price Filter */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Price Range ($)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Duration (hours)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min hours"
                  value={minHours}
                  onChange={(e) => setMinHours(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Max hours"
                  value={maxHours}
                  onChange={(e) => setMaxHours(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">
              Available Flights
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({filteredFlights.length} found)
              </span>
            </h2>
          </div>

          {loading? <p className="text-center">Loading please wait...</p>:""}

          {!loading && filteredFlights.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-gray-600">No flights match your filters</p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <Flight key={flight.id} data={flight} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
