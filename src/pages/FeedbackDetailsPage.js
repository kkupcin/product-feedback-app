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
  const params = useParams();
  let navigate = useNavigate();

  const redirectHandler = () => {
    navigate("/edit-feedback");
  };

  async function getFeedbackInfo() {
    let query = new Parse.Query("ProductRequest");
    query.equalTo("objectId", params.feedbackId);
    let results = await query.find();
    setCurrFeedback(results[0]);

    let commentQuery = new Parse.Query("Comment");
    commentQuery.equalTo("productFeedback", results[0]);
    let commentResults = await commentQuery.find();
    setCurrComments(commentResults);
    setIsLoading(false);
  }

  useEffect(() => {
    getFeedbackInfo();
  }, []);

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
          <div className={styles.addCommentContainer}>
            <h1 className={styles.inputTitle}>Add Comment</h1>
            <textarea
              rows="3"
              placeholder="Type your comment here"
              className={styles.textInput}
            />
            <span className={styles.messageSpan}></span>
            <div className={styles.options}>
              {/* <div className={styles.charCounter}>250 Characters left</div> */}
              <ButtonPrimary
                title="Post Comment"
                color="purple"
                demoMode={process.env.REACT_APP_DEMO_MODE}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default FeedbackDetailsPage;
