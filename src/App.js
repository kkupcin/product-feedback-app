import "./App.css";
import HomePage from "./pages/HomePage";
import NewFeedbackPage from "./pages/NewFeedbackPage";
import EditFeedbackPage from "./pages/EditFeedbackPage";
import FeedbackDetailsPage from "./pages/FeedbackDetailsPage";
import RoadmapPage from "./pages/RoadmapPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-feedback" element={<NewFeedbackPage />} />
        <Route path="/edit-feedback" element={<EditFeedbackPage />} />
        <Route path="/feedback-details" element={<FeedbackDetailsPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </div>
  );
}

export default App;
