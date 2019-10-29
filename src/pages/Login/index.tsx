import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const Login: React.FC = () => {
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { update } = React.useContext(UserContext);

  const onFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    setloading(true);
    try {
      const newUser = await AuthService.Login(password, email);
      update(newUser);
      localStorage.setItem("MELOSYNC_USER", JSON.stringify(newUser));
      window.location.replace("/");
      // eslint-disable-next-line no-empty
    } catch (error) {}
    setloading(false);
  };
  return (
    <Container
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <CardContent>
          <h1 style={{ textAlign: "center" }}>Login</h1>
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
            <div
              style={{
                position: "relative",
                display: "grid",
              }}
            >
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
                  size={24}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -12,
                    marginLeft: -12,
                  }}
                />
              )}
              <Link to="/register" style={{ width: "100%" }}>
                <Button style={{ width: "100%" }}>Or register</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
