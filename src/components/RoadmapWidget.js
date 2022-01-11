import styles from "../styles/RoadmapWidget.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const RoadmapWidget = (props) => {
  const [sortedList, setSortedList] = useState({
    inprogress: [],
    live: [],
    planned: [],
  });

  // Filters out feedback into three categories by status
  useEffect(() => {
    const inProgressArray = props.feedback.filter(
      (feedbackItem) => feedbackItem.get("status") === "In-Progress"
    );

    const plannedArray = props.feedback.filter(
      (feedbackItem) => feedbackItem.get("status") === "Planned"
    );

    const liveArray = props.feedback.filter(
      (feedbackItem) => feedbackItem.get("status") === "Live"
    );

    setSortedList({
      inprogress: inProgressArray,
      live: liveArray,
      planned: plannedArray,
    });
  }, [props.feedback]);

  return (
    <div
      className={`${styles.container} ${props.sidebar ? styles.sidebar : ""}`}
    >
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Roadmap</h1>
        <Link className={styles.button} to="/roadmap">
          View
        </Link>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.listItem}>
          <div className={styles.itemTitleBox}>
            <span
              className={styles.itemSpan}
              style={{ backgroundColor: "#AD1FEA" }}
            />
            <h2 className={styles.itemTitle}>In-Progress</h2>
          </div>
          <p className={styles.counter}>{sortedList.inprogress.length}</p>
        </div>
        <div className={styles.listItem}>
          <div className={styles.itemTitleBox}>
            <span
              className={styles.itemSpan}
              style={{ backgroundColor: "#F49F85" }}
            />
            <h2 className={styles.itemTitle}>Planned</h2>
          </div>
          <p className={styles.counter}>{sortedList.planned.length}</p>
        </div>
        <div className={styles.listItem}>
          <div className={styles.itemTitleBox}>
            <span
              className={styles.itemSpan}
              style={{ backgroundColor: "#62BCFA" }}
            />
            <h2 className={styles.itemTitle}>Live</h2>
          </div>
          <p className={styles.counter}>{sortedList.live.length}</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapWidget;
