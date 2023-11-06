import { Link, NavLink } from "react-router-dom";
import Style from "./PageNave.module.css";
import Logo from "./Logo";

const PageNav = () => {
  return (
    <nav className={Style.nav}>
      <Link to="/">
        <Logo />
      </Link>
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={Style.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
