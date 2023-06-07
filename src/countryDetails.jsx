import React from "react"
import { useParams } from "react-router-dom";
import useSWR from "swr"



const fetcher = (...args) => fetch(...args).then((res) => res.json());


export default function CountryDetails() {
     
    const { code } = useParams();

    console.log(code)

    // Fetch country data using SWR
    const { data: country, error } = useSWR(
        `https://restcountries.com/v2/alpha/${code}`,
      async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      }
    );

    console.log(country)
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!country) {
      return <div>Loading...</div>;
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
        <h1 className="font-semibold text-2xl text-red-500">Country detail view/page is temporarily not availablle. The Software Developer is working to resolve this issue. </h1>
        {name && name.common ? (
          <h1>{name.common}</h1>
        ) : (
          <h1>Country Details</h1>
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
              {borders.map((border, index) => (
                <li key={border+index}>{border}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Border Countries: N/A</p>
        )}
      </div>
    )
}