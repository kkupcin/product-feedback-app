import styles from "../styles/Button.module.css";
import icon from "../assets/shared/icon-plus.svg";

const Button = (props) => {
  return (
    <button
      className={`${styles.button} ${styles.buttonHeader}`}
      style={{ backgroundColor: `${props.color}` }}
    >
      <img src={icon} alt="plus" className={styles.icon} />
      {props.title}
    </button>
  );
};

export default Button;
