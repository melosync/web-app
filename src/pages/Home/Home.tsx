import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useHistory } from "react-router-dom";

import { useApi } from "../../services/api";

import Styles from "./Home.module.scss";

const Home: React.FC = () => {
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
      <h1>Impact Title</h1>

      <Box marginTop={10}>
        <Typography>
          Quae dum ita struuntur, indicatum est apud Tyrum indumentum regale
          textum occulte, incertum quo locante vel cuius usibus apparatum.
          ideoque rector provinciae tunc pater Apollinaris eiusdem nominis ut
          conscius ductus est aliique congregati sunt ex diversis civitatibus
          multi, qui atrocium criminum ponderibus urgebantur.
        </Typography>
      </Box>

      <Button color="primary" onClick={onCreateRoomClick}>
        Create Room
      </Button>
    </Container>
  );
};

export default Home;
