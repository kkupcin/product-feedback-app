import "./App.css";
import HomePage from "./pages/HomePage";
import NewFeedbackPage from "./pages/NewFeedbackPage";
import EditFeedbackPage from "./pages/EditFeedbackPage";
import FeedbackDetailsPage from "./pages/FeedbackDetailsPage";
import RoadmapPage from "./pages/RoadmapPage";
import { Routes, Route } from "react-router-dom";
import Parse from "parse";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";

const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_KEY;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  // Logs in default demo account
  async function loginDemoAcc() {
    // These env are not used as strings in Netlify so template literals should be used
    let token = await Parse.Cloud.run("login", {
      username: `${process.env.REACT_APP_DEMO_USERNAME}`,
      password: `${process.env.REACT_APP_DEMO_PASS}`,
    });

    await Parse.User.become(token);
  }

  // Checks if the user is a demo account
  async function checkIfDemo() {
    if (!Parse.User.current()) {
      await loginDemoAcc();
    }
  }

  useEffect(() => {
    checkIfDemo();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-feedback" element={<NewFeedbackPage />} />
        <Route
          path="/edit-feedback/:feedbackId"
          element={<EditFeedbackPage />}
        />
        <Route
          path="/feedback-details/:feedbackId"
          element={<FeedbackDetailsPage />}
        />
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </div>
  );
}

export default App;
