import Sidebar from "../componants/Sidebar";
import Map from "../componants/Map";
import styles from "./AppLayout.module.css";
import User from "../componants/User";
const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <User />
      <Map />
    </div>
  );
};

export default AppLayout;
