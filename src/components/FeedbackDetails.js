import styles from "../styles/FeedbackDetails.module.css";
import arrowUp from "../assets/shared/icon-arrow-up.svg";
import commentIcon from "../assets/shared/icon-comments.svg";
import arrowUpWhite from "../assets/shared/icon-arrow-up-white.svg";
import { useEffect, useState } from "react";
import Parse from "parse";

const FeedbackDetails = (props) => {
  const [upvoteClicked, setUpvoteClicked] = useState();

  const upvoteClickHandler = () => {
    onUpvoteClickSubmit();
  };

  useEffect(() => {
    const checkUpvotes = () => {
      let userUpvoteArray = props.info.get("userUpvotes");
      if (!userUpvoteArray.includes(Parse.User.current().id)) {
        setUpvoteClicked(false);
      } else if (userUpvoteArray.includes(Parse.User.current().id)) {
        setUpvoteClicked(true);
      }
    };
    checkUpvotes();
  }, []);

  async function onUpvoteClickSubmit() {
    let userUpvoteArray = props.info.get("userUpvotes");
    if (!userUpvoteArray.includes(Parse.User.current().id)) {
      userUpvoteArray.push(Parse.User.current().id);
      setUpvoteClicked(true);
    } else if (userUpvoteArray.includes(Parse.User.current().id)) {
      const index = userUpvoteArray.indexOf(Parse.User.current().id);
      userUpvoteArray.splice(index, 1);
      setUpvoteClicked(false);
    }

    props.info.set("userUpvotes", userUpvoteArray);
    props.info.save();
  }

  const feedbackClickHandler = (e) => {
    console.log(e.target.parentElement.id, e.target.id);
    if (
      e.target.parentElement.id !== "upvoteContainer" &&
      e.target.id !== "upvoteContainer"
    ) {
      if (props.onFeedbackClick) {
        props.onFeedbackClick(props.info.id);
      }
    }
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
          <img
            src={arrowUpWhite}
            alt="arrow"
            className={styles.arrow}
            id="upvoteIconWhite"
          ></img>
        ) : (
          <img
            src={arrowUp}
            alt="arrow"
            className={styles.arrow}
            id="upvoteIconUp"
          ></img>
        )}
        <h4
          className={`${styles.counter} ${styles.upvotes}`}
          id="upvoteCounter"
        >
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
