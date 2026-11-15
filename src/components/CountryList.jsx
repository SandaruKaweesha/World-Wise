import React from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";

CountryList.propTypes = {
  cities: PropTypes.array.isRequired,
  isloading: PropTypes.bool,
};

function CountryList({ cities, isloading }) {
  if (isloading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map " />
    );
  }

  //   const countries = cities.reduce((arr, city) => {
  //     if (arr.map((el) => el.country).includes(city.country)) {
  //       return [...arr, { country: city.country, emoji: city.emoji }];
  //     } else {
  //       return arr;
  //     }
  //   }, []);

  const countries = cities.reduce((arr, city) => {
    const countryAlreadyExists = arr
      .map((country) => country.country)
      .includes(city.country);

    if (!countryAlreadyExists) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }

    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {Array.isArray(countries) &&
        countries.map((country) => (
          <CountryItem country={country} key={country.country} />
        ))}
    </ul>
  );
}

export default CountryList;
