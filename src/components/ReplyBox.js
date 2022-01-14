import React from "react";
import ButtonTertiary from "./ButtonTertiary";
import styles from "../styles/ReplyBox.module.css";

const ReplyBox = (props) => {
  return (
    <div className={styles.repliesContainer}>
      {props.replies.map((reply) => {
        const poster = props.replyPosters.find(
          (replyPoster) => replyPoster.id === reply.get("user").id
        );

        return (
          <div className={styles.userReplyBox} key={reply.id} id="replyBox">
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
                <p className={styles.username}>{`@${poster.username}`}</p>
              </div>
            </div>
            <ButtonTertiary
              title="Reply"
              onClick={props.replyBtnHandler}
              class="replyBtn"
            />
            <p className={styles.commentText}>{reply.get("content")}</p>
          </div>
        );
      })}
    </div>
  );
};
export default ReplyBox;
