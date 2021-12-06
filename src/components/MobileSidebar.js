import styles from "../styles/MobileSidebar.module.css";
import Categories from "./Categories";
import RoadmapWidget from "./RoadmapWidget";

const MobileSidebar = (props) => {
  return (
    <div className={styles.outerModal}>
      <div className={styles.container}>
        <Categories />
        <RoadmapWidget />
      </div>
    </div>
  );
};

export default MobileSidebar;
