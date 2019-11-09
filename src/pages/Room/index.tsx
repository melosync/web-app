import Container from "@material-ui/core/Container";
import React, { useEffect } from "react";
import SocketIo from "socket.io-client";

import Styles from "./Room.module.scss";
import VideoContainer from "./VideoContainer";

const Room: React.FC = () => {
  // TODO: Move in a dedicated file and connect real (token + room)
  useEffect(() => {
    const socket = SocketIo(process.env.REACT_APP_API_ENDPOINT!);

    socket.on("connect", () => {
      // TODO: Connect for real
      console.info("Connected");
      socket.emit("authenticate", { token: "token", roomUuid: "room" });
    });

    socket.on("exception", (errorMessage?: string) => {
      const message = errorMessage || "An error occurred";
      console.error(`Socket: ${message}`);
    });
  });

  return (
    <Container className={Styles.RoomContainer}>
      <VideoContainer />
    </Container>
  );
};

export default Room;
