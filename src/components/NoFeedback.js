import ButtonPrimary from "./ButtonPrimary";
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
      <ButtonPrimary
        color="purple"
        title="Add Feedback"
        icon={true}
      ></ButtonPrimary>
    </div>
  );
};

export default NoFeedback;
