import Sidebar from "../componants/Sidebar";
import Map from "../componants/Map";
import styles from "./AppLayout.module.css";
const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
