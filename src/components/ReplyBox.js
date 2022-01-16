import React from "react";
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
            isReplyBoxOpen={props.isReplyBoxOpen}
          />
        );
      })}
    </div>
  );
};
export default ReplyBox;
