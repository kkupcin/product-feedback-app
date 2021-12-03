import React from "react";
import Header from "../components/Header";
import FeedbackHeader from "../components/FeedbackHeader";

const HomePage = () => {
  return (
    <React.Fragment>
      <Header />
      <FeedbackHeader />
    </React.Fragment>
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
