import styles from "../styles/FeedbackHeader.module.css";
import Button from "./Button";
import arrowDown from "../assets/shared/icon-arrow-down.svg";

const FeedbackHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <p className={styles.textTitle}>Sort by :</p>
        <h4 className={styles.filterName}>Most Upvotes</h4>
        <img src={arrowDown} className={styles.arrow} alt="arrow" />
      </div>
      <Button color="#ad1fea" title="Add Feedback"></Button>
    </div>
  );
};

export default FeedbackHeader;
