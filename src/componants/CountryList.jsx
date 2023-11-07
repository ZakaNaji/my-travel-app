import { useCity } from "../context/CityContextProvider";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
const CountryList = () => {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="select visited country from map" />;

  const countries = cities.reduce((prev, curr) => {
    return prev.map((el) => el.country).includes(curr.country)
      ? prev
      : [...prev, { country: curr.country, emoji: curr.emoji }];
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;
