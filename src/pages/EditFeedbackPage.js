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
  const getFeedback = async () => {
    let result = await Parse.Cloud.run("fetchProductRequestById", {
      feedbackId: params.feedbackId,
    });

    if (result.get("creator").id === Parse.User.current().id) {
      setFeedbackForEdit(result);
    }

    setIsLoading(false);
  };

  const originalPoster =
    feedbackForEdit &&
    feedbackForEdit.get("creator").id === Parse.User.current().id;

  return (
    <div className={styles.container}>
      <ButtonSecondary title="Go Back" class="buttonForm" icon={true}>
        Go Back
      </ButtonSecondary>
      {isLoading ? (
        <LoadingSpinner />
      ) : originalPoster ? (
        <FeedbackForm
          icon={editIcon}
          editForm="true"
          feedbackForEdit={feedbackForEdit}
        />
      ) : (
        <div className={styles.noPermission}>
          You do not have permission to edit this feedback
        </div>
      )}
    </div>
  );
};

export default EditFeedbackPage;
