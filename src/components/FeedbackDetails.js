import styles from "../styles/FeedbackDetails.module.css";
import arrowUp from "../assets/shared/icon-arrow-up.svg";
import commentIcon from "../assets/shared/icon-comments.svg";
import arrowUpWhite from "../assets/shared/icon-arrow-up-white.svg";
import React, { useEffect, useState } from "react";
import Parse from "parse";

const FeedbackDetails = (props) => {
  const [upvoteClicked, setUpvoteClicked] = useState();
  const [message, setMessage] = useState("");

  // Trigger async function upon click
  const upvoteClickHandler = () => {
    onUpvoteClickSubmit();
  };

  // Check if user has upvoted and set 'upvoteClicked' state
  const checkUpvotes = () => {
    let userUpvoteArray = props.info.get("userUpvotes");

    if (!userUpvoteArray.includes(Parse.User.current().id)) {
      setUpvoteClicked(false);
    } else if (userUpvoteArray.includes(Parse.User.current().id)) {
      setUpvoteClicked(true);
    }
  };

  useEffect(() => {
    checkUpvotes();
  }, [props.info]);

  // Check if user has upvoted and update upvote status in Parse
  const onUpvoteClickSubmit = async () => {
    try {
      const response = await Parse.Cloud.run("toggleVote", {
        feedbackId: props.info.id,
      });

      setUpvoteClicked(response);

      props.onUpvote();
    } catch (err) {
      setMessage(`Could not upvote: ${err}`);
    }
  };

  // Pass on current feedback id on click for redirecting
  const feedbackClickHandler = (e) => {
    // Exclude upvote container click from redirecting
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
    <React.Fragment>
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
      {message && <div className={styles.errorMessage}>{message}</div>}
    </React.Fragment>
  );
};

export default FeedbackDetails;
