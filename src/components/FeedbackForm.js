import styles from "../styles/FeedbackForm.module.css";
import ButtonPrimary from "./ButtonPrimary";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router";
import { useState } from "react";

const FeedbackForm = (props) => {
  const [fillerFeedback, setFillerFeedback] = useState({
    title: props.feedbackForEdit.get("title"),
    category: props.feedbackForEdit.get("category"),
    status: props.feedbackForEdit.get("status"),
    description: props.feedbackForEdit.get("description"),
  });
  let navigate = useNavigate();

  // Navigates back a page when cancel is clicked
  const cancelHandler = () => {
    navigate(-1);
  };

  const categoryList = [
    { title: "Feature", id: "feature" },
    { title: "UI", id: "ui" },
    { title: "UX", id: "ux" },
    { title: "Enhancement", id: "enhancement" },
    { title: "Bug", id: "bug" },
  ];

  const statusList = [
    { title: "Suggestion", id: "suggestion" },
    { title: "Planned", id: "planned" },
    { title: "In-Progress", id: "in-progress" },
    { title: "Live", id: "live" },
  ];

  // Passes on current choice index when in Editing form
  const currCatChoiceIndex = () => {
    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].title === fillerFeedback.category) {
        return i;
      }
    }
  };

  const currStatusChoiceIndex = () => {
    for (let i = 0; i < statusList.length; i++) {
      if (statusList[i].title === fillerFeedback.status) {
        return i;
      }
    }
  };

  // Fills Editing form with info from feedback currently being edited
  const updateTitleHandler = (e) => {
    setFillerFeedback((prevState) => {
      let stateCopy = { ...prevState };
      stateCopy.title = e.target.value;
      return stateCopy;
    });
  };

  const updateDescHandler = (e) => {
    setFillerFeedback((prevState) => {
      let stateCopy = { ...prevState };
      stateCopy.desc = e.target.value;
      return stateCopy;
    });
  };

  return (
    <div className={styles.container}>
      <img src={props.icon} alt="icon" className={styles.icon} />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>
          {props.editForm
            ? `Editing "${props.feedbackForEdit.get("title")}"`
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
            value={fillerFeedback.title}
            onChange={updateTitleHandler}
          ></input>
          <span className={styles.messageSpan}></span>
        </div>
        <div className={styles.formBox}>
          <label className={styles.label}>Category</label>
          <p className={styles.description}>
            Choose a category for your feedback
          </p>
          <Dropdown
            dropdownClass="filterForm"
            dropdownList={categoryList}
            currChoice={categoryList[currCatChoiceIndex()]}
          />
        </div>
        {props.editForm && (
          <div className={styles.formBox}>
            <p className={styles.label}>Update Status</p>
            <p className={styles.description}>Change feature state</p>
            <Dropdown
              dropdownClass="filterForm"
              dropdownList={statusList}
              currChoice={statusList[currStatusChoiceIndex()]}
            />
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
            defaultValue={fillerFeedback.description}
            onChange={updateDescHandler}
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
            demoMode={process.env.REACT_APP_DEMO_MODE}
          ></ButtonPrimary>
          <ButtonPrimary
            title="Cancel"
            color="darkblue"
            icon={false}
            class="buttonFeedbackEditor"
            onBtnClick={cancelHandler}
          ></ButtonPrimary>
        </div>
        {props.editForm && (
          <ButtonPrimary
            title="Delete"
            color="red"
            icon={false}
            class="buttonFeedbackEditor"
            demoMode={process.env.REACT_APP_DEMO_MODE}
          ></ButtonPrimary>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
