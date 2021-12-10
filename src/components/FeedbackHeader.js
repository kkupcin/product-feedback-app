import styles from "../styles/FeedbackHeader.module.css";
import ButtonPrimary from "./ButtonPrimary";
import arrowDown from "../assets/shared/icon-arrow-down.svg";
import icon from "../assets/suggestions/icon-suggestions.svg";

const FeedbackHeader = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.mainTitleBox}>
          <img src={icon} alt="suggestions" className={styles.icon} />
          <h1 className={styles.mainTitle}>6 Suggestions</h1>
        </div>
        <p className={styles.textTitle}>Sort by :</p>
        <h4 className={styles.filterName}>Most Upvotes</h4>
        <img src={arrowDown} className={styles.arrow} alt="arrow" />
      </div>
      <ButtonPrimary
        color="purple"
        title="Add Feedback"
        class="buttonHeader"
        icon={true}
      ></ButtonPrimary>
    </div>
  );
};

export default FeedbackHeader;
