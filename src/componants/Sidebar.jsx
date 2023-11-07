import Logo from "./Logo";
import AppNav from "./AppNav";
import Style from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={Style.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={Style.footer}>
        <p className={Style.copyright}>
          &copy; Copyright ({new Date().getFullYear()}) by ZNAJI
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
