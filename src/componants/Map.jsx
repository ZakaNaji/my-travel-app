import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
const Map = () => {
  const navigate = useNavigate();
  const [searchParamas, setSearchParams] = useSearchParams();
  const lat = searchParamas.get("lat");
  const lng = searchParamas.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <p>{lat}</p>
      <p>{lng}</p>
    </div>
  );
};

export default Map;
