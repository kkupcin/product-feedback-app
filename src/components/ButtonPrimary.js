import styles from "../styles/ButtonPrimary.module.css";
import icon from "../assets/shared/icon-plus.svg";

// Main button

const ButtonPrimary = (props) => {
  return (
    <button
      className={`${styles.button} ${styles[props.class] || ""} ${
        styles[props.color] || ""
      } ${props.demoMode && styles.demoMode}`}
      onClick={props.onBtnClick}
    >
      {props.icon && <img src={icon} alt="plus" className={styles.icon} />}
      {props.title}
    </button>
  );
};

export default ButtonPrimary;
