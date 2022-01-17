import styles from "../styles/LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div
      className={`${styles.spinnerContainer} ${
        props.class && styles[props.class]
      }`}
    >
      <div className={styles.ldsDualRing}></div>
    </div>
  );
};

export default LoadingSpinner;
