import styles from "../styles/ReplyBox.module.css";
import ButtonTertiary from "./ButtonTertiary";

const Reply = (props) => {
  const handleReplyClick = () => {
    props.replyBtnHandler(props.reply.get("user"));
  };

  return (
    <div className={styles.userReplyBox}>
      <img
        src={props.reply.get("user").get("avatar").url()}
        alt="user profile"
        className={styles.userIcon}
      />
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfoText}>
          <h3 className={styles.userInfoName}>{`${props.reply
            .get("user")
            .get("firstName")} ${props.reply.get("user").get("lastName")}`}</h3>
          <p className={styles.username}>{`@${props.reply
            .get("user")
            .get("username")}`}</p>
        </div>
      </div>
      <ButtonTertiary
        title="Reply"
        onClick={handleReplyClick}
        class="replyBtn"
      />
      <p className={styles.commentText}>
        <span className={styles.replyUsername}>
          {`@${props.reply.get("replyingTo").get("username")}`}{" "}
        </span>
        {props.reply.get("content")}
      </p>
    </div>
  );
};

export default Reply;
