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
  const [message, setMessage] = useState("");

  const params = useParams();
  let navigate = useNavigate();

  // Redirect to the editing page on click
  const redirectHandler = () => {
    navigate(`/edit-feedback/${params.feedbackId}`);
  };

  // Fetch feedback info and comments for displaying
  const getFeedbackInfo = async () => {
    let feedbackInfo = await Parse.Cloud.run("fetchFeedbackInfo", {
      feedbackId: params.feedbackId,
    });

    setCurrFeedback(feedbackInfo.productRequest);
    setCurrComments(feedbackInfo.comments);
    setIsLoading(false);
  };

  // Update the comment input
  const commentChangeHandler = (e) => {
    setCharCounter(250 - e.target.value.length);
    setNewComment(e.target.value);

    if (e.target.value.trim() === "") {
      setFieldIsEmpty(true);
    } else {
      setFieldIsEmpty(false);
    }
  };

  const upvoteHandler = () => {
    getFeedbackInfo();
  };

  useEffect(() => {
    getFeedbackInfo();
  }, []);

  // Submit new comment
  const commentSubmitHandler = async () => {
    if (!fieldIsEmpty) {
      try {
        await Parse.Cloud.run("newComment", {
          feedbackId: currFeedback.id,
          comment: newComment,
        });

        getFeedbackInfo();
        setNewComment("");
      } catch (err) {
        setMessage(`Comment submission failed: ${err}`);
      }
    }
  };

  return (
    <section className={styles.container}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <menu className={styles.buttonContainer}>
            <ButtonSecondary title="Go Back" icon={true} />
            <ButtonPrimary
              title="Edit Feedback"
              icon={false}
              color="blue"
              onBtnClick={redirectHandler}
            />
          </menu>
          <FeedbackDetails
            width="85%"
            feedbackDetailsPage={true}
            info={currFeedback}
            commentCounter={currComments.length}
            onUpvote={upvoteHandler}
            location="feedbackDetailsPage"
          />
          <div className={styles.commentsContainer}>
            <h2 className={styles.commentCounter}>
              {currComments.length} Comments
            </h2>
            {currComments.map((comment) => {
              return <CommentBox info={comment} key={comment.id} />;
            })}
          </div>
          <div
            className={`${styles.addCommentContainer} ${
              fieldIsEmpty && styles.fieldEmpty
            }`}
            aria-describedby="err-message"
          >
            <label
              className={styles.inputTitle}
              for="add-comment-box"
              aria-describedby="message-span"
            >
              Add Comment
            </label>
            <textarea
              rows="3"
              placeholder="Type your comment here"
              className={styles.textInput}
              maxLength="250"
              onChange={commentChangeHandler}
              value={newComment}
              id="add-comment-box"
            />
            <span className={styles.messageSpan} id="message-span"></span>
            <div className={styles.options}>
              <div className={styles.charCounter}>
                {charCounter} Characters left
              </div>
              <ButtonPrimary
                title="Post Comment"
                color="purple"
                onBtnClick={commentSubmitHandler}
                class={newComment.length === 0 && "btnDisabled"}
              />
            </div>
            {message && (
              <div className={styles.errorMessage} id="err-message ">
                {message}
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

export default FeedbackDetailsPage;
