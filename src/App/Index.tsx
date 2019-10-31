import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import UserProvider from "../store/user";
import theme from "../theme";

import Styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={Styles.parent}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <CssBaseline />
          <Router>
            <Navbar />
            <div className="App">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Redirect to="/" />
              </Switch>
            </div>
          </Router>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
