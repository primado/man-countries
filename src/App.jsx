import { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import useSWR from 'swr'


import Navbar from './components/Navbar'

function App() {

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error } = useSWR(' https://restcountries.com/v3.1/all', fetcher);

  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>Loading...</div>;


  return (
    <div className="App font-nunito">
      <div>
        <Navbar />

        <div className="mt-12">
          <form action="#" className='flex justify-between px-20'>
            <div className="form__group w-96">
              
              <div className="relative">
                <div className="absolute top-0 left-0 mt-3 ml-5">
                  <IoSearchOutline className="text-gray-700 text-xl font-bold" />
                </div>
                <input 
                  className="w-full h-12 px-16 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  type="text" 
                  placeholder="Search for a country..." />
               
              </div>
              
            </div>
            <div className="form__group">
              Select a Region
            </div>
          </form>
        </div>

        <div className="countries">

          <div className="container">
            <div className="grid grid-cols-4 gap-4 px-20 mt-12">
              {data.map((country) => (
              <div className="nation" key={country.name.common}>
                <img src={country.flags.svg} alt={country.name.common} />
                <div className="description">
                  <h1 className="font-bold text-xl">{country.name.official}</h1>
                  <p>Population: {country.population}</p>
                  <p>Region: {country.region}</p>
                  <p>Capital: {country.capital}</p>
                </div>
              </div>
              ))}

            </div>
          </div>
        </div>

      </div>

      

      
    </div>
  )
}

export default App
