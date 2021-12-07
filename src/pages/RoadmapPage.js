import React from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import FeatureDetails from "../components/FeedbackDetails";
import styles from "../styles/RoadmapPage.module.css";

const RoadmapPage = () => {
  return (
    <React.Fragment>
      <div className={styles.topNav}>
        <div className={styles.navText}>
          <ButtonSecondary
            title="Go Back"
            icon={true}
            class="buttonRoadmap"
            color="#fff"
          />
          <h2 className={styles.mainTitle}>Roadmap</h2>
        </div>
        <ButtonPrimary title="Add Feedback" icon={true} color="#AD1FEA" />
      </div>
      <div>
        <div>Planned (2)</div>
        <div>In-Progress (3)</div>
        <div>Live(1)</div>
      </div>
      <div>
        <div>
          <h1>In-Progress (3)</h1>
          <p>Features currently being developed</p>
        </div>
        <FeatureDetails />
        <FeatureDetails />
        <FeatureDetails />
      </div>
    </React.Fragment>
  );
};

export default RoadmapPage;

// - Roadmap page
// 	1.- Go back button + Roadmap title
// 		- Add feedback button

// 	2.- Filter/slider bar (Planned, In-progress, Live)

// 	3.- Filter name title and counter

// 	4.- Feature request containers (+ coloring and progress title on top)
