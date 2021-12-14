import styles from "../styles/RoadmapWidget.module.css";
import { Link } from "react-router-dom";

const RoadmapWidget = (props) => {
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
              style={{ backgroundColor: "#F49F85" }}
            />
            <h2 className={styles.itemTitle}>Planned</h2>
          </div>
          <p className={styles.counter}>2</p>
        </div>
        <div className={styles.listItem}>
          <div className={styles.itemTitleBox}>
            <span
              className={styles.itemSpan}
              style={{ backgroundColor: "#AD1FEA" }}
            />
            <h2 className={styles.itemTitle}>In-Progress</h2>
          </div>
          <p className={styles.counter}>3</p>
        </div>
        <div className={styles.listItem}>
          <div className={styles.itemTitleBox}>
            <span
              className={styles.itemSpan}
              style={{ backgroundColor: "#62BCFA" }}
            />
            <h2 className={styles.itemTitle}>Live</h2>
          </div>
          <p className={styles.counter}>1</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapWidget;
