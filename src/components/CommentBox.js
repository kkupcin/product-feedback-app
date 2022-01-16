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
  const [newReplyContent, setNewReplyContent] = useState("");
  const [currReplies, setCurrReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fieldIsEmpty, setFieldIsEmpty] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [replyingTo, setReplyingTo] = useState();

  // Submit reply
  const replySubmitHandler = async () => {
    if (!fieldIsEmpty && replyingTo) {
      let NewReply = Parse.Object.extend("Reply");
      let newReply = new NewReply();

      newReply.set("content", newReplyContent);
      newReply.set("user", Parse.User.current());
      newReply.set("comment", props.info);
      newReply.set("replyingTo", replyingTo);

      await newReply.save();
      getReplies();
      replyBtnHandler();
      setNewReplyContent("");
    }
  };

  const replyBtnHandler = async (poster) => {
    setReplyBoxActive(!replyBoxActive);
    if (poster) {
      let pointer = Parse.User.createWithoutData(poster.id);
      setReplyingTo(pointer);
    } else {
      let pointer = Parse.User.createWithoutData(commPoster.id);
      setReplyingTo(pointer);
    }
  };

  const getReplies = async () => {
    setIsLoading(true);
    let query = new Parse.Query("Reply");
    query.equalTo("comment", props.info);
    query.include("replyingTo.username");
    let results = await query.find();
    setCurrReplies(results);
    getReplyUsers(results);
  };

  useEffect(() => {
    getReplies();
    getCommentUser();
  }, []);

  const replyChangeHandler = (e) => {
    setNewReplyContent(e.target.value);
    if (e.target.value.trim() === "") {
      setFieldIsEmpty(true);
      setButtonDisabled(true);
    } else {
      setFieldIsEmpty(false);
      setButtonDisabled(false);
    }
  };

  // Get comment creator's information for displaying and set it in 'comment poster' state
  const getCommentUser = async () => {
    let result = await Parse.Cloud.run("fetchPosterById", {
      userId: props.info.get("user").id,
    });

    setCommPoster(result);
  };

  // Get comment creator's information for displaying and set it in 'reply poster' state
  const getReplyUsers = async (replies) => {
    let posterArray = [];
    for (let i = 0; i < replies.length; i++) {
      let result = await Parse.Cloud.run("fetchPosterById", {
        userId: replies[i].get("user").id,
      });
      posterArray.push(result);
    }
    setReplyPosters(posterArray);
    setIsLoading(false);
  };

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
              <div className={styles.replyInputContainer}>
                <div
                  className={`${styles.replyInputBox} ${
                    fieldIsEmpty && styles.fieldEmpty
                  }`}
                >
                  <textarea
                    rows="3"
                    className={styles.textInput}
                    maxLength="250"
                    onChange={replyChangeHandler}
                    // defualtValue={`${replyingTo} ${newReplyContent}`}
                  />
                  <span className={styles.messageSpan}></span>
                </div>
                <ButtonPrimary
                  title="Post Reply"
                  color="purple"
                  class="buttonReply"
                  onBtnClick={replySubmitHandler}
                  class={buttonDisabled && "btnDisabled"}
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
            <div className={styles.replyInputContainer}>
              <div
                className={`${styles.replyInputBox} ${
                  fieldIsEmpty && styles.fieldEmpty
                }`}
              >
                <textarea
                  rows="3"
                  className={styles.textInput}
                  maxLength="250"
                  onChange={replyChangeHandler}
                  // defualtValue={`${replyingTo} ${newReplyContent}`}
                />
                <span className={styles.messageSpan}></span>
              </div>
              <ButtonPrimary
                title="Post Reply"
                color="purple"
                class="buttonReply"
                onBtnClick={replySubmitHandler}
                class={buttonDisabled && "btnDisabled"}
              />
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default CommentBox;
