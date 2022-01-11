import FeedbackDetails from "./FeedbackDetails";
import styles from "../styles/FeedbackList.module.css";
import NoFeedback from "./NoFeedback";
import { useNavigate } from "react-router-dom";

const FeedbackList = (props) => {
  let navigate = useNavigate();

  // Navigates to clicked feedback requests
  const feedbackClickHandler = (id) => {
    navigate(`/feedback-details/${id}`);
  };

  // Sorting functions
  const sortByLeastUpvotes = (a, b) => {
    if (a.get("userUpvotes").length < b.get("userUpvotes").length) {
      return -1;
    }
    if (a.get("userUpvotes").length > b.get("userUpvotes").length) {
      return 1;
    }

    return 0;
  };

  const sortByMostUpvotes = (a, b) => {
    if (a.get("userUpvotes").length > b.get("userUpvotes").length) {
      return -1;
    }
    if (a.get("userUpvotes").length < b.get("userUpvotes").length) {
      return 1;
    }

    return 0;
  };

  const sortByLeastComments = (a, b) => {
    let aFilteredComments = props.comments.filter((comment) => {
      return comment.get("productFeedback").id === a.id;
    });

    let bFilteredComments = props.comments.filter((comment) => {
      return comment.get("productFeedback").id === b.id;
    });

    if (aFilteredComments.length < bFilteredComments.length) {
      return -1;
    }
    if (aFilteredComments.length > bFilteredComments.length) {
      return 1;
    }

    return 0;
  };

  const sortByMostComments = (a, b) => {
    let aFilteredComments = props.comments.filter((comment) => {
      return comment.get("productFeedback").id === a.id;
    });

    let bFilteredComments = props.comments.filter((comment) => {
      return comment.get("productFeedback").id === b.id;
    });

    if (aFilteredComments.length > bFilteredComments.length) {
      return -1;
    }
    if (aFilteredComments.length < bFilteredComments.length) {
      return 1;
    }

    return 0;
  };

  // Chooses which sort function to use
  const getSortFunc = () => {
    switch (props.sortOrder.id) {
      case "most-upvotes":
        return sortByMostUpvotes;
      case "least-upvotes":
        return sortByLeastUpvotes;
      case "most-comments":
        return sortByMostComments;
      case "least-comments":
        return sortByLeastComments;
      default:
        return sortByMostUpvotes;
    }
  };

  const sortFunc = getSortFunc();

  return (
    <div className={styles.container}>
      {props.feedback.length !== 0 ? (
        props.feedback.sort(sortFunc).map((feedbackItem) => {
          let filteredComments = props.comments.filter((comment) => {
            return comment.get("productFeedback").id === feedbackItem.id;
          });

          return (
            <FeedbackDetails
              info={feedbackItem}
              key={feedbackItem.id}
              onFeedbackClick={feedbackClickHandler}
              commentCounter={filteredComments.length}
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
