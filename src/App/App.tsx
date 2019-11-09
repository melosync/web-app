import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import React, { useRef } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Room from "../pages/Room";
import Api, { ApiContext } from "../services/api";
import { StateStore } from "../store";
import TypeOfConnect from "../store/utils/TypeOfConnect";
import theme from "../theme";
import envOrThrow from "../utils/envOrThrow";

import Styles from "./App.module.scss";

const withRedux = connect((state: StateStore) => {
  return { user: state.user };
});

type Props = TypeOfConnect<typeof withRedux>;

const App: React.FC<Props> = props => {
  const { user } = props;

  const apiEndpoint = envOrThrow("REACT_APP_API_ENDPOINT");
  const api = useRef(new Api(apiEndpoint));

  return (
    <ApiContext.Provider value={api.current}>
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
    </ApiContext.Provider>
  );
};

export default withRedux(App);
