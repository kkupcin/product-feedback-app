import styles from "../styles/FeedbackDetails.module.css";
import arrowUp from "../assets/shared/icon-arrow-up.svg";
import commentIcon from "../assets/shared/icon-comments.svg";
import arrowUpWhite from "../assets/shared/icon-arrow-up-white.svg";
import { useState } from "react";

const FeedbackDetails = (props) => {
  const [isArrowWhite, setIsArrowWhite] = useState(false);

  const selectedItemHandler = (e) => {
    if (e.target.parentNode.classList.includes("selected")) {
      setIsArrowWhite(true);
    } else {
      setIsArrowWhite(false);
    }
  };

  const upvoteClickHandler = (e) => {
    e.target.classList.toggle(styles.selected);
  };

  return (
    <div
      className={`${styles.container} ${
        props.roadmapPage ? styles.cardRoadmap : ""
      } ${props.feedbackDetailsPage ? styles.feedbackDetailsPage : ""}`}
    >
      <div className={styles.textContainer}>
        {props.roadmapPage && (
          <div className={styles.cardRoadmapInfo}>
            <span
              className={styles.cardRoadmapInfoSpan}
              style={{ backgroundColor: props.color }}
            />
            In Progress
          </div>
        )}
        <h3 className={styles.title}>Add tags for solutions</h3>
        <p className={styles.description}>
          Easier to search for solutions based on a specific stack.
        </p>
        <div className={styles.category}>Enhancement</div>
      </div>
      <div
        className={styles.upvoteContainer}
        onClick={upvoteClickHandler} id="upvoteContainer"
      >
        {isArrowWhite ? (
          <img src={arrowUpWhite} alt="arrow" className={styles.arrow}></img>
        ) : (
          <img src={arrowUp} alt="arrow" className={styles.arrow}></img>
        )}
        <h4 className={`${styles.counter} ${styles.upvotes}`}>112</h4>
      </div>
      <div className={styles.commentContainer}>
        <img src={commentIcon} alt="comment" className={styles.comment}></img>
        <h4 className={styles.counter}>4</h4>
      </div>
    </div>
  );
};

export default FeedbackDetails;
