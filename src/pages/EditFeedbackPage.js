import styles from "../styles/EditFeedbackPage.module.css";
import FeedbackForm from "../components/FeedbackForm";
import ButtonSecondary from "../components/ButtonSecondary";
import editIcon from "../assets/shared/icon-edit-feedback.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Parse from "parse";
import LoadingSpinner from "../components/LoadingSpinner";

const EditFeedbackPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackForEdit, setFeedbackForEdit] = useState();
  let params = useParams();

  useEffect(() => {
    getFeedback();
  }, []);

  // Fetches feedback to fill the form for editing
  async function getFeedback() {
    let query = new Parse.Query("ProductRequest");
    query.equalTo("objectId", params.feedbackId);
    let result = await query.first();
    setFeedbackForEdit(result);
    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <ButtonSecondary title="Go Back" class="buttonForm" icon={true}>
        Go Back
      </ButtonSecondary>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <FeedbackForm
          icon={editIcon}
          editForm="true"
          feedbackForEdit={feedbackForEdit}
        />
      )}
    </div>
  );
};

export default EditFeedbackPage;
