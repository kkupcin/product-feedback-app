import React, { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";
import Header from "../components/Header";
import FeedbackHeader from "../components/FeedbackHeader";
import FeedbackList from "../components/FeedbackList";
import MobileSidebar from "../components/MobileSidebar";
import Categories from "../components/Categories";
import RoadmapWidget from "../components/RoadmapWidget";
import Parse from "parse";
import Wip from "../components/Wip";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [comments, setComments] = useState([]);
  const [currSort, setCurrSort] = useState({
    title: "Most Upvotes",
    id: "most-upvotes",
  });
  const [categorisedList, setCategorisedList] = useState(feedbackList);

  const getList = async () => {
    let results = await Parse.Cloud.run("fetchAllRequests");
    setFeedbackList(results);
    setCategorisedList(results);

    let commentResults = await Parse.Cloud.run("fetchAllComments");
    setComments(commentResults);
    setIsLoading(false);
  };

  // Passes on sorting order
  const sortList = (sortParam) => {
    setCurrSort(sortParam);
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    // Fixes sidebar menu overflow
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else if (!showMenu) {
      document.body.style.overflow = "auto";
    }
  }, [showMenu]);

  const showSidebarHandler = (showSidebar) => {
    setShowMenu(showSidebar);
  };

  // Sorts feedback list by category
  const onCategorySelection = (category) => {
    const newList = feedbackList.filter(
      (feedbackItem) => feedbackItem.get("category") === category
    );
    setCategorisedList(category !== "All" ? newList : feedbackList);
  };

  return (
    <div className={styles.homePageWrapper}>
      {Parse.User.current() && Parse.User.current().get("isDemo") && <Wip />}
      <div className={styles.mainNav}>
        <Header onShowSidebar={showSidebarHandler} showCloseIcon={showMenu} />
        {showMenu && <MobileSidebar feedback={feedbackList} />}
        <Categories selectedCategory={onCategorySelection} />
        <RoadmapWidget feedback={feedbackList} />
      </div>
      <div className={styles.mainContent}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
            <FeedbackHeader
              feedbackCount={categorisedList.length}
              onSort={sortList}
            />
            <FeedbackList
              feedback={categorisedList}
              sortOrder={currSort}
              comments={comments}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default HomePage;
