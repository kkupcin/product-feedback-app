import Button from "./Button";
import styles from "../styles/NoFeedback.module.css";
import empty from "../assets/suggestions/illustration-empty.svg";

const NoFeedback = () => {
  return (
    <div className={styles.container}>
      <img src={empty} alt="empty" />
      <h1 className={styles.title}>There is no feedback yet.</h1>
      <p className={styles.description}>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <Button color="#ad1fea" title="Add Feedback"></Button>
    </div>
  );
};

export default NoFeedback;
