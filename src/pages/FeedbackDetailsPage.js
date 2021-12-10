import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import styles from "../styles/FeedbackDetailsPage.module.css";
import FeedbackDetails from "../components/FeedbackDetails";
import icon from "../assets/shared/image-elijah.jpg";

const FeedbackDetailsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <ButtonSecondary title="Go Back" icon={true} />
        <ButtonPrimary title="Edit Feedback" icon={false} color="#4661e6" />
      </div>
      <FeedbackDetails width="85%" feedbackDetailsPage={true} />
      <div className={styles.commentsContainer}>
        <h1 className={styles.commentCounter}>4 Comments</h1>
        <div className={styles.userCommentBox}>
          <img src={icon} alt="user profile" className={styles.userIcon} />
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfoText}>
              <h3 className={styles.userInfoName}>Elijah Moss</h3>
              <p className={styles.username}>@hexagon.bestagon</p>
            </div>
          </div>
          <ButtonSecondary
            title="Reply"
            class="buttonReply"
            icon={false}
            color="#4661E6"
          />
          <p className={styles.commentText}>
            Also, please allow styles to be applied based on system preferences.
            I would love to be able to browse Frontend Mentor in the evening
            after my device’s dark mode turns on without the bright background
            it currently has.
          </p>
        </div>
        <div className={styles.userCommentBox}>
          <img src={icon} alt="user profile" className={styles.userIcon} />
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfoText}>
              <h3 className={styles.userInfoName}>Elijah Moss</h3>
              <p className={styles.username}>@hexagon.bestagon</p>
            </div>
          </div>
          <ButtonSecondary
            title="Reply"
            class="buttonReply"
            icon={false}
            color="#4661E6"
          />
          <p className={styles.commentText}>
            Also, please allow styles to be applied based on system preferences.
            I would love to be able to browse Frontend Mentor in the evening
            after my device’s dark mode turns on without the bright background
            it currently has.
          </p>
        </div>
        <div className={styles.userReplyBox}>
          <img src={icon} alt="user profile" className={styles.userIcon} />
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfoText}>
              <h3 className={styles.userInfoName}>Elijah Moss</h3>
              <p className={styles.username}>@hexagon.bestagon</p>
            </div>
          </div>
          <ButtonSecondary
            title="Reply"
            class="buttonReply"
            icon={false}
            color="#4661E6"
          />
          <p className={styles.commentText}>
            Also, please allow styles to be applied based on system preferences.
            I would love to be able to browse Frontend Mentor in the evening
            after my device’s dark mode turns on without the bright background
            it currently has.
          </p>
        </div>
        <div className={styles.userReplyBox}>
          <img src={icon} alt="user profile" className={styles.userIcon} />
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfoText}>
              <h3 className={styles.userInfoName}>Elijah Moss</h3>
              <p className={styles.username}>@hexagon.bestagon</p>
            </div>
          </div>
          <ButtonSecondary
            title="Reply"
            class="buttonReply"
            icon={false}
            color="#4661E6"
          />
          <p className={styles.commentText}>
            Also, please allow styles to be applied based on system preferences.
            I would love to be able to browse Frontend Mentor in the evening
            after my device’s dark mode turns on without the bright background
            it currently has.
          </p>
        </div>
      </div>
      <div className={styles.addCommentContainer}>
        <h1 className={styles.inputTitle}>Add Comment</h1>
        <textarea
          rows="3"
          placeholder="Type your comment here"
          className={styles.textInput}
        />
        <div className={styles.options}>
          <div className={styles.charCounter}>250 Characters left</div>
          <ButtonPrimary title="Post Comment" color="#AD1FEA" />
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetailsPage;

// - Feedback details page

// 		- Reply box + post reply button if reply is clicked

// 	3.1- Reply container - same as comment container
