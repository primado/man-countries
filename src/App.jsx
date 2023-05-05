import { Fragment, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { Listbox, Transition } from '@headlessui/react'
import { IoChevronDownSharp, IoCheckmarkSharp } from "react-icons/io5";
import { Link  } from "react-router-dom";
// Route, Switch, useParams, useRouteMatch
import useSWR from 'swr'


import Navbar from './components/Navbar'
import Loader from './components/pageLoader'

const regions = [
  {name: 'Filter by Region'},
  {name: 'all'},
  { name: 'Africa' },
  { name: 'Americas' },
  { name: 'Asia' },
  { name: 'Europe' },
  { name: 'Oceania' },
]


const fetcher = (...args) => fetch(...args).then((res) => res.json());

const API_URL = 'https://restdata.com/v3.1/all';
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";


function App() {
  
  const [region, setRegion] = useState(regions[1])
  const [searchTerm, setSearchTerm] = useState("");
  

  // const { data, error } = useSWR(CORS_PROXY + API_URL, fetcher);



  const { data, error } = useSWR(
    `https://restcountries.com/v2/all?fields=name,population,region,capital,flags`,
    fetcher
  );

  if (error) return <div>Error fetching data</div>;
  if (!data) return <Loader />;

  const filteredCountries =
  region.name === "all"
    ? data
    : data.filter((country) => country.region === region.name);

const searchedCountries =
  searchTerm === ""
    ? filteredCountries
    : filteredCountries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );


  return (
    <div className="App font-nunito dark:bg-[#202d36] dark:min-h-screen text-[14px]">
      <div>
        <Navbar />

        <div className="mt-12">
          <form action="#" className='flex justify-between px-20 sm-425:px-5 sm-375:flex sm-375:flex-col sm-375:gap-y-5 sm-470:flex sm-470:justify-between sm-470:px-5'>
            <div className="form__group w-96">
              
              <div className="relative">  
                <div className="absolute top-0 left-0 mt-3 ml-5">
                  <IoSearchOutline className="text-gray-700 text-xl font-bold dark:text-gray-300" />
                </div>
                <input 
                  className="w-full h-12 px-16 rounded-lg dark:bg-[#202d36] dark:text-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent sm-425:w-56 sm-375:w-60 sm-470:w-56"
                  type="text" 
                  placeholder="Search for a country..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                
                  />
               
              </div>
              
            </div>
            <div className="right-16 w-52 sm-375:w-60 ">
              <Listbox value={region} onChange={setRegion}>
                <div className='relative mt-1'>
                  <Listbox.Button className='relative w-full mb-1 flex items-center bg-white dark:bg-[#202d36] dark:text-white dark:border-none shadow-lg cursor-default rounded-lg py-2 pl-5 h-12 text-left border-2 border-gray-100 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2'>
                    <span className='block truncate dark:text-gray-300'>
                      {region.name}
                    </span>
                    <span className='pointer-events-none absolute inset-y-0  right-0 flex items-center pr-2'>
                      <IoChevronDownSharp className='w-5 h-5 text-gray-400' aria-hidden="true"/>
                    </span>

                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className='absolute shadow-md bg-white dark:bg-[#202d36]'>
                      {regions.map((region) => (
                        <Listbox.Option
                          key={region.name}
                          disabled={region.name === 'Filter by Region'}
                          className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'text-white dark:text-white bg-blue-600' : 'text-gray-900 dark:text-gray-300'
                            }`
                          }

                          value={region}
                        >
                          {({ selected, active}) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-semibold' : 'font-normal'
                                }`}
                              >
                                {region.name}

                              </span>
                              { selected ? (
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-black dark:text-gray-200'>
                                    <IoCheckmarkSharp 
                                    className={`w-7 h-7 ${selected ? 'text-amber-500' : 'text-black'}`}
                                    aria-hidden="true"/>
                                </span>
                              ): null }
                            </>
                          )}

                        </Listbox.Option>
                      ))}

                    </Listbox.Options>

                  </Transition>

                </div>
              </Listbox>
            </div>
          </form>
        </div>

        <div className="countries ">

          <div className="container">
            <div className="grid grid-cols-4 gap-x-28 gap-y-16 px-12 mt-12 xl-1024:grid xl-1024:grid-cols-3 xl-1024:gap-x-16 2md:grid 2md:grid-cols-2 sm-425:grid sm-425:grid-cols-1 sm-425:gap-x-0 sm-320:px-3 sm-375:px-2 sm-470:grid sm-470:grid-cols-1 sm-470:gap-x-0 md-943:grid md-943:grid-cols-2 md-950:grid md-950:grid-cols-2 xl-1080:grid xl-1080:xl-1024:grid-cols-3 xl-1080:gap-x-16">
              {searchedCountries.map((country) => (
              <Link to={`/country/${country.alpha3Code}`}>
                <div key={country.name.common} className="w-72 dark:text-gray-400">
                  <img 
                    src={country.flags.svg} 
                    alt={country.name.common} 
                    className="w-ful object-cover rounded-t-lg"
                  />
                  <div className="description bg-white dark:bg-[#202d36] shadow-lg p-8 ">
                    <h1 className="font-bold text-xl dark:text-white pb-5">
                      {country.name}
                    </h1>
                    <p> 
                      <span className='font-semibold pr-3 dark:text-white'>Population:</span> 
                        {country.population.toLocaleString()}
                      </p>
                    <p>
                      <span className='font-semibold pr-3 dark:text-white'>Region:</span> 
                        {country.region}
                      </p>
                    <p>
                      <span className='font-semibold pr-3 dark:text-white'>Capital:</span> 
                      {country.capital}
                    </p>
                  </div>
                </div>
              </Link>
              ))}

            </div>
          </div>
        </div>

      </div>

      

      
    </div>
  )
}

export default App
