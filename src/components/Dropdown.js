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

  // Set selected item in 'selectedItem' state
  const selectionHandler = (e) => {
    let foundItem = props.dropdownList.find(
      (dropdownItem) => dropdownItem.id === e.target.id
    );

    setSelectedItem(foundItem);

    // Pass on selected item for sorting
    if (props.onSortOrderChange) {
      props.onSortOrderChange(foundItem);
    }

    // Pass on selected item based on the type
    if (foundItem.type) {
      switch (foundItem.type) {
        case "category":
          props.setChosenCategory(foundItem);
          break;
        case "status":
          if (props.setChosenStatus) {
            props.setChosenStatus(foundItem);
          }
          break;
        default:
          props.setChosenCategory(foundItem);
          props.setChosenStatus(foundItem);
      }
    }
  };

  return (
    <div
      className={`${styles.filterMenu} ${styles[props.dropdownClass]}`}
      onClick={menuDisplayHandler}
    >
      {selectedItem.title}
      {props.feedbackComp ? (
        <img
          src={displayMenu ? arrowUpWhite : arrowDownWhite}
          className={styles.arrow}
          alt="arrow"
        />
      ) : (
        <img
          src={displayMenu ? arrowUp : arrowDown}
          className={styles.arrow}
          alt="arrow"
        />
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
