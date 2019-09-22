import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

const App: React.FC = () => (
  <div className="App">
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      TODO : Layout
    </Router>
  </div>
);

export default App;
