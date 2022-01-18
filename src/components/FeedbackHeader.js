import styles from "../styles/FeedbackHeader.module.css";
import ButtonPrimary from "./ButtonPrimary";
import icon from "../assets/suggestions/icon-suggestions.svg";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

const FeedbackHeader = (props) => {
  let navigate = useNavigate();

  // Redirect to the new feedback page on click
  const redirectHandler = () => {
    navigate("/new-feedback");
  };

  const sortList = [
    { title: "Most Upvotes", id: "most-upvotes" },
    { title: "Least Upvotes", id: "least-upvotes" },
    { title: "Most Comments", id: "most-comments" },
    { title: "Least Comments", id: "least-comments" },
  ];

  // Pass on chosen sort order for sorting
  const setSortOrder = (currSort) => {
    props.onSort(currSort);
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.mainTitleBox}>
          <img src={icon} alt="suggestions" className={styles.icon} />
          <h1 className={styles.mainTitle}>
            {props.feedbackCount} Suggestions
          </h1>
        </div>
        <p className={styles.textTitle}>Sort by :</p>
        <Dropdown
          dropdownList={sortList}
          dropdownClass="feedbackFilter"
          feedbackComp={true}
          onSortOrderChange={setSortOrder}
        />
      </div>
      <ButtonPrimary
        color="purple"
        title="Add Feedback"
        class="buttonHeader"
        icon={true}
        onBtnClick={redirectHandler}
      ></ButtonPrimary>
    </div>
  );
};

export default FeedbackHeader;
