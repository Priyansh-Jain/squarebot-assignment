import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Jobs from "./Components/Jobs";
import AppliedJob from "./Components/AppliedJobs";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/jobs">
            <Jobs />
          </Route>

          <Route path="/appliedjobs">
            <AppliedJob />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
