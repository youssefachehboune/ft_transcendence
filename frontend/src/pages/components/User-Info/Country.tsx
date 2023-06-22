import React, { useState, useEffect, ChangeEvent, Dispatch } from 'react';

interface Country {
  code: string;
  name: string;
}
interface country {
	dispatch: Dispatch<any>;
}

const CountryDropdown  = ({ dispatch }: country) => {
  const [countries, setCountries] = useState<Country[]>([]);

  const handleCountrySelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryCode = event.target.value;

    dispatch({type: "NAME_COUNTRIE", pyload: selectedCountryCode });
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
	<div className="custom-select">
		<select
		id="tree"
		onChange={handleCountrySelect}
		className="bg-gray-50 border-current font-sora  border-2 rounded-full w-[305px] text-[12px] pl-[15px] h-[34px] phone:w-[200px] phone:h-[34px] phone:text-[10px] phone:pl-[10px] Large-phone:w-[220px] Large-phone:h-[40px] Large-phone:text-[10px] Large-phone:pl-[10px] laptop:h-[40px] laptop:text-[14px] laptop:pl-[10px]"
		required
		>
		<option value={''}>Choose a country</option>
      {countries.map((country, key) => (
        <option key={key} value={country.code}>
          {country.name}
        </option>
      ))}
		</select>

	</div>
  );
};

export default CountryDropdown;
