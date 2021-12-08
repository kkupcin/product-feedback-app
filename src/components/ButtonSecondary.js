import styles from "../styles/ButtonSecondary.module.css";
import icon from "../assets/shared/icon-arrow-left.svg";
import iconWhite from "../assets/shared/icon-arrow-left-white.svg";

const ButtonSecondary = (props) => {
  return (
    <button
      className={`${styles.button} ${styles[props.class] || ""}`}
      style={{ color: props.color || "#647196" }}
    >
      {props.icon && (
        <img
          src={props.iconWhite ? iconWhite : icon}
          alt="arrow"
          className={styles.arrow}
        ></img>
      )}
      {props.title}
    </button>
  );
};

export default ButtonSecondary;
