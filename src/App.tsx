import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App: React.FC = () => (
  <div className="App">
    <Router>
      <Navbar />

      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
    </Router>
  </div>
);

export default App;
