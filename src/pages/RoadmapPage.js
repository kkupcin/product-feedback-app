import React from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import styles from "../styles/RoadmapPage.module.css";
import { useState, useEffect } from "react";
import Parse from "parse";
import FeedbackDetails from "../components/FeedbackDetails";
import { useNavigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const RoadmapPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState({
    inprogress: [],
    live: [],
    planned: [],
  });
  const [selectedFilter, setSelectedFilter] = useState("inProgress");
  const [comments, setComments] = useState();

  let navigate = useNavigate();

  // Redirect to the new feedback page
  const redirectHandler = () => {
    navigate("/new-feedback");
  };

  // Listen for filter selection in mobile view
  const selectedFilterListener = (e) => {
    setSelectedFilter(e.target.id);
  };

  // Redirect to the Feedback details page
  const feedbackClickHandler = (id) => {
    navigate(`/feedback-details/${id}`);
  };

  let selectedFilterSpan =
    (selectedFilter === "inProgress" && styles.positionTwo) ||
    (selectedFilter === "live" && styles.positionThree) ||
    (selectedFilter === "planned" && styles.positionOne);

  // Fetch list and and sort it into categories
  const getList = async () => {
    setIsLoading(true);

    let results = await Parse.Cloud.run("fetchAllRequests");

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

    let commentResults = await Parse.Cloud.run("fetchAllComments");
    setComments(commentResults);
    setIsLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  // Get product request list again to refresh upvotes
  const upvoteHandler = () => {
    getList();
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <div className={styles.topNav}>
            <div className={styles.navText}>
              <ButtonSecondary
                title="Go Back"
                icon={true}
                class="buttonRoadmap"
                color="#fff"
                iconWhite={true}
              />
              <h1 className={styles.mainTitle}>Roadmap</h1>
            </div>
            <ButtonPrimary
              title="Add Feedback"
              icon={true}
              color="purple"
              onBtnClick={redirectHandler}
            />
          </div>
          <menu className={styles.mainNav}>
            <li
              tabIndex="0"
              role="button"
              className={`${styles.mainNavItem} ${
                selectedFilter === "planned" && styles.selected
              }`}
              onClick={selectedFilterListener}
              id="planned"
            >
              Planned ({feedbackList.planned.length})
            </li>
            <li
              tabIndex="0"
              role="button"
              className={`${styles.mainNavItem} ${
                selectedFilter === "inProgress" && styles.selected
              }`}
              onClick={selectedFilterListener}
              id="inProgress"
            >
              In-Progress ({feedbackList.inprogress.length})
            </li>
            <li
              tabIndex="0"
              role="button"
              className={`${styles.mainNavItem} ${
                selectedFilter === "live" && styles.selected
              }`}
              onClick={selectedFilterListener}
              id="live"
            >
              Live ({feedbackList.live.length})
            </li>
            <span
              className={`${styles.selectionBar} ${selectedFilterSpan}`}
            ></span>
          </menu>
          <main className={`${styles.mainContainer} ${styles[selectedFilter]}`}>
            <div className={`${styles.mainList} ${styles.inProgressList}`}>
              <div className={styles.infoText}>
                <h2 className={styles.largeTitle}>
                  In-Progress ({feedbackList.inprogress.length})
                </h2>
                <p className={styles.description}>
                  Features currently being developed
                </p>
              </div>
              {feedbackList.inprogress.map((feedbackItem) => {
                let filteredComments = comments.filter((comment) => {
                  return comment.get("productFeedback").id === feedbackItem.id;
                });
                return (
                  <FeedbackDetails
                    roadmapPage={true}
                    color="#AD1FEA"
                    info={feedbackItem}
                    onFeedbackClick={feedbackClickHandler}
                    key={feedbackItem.id}
                    commentCounter={filteredComments.length}
                    onUpvote={upvoteHandler}
                  />
                );
              })}
            </div>
            <div className={`${styles.mainList} ${styles.plannedList}`}>
              <div className={styles.infoText}>
                <h2 className={styles.largeTitle}>
                  Planned ({feedbackList.planned.length})
                </h2>
                <p className={styles.description}>
                  Features currently being developed
                </p>
              </div>
              {feedbackList.planned.map((feedbackItem) => {
                let filteredComments = comments.filter((comment) => {
                  return comment.get("productFeedback").id === feedbackItem.id;
                });
                return (
                  <FeedbackDetails
                    roadmapPage={true}
                    color="#F49F85"
                    info={feedbackItem}
                    onFeedbackClick={feedbackClickHandler}
                    key={feedbackItem.id}
                    commentCounter={filteredComments.length}
                  />
                );
              })}
            </div>
            <div className={`${styles.mainList} ${styles.liveList}`}>
              <div className={styles.infoText}>
                <h2 className={styles.largeTitle}>
                  Live ({feedbackList.live.length})
                </h2>
                <p className={styles.description}>
                  Features currently being developed
                </p>
              </div>
              {feedbackList.live.map((feedbackItem) => {
                let filteredComments = comments.filter((comment) => {
                  return comment.get("productFeedback").id === feedbackItem.id;
                });
                return (
                  <FeedbackDetails
                    roadmapPage={true}
                    color="#62BCFA"
                    info={feedbackItem}
                    onFeedbackClick={feedbackClickHandler}
                    key={feedbackItem.id}
                    commentCounter={filteredComments.length}
                  />
                );
              })}
            </div>
          </main>
        </React.Fragment>
      )}
    </div>
  );
};

export default RoadmapPage;
