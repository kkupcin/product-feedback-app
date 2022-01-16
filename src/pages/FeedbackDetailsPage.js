import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import CommentBox from "../components/CommentBox";
import styles from "../styles/FeedbackDetailsPage.module.css";
import FeedbackDetails from "../components/FeedbackDetails";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Parse from "parse";
import LoadingSpinner from "../components/LoadingSpinner";

const FeedbackDetailsPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currFeedback, setCurrFeedback] = useState();
  const [currComments, setCurrComments] = useState([]);
  const [charCounter, setCharCounter] = useState(250);
  const [newComment, setNewComment] = useState("");
  const [fieldIsEmpty, setFieldIsEmpty] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const params = useParams();
  let navigate = useNavigate();

  // Redirects to the editing page on click
  const redirectHandler = () => {
    navigate(`/edit-feedback/${params.feedbackId}`);
  };

  // Fetches feedback info and comments for displaying
  const getFeedbackInfo = async () => {
    let feedbackInfo = await Parse.Cloud.run("fetchFeedbackInfo", {
      feedbackId: params.feedbackId,
    });

    setCurrFeedback(feedbackInfo.productRequest);
    setCurrComments(feedbackInfo.comments);
    setIsLoading(false);
  };

  const commentChangeHandler = (e) => {
    setCharCounter(250 - e.target.value.length);
    setNewComment(e.target.value);
    if (e.target.value.trim() === "") {
      setFieldIsEmpty(true);
      setButtonDisabled(true);
    } else {
      setFieldIsEmpty(false);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    getFeedbackInfo();
  }, []);

  const commentSubmitHandler = async () => {
    if (!fieldIsEmpty) {
      let NewComment = Parse.Object.extend("Comment");
      let newCommentSubmission = new NewComment();

      newCommentSubmission.set("user", Parse.User.current());
      newCommentSubmission.set("content", newComment);
      newCommentSubmission.set("productFeedback", currFeedback);

      await newCommentSubmission.save();
      getFeedbackInfo();
      setNewComment("");
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <React.Fragment>
          <div className={styles.buttonContainer}>
            <ButtonSecondary title="Go Back" icon={true} />
            <ButtonPrimary
              title="Edit Feedback"
              icon={false}
              color="blue"
              onBtnClick={redirectHandler}
            />
          </div>
          {currFeedback && (
            <FeedbackDetails
              width="85%"
              feedbackDetailsPage={true}
              info={currFeedback}
              commentCounter={currComments.length}
            />
          )}
          <div className={styles.commentsContainer}>
            <h1 className={styles.commentCounter}>
              {currComments.length} Comments
            </h1>
            {currComments &&
              currComments.map((comment) => {
                return <CommentBox info={comment} key={comment.id} />;
              })}
          </div>
          <div
            className={`${styles.addCommentContainer} ${
              fieldIsEmpty && styles.fieldEmpty
            }`}
          >
            <h1 className={styles.inputTitle}>Add Comment</h1>
            <textarea
              rows="3"
              placeholder="Type your comment here"
              className={styles.textInput}
              maxLength="250"
              onChange={commentChangeHandler}
              value={newComment}
            />
            <span className={styles.messageSpan}></span>
            <div className={styles.options}>
              <div className={styles.charCounter}>
                {charCounter} Characters left
              </div>
              <ButtonPrimary
                title="Post Comment"
                color="purple"
                onBtnClick={commentSubmitHandler}
                class={buttonDisabled && "btnDisabled"}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default FeedbackDetailsPage;
