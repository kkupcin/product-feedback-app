import styles from "../styles/CommentBox.module.css";
import ButtonPrimary from "./ButtonPrimary";
import ButtonTertiary from "./ButtonTertiary";
import Parse from "parse";
import LoadingSpinner from "../components/LoadingSpinner";
import React, { useState, useEffect } from "react";
import ReplyBox from "./ReplyBox";

const CommentBox = (props) => {
  const [commPoster, setCommPoster] = useState();
  const [replyBoxActive, setReplyBoxActive] = useState(false);
  const [newReplyContent, setNewReplyContent] = useState("");
  const [currReplies, setCurrReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fieldIsEmpty, setFieldIsEmpty] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [replyingTo, setReplyingTo] = useState();
  const [message, setMessage] = useState("");

  // Submit reply to Parse
  const replySubmitHandler = async () => {
    if (!fieldIsEmpty && replyingTo) {
      try {
        await Parse.Cloud.run("newReply", {
          newReplyContent: newReplyContent,
          commentId: props.info.id,
          posterId: replyingTo,
        });

        // Refresh the replies and reset the reply field
        getReplies();
        replyBtnHandler();
        setNewReplyContent("");
      } catch (err) {
        setMessage(`Could not submit reply: ${err}`);
      }
    }
  };

  const replyBtnHandler = async (poster) => {
    setReplyBoxActive(!replyBoxActive);

    // Set 'replyingTo' to the correct user
    if (poster) {
      setReplyingTo(poster.id);
    } else {
      setReplyingTo(commPoster.id);
    }
  };

  // Fetch replies for displaying
  const getReplies = async () => {
    setIsLoading(true);

    let results = await Parse.Cloud.run("fetchRepliesByCommentId", {
      commentId: props.info.id,
    });

    setCurrReplies(results);
    getCommentUser();
  };

  useEffect(() => {
    getReplies();
  }, []);

  const replyChangeHandler = (e) => {
    setNewReplyContent(e.target.value);

    // Adjust if the button is disabled and submission is allowed
    if (e.target.value.trim() === "") {
      setFieldIsEmpty(true);
      setButtonDisabled(true);
      props.isBtnDisabled(true);
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
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        currReplies.length > 0 &&
        commPoster &&
        !isLoading && (
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
                replyBtnHandler={replyBtnHandler}
                isReplyBoxOpen={replyBoxActive}
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
                    />
                    <span className={styles.messageSpan}></span>
                  </div>
                  <ButtonPrimary
                    title="Post Reply"
                    color="purple"
                    class="buttonReply"
                    onBtnClick={replySubmitHandler}
                    isDisabled={buttonDisabled}
                  />
                  {message && (
                    <div className={styles.errorMessage}>{message}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
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
                />
                <span className={styles.messageSpan}></span>
              </div>
              <ButtonPrimary
                title="Post Reply"
                color="purple"
                class="buttonReply"
                onBtnClick={replySubmitHandler}
                isDisabled={buttonDisabled}
              />
              {message && <div className={styles.errorMessage}>{message}</div>}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default CommentBox;
