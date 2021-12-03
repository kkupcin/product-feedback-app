import styles from "../styles/Button.module.css";

const Button = (props) => {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: `${props.color}` }}
    >
      {props.title}
    </button>
  );
};

export default Button;
