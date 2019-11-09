import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  TextField,
  CardContent,
  Card,
  Button,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { connect } from "react-redux";

import AuthService from "../../services/Auth";
import { userActions } from "../../store/user";
import { TypeOfConnect } from "../../store/utils/TypeOfConnect";

import Styles from "./Login.module.scss";

const LOADING_CIRCLE_SIZE = 24;

const withRedux = connect(
  null,
  dispatch => {
    return {
      setUser: (name: string, token: string) => {
        dispatch(userActions.setUser({ name, token, loggedIn: true }));
      },
    };
  }
);

type Props = TypeOfConnect<typeof withRedux>;

const Login: React.FC<Props> = props => {
  const history = useHistory();
  const { setUser } = props;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = await AuthService.Login(password, email);
      setUser(newUser.name, newUser.token);
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Container className={Styles.LoginContainer}>
      <Card>
        <CardContent>
          <h1 className={Styles.centeredText}>Login</h1>
          <form onSubmit={onFormSubmit}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              margin="normal"
              required
            />
            <TextField
              label="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              type="password"
              margin="normal"
              required
            />
            <div className={Styles.BottomFormContainer}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                Login
              </Button>
              {loading && (
                <CircularProgress
                  className={Styles.LoginLoader}
                  size={LOADING_CIRCLE_SIZE}
                />
              )}
              <Box width={1}>
                <Link to="/register">
                  <Button className={Styles.registerButton}>Or register</Button>
                </Link>
              </Box>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default withRedux(Login);
