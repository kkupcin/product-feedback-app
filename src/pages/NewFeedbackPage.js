import styles from "../styles/NewFeedbackPage.module.css"
import FeedbackForm from "../components/FeedbackForm";

const NewFeedbackPage = () => {
  return (
    <div className={styles.container}>
      <button>Go Back</button>
      <FeedbackForm />
    </div>
  );
};

export default NewFeedbackPage;

// - Create new feedback page
// 	1.- Go back button

// 	2.- Create new feedback FORM
// 		- Feedback title and input
// 		- Category title and input (dropdown)
// 		- Feedback detail title and input
// 		- Add feedback button
// 		- Cancel button
