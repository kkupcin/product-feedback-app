import React from "react";
import styles from "../styles/ReplyBox.module.css";
import Reply from "./Reply";

const ReplyBox = (props) => {
  return (
    <section className={styles.repliesContainer}>
      {props.replies.map((reply) => {
        return (
          <Reply
            key={reply.id}
            reply={reply}
            replyBtnHandler={props.replyBtnHandler}
            isReplyBoxOpen={props.isReplyBoxOpen}
          />
        );
      })}
    </section>
  );
};
export default ReplyBox;
