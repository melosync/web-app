import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import MelosyncIcon from "../icons/Melosync/Melosync";

import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky" className={styles.AppBar} color="inherit">
      <Toolbar className={styles.Toolbar}>
        <Link to="/" className={styles.LinkContainer}>
          <MelosyncIcon className={styles.MelosyncIcon} />
          <h1 className={styles.MelosyncTitle}>Melosync</h1>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
