import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import React, { useState, useEffect, ChangeEvent, Dispatch } from 'react';

interface Country {
  code: string;
  name: string;
}
const Select_contry  = ({data, location, setlocation}: any) => {
  const [countries, setCountries] = useState<Country[]>([]);

  const handleCountrySelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryCode = event.target.value;
    setlocation(selectedCountryCode)
  };

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name')
      .then((response) => response.json())
      .then((data: Country[]) => {
        const sortedCountries = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCountries(sortedCountries);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <FormControl mt={4}>
    <FormLabel>contry</FormLabel>

      <Select
      id="tree"
      onChange={handleCountrySelect}
      required
      >
      <option value={location ? location: data.info?.location}>{location ? location: data.info?.location}</option>
        {countries.map((country, key) => (
          <option key={key} value={country.code}>
            {country.name}
          </option>
        ))}
      </Select>
      </FormControl>
  );
};
export default Select_contry;