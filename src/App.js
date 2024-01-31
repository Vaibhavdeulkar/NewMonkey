import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  api_key = process.env.NEWS_ORG_API_KEY;

  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    console.log(" process.env.NEWS_ORG_API_KEY "+  process.env.NEWS_ORG_API_KEY)
    this.setState({ progress: progress });
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News api_key={this.api_key}
                  settingProgress={this.setProgress}
                  key="general"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News api_key={this.api_key}
                  settingProgress={this.setProgress}
                  key="business"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News api_key={this.api_key}
                  settingProgress={this.setProgress}
                  key="entertainment"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News api_key={this.api_key}
                  settingProgress={this.setProgress}
                  key="health"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News api_key={this.api_key}
                  settingProgress={this.setProgress}
                  key="sports"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News api_key={this.api_key}
                  settingProgress={this.setProgress}
                  key="technology"
                  category="technology"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News api_key={this.api_key}
                  settingProgress={this.setProgress}
                  key="science"
                  category="science"
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
