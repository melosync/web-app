import React, { useState } from "react";
import {
  Container,
  TextField,
  CardContent,
  Card,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { UserContext } from "../../store/user";
import AuthService from "../../services/Auth";

import Styles from "./Register.module.scss";

const LOADING_CIRCLE_SIZE = 24;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { update } = React.useContext(UserContext);

  const onFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.Register(name, password, email);
      const newUser = await AuthService.Login(password, email);
      update(newUser);
      localStorage.setItem("MELOSYNC_USER", JSON.stringify(newUser));
      window.location.replace("/");
      // eslint-disable-next-line no-empty
    } catch (error) {}
    setLoading(false);
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

export default Register;
