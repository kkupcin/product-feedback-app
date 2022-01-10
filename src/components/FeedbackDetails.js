import styles from "../styles/FeedbackDetails.module.css";
import arrowUp from "../assets/shared/icon-arrow-up.svg";
import commentIcon from "../assets/shared/icon-comments.svg";
import arrowUpWhite from "../assets/shared/icon-arrow-up-white.svg";
import { useState } from "react";

const FeedbackDetails = (props) => {
  const [upvoteClicked, setUpvoteClicked] = useState(false);

  const upvoteClickHandler = () => {
    setUpvoteClicked(!upvoteClicked);
  };

  const feedbackClickHandler = () => {
    props.onFeedbackClick(props.info.id);
  };

  return (
    <div
      onClick={feedbackClickHandler}
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
            {props.info.get("status")}
          </div>
        )}
        <h3 className={styles.title}>{props.info.get("title")}</h3>
        <p className={styles.description}>{props.info.get("description")}</p>
        <div className={styles.category}>{props.info.get("category")}</div>
      </div>
      <div
        className={`${styles.upvoteContainer} ${
          upvoteClicked && styles.selected
        }`}
        onClick={upvoteClickHandler}
        id="upvoteContainer"
      >
        {upvoteClicked ? (
          <img src={arrowUpWhite} alt="arrow" className={styles.arrow}></img>
        ) : (
          <img src={arrowUp} alt="arrow" className={styles.arrow}></img>
        )}
        <h4 className={`${styles.counter} ${styles.upvotes}`}>
          {props.info.get("userUpvotes").length}
        </h4>
      </div>
      <div className={styles.commentContainer}>
        <img src={commentIcon} alt="comment" className={styles.comment}></img>
        <h4 className={styles.counter}>{props.commentCounter}</h4>
      </div>
    </div>
  );
};

export default FeedbackDetails;
