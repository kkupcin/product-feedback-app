import styles from "../styles/ButtonTertiary.module.css";

const ButtonTertiary = (props) => {
  const clickHandler = () => {
    props.onClick();
  };

  return (
    <button className={styles.button} onClick={clickHandler}>
      {props.title}
    </button>
  );
};

export default ButtonTertiary;
