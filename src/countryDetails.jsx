import React from "react"
import { useParams, useNavigate } from "react-router-dom";
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
      <div>

        <div className="navbar">
          <Navbar />
        </div>

        <div className="pt-16 px-16">

          <div className="back">
            <button onClick={handleBack} className="flex justify-center items-center rounded-sm w-24 h-8 shadow shadow-dark-blue"> 
              <IoArrowBack className="w-5 mr-2" />
              <span className="text-dark-blue text-base font-medium">Back</span> 
            </button>
          </div>

            <div className="container flex pt-12 gap-40">

            <div className="flag">
              <img 
                src={country.flags.svg} 
                alt={country.name} 
                className="w-[32rem]"
              />
            </div>

              <div className="">

                {country.name ? (
                  <>
                  <h1 className="text-3xl text-very-dark-blue font-semibold mb-6">{country.name}</h1>

                  </>
                ) : (
                  <h1 className="text-3xl text-very-dark-blue font-semibold mb-6">Country Details</h1>
                )}
                {nativeName && nativeName.common ? (
                  <p>Native Name: {nativeName.common}</p>
                ) : (
                  <p>Native Name: N/A</p>
                )}
                {population ? (
                  <p>Population: {population}</p>
                ) : (
                  <p>Population: N/A</p>
                )}
                {region ? (
                  <p>Region: {region}</p>
                ) : (
                  <p>Region: N/A</p>
                )}
                {subregion ? (
                  <p>Subregion: {subregion}</p>
                ) : (
                  <p>Subregion: N/A</p>
                )}
                {capital ? (
                  <p>Capital: {capital}</p>
                ) : (
                  <p>Capital: N/A</p>
                )}
                {topLevelDomain && topLevelDomain.length > 0 ? (
                  <p>Top Level Domain: {topLevelDomain[0]}</p>
                ) : (
                  <p>Top Level Domain: N/A</p>
                )}
                {currencies && Object.keys(currencies).length > 0 ? (
                  <p>
                    Currencies:{" "}
                    {Object.keys(currencies)
                      .map((key) => `${key} (${currencies[key].name})`)
                      .join(", ")}
                  </p>
                ) : (
                  <p>Currencies: N/A</p>
                )}
                {languages && Object.keys(languages).length > 0 ? (
                  <p>
                    Languages:{" "}
                    {Object.keys(languages)
                      .map((key) => `${key} (${languages[key].name})`)
                      .join(", ")}
                  </p>
                ) : (
                  <p>Languages: N/A</p>
                )}
                {borders && borders.length > 0 ? (
                  <div>
                    <p>Border Countries:</p>
                    <ul>
                      {borders.map((border) => (
                        <li key={border}>{border}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>Border Countries: N/A</p>
                )}
              </div>
          </div>
        </div>
      </div>
    )
}