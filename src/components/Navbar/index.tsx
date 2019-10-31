import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MelosyncIcon from "../icons/Melosync";
import { UserContext } from "../../store/user";

import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const { state: user, update: updateUser } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = (): void => {
    updateUser(null);
    localStorage.removeItem("MELOSYNC_USER");
    window.location.replace("/login");
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" className={styles.AppBar} color="inherit">
      <Toolbar className={styles.Toolbar}>
        <Link to="/" className={styles.LinkContainer}>
          <MelosyncIcon className={styles.MelosyncIcon} />
          <h1 className={styles.MelosyncTitle}>Melosync</h1>
        </Link>
        {user !== null ? (
          <span>
            <Button
              onClick={event => {
                setAnchorEl(event.currentTarget);
              }}
              color="inherit"
            >
              {user.name}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => {
                setAnchorEl(null);
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </span>
        ) : (
          <Link to="/login">
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
