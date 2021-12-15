import React, { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";
import Header from "../components/Header";
import FeedbackHeader from "../components/FeedbackHeader";
import FeedbackList from "../components/FeedbackList";
import MobileSidebar from "../components/MobileSidebar";
import Categories from "../components/Categories";
import RoadmapWidget from "../components/RoadmapWidget";
import Parse from "parse";

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  async function getList() {
    let query = new Parse.Query("ProductRequest");
    let results = await query.find();
    setFeedbackList(results);
  }

  useEffect(() => {
    getList();
  }, []);

  const showSidebarHandler = (showSidebar) => {
    setShowMenu(showSidebar);
  };

  // FIX MOBILE SIDEBAR OVERFLOW
  // ADD SIDEBAR ANIMATION

  return (
    <div className={styles.homePageWrapper}>
      <div className={styles.mainNav}>
        <Header onShowSidebar={showSidebarHandler} showCloseIcon={showMenu} />
        <MobileSidebar showSidebar={showMenu} />
        <Categories />
        <RoadmapWidget feedback={feedbackList} />
      </div>
      <div className={styles.mainContent}>
        <FeedbackHeader feedbackCount={feedbackList.length} />
        <FeedbackList feedback={feedbackList} />
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
