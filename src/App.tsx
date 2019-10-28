import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import theme from "./theme";
import UserProvider from "./store/user";

const App: React.FC = () => {
  return (
    <div className="parent">
      <ThemeProvider theme={theme}>
        <UserProvider>
          <CssBaseline />
          <Router>
            <Navbar />
            <div className="App">
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </div>
          </Router>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
