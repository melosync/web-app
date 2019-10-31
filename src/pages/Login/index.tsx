import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  CardContent,
  Card,
  Button,
  CircularProgress,
  Box,
} from "@material-ui/core";

import { UserContext } from "../../store/user";
import AuthService from "../../services/Auth";
import "./index.scss";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { update } = React.useContext(UserContext);

  const onFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = await AuthService.Login(password, email);
      update(newUser);
      localStorage.setItem("MELOSYNC_USER", JSON.stringify(newUser));
      window.location.replace("/");
      // eslint-disable-next-line no-empty
    } catch (error) {}
    setLoading(false);
  };
  return (
    <Container className="LoginContainer">
      <Card>
        <CardContent>
          <h1 className="centered-text">Login</h1>
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
            <div className="BottomFormContainer">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                Login
              </Button>
              {loading && (
                <CircularProgress className="LoginLoader" size={24} />
              )}
              <Box width={1}>
                <Link to="/register">
                  <Button className="register-button">Or register</Button>
                </Link>
              </Box>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
