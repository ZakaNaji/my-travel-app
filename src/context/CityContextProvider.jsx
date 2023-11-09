import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import ACTIONS from "../Utility/Actions";

const CityContext = createContext();
const BASE_URL = "http://localhost:8182";
const initState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CITIES_LOADED:
      return { ...state, cities: action.payload, isLoading: false };
    case ACTIONS.CITIES_CHANGED:
      return { ...state, cities: action.payload };
    case ACTIONS.CURRENT_CITY_LOADED:
      return { ...state, isLoading: false, currentCity: action.payload };
    case ACTIONS.LOADING:
      return { ...state, isLoading: action.payload };
  }
};

const CityContextProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initState
  );

  const getCurrentCity = useCallback(
    async (id) => {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: ACTIONS.LOADING, payload: true });
      const resp = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await resp.json();
      dispatch({ type: ACTIONS.CURRENT_CITY_LOADED, payload: data });
    },
    [currentCity.id]
  );
  const setNewCity = async (newCity) => {
    dispatch({ type: ACTIONS.LOADING, payload: true });
    const resp = await fetch(`${BASE_URL}/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    dispatch({ type: ACTIONS.CITIES_LOADED, payload: [...cities, data] });
    dispatch({ type: ACTIONS.CURRENT_CITY_LOADED, payload: data });
  };

  const deleteCity = async (id) => {
    dispatch({ type: ACTIONS.LOADING, payload: true });
    const resp = await fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    });
    dispatch({
      type: ACTIONS.CITIES_LOADED,
      payload: cities.filter((city) => city.id !== id),
    });
  };
  useEffect(() => {
    dispatch({ type: ACTIONS.LOADING, payload: true });
    fetch(`${BASE_URL}/cities`)
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: ACTIONS.CITIES_CHANGED, payload: data }))
      .catch((err) => console.log(err.message))
      .finally(() => dispatch({ type: ACTIONS.LOADING, payload: false }));
  }, []);
  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCurrentCity,
        setNewCity,
        deleteCity,
      }}
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
