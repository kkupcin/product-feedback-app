import styles from "../styles/FeedbackHeader.module.css";
import ButtonPrimary from "./ButtonPrimary";
import arrowDown from "../assets/shared/icon-arrow-down.svg";

const FeedbackHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <p className={styles.textTitle}>Sort by :</p>
        <h4 className={styles.filterName}>Most Upvotes</h4>
        <img src={arrowDown} className={styles.arrow} alt="arrow" />
      </div>
      <ButtonPrimary
        color="#ad1fea"
        title="Add Feedback"
        class="buttonHeader"
      ></ButtonPrimary>
    </div>
  );
};

export default FeedbackHeader;
