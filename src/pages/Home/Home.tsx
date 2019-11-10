import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";

import { useApi } from "../../services/api";
import TypeOfConnect from "../../store/utils/TypeOfConnect";
import { StateStore } from "../../store";

import Styles from "./Home.module.scss";

const withRedux = connect((state: StateStore) => {
  return { user: state.user };
});

type Props = TypeOfConnect<typeof withRedux>;

const Home: React.FC<Props> = props => {
  const { user } = props;
  const api = useApi();
  const history = useHistory();

  const onCreateRoomClick = async (): Promise<void> => {
    try {
      // Create Room
      const res = await api.room.createRoom();

      // Go to room
      const roomUuid = res.data.room.uuid;
      history.push(`/rooms/${roomUuid}`);
    } catch (error) {
      // TODO: Provide real feedback
      console.error(error.response);
    }
  };

  return (
    <Container className={Styles.HomeContainer}>
      <h1>Melosync</h1>

      <Box marginTop={1} marginBottom={7}>
        <Typography>Sync music with anybody</Typography>
      </Box>

      {user.loggedIn ? (
        <Button color="primary" onClick={onCreateRoomClick}>
          Create Room
        </Button>
      ) : (
        <Link to="/login">
          <Button color="primary">Login</Button>
        </Link>
      )}
    </Container>
  );
};

export default withRedux(Home);
