import styles from "../styles/FeedbackHeader.module.css";
import ButtonPrimary from "./ButtonPrimary";
import arrowDown from "../assets/shared/icon-arrow-down.svg";
import icon from "../assets/suggestions/icon-suggestions.svg";
import arrowUp from "../assets/shared/icon-arrow-up-white.svg";
import { useState } from "react";

const FeedbackHeader = (props) => {
  const [displayFilterSelection, setDisplayFilterSelection] = useState(false);

  const menuDisplayHandler = () => {
    setDisplayFilterSelection(!displayFilterSelection);
  };

  const menuSelectionHandler = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.mainTitleBox}>
          <img src={icon} alt="suggestions" className={styles.icon} />
          <h1 className={styles.mainTitle}>6 Suggestions</h1>
        </div>
        <p className={styles.textTitle}>Sort by :</p>
        <div className={styles.filterMenu} onClick={menuDisplayHandler}>
          <p className={styles.filterName}>Most Upvotes</p>
          {displayFilterSelection && (
            <ul onClick={menuSelectionHandler}>
              <li
                id="most-upvotes"
                className={`${styles.selectedFilter} ${styles.filterItem}`}
              >
                Most Upvotes
              </li>
              <li id="least-upvotes" className={styles.filterItem}>
                Least Upvotes
              </li>
              <li id="most-comments" className={styles.filterItem}>
                Most Comments
              </li>
              <li id="least-comments" className={styles.filterItem}>
                Least Comments
              </li>
            </ul>
          )}
          {displayFilterSelection ? (
            <img src={arrowUp} className={styles.arrow} alt="arrow" />
          ) : (
            <img src={arrowDown} className={styles.arrow} alt="arrow" />
          )}
        </div>
      </div>
      <ButtonPrimary
        color="purple"
        title="Add Feedback"
        class="buttonHeader"
        icon={true}
      ></ButtonPrimary>
    </div>
  );
};

export default FeedbackHeader;
