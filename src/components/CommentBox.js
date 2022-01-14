import styles from "../styles/CommentBox.module.css";
import ButtonPrimary from "./ButtonPrimary";
import ButtonTertiary from "./ButtonTertiary";
import Parse from "parse";
import LoadingSpinner from "../components/LoadingSpinner";
import React, { useState, useEffect } from "react";
import ReplyBox from "./ReplyBox";

const CommentBox = (props) => {
  const [commPoster, setCommPoster] = useState();
  const [replyPosters, setReplyPosters] = useState([]);
  const [replyBoxActive, setReplyBoxActive] = useState(false);
  const [currReplies, setCurrReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Toggle if reply box is visible
  const replyBtnHandler = (e) => {
    setReplyBoxActive(!replyBoxActive);
  };

  async function getReplies() {
    let query = new Parse.Query("Reply");
    query.equalTo("comment", props.info);
    let results = await query.find();
    setCurrReplies(results);
    getReplyUsers(results);
  }

  useEffect(() => {
    getReplies();
    getCommentUser();
  }, []);

  // Get comment creator's information for displaying and set it in 'comment poster' state
  async function getCommentUser() {
    let result = await Parse.Cloud.run("fetchPosterById", {
      userId: props.info.get("user").id,
    });

    setCommPoster(result);
  }

  // Get comment creator's information for displaying and set it in 'reply poster' state
  async function getReplyUsers(replies) {
    let posterArray = [];
    for (let i = 0; i < replies.length; i++) {
      let result = await Parse.Cloud.run("fetchPosterById", {
        userId: replies[i].get("user").id,
      });
      posterArray.push(result);
    }
    setReplyPosters(posterArray);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {currReplies.length > 0 && commPoster && !isLoading && (
        <div className={styles.commentAndReplyContainer}>
          <div className={styles.commentWithReplies}>
            <img
              src={commPoster.avatar.url()}
              alt="user profile"
              className={styles.userIcon}
            />
            <div className={styles.userInfoContainer}>
              <div className={styles.userInfoText}>
                <h3
                  className={styles.userInfoName}
                >{`${commPoster.firstName} ${commPoster.lastName}`}</h3>
                <p className={styles.username}>@{commPoster.username}</p>
              </div>
            </div>
            <ButtonTertiary
              title="Reply"
              onClick={replyBtnHandler}
              class="replyBtn"
            />
            <span className={styles.borderSpan}></span>
            <p className={styles.commentText}>{props.info.get("content")}</p>
            <ReplyBox
              replies={currReplies}
              replyPosters={replyPosters}
              replyBtnHandler={replyBtnHandler}
            />
            {replyBoxActive && (
              <div className={styles.replyInputBox}>
                <textarea
                  rows="3"
                  className={styles.textInput}
                  maxLength="250"
                />
                <ButtonPrimary
                  title="Post Reply"
                  color="purple"
                  class="buttonReply"
                  demoMode={process.env.REACT_APP_DEMO_MODE}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {currReplies.length === 0 && commPoster && !isLoading && (
        <div className={styles.userCommentBox}>
          <img
            src={commPoster.avatar.url()}
            alt="user profile"
            className={styles.userIcon}
          />
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfoText}>
              <h3
                className={styles.userInfoName}
              >{`${commPoster.firstName} ${commPoster.lastName}`}</h3>
              <p className={styles.username}>@{commPoster.username}</p>
            </div>
          </div>
          <ButtonTertiary
            title="Reply"
            onClick={replyBtnHandler}
            class="replyBtn"
          />
          <p className={styles.commentText}>{props.info.get("content")}</p>
          {replyBoxActive && (
            <div className={styles.replyInputBox}>
              <textarea rows="3" className={styles.textInput} maxlength="250" />
              <ButtonPrimary
                title="Post Reply"
                color="purple"
                class="buttonReply"
                demoMode={process.env.REACT_APP_DEMO_MODE}
              />
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default CommentBox;
