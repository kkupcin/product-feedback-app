import styles from "../styles/FeedbackDetails.module.css";
import arrowUp from "../assets/shared/icon-arrow-up.svg";
import commentIcon from "../assets/shared/icon-comments.svg";

const FeedbackDetails = (props) => {
  return (
    <div className={styles.container}>
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
      <div className={styles.upvoteContainer}>
        <img src={arrowUp} alt="arrow" className={styles.arrow}></img>
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
