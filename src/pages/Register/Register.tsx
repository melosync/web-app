import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { userActions } from "../../store/UserStore";
import { useApi } from "../../services/api";
import TypeOfConnect from "../../store/utils/TypeOfConnect";

import Styles from "./Register.module.scss";

const LOADING_CIRCLE_SIZE = 24;

const withRedux = connect(null, dispatch => {
  return {
    setUser: (id: string, name: string, token: string) => {
      dispatch(userActions.setUser({ id, name, token, loggedIn: true }));
    },
  };
});

type Props = TypeOfConnect<typeof withRedux>;

const Register: React.FC<Props> = props => {
  const { setUser } = props;

  const api = useApi();
  const history = useHistory();

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Loading animation
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    // Prevent default behavior
    e.preventDefault();

    setLoading(true);
    try {
      // Register new User
      await api.auth.registerUser({
        name: name,
        email: email,
        password: password,
      });

      // Log in as the newly created User
      const res = await api.auth.loginUser({
        email: email,
        password: password,
      });

      // Save User in Store
      const { data } = res;
      setUser(data.user.id, data.user.name, data.token);

      // Redirect to "/" as an authenticated User
      history.push("/");
    } catch (error) {
      setLoading(false);

      // TODO: Provide real feedback
      console.log(error.response);
    }
  };

  return (
    <Container className={Styles.RegisterContainer}>
      <Card>
        <CardContent>
          <h1 className={Styles.centeredText}>Register</h1>
          <form onSubmit={onFormSubmit}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              margin="normal"
              required
            />
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
                Register
              </Button>
              {loading && (
                <CircularProgress
                  size={LOADING_CIRCLE_SIZE}
                  className={Styles.Loader}
                />
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default withRedux(Register);
