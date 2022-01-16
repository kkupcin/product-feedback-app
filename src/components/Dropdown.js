import { useState } from "react";
import styles from "../styles/Dropdown.module.css";
import arrowUp from "../assets/shared/icon-arrow-up.svg";
import arrowDown from "../assets/shared/icon-arrow-down-blue.svg";
import arrowUpWhite from "../assets/shared/icon-arrow-up-white.svg";
import arrowDownWhite from "../assets/shared/icon-arrow-down.svg";

const Dropdown = (props) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    props.currChoice || props.dropdownList[0]
  );

  // Toggle if dropdown menu is displaying
  const menuDisplayHandler = () => {
    setDisplayMenu(!displayMenu);
  };

  // Sets selected item in 'selectedItem' state
  const selectionHandler = (e) => {
    let foundItem = props.dropdownList.find(
      (dropdownItem) => dropdownItem.id === e.target.id
    );
    setSelectedItem(foundItem);
    if (props.sortOrder) {
      props.sortOrder(foundItem);
    }
    switch (foundItem.id) {
      case "feature":
        props.setChosenCategory(foundItem);
        break;
      case "ui":
        props.setChosenCategory(foundItem);
        break;
      case "ux":
        props.setChosenCategory(foundItem);
        break;
      case "enhancement":
        props.setChosenCategory(foundItem);
        break;
      case "bug":
        props.setChosenCategory(foundItem);
        break;
      case "suggestion":
        if (props.setChosenStatus) {
          props.setChosenStatus(foundItem);
        }
        break;
      case "planned":
        if (props.setChosenStatus) {
          props.setChosenStatus(foundItem);
        }
        break;
      case "in-progress":
        if (props.setChosenStatus) {
          props.setChosenStatus(foundItem);
        }
        break;
      case "live":
        if (props.setChosenStatus) {
          props.setChosenStatus(foundItem);
        }
        break;
      default:
        props.setChosenCategory(foundItem);
        props.setChosenStatus(foundItem);
    }
  };

  return (
    <div
      className={`${styles.filterMenu} ${styles[props.dropdownClass]}`}
      onClick={menuDisplayHandler}
    >
      {selectedItem.title}
      {displayMenu ? (
        props.feedbackComp ? (
          <img src={arrowUpWhite} className={styles.arrow} alt="arrow" />
        ) : (
          <img src={arrowUp} className={styles.arrow} alt="arrow" />
        )
      ) : props.feedbackComp ? (
        <img src={arrowDownWhite} className={styles.arrow} alt="arrow" />
      ) : (
        <img src={arrowDown} className={styles.arrow} alt="arrow" />
      )}
      {displayMenu && (
        <ul className={styles.filterList}>
          {props.dropdownList.map((dropdownItem) => {
            return (
              <li
                className={`${styles.filterItem} ${
                  dropdownItem.id === selectedItem.id && styles.selectedFilter
                }`}
                id={dropdownItem.id}
                key={dropdownItem.id}
                onClick={selectionHandler}
              >
                {dropdownItem.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
