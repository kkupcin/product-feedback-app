import styles from "../styles/CommentBox.module.css";
import ButtonPrimary from "./ButtonPrimary";
import ButtonTertiary from "./ButtonTertiary";
import Parse from "parse";
import React, { useState, useEffect } from "react";

const CommentBox = (props) => {
  const [poster, setPoster] = useState();
  const [replyBoxActive, setReplyBoxActive] = useState(false);

  const replyBtnHandler = () => {
    setReplyBoxActive(!replyBoxActive);
  };

  async function getUser() {
    let query = new Parse.Query("User");
    query.equalTo("objectId", props.info.get("user").id);
    let results = await query.find();
    setPoster(results[0]);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <React.Fragment>
      {poster && (
        <div className={styles.userCommentBox}>
          <img
            src={poster.get("avatar").url()}
            alt="user profile"
            className={styles.userIcon}
          />
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfoText}>
              <h3 className={styles.userInfoName}>{`${poster.get(
                "firstName"
              )} ${poster.get("lastName")}`}</h3>
              <p className={styles.username}>{poster.get("username")}</p>
            </div>
          </div>
          <ButtonTertiary title="Reply" onClick={replyBtnHandler} />
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
