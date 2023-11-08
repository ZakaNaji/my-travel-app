import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthenticationContext";
import { useEffect } from "react";

const Protectedroute = ({ children }) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuth);
    if (!isAuth) navigate("/login");
  }, [isAuth, navigate]);
  return isAuth ? children : null;
};

export default Protectedroute;
