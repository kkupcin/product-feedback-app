import React from "react";
import styles from "../styles/MobileSidebar.module.css";
import Categories from "./Categories";
import RoadmapWidget from "./RoadmapWidget";

const MobileSidebar = (props) => {
  return (
    <React.Fragment>
      {props.showSidebar && (
        <div className={styles.outerModal}>
          <div className={styles.container}>
            <Categories sidebar={true} />
            <RoadmapWidget sidebar={true} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MobileSidebar;
