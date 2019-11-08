import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Room from "../pages/Room";
import Navbar from "../components/Navbar";
import theme from "../theme";
import store from "../store/store";

import Styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={Styles.parent}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="App">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/room" component={Room} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Redirect to="/" />
              </Switch>
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
