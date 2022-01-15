import React from "react";
import ButtonTertiary from "./ButtonTertiary";
import styles from "../styles/ReplyBox.module.css";
import Reply from "./Reply";

const ReplyBox = (props) => {
  return (
    <div className={styles.repliesContainer}>
      {props.replies.map((reply) => {
        const poster = props.replyPosters.find(
          (replyPoster) => replyPoster.id === reply.get("user").id
        );
        return (
          <Reply
            key={reply.id}
            poster={poster}
            reply={reply}
            replyBtnHandler={props.replyBtnHandler}
          />
        );
      })}
    </div>
  );
};
export default ReplyBox;
