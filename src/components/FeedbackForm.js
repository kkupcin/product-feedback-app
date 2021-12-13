import styles from "../styles/FeedbackForm.module.css";
import ButtonPrimary from "./ButtonPrimary";
import { useState } from "react";
import arrowUp from "../assets/shared/icon-arrow-up.svg";
import arrowDown from "../assets/shared/icon-arrow-down-blue.svg";

const FeedbackForm = (props) => {
  const [displayCategoryFilter, setDisplayCategoryFilter] = useState(false);
  const [displayStatusFilter, setDisplayStatusFilter] = useState(false);

  const categorySelectionHandler = () => {
    setDisplayCategoryFilter(!displayCategoryFilter);
  };
  const statusSelectionHandler = () => {
    setDisplayStatusFilter(!displayStatusFilter);
  };

  // CREATE SEPARATE DROPDOWN COMPONENT

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
          <span className={styles.messageSpan}></span>
        </div>
        <div className={styles.formBox}>
          <label className={styles.label}>Category</label>
          <p className={styles.description}>
            Choose a category for your feedback
          </p>
          <div
            className={`${styles.filterMenu} ${styles.input}`}
            onClick={categorySelectionHandler}
          >
            Feature
            {displayCategoryFilter ? (
              <img src={arrowUp} className={styles.arrow} alt="arrow" />
            ) : (
              <img src={arrowDown} className={styles.arrow} alt="arrow" />
            )}
            {displayCategoryFilter && (
              <ul className={styles.filterList}>
                <li className={styles.filterItem} id="feature">
                  Feature
                </li>
                <li className={styles.filterItem} id="ui">
                  UI
                </li>
                <li className={styles.filterItem} id="ux">
                  UX
                </li>
                <li className={styles.filterItem} id="enhancement">
                  Enhancement
                </li>
                <li className={styles.filterItem} id="bug">
                  Bug
                </li>
              </ul>
            )}
          </div>
        </div>
        {props.editForm && (
          <div className={styles.formBox}>
            <p className={styles.label}>Update Status</p>
            <p className={styles.description}>Change feature state</p>
            <div
              className={`${styles.filterMenu} ${styles.input}`}
              onClick={statusSelectionHandler}
            >
              Suggestion
              {displayStatusFilter ? (
                <img src={arrowUp} className={styles.arrow} alt="arrow" />
              ) : (
                <img src={arrowDown} className={styles.arrow} alt="arrow" />
              )}
              {displayStatusFilter && (
                <ul className={styles.filterList}>
                  <li className={styles.filterItem} id="suggestion">
                    Suggestion
                  </li>
                  <li className={styles.filterItem} id="planned">
                    Planned
                  </li>
                  <li className={styles.filterItem} id="in-progress">
                    In-Progress
                  </li>
                  <li className={styles.filterItem} id="live">
                    Live
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
        <div className={`${styles.formBox}`}>
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
          <span className={styles.messageSpan}></span>
        </div>
      </div>
      <div className={styles.buttonBox}>
        <div className={styles.createButtonBox}>
          <ButtonPrimary
            title={props.editForm ? "Save Changes" : "Add Feedback"}
            color="purple"
            icon={false}
            class="buttonFeedbackEditor"
          ></ButtonPrimary>
          <ButtonPrimary
            title="Cancel"
            color="darkblue"
            icon={false}
            class="buttonFeedbackEditor"
          ></ButtonPrimary>
        </div>
        {props.editForm && (
          <ButtonPrimary
            title="Delete"
            color="red"
            icon={false}
            class="buttonFeedbackEditor"
          ></ButtonPrimary>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
