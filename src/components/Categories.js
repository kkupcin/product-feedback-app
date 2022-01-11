import { useState } from "react";
import styles from "../styles/Categories.module.css";

const Categories = (props) => {
  const [clickedCategory, setClickedCategory] = useState("All");

  // Pass chosen category for filtering
  const categoryClickHandler = (e) => {
    setClickedCategory(e.target.innerHTML);
    props.selectedCategory(e.target.innerHTML);
  };

  return (
    <div
      className={`${styles.container} ${props.sidebar ? styles.sidebar : ""}`}
    >
      <ul className={styles.list}>
        <li
          className={`${styles.category} ${
            clickedCategory === "All" && styles.selected
          }`}
          onClick={categoryClickHandler}
        >
          All
        </li>
        <li
          className={`${styles.category} ${
            clickedCategory === "UI" && styles.selected
          }`}
          onClick={categoryClickHandler}
        >
          UI
        </li>
        <li
          className={`${styles.category} ${
            clickedCategory === "UX" && styles.selected
          }`}
          onClick={categoryClickHandler}
        >
          UX
        </li>
        <li
          className={`${styles.category} ${
            clickedCategory === "Enhancement" && styles.selected
          }`}
          onClick={categoryClickHandler}
        >
          Enhancement
        </li>
        <li
          className={`${styles.category} ${
            clickedCategory === "Bug" && styles.selected
          }`}
          onClick={categoryClickHandler}
        >
          Bug
        </li>
        <li
          className={`${styles.category} ${
            clickedCategory === "Feature" && styles.selected
          }`}
          onClick={categoryClickHandler}
        >
          Feature
        </li>
      </ul>
    </div>
  );
};

export default Categories;
