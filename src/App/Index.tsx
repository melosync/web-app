import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Room from "../pages/Room";
import Navbar from "../components/Navbar";
import theme from "../theme";
import { StateStore } from "../store/store";
import { TypeOfConnect } from "../store/utils/TypeOfConnect";

import Styles from "./App.module.scss";

const withRedux = connect((state: StateStore) => {
  return { user: state.user };
});

type Props = TypeOfConnect<typeof withRedux>;

const App: React.FC<Props> = props => {
  const { user } = props;
  return (
    <div className={Styles.parent}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <div className="App">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/room">
                {user.loggedIn ? <Room /> : <Redirect to="/login" />}
              </Route>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default withRedux(App);
