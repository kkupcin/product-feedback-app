import FeedbackDetails from "./FeedbackDetails";
import styles from "../styles/FeedbackList.module.css";
import NoFeedback from "./NoFeedback";

const FeedbackList = () => {
  return (
    <div className={styles.container}>
      <FeedbackDetails />
      <FeedbackDetails />
      <FeedbackDetails />
      <FeedbackDetails />
      {/* <NoFeedback /> */}
    </div>
  );
};

export default FeedbackList;
