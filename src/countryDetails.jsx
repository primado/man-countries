import React from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import useSWR from "swr"
import { IoArrowBack } from "react-icons/io5";

import Loader from './components/pageLoader'
import Navbar from './components/Navbar'


const fetcher = (...args) => fetch(...args).then((res) => res.json());


export default function CountryDetails() {
    
     //Navigate back to home page
     const navigate = useNavigate();
     const handleBack = () => navigate(-1) 

    const { code } = useParams();

    // Fetch country data using SWR
    const { data: country, error } = useSWR(
        `https://restcountries.com/v2/alpha/${code}`,
      async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      }
    );
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!country) {
      return <Loader />;
    }
  
    const {
      name,
      nativeName,
      population,
      region,
      subregion,
      capital,
      topLevelDomain,
      currencies,
      languages,
      borders,
    } = country;


   
  
    return (
      <div className="dark:bg-very-dark-blue bg-white-mode min-h-screen">

        <div className="navbar">
          <Navbar />
        </div>

        <div className="pt-16 px-16">

          <div className="back">
            <button onClick={handleBack} className="flex justify-center items-center dark:bg-dark-blue rounded-sm w-24 h-8 shadow shadow-dark-blue"> 
              <IoArrowBack className="w-5 mr-2 dark:text-white-mode" />
              <span className="text-dark-blue text-base font-normal dark:text-dark-gray">Back</span> 
            </button>
          </div>

            <div className="container flex pt-12 gap-40 sm-425:gap-20 sm-425:flex-col sm-425:pb-20 2md:flex-col 2md:pb-20 2md:items-start 2md:gap-20 xl-1024:flex-col xl-1024:gap-20 xl-1024:pb-20 xl-1024:items-center">

              <div className="flag">
                <img 
                  src={country.flags.svg} 
                  alt={country.name} 
                  className="shadow-2xl max-w-[34rem] sm-390:max-w-[17rem] sm-425:max-w-[20rem] sm-375:max-w-[17rem] sm-320:max-w-[12rem] md-540:max-w-[25rem] 2md:max-w-[35rem] xl-1024:max-w-[40rem]"
                />
              </div>

              
              <div className="details ">

                

                  <div className="">

                    <div className="mb-6">
                      {country.name ? (
                        <>
                        <h1 className="text-3xl text-very-dark-blue font-bold dark:text-white-mode">{country.name}</h1>

                        </>
                      ) : (
                        <h1 className="text-3xl text-very-dark-blue font-semibold mb-6 dark:text-white-mode">Country Details</h1>
                      )}

                    </div>

                    <div className="flex gap-20 mb-10 max-w-[40rem] sm-425:flex-col sm-425:gap-10">
                      <div className="flex flex-col gap-2">

                        {/* // && nativeName.common */}
                        {nativeName && nativeName.common ? (
                          <p className="text-dark-blue font-medium text-base dark:text-white-mode">Native Name: 
                            <span className="text-base font-normal dark:text-dark-gray">{nativeName.common}</span>
                          </p>
                        ) : (
                          <p className="text-base font-medium text-dark-blue dark:text-white-mode">Native Name: 
                            <span className="text-base font-normal dark:text-dark-gray"> N/A</span>
                          </p>
                        )}
                        {population ? (
                          <p className="text-base font-medium text-dark-blue dark:text-white-mode">Population: 
                            <span className="text-base font-normal dark:text-dark-gray"> {population.toLocaleString()}</span>
                          </p>
                        ) : (
                          <p className="text-base font-medium text-dark-blue dark:text-white-mode">Population: 
                            <span className="text-base font-normal dark:text-dark-gray">N/A</span>
                          </p>
                        )}
                        {region ? (
                          <p className="text-base font-medium text-dark-blue dark:text-white-mode">Region: 
                            <span className="text-base font-normal dark:text-dark-gray"> {region}</span>
                          </p>
                        ) : (
                          <p className="text-base font-medium dark:text-dark-gray">Region: 
                            <span className="text-base font-normal dark:text-dark-gray">N/A </span> 
                          </p>
                        )}
                        {subregion ? (
                          <p className="text-base font-medium text-dark-blue dark:text-white-mode">Subregion: 
                            <span className="text-base font-normal dark:text-dark-gray"> {subregion}</span>
                          </p>
                        ) : (
                          <p className="text-base font-medium text-dark-blue dark:text-white-mode">Subregion: 
                            <span className="dark:text-dark-gray text-base font-normal"> N/A</span>
                          </p>
                        )}
                        {capital ? (
                          <p className="text-base font-medium text-dark-blue dark:text-white-mode">Capital: 
                            <span className="text-base font-normal dark:text-dark-gray"> {capital}</span>
                          </p>
                        ) : (
                          <p className="text-base font-medium text-dark-blue dark:text-white-mode">Capital: 
                            <span className="text-base font-normal dark:text-dark-gray"> N/A</span>
                          </p>
                        )}
                      </div>

                    <div className=" flex flex-col gap-2">

                      {topLevelDomain && topLevelDomain.length > 0 ? (
                        <p className="text-dark-blue font-medium text-base dark:text-white-mode">Top Level Domain: 
                         <span className="text-base font-normal dark:text-dark-gray"> {topLevelDomain[0]}</span>
                        </p>
                      ) : (
                        <p className="text-dark-blue font-medium text-base dark:text-white-mode">Top Level Domain:
                          <span className="text-base font-normal dark:text-dark-gray"> N/A </span>
                        </p>
                      )}
                      {currencies && Object.keys(currencies).length > 0 ? (
                        <p className="text-dark-blue font-medium text-base dark:text-white-mode">
                          Currencies: <span className="text-base font-normal dark:text-dark-gray"> {" "}
                          {Object.keys(currencies)
                            .map((key) => `${key} (${currencies[key].name})`)
                            .join(", ")}
                          </span>
                        </p>
                      ) : (
                        <p className="text-dark-blue font-medium text-base dark:text-white-mode">Currencies: 
                          <span className="text-base font-normal dark:text-dark-gray"> N/A </span> 
                        </p>
                      )}
                      {languages && Object.keys(languages).length > 0 ? (
                        <p className="text-dark-blue font-medium text-base dark:text-white-mode">
                          Languages: <span className="text-base font-normal dark:text-dark-gray"> {" "}
                          {Object.keys(languages)
                            .map((key) => `${key} (${languages[key].name})`)
                            .join(", ")}
                          </span>
                        </p>
                      ) : (
                        <p className="text-dark-blue font-medium text-base dark:text-white-mode">Languages: 
                          <span className="text-base font-medium dark:text-dark-gray"> N/A</span>
                        </p>
                      )}
                    </div>

                  </div>

                </div>

                <div className="">

                  {borders && borders.length > 0 ? (
                    <div className="flex flex-row sm-425:flex-col sm-425:flex-wrap gap-6">
                      <p className="text-dark-blue font-medium text-base dark:text-white-mode">Border Countries:</p>
                      <ul className="flex gap-8 flex-wrap ">
                        {borders.map((border) => (
                          <Link to={`/country/${border}`}>
                           
                          <li 
                            className="flex justify-center items-center font-normal dark:text-dark-gray dark:bg-dark-blue rounded-sm w-24 h-8 shadow-sm shadow-black"
                            key={border}>
                            {border} 
                          </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-dark-blue flex gap-6 font-medium text-base dark:text-white-mode">Border Countries: 
                      <span className="flex flex-row items-center justify-center font-normal dark:text-dark-gray dark:bg-dark-blue rounded-sm w-24 h-8 shadow-sm shadow-black">N/A</span>
                    </p>
                  )}
                </div>
              </div>
          </div>
        </div>
      </div>
    )
}
