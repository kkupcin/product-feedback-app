import "./App.css";
import HomePage from "./pages/HomePage";
import NewFeedbackPage from "./pages/NewFeedbackPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-feedback" element={<NewFeedbackPage />} />
      </Routes>
    </div>
  );
}

export default App;
