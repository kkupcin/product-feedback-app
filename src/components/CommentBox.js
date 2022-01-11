import styles from "../styles/CommentBox.module.css";
import ButtonPrimary from "./ButtonPrimary";
import ButtonTertiary from "./ButtonTertiary";
import Parse from "parse";
import React, { useState, useEffect } from "react";

const CommentBox = (props) => {
  const [poster, setPoster] = useState();
  const [replyBoxActive, setReplyBoxActive] = useState(false);

  // Toggle if reply box is visible
  const replyBtnHandler = () => {
    setReplyBoxActive(!replyBoxActive);
  };

  // Get comment creator's information for displaying and set it in 'poster' state
  async function getUser() {
    let result = await Parse.Cloud.run("fetchPosterById", {
      userId: props.info.get("user").id,
    });

    setPoster(result);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <React.Fragment>
      {poster && (
        <div className={styles.userCommentBox}>
          <img
            src={poster.avatar.url()}
            alt="user profile"
            className={styles.userIcon}
          />
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfoText}>
              <h3
                className={styles.userInfoName}
              >{`${poster.firstName} ${poster.lastName}`}</h3>
              <p className={styles.username}>@{poster.username}</p>
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
              <textarea rows="3" className={styles.textInput} />
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

{
  /* <div className={styles.userReplyBox}>
  <img src={icon} alt="user profile" className={styles.userIcon} />
  <div className={styles.userInfoContainer}>
    <div className={styles.userInfoText}>
      <h3 className={styles.userInfoName}>Elijah Moss</h3>
      <p className={styles.username}>@hexagon.bestagon</p>
    </div>
  </div>
  <ButtonTertiary title="Reply" onClick={replyBtnHandler} />
  <p className={styles.commentText}>
    Also, please allow styles to be applied based on system preferences. I would
    love to be able to browse Frontend Mentor in the evening after my device’s
    dark mode turns on without the bright background it currently has.
  </p>
</div>; */
}
