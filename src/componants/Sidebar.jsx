import Logo from "./Logo";
import AppNav from "./AppNav";
import Style from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={Style.sidebar}>
      <Logo />
      <AppNav />
      <p>List of ceties</p>
      <footer className={Style.footer}>
        <p className={Style.copyright}>
          &copy; Copyright ({new Date().getFullYear()}) by ZNAJI
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
