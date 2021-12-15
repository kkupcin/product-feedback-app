import FeedbackDetails from "./FeedbackDetails";
import styles from "../styles/FeedbackList.module.css";
import NoFeedback from "./NoFeedback";

const FeedbackList = (props) => {
  return (
    <div className={styles.container}>
      {props.feedback.length !== 0 ? (
        props.feedback.map((feedbackItem) => {
          return (
            <FeedbackDetails
              info={feedbackItem}
              key={feedbackItem.get("objectId")}
            />
          );
        })
      ) : (
        <NoFeedback />
      )}
    </div>
  );
};

export default FeedbackList;
