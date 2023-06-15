"use client";

import Select from "react-select"; /**after npm install react-select */
import ReactCountryFlag from "react-country-flag"; /** npm install --save react-country-flag */
import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex items-center gap-3">
            {/* <div>{option.flag}</div> */}
            <ReactCountryFlag
              className="w-[1em] h-[1em]"
              countryCode={option.value}
              svg
              aria-label={option.label}
            />
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25:
              "#ffe4e6" /**this gives the country options the color of our airbnb logo */,
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
