import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { createMuiTheme } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

const App: React.FC = () => {
  let [theme_type, set_theme_type] = useState("dark");
  window.test = set_theme_type as any;

  const theme = createMuiTheme({
    palette: {
      primary: amber,
      type: theme_type as any,
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />

          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
