import styles from "../styles/RoadmapWidget.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const RoadmapWidget = (props) => {
  const [statusCount, setStatusCount] = useState(
    {
      title: "In-Progress",
      count: props.feedback.get("status", "In-Progress").length,
    },
    {
      title: "Planned",
      count: props.feedback.get("status", "Planned").length,
    },
    {
      title: "Live",
      count: props.feedback.get("status", "Live").length,
    }
  );

  useEffect(() => {
    setStatusCount(
      {
        title: "In-Progress",
        count: props.feedback.get("status", "In-Progress").length,
        color: "#AD1FEA",
      },
      {
        title: "Planned",
        count: props.feedback.get("status", "Planned").length,
        color: "#F49F85",
      },
      {
        title: "Live",
        count: props.feedback.get("status", "Live").length,
        color: "#62BCFA",
      }
    );
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
              style={{ backgroundColor: statusCount[0].color }}
            />
            <h2 className={styles.itemTitle}>statusCount[0].title</h2>
          </div>
          <p className={styles.counter}>statusCount[0].count</p>
        </div>
        <div className={styles.listItem}>
          <div className={styles.itemTitleBox}>
            <span
              className={styles.itemSpan}
              style={{ backgroundColor: statusCount[1].color }}
            />
            <h2 className={styles.itemTitle}>statusCount[1].title</h2>
          </div>
          <p className={styles.counter}>statusCount[1].count</p>
        </div>
        <div className={styles.listItem}>
          <div className={styles.itemTitleBox}>
            <span
              className={styles.itemSpan}
              style={{ backgroundColor: statusCount[2].color }}
            />
            <h2 className={styles.itemTitle}>statusCount[2].title</h2>
          </div>
          <p className={styles.counter}>statusCount[2].count</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapWidget;
