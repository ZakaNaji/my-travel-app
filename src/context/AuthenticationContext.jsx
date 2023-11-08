import { createContext, useContext, useEffect, useReducer } from "react";
import { FAKE_USER } from "../componants/User";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const initState = {
  user: null,
  isAuth: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuth: true };
    case "logout":
      return { ...state, user: null, isAuth: false };
    default:
      throw new Error("Unknown action");
  }
};
const AuthProvider = ({ children }) => {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initState);

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  };
  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider value={{ login, logout, user, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth context used outside provider");
  return context;
};
export { useAuth, AuthProvider };
