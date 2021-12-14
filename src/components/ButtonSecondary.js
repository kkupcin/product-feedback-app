import styles from "../styles/ButtonSecondary.module.css";
import icon from "../assets/shared/icon-arrow-left.svg";
import iconWhite from "../assets/shared/icon-arrow-left-white.svg";
import { useNavigate } from "react-router-dom";

const ButtonSecondary = (props) => {
  let navigate = useNavigate();
  const clickHandler = () => {
    navigate("/");
  };

  return (
    <button
      className={`${styles.button} ${styles[props.class] || ""}`}
      style={{ color: props.color || "#647196" }}
      onClick={clickHandler}
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
