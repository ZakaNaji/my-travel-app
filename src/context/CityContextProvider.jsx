import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();
const BASE_URL = "http://localhost:8182";

const CityContextProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState({});
  const getCurrentCity = async (id) => {
    setIsLoading(true);
    const resp = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await resp.json();
    setCurrentCity(data);
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities`)
      .then((resp) => resp.json())
      .then((data) => setCities(data))
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <CityContext.Provider
      value={{ cities, isLoading, currentCity, getCurrentCity }}
    >
      {children}
    </CityContext.Provider>
  );
};
const useCity = () => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error("useCity called outside of provider");
  }
  return context;
};
export { CityContextProvider, useCity };
