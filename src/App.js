import "./App.css";
import HomePage from "./pages/HomePage";
import NewFeedbackPage from "./pages/NewFeedbackPage";
import EditFeedbackPage from "./pages/EditFeedbackPage";
import FeedbackDetailsPage from "./pages/FeedbackDetailsPage";
import RoadmapPage from "./pages/RoadmapPage";
import { Routes, Route } from "react-router-dom";
import Parse from "parse";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";

const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_KEY;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [isDemoAcc, setIsDemoAcc] = useState(true);

  // Logs in default demo account
  async function loginDemoAcc() {
    if (isDemoAcc) {
      const user = await Parse.User.logIn(
        process.env.REACT_APP_DEMO_USERNAME,
        process.env.REACT_APP_DEMO_PASS
      );
    }
  }

  // Checks if the user is a demo account
  async function checkIfDemo() {
    if (!Parse.User.current()) {
      console.log(Parse.User.current());
      setIsDemoAcc(true);
      await loginDemoAcc();
    }
    let currUser = Parse.User.current();
    if (currUser.get("isDemo") === true) {
      setIsDemoAcc(true);
    }
    if (currUser.get("isDemo") === false) {
      setIsDemoAcc(false);
    }
    console.log(isDemoAcc);
  }

  useEffect(() => {
    checkIfDemo();
  }, [Parse.User.current()]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isDemo={
                Parse.User.current() && Parse.User.current().get("isDemo")
              }
            />
          }
        />
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
