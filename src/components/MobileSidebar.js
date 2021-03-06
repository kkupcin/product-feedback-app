import React from "react";
import styles from "../styles/MobileSidebar.module.css";
import Categories from "./Categories";
import RoadmapWidget from "./RoadmapWidget";

const MobileSidebar = (props) => {
  return (
    <React.Fragment>
      <div className={styles.outerModal}>
        <section className={styles.container}>
          <Categories sidebar={true} />
          <RoadmapWidget sidebar={true} feedback={props.feedback} />
        </section>
      </div>
    </React.Fragment>
  );
};

export default MobileSidebar;
