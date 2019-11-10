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
import RoomPage from "../pages/RoomPage";
import Api, { ApiContext } from "../services/api";
import YoutubeApi, { YoutubeApiContext } from "../services/YoutubeApi";
import { StateStore } from "../store";
import TypeOfConnect from "../store/utils/TypeOfConnect";
import theme from "../theme";
import envOrThrow from "../utils/envOrThrow";

import Styles from "./App.module.scss";

const withRedux = connect((state: StateStore) => {
  return { user: state.user, apiInfo: state.apiInfo };
});

type Props = TypeOfConnect<typeof withRedux>;

const App: React.FC<Props> = props => {
  const { user, apiInfo } = props;

  const token = user.loggedIn ? user.token : undefined;
  const api = useRef(new Api(apiInfo.url, token));
  const ytApiKey = envOrThrow("REACT_APP_YOUTUBE_API_KEY");
  const ytApi = useRef(
    new YoutubeApi("https://www.googleapis.com/youtube/v3/", ytApiKey)
  );

  return (
    <ApiContext.Provider value={api.current}>
      <YoutubeApiContext.Provider value={ytApi.current}>
        <div className={Styles.parent}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Navbar />
              <div className="App">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/rooms/:uuid">
                    {user.loggedIn ? <RoomPage /> : <Redirect to="/login" />}
                  </Route>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </Router>
          </ThemeProvider>
        </div>
      </YoutubeApiContext.Provider>
    </ApiContext.Provider>
  );
};

export default withRedux(App);
