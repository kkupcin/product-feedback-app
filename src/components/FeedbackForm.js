import styles from "../styles/FeedbackForm.module.css";
import ButtonPrimary from "./ButtonPrimary";

const FeedbackForm = (props) => {
  return (
    <div className={styles.container}>
      <img src={props.icon} alt="icon" className={styles.icon} />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>
          {props.editForm
            ? `Editing "${props.feedbackTitle}"`
            : "Create New Feedback"}
        </h1>
        <div className={styles.formBox}>
          <label className={styles.label}>Feedback Title</label>
          <p className={styles.description}>
            Add a short, descriptive headline
          </p>
          <input
            className={`${styles.textInput} ${styles.input}`}
            type="text"
          ></input>
        </div>
        <div className={styles.formBox}>
          <label className={styles.label}>Category</label>
          <p className={styles.description}>
            Choose a category for your feedback
          </p>
          <input
            className={`${styles.dropdownInput} ${styles.input}`}
            type="dropdown"
          ></input>
        </div>
        {props.editForm && (
          <div className={styles.formBox}>
            <label className={styles.label}>Update Status</label>
            <p className={styles.description}>Change feature state</p>
            <input
              className={`${styles.dropdownInput} ${styles.input}`}
              type="dropdown"
            ></input>
          </div>
        )}
        <div className={styles.formBox}>
          <label className={styles.label}>Feedback Detail</label>
          <p className={styles.description}>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea
            className={`${styles.largeTextInput} ${styles.input}`}
            type="textarea"
            rows="6"
          ></textarea>
        </div>
      </div>
      <div className={styles.buttonBox}>
        <div className={styles.createButtonBox}>
          <ButtonPrimary
            title={props.editForm ? "Save Changes" : "Add Feedback"}
            color="#AD1FEA"
            icon={false}
            class="buttonFeedbackEditor"
          ></ButtonPrimary>
          <ButtonPrimary
            title="Cancel"
            color="#3A4374"
            icon={false}
            class="buttonFeedbackEditor"
          ></ButtonPrimary>
        </div>
        {props.editForm && (
          <ButtonPrimary
            title="Delete"
            color="#d73737"
            icon={false}
            class="buttonFeedbackEditor"
          ></ButtonPrimary>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
