import styles from "../styles/FeedbackForm.module.css";
import plusIcon from "../assets/shared/icon-new-feedback.svg";

const FeedbackForm = () => {
  return (
    <div className={styles.container}>
      <img src={plusIcon} alt="icon" className={styles.icon} />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Create New Feedback</h1>
        <div className={styles.formBox}>
          <label className={styles.label}>Feedback Title</label>
          <p className={styles.description}>
            Add a short, descriptive headline
          </p>
          <input className={styles.textInput}></input>
        </div>
        <div className={styles.formBox}>
          <label className={styles.label}>Category</label>
          <p className={styles.description}>
            Choose a category for your feedback
          </p>
          <input className={styles.dropdownInput}></input>
        </div>
        <div className={styles.formBox}>
          <label className={styles.label}>Feedback Detail</label>
          <p className={styles.description}>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <input className={styles.richTextInput}></input>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
