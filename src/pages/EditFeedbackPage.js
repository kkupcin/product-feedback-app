import styles from "../styles/EditFeedbackPage.module.css";
import FeedbackForm from "../components/FeedbackForm";
import ButtonSecondary from "../components/ButtonSecondary";
import editIcon from "../assets/shared/icon-edit-feedback.svg";

const EditFeedbackPage = () => {
  return (
    <div className={styles.container}>
      <ButtonSecondary title="Go Back" class="buttonForm" icon={true}>
        Go Back
      </ButtonSecondary>
      <FeedbackForm
        icon={editIcon}
        editForm="true"
        feedbackTitle="Example title"
      />
    </div>
  );
};

export default EditFeedbackPage;

// DROPDOWNS!
