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

  async function getList() {
    let results = await Parse.Cloud.run("fetchAllRequests");
    setFeedbackList(results);
    setCategorisedList(results);

    let commentResults = await Parse.Cloud.run("fetchAllComments");
    setComments(commentResults);
    setIsLoading(false);
  }

  // Passes on sorting order
  const sortList = (sortParam) => {
    setCurrSort(sortParam);
  };

  useEffect(() => {
    getList();
  }, []);

  const showSidebarHandler = (showSidebar) => {
    setShowMenu(showSidebar);
  };

  // Fixes sidebar menu overflow
  if (showMenu) {
    document.body.style.overflow = "hidden";
  } else if (!showMenu) {
    document.body.style.overflow = "auto";
  }

  // Sorts feedback list by category
  const onCategorySelection = (category) => {
    const newList = feedbackList.filter(
      (feedbackItem) => feedbackItem.get("category") === category
    );
    setCategorisedList(category !== "All" ? newList : feedbackList);
  };

  return (
    <div className={styles.homePageWrapper}>
      {props.isDemo && <Wip />}
      <div className={styles.mainNav}>
        <Header onShowSidebar={showSidebarHandler} showCloseIcon={showMenu} />
        <MobileSidebar showSidebar={showMenu} feedback={feedbackList} />
        <Categories selectedCategory={onCategorySelection} />
        <RoadmapWidget feedback={feedbackList} />
      </div>
      <div className={styles.mainContent}>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
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

// 1.- Frontend Mentor title component
// 	1.- 5 sidebar components = Sidebar, Header, Categories, Roadmap widget, Mobile Sidebar
// 	1.- Hamburger menu
// 		- show mobile sidebar

// Feature list and header component

// 	2.- Feature request header component
//  2.- Suggestions title - hidden in mobile
// 	2.- Sort dropdown menu
// 	2.- Add feedback button - SEPARATE COMPONENT

// 	3.- List of feature requests
// 	3.- No feedback yet page + Add feedback button (copied)

// 	4.- Feature request component
// 	4.- Feature request text
// 	4.- Feature request category
// 	4.- Feature request upvotes
// 	4.- Feature request comment button + number
