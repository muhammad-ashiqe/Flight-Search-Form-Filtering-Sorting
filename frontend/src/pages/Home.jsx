import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Flight from '../components/Flight'

const Home = () => {
  const [allFlight,setAllFlight] = useState([])

  const fetchAllFlight =async()=>{
    const res = await axios.get('http://localhost:7000/api/flight/all');
    console.log(res)
    setAllFlight(res.data.flights)
  }

  useEffect(()=>{
    fetchAllFlight()
  },[])
  return (
    <div className='py-20 sm:py-25'>
       {/* Results Section */}
        <div>


          {/* Empty State */}
          { allFlight.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-gray-600">No flights match your filters</p>
            </div>
          )}

          {/* Flight Results */}
          { allFlight.length > 0 && (
            <div className="space-y-4">
              {allFlight.map((flight,index) => (
                <Flight key={index} data={flight} />
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default Home
