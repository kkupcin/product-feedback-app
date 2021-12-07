import styles from "../styles/ButtonPrimary.module.css";
import icon from "../assets/shared/icon-plus.svg";

const ButtonPrimary = (props) => {
  return (
    <button
      className={`${styles.button} ${styles[props.class] || ""}`}
      style={{ backgroundColor: `${props.color}`, width: `${props.width}` }}
    >
      {props.icon && <img src={icon} alt="plus" className={styles.icon} />}
      {props.title}
    </button>
  );
};

export default ButtonPrimary;

// LINKS TO NAVIGATE TO / SUBMIT INFO
