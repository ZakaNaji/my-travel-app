import styles from "./Button.module.css";

const Button = ({ children, onClicke, type }) => {
  return (
    <button onClick={onClicke} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
