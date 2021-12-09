import React from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import FeatureDetails from "../components/FeedbackDetails";
import styles from "../styles/RoadmapPage.module.css";

const RoadmapPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topNav}>
        <div className={styles.navText}>
          <ButtonSecondary
            title="Go Back"
            icon={true}
            class="buttonRoadmap"
            color="#fff"
            iconWhite={true}
          />
          <h2 className={styles.mainTitle}>Roadmap</h2>
        </div>
        <ButtonPrimary title="Add Feedback" icon={true} color="#AD1FEA" />
      </div>
      <div className={styles.mainNav}>
        <div className={`${styles.mainNavItem}`}>Planned (2)</div>
        <div className={`${styles.mainNavItem} ${styles.selected}`}>
          In-Progress (3)
        </div>
        <div className={`${styles.mainNavItem}`}>Live(1)</div>
        <span className={`${styles.selectionBar} ${styles.positionTwo}`}></span>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.infoText}>
          <h1 className={styles.largeTitle}>In-Progress (3)</h1>
          <p className={styles.description}>
            Features currently being developed
          </p>
        </div>
        <FeatureDetails roadmapPage={true} color="#AD1FEA" />
        <FeatureDetails roadmapPage={true} color="#AD1FEA" />
        <FeatureDetails roadmapPage={true} color="#AD1FEA" />
      </div>
    </div>
  );
};

export default RoadmapPage;

// - Roadmap page
// 	1.- Go back button + Roadmap title
// 		- Add feedback button

// 	2.- Filter/slider bar (Planned, In-progress, Live)

// 	3.- Filter name title and counter

// 	4.- Feature request containers (+ coloring and progress title on top)
