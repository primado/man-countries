import { Fragment, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { Listbox, Transition } from '@headlessui/react'
import { IoChevronDownSharp, IoCheckmarkSharp } from "react-icons/io5";
import { Link  } from "react-router-dom";
// Route, Switch, useParams, useRouteMatch
import useSWR from 'swr'
import ScrollToTop from 'react-scroll-to-top';
import ScrollToTopBtn from './components/ScrollBtn';


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


function App() {
  
  const [region, setRegion] = useState(regions[1])
  const [searchTerm, setSearchTerm] = useState("");
  


  const { data, error } = useSWR(
    `https://restcountries.com/v2/all?fields=name,population,region,capital,flags,alpha2Code`,
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
    <div className="App font-nunito w-full min-h-screen dark:bg-very-dark-blue">
      <div>
        <Navbar className="w-full"/>
     
        
        <div className="mt-12">
          <form action="#" className='flex justify-between items-center px-32 2md:px-16  sm-425:w-full sm-425:flex sm-425:px-4 sm-425:justify-between gap-10 sm-375:flex sm-375:flex-col sm-375:gap-5'>
            <div className="form__group w-96 sm-375:w-60">
              
              <div className="relative">  
                <div className="absolute top-0 left-0 mt-3 ml-5">
                  <IoSearchOutline className="text-gray-700 text-xl font-bold dark:text-gray-300" />
                </div>
                <input 
                  className="w-full h-12 px-16 rounded-lg  dark:bg-dark-blue dark:text-gray-300 shadow-md shadow-black dark:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  type="text" 
                  placeholder="Search for a country..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                
                  />
               
              </div>
              
            </div>
            <div className="right-16 w-60 sm-375:w-60 ">
              <Listbox value={region} onChange={setRegion}>
                <div className='relative mt-1'>
                  <Listbox.Button className='relative w-full mb-1 flex items-center bg-white dark:bg-dark-blue dark:text-white dark:border-none shadow-md shadow-black dark:shadow-sm cursor-default rounded-lg py-2 pl-5 h-12 text-left border-2 border-gray-100 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2'>
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
                    <Listbox.Options className='absolute shadow-md bg-white dark:bg-dark-blue'>
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

        <ScrollToTop 
          smooth={true}
          component={<ScrollToTopBtn/>}
          width='50'
        />
        <div className="countries w-full flex justify-center items-center pb-12 mt-12">

          <div className="container px-8">
            <div className="grid grid-cols-4 justify-center gap-8 xl-1024:grid xl-1024:grid-cols-3 2md:grid 2md:grid-cols-2 md-910:grid md-910:grid-cols-2 sm-425:flex sm-425:flex-col sm-425:justify-center sm-425:items-center sm-425:gap-12">
              {searchedCountries.map((country) => (
              <Link to={`/country/${country.alpha2Code}`}>
                <div key={country.name.common} className="max-w-[18rem] sm-425:max-w-[20rem] sm-375:max-w-[17.9rem] shadow-2xl">
                  <img 
                    src={country.flags.svg} 
                    alt={country.name.common} 
                    className="w-full object-cover rounded-t-lg"
                  />
                  <div className="description p-8 rounded-b-lg dark:bg-dark-blue ">
                    <h1 className="dark:text-white-mode text-xl font-bold mb-3">
                      {country.name}
                    </h1>
                    <p> 
                      <span className='font-medium pr-3 dark:text-very-light-gray'>Population:</span> 
                        <span className='dark:text-dark-gray'>{country.population.toLocaleString()}</span>
                        
                      </p>
                    <p>
                      <span className='font-medium pr-3 dark:text-very-light-gray '>Region:</span> 
                        <span className='dark:text-dark-gray'>{country.region}</span> 
                      </p>
                    <p>
                      <span className='font-medium pr-3 dark:text-white'>Capital:</span> 
                      <span className='dark:text-dark-gray'>{country.capital}</span> 
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
