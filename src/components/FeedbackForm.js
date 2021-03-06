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

  const [message, setMessage] = useState("");

  const [fieldIsEmpty, setFieldIsEmpty] = useState(checkIfFieldEmpty);

  let navigate = useNavigate();

  // Navigate back a page when cancel is clicked
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // Check if input fields are empty
  function checkIfFieldEmpty() {
    if (
      fillerFeedback.title !== "" &&
      fillerFeedback.description !== "" &&
      fillerFeedback.category !== "" &&
      fillerFeedback.status !== ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  // Submit new feedback to Parse
  const submitNewFeedback = async (e) => {
    e.preventDefault();
    if (!fieldIsEmpty) {
      try {
        let newRequest = await Parse.Cloud.run("newRequest", {
          feedback: {
            title: fillerFeedback.title,
            description: fillerFeedback.description,
            category: {
              title: fillerFeedback.category.title,
            },
          },
        });

        setMessage("Feedback submitted");
        navigate(`/feedback-details/${newRequest}`);
      } catch (err) {
        setMessage(`Submission failed: ${err}`);
      }
    } else {
      setMessage("All fields must be filled");
    }
  };

  // Submit edited feeback to Parse
  const submitEditedFeedback = async (e) => {
    e.preventDefault();
    if (!fieldIsEmpty) {
      try {
        let feedbackForEditId = await Parse.Cloud.run("submitEditedFeedback", {
          feedbackId: props.feedbackForEdit.id,
          feedback: {
            title: fillerFeedback.title,
            description: fillerFeedback.description,
            status: {
              title: fillerFeedback.status.title,
            },
            category: {
              title: fillerFeedback.category.title,
            },
          },
        });

        setMessage("Feedback edit submitted");
        navigate(`/feedback-details/${feedbackForEditId}`);
      } catch (err) {
        setMessage(`Edit failed: ${err}`);
      }
    } else {
      setMessage("All fields must be filled");
    }
  };

  // Delete feedback in editing
  const deleteFeedback = async (e) => {
    e.preventDefault();
    try {
      await Parse.Cloud.run("deleteRequest", {
        feedbackId: props.feedbackForEdit.id,
      });

      setMessage("Feedback deleted");
      navigate("/");
    } catch (err) {
      setMessage(`Feedback deletion failed: ${err}`);
    }
  };

  const categoryList = [
    { title: "Feature", id: "feature", type: "category" },
    { title: "UI", id: "ui", type: "category" },
    { title: "UX", id: "ux", type: "category" },
    { title: "Enhancement", id: "enhancement", type: "category" },
    { title: "Bug", id: "bug", type: "category" },
  ];

  const statusList = [
    { title: "Suggestion", id: "suggestion", type: "status" },
    { title: "Planned", id: "planned", type: "status" },
    { title: "In-Progress", id: "in-progress", type: "status" },
    { title: "Live", id: "live", type: "status" },
  ];

  // Pass on current choice index when in Editing form
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

  // Set category and status for submission
  const setChosenCategory = (category) => {
    setFillerFeedback((prevState) => {
      let stateCopy = { ...prevState };
      stateCopy.category = category;
      return stateCopy;
    });

    setFieldIsEmpty(false);
  };

  const setChosenStatus = (status) => {
    setFillerFeedback((prevState) => {
      let stateCopy = { ...prevState };
      stateCopy.status = status;
      return stateCopy;
    });

    setFieldIsEmpty(false);
  };

  // Fill Editing form with info from feedback currently being edited and update new feedback with input value
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
    <form className={styles.container} aria-describedby="err-message">
      <img src={props.icon} alt="icon" className={styles.icon} />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>
          {props.editForm
            ? `Editing "${props.feedbackForEdit.get("title")}"`
            : "Create New Feedback"}
        </h1>
        <div className={styles.formBox}>
          <label className={styles.label} for="form-title">
            Feedback Title
          </label>
          <p className={styles.description}>
            Add a short, descriptive headline
          </p>
          <input
            className={`${styles.textInput} ${styles.input}`}
            type="text"
            value={fillerFeedback.title}
            onChange={updateTitleHandler}
            maxLength="68"
            id="form-title"
          ></input>
          <span className={styles.messageSpan}></span>
        </div>
        <div className={styles.formBox}>
          <label className={styles.label} for="category-dropdown">
            Category
          </label>
          <p className={styles.description}>
            Choose a category for your feedback
          </p>
          <Dropdown
            id="category-dropdown"
            dropdownClass="filterForm"
            dropdownList={categoryList}
            currChoice={categoryList[currCatChoiceIndex()]}
            setChosenCategory={setChosenCategory}
          />
        </div>
        {props.editForm && (
          <div className={styles.formBox}>
            <p className={styles.label} for="status-dropdown">
              Update Status
            </p>
            <p className={styles.description}>Change feature state</p>
            <Dropdown
              id="status-dropdown"
              dropdownClass="filterForm"
              dropdownList={statusList}
              currChoice={statusList[currStatusChoiceIndex()]}
              setChosenStatus={setChosenStatus}
            />
          </div>
        )}
        <div className={`${styles.formBox}`}>
          <label className={styles.label} for="feedback-detail-input">
            Feedback Detail
          </label>
          <p className={styles.description}>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea
            id="feedback-detail-input"
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
      {message && (
        <div className={styles.message} id="err-message">
          {message}
        </div>
      )}
    </form>
  );
};

export default FeedbackForm;
