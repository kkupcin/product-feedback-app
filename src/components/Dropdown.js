import { useState } from "react";
import styles from "../styles/Dropdown.module.css";
import arrowUp from "../assets/shared/icon-arrow-up.svg";
import arrowDown from "../assets/shared/icon-arrow-down-blue.svg";
import check from "../assets/shared/icon-check.svg";

const Dropdown = (props) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(props.dropdownList[0]);

  const menuDisplayHandler = () => {
    setDisplayMenu(!displayMenu);
  };

  const selectionHandler = (e) => {
    let foundItem = props.dropdownList.find(
      (dropdownItem) => dropdownItem.id === e.target.id
    );
    setSelectedItem(foundItem);
  };

  return (
    <div
      className={`${styles.filterMenu} ${styles[props.dropdownClass]}`}
      onClick={menuDisplayHandler}
    >
      {selectedItem.title}
      {displayMenu ? (
        <img src={arrowUp} className={styles.arrow} alt="arrow" />
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
