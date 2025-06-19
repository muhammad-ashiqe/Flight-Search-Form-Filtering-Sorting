// FlightInfo.jsx
import React from 'react';
import { FaPlane, FaClock, FaDollarSign } from 'react-icons/fa';

export default function FlightInfo({ data }) {
  const {
    flightName,
    flightNumber,
    departureCity,
    arrivalCity,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    price,
    currency = 'USD'
  } = data;

  // Calculate duration
  const dep = new Date(`${departureDate.slice(0,10)}T${departureTime}`);
  const arr = new Date(`${arrivalDate.slice(0,10)}T${arrivalTime}`);
  const diffMs = arr - dep;
  const totalMins = Math.round(diffMs / 60000);
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded border border-gray-200 overflow-hidden my-2 text-sm">
      <div className="flex">
        {/* Airline Section - Always visible but compact */}
        <div className="w-1/4 p-2 flex flex-col items-center justify-center border-r border-gray-200 bg-blue-900">
          <FaPlane className="text-white mb-1" />
          <h3 className="font-semibold text-center text-white leading-tight">{flightName}</h3>
          <p className="text-white text-xs">FL{flightNumber}</p>
        </div>
        
        {/* Flight Details - Responsive grid */}
        <div className="w-3/4 p-2">
          <div className="grid grid-cols-2 gap-1">
            <div>
              <div className="text-xs text-gray-500">From</div>
              <div className="font-medium truncate">{departureCity}</div>
              <div className="text-gray-600 truncate">
                {departureDate.slice(0,10)} | {departureTime}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500">To</div>
              <div className="font-medium truncate">{arrivalCity}</div>
              <div className="text-gray-600 truncate">
                {arrivalDate.slice(0,10)} | {arrivalTime}
              </div>
            </div>
            
            <div className="flex items-center mt-1">
              <FaClock className="text-gray-500 mr-1 text-xs" />
              <div>
                <div className="text-xs text-gray-500">Duration</div>
                <div className="font-medium">
                  {hrs}h {mins}m
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-1">
              <FaDollarSign className="text-gray-500 mr-1 text-xs" />
              <div>
                <div className="text-xs text-gray-500">Price</div>
                <div className="font-medium">
                  {currency} {price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-2 flex justify-end">
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}