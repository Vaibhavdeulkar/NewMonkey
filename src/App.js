import "./App.css";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  // api_key = process.env.NEWS_ORG_API_KEY;
  const api_key = "f8888285f94b48b7ad58035fe1165cd2";

  const [progress, setProgress] = useState(0);

  const set_Progress = (progress) => {
    setProgress(progress);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                api_key={api_key}
                settingProgress={set_Progress}
                key="general"
                category="general"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                api_key={api_key}
                settingProgress={set_Progress}
                key="business"
                category="business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                api_key={api_key}
                settingProgress={set_Progress}
                key="entertainment"
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                api_key={api_key}
                settingProgress={set_Progress}
                key="health"
                category="health"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                api_key={api_key}
                settingProgress={set_Progress}
                key="sports"
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                api_key={api_key}
                settingProgress={set_Progress}
                key="technology"
                category="technology"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                api_key={api_key}
                settingProgress={set_Progress}
                key="science"
                category="science"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
