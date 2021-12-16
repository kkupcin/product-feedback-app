import React from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import styles from "../styles/RoadmapPage.module.css";
import { useState, useEffect } from "react";
import Parse from "parse";
import FeedbackDetails from "../components/FeedbackDetails";

const RoadmapPage = () => {
  const [feedbackList, setFeedbackList] = useState({
    inprogress: [],
    live: [],
    planned: [],
  });
  const [selectedFilter, setSelectedFilter] = useState("inProgress");

  const selectedFilterListener = (e) => {
    setSelectedFilter(e.target.id);
  };

  let selectedFilterSpan =
    (selectedFilter === "inProgress" && styles.positionTwo) ||
    (selectedFilter === "live" && styles.positionThree) ||
    (selectedFilter === "planned" && styles.positionOne);

  async function getList() {
    let query = new Parse.Query("ProductRequest");
    let results = await query.find();
    let inprogressArray = results.filter(
      (item) => item.get("status") === "In-Progress"
    );
    let plannedArray = results.filter(
      (item) => item.get("status") === "Planned"
    );
    let liveArray = results.filter((item) => item.get("status") === "Live");
    setFeedbackList({
      inprogress: inprogressArray,
      planned: plannedArray,
      live: liveArray,
    });
  }

  useEffect(() => {
    getList();
  }, []);

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
        <ButtonPrimary title="Add Feedback" icon={true} color="purple" />
      </div>
      <div className={styles.mainNav}>
        <div
          className={`${styles.mainNavItem} ${
            selectedFilter === "planned" && styles.selected
          }`}
          onClick={selectedFilterListener}
          id="planned"
        >
          Planned ({feedbackList.planned.length})
        </div>
        <div
          className={`${styles.mainNavItem} ${
            selectedFilter === "inProgress" && styles.selected
          }`}
          onClick={selectedFilterListener}
          id="inProgress"
        >
          In-Progress ({feedbackList.inprogress.length})
        </div>
        <div
          className={`${styles.mainNavItem} ${
            selectedFilter === "live" && styles.selected
          }`}
          onClick={selectedFilterListener}
          id="live"
        >
          Live ({feedbackList.live.length})
        </div>
        <span className={`${styles.selectionBar} ${selectedFilterSpan}`}></span>
      </div>
      <div className={`${styles.mainContainer} ${styles[selectedFilter]}`}>
        <div className={`${styles.mainList} ${styles.inProgressList}`}>
          <div className={styles.infoText}>
            <h1 className={styles.largeTitle}>
              In-Progress ({feedbackList.inprogress.length})
            </h1>
            <p className={styles.description}>
              Features currently being developed
            </p>
          </div>
          {feedbackList.inprogress.map((feedbackItem) => {
            return (
              <FeedbackDetails
                roadmapPage={true}
                color="#AD1FEA"
                info={feedbackItem}
              />
            );
          })}
        </div>
        <div className={`${styles.mainList} ${styles.plannedList}`}>
          <div className={styles.infoText}>
            <h1 className={styles.largeTitle}>
              Planned ({feedbackList.planned.length})
            </h1>
            <p className={styles.description}>
              Features currently being developed
            </p>
          </div>
          {feedbackList.planned.map((feedbackItem) => {
            return (
              <FeedbackDetails
                roadmapPage={true}
                color="#F49F85"
                info={feedbackItem}
              />
            );
          })}
        </div>
        <div className={`${styles.mainList} ${styles.liveList}`}>
          <div className={styles.infoText}>
            <h1 className={styles.largeTitle}>
              Live ({feedbackList.live.length})
            </h1>
            <p className={styles.description}>
              Features currently being developed
            </p>
          </div>
          {feedbackList.live.map((feedbackItem) => {
            return (
              <FeedbackDetails
                roadmapPage={true}
                color="#62BCFA"
                info={feedbackItem}
              />
            );
          })}
        </div>
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
