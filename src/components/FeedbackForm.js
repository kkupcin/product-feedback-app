import styles from "../styles/FeedbackForm.module.css";
import ButtonPrimary from "./ButtonPrimary";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router";
import { useState } from "react";
import Parse from "parse";

const FeedbackForm = (props) => {
  const [fillerFeedback, setFillerFeedback] = useState({
    title: (props.feedbackForEdit && props.feedbackForEdit.get("title")) || "",
    category:
      (props.feedbackForEdit && props.feedbackForEdit.get("category")) || "",
    status:
      (props.feedbackForEdit && props.feedbackForEdit.get("status")) || "",
    description:
      (props.feedbackForEdit && props.feedbackForEdit.get("description")) || "",
  });
  const [showMessage, setShowMessage] = useState({
    show: false,
    message: "",
  });
  const [fieldIsEmpty, setFieldIsEmpty] = useState(true);
  let navigate = useNavigate();

  // Navigates back a page when cancel is clicked
  const cancelHandler = () => {
    navigate(-1);
  };

  // Submit feedback to Parse
  const submitNewFeedback = async () => {
    if (!fieldIsEmpty) {
      const NewRequest = new Parse.Object.extend("ProductRequest");
      const newRequest = new NewRequest();

      newRequest.set("userUpvotes", []);
      newRequest.set("creator", Parse.User.current());
      newRequest.set("status", "Suggestion");
      newRequest.set("title", fillerFeedback.title);
      newRequest.set("description", fillerFeedback.description);
      newRequest.set("category", fillerFeedback.category.title || "Feature");

      try {
        await newRequest.save();
        setShowMessage({ show: true, message: "Feedback submitted" });
        navigate(`/feedback-details/${newRequest.id}`);
      } catch (err) {
        setShowMessage({ show: true, message: `Submission failed: ${err}` });
      }
    } else {
      setShowMessage({ show: true, message: "All fields must be filled" });
    }
  };

  const submitEditedFeedback = async () => {
    if (!fieldIsEmpty) {
      let feedbackForEdit = props.feedbackForEdit;

      feedbackForEdit.set("title", fillerFeedback.title);
      feedbackForEdit.set("category", fillerFeedback.category.title);
      feedbackForEdit.set("status", fillerFeedback.status.title);
      feedbackForEdit.set("description", fillerFeedback.description);

      try {
        await feedbackForEdit.save();
        setShowMessage({ show: true, message: "Feedback edit submitted" });
        navigate(`/feedback-details/${feedbackForEdit.id}`);
      } catch (err) {
        setShowMessage({ show: true, message: `Edit failed: ${err}` });
      }
    } else {
      setShowMessage({ show: true, message: "All fields must be filled" });
    }
  };

  // Deletes feedback
  const deleteFeedback = async () => {
    let feedbackForEdit = props.feedbackForEdit;

    try {
      await feedbackForEdit.destroy();
      setShowMessage({ show: true, message: "Feedback deleted" });
      navigate("/");
    } catch (err) {
      setShowMessage({
        show: true,
        message: `Feedback deletion failed: ${err}`,
      });
    }
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

  // Sets category and status for submission
  const setChosenCategory = (category) => {
    setFillerFeedback((prevState) => {
      let stateCopy = { ...prevState };
      stateCopy.category = category;
      return stateCopy;
    });
  };

  const setChosenStatus = (status) => {
    setFillerFeedback((prevState) => {
      let stateCopy = { ...prevState };
      stateCopy.status = status;
      return stateCopy;
    });
  };

  // Fills Editing form with info from feedback currently being edited
  const updateTitleHandler = (e) => {
    if (e.target.value.trim() !== "" && fillerFeedback.description !== "") {
      setFieldIsEmpty(false);
    } else {
      setFieldIsEmpty(true);
    }

    setFillerFeedback((prevState) => {
      let stateCopy = { ...prevState };
      stateCopy.title = e.target.value;
      return stateCopy;
    });
  };

  const updateDescHandler = (e) => {
    if (e.target.value.trim() !== "" && fillerFeedback.title !== "") {
      setFieldIsEmpty(false);
    } else {
      setFieldIsEmpty(true);
    }

    setFillerFeedback((prevState) => {
      let stateCopy = { ...prevState };
      stateCopy.description = e.target.value;
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
            maxLength="68"
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
            setChosenCategory={setChosenCategory}
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
              setChosenStatus={setChosenStatus}
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
            maxLength="250"
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
            onBtnClick={
              props.editForm ? submitEditedFeedback : submitNewFeedback
            }
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
            onBtnClick={deleteFeedback}
          ></ButtonPrimary>
        )}
      </div>
      {showMessage.show && (
        <div className={styles.message}>{showMessage.message}</div>
      )}
    </div>
  );
};

export default FeedbackForm;
