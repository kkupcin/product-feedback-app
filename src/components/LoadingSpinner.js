import styles from "../styles/LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.ldsDualRing}></div>
    </div>
  );
};

export default LoadingSpinner;
