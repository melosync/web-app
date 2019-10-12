import React from "react";
import { Container, TextField, CardContent, Card, Button } from "@material-ui/core";

const Login: React.FC = () => (
  <Container style={{height: '100%', display:'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center'}}>
    <Card>
      <CardContent>
        <h1>Login</h1>
        <form>
          <TextField label="Email" fullWidth type="mail" margin="normal" />
          <TextField label="Password" fullWidth type="password" margin="normal" />
          <Button color="primary">Confirm</Button>
        </form>
      </CardContent>
    </Card>
  </Container>
);

export default Login;
