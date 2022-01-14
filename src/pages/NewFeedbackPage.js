import styles from "../styles/NewFeedbackPage.module.css";
import FeedbackForm from "../components/FeedbackForm";
import ButtonSecondary from "../components/ButtonSecondary";
import plusIcon from "../assets/shared/icon-new-feedback.svg";

const NewFeedbackPage = () => {
  return (
    <div className={styles.container}>
      <ButtonSecondary title="Go Back" class="buttonForm" icon={true}>
        Go Back
      </ButtonSecondary>
      <FeedbackForm icon={plusIcon} />
    </div>
  );
};

export default NewFeedbackPage;
