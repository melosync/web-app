import React from "react";
import { Container } from "@material-ui/core";

import Styles from "./Room.module.scss";
import VideoContainer from "./VideoContainer";

const Room: React.FC = () => {
  return (
    <Container className={Styles.RoomContainer}>
      <VideoContainer />
    </Container>
  );
};

export default Room;
