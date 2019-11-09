import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

import MelosyncIcon from "../icons/Melosync";
import { StateStore } from "../../store/store";
import { userActions } from "../../store/user";
import { TypeOfConnect } from "../../store/utils/TypeOfConnect";

import styles from "./Navbar.module.scss";

const withRedux = connect(
  (state: StateStore) => {
    return { user: state.user };
  },
  dispatch => {
    return {
      resetUser: () => {
        dispatch(userActions.resetUser());
      },
    };
  }
);

type Props = TypeOfConnect<typeof withRedux>;

const Navbar: React.FC<Props> = props => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, resetUser } = props;

  const handleLogout = (): void => {
    resetUser();
    setAnchorEl(null);
    history.push("/login");
  };

  return (
    <AppBar position="sticky" className={styles.AppBar} color="inherit">
      <Toolbar className={styles.Toolbar}>
        <Link to="/" className={styles.LinkContainer}>
          <MelosyncIcon className={styles.MelosyncIcon} />
          <h1 className={styles.MelosyncTitle}>Melosync</h1>
        </Link>
        {user.loggedIn ? (
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

export default withRedux(Navbar);
