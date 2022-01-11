import styles from "../styles/ButtonTertiary.module.css";

// Tertiary button

const ButtonTertiary = (props) => {
  const clickHandler = () => {
    props.onClick();
  };

  return (
    <button
      className={`${styles.button} ${styles[props.class] || ""}`}
      onClick={clickHandler}
    >
      {props.title}
    </button>
  );
};

export default ButtonTertiary;
