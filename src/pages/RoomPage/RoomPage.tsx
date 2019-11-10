import Container from "@material-ui/core/Container";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import SocketIo from "socket.io-client";

import { useApi } from "../../services/api";
import { StateStore } from "../../store";
import TypeOfConnect from "../../store/utils/TypeOfConnect";
import Room from "../../types/Room";

import VideoContainer from "./VideoContainer";
import Styles from "./RoomPage.module.scss";

const withRedux = connect((state: StateStore) => {
  return { user: state.user, apiInfo: state.apiInfo };
});

type Props = TypeOfConnect<typeof withRedux>;

const RoomPage: React.FC<Props> = props => {
  const { user, apiInfo } = props;

  const api = useApi();
  const { uuid } = useParams();

  const [room, setRoom] = useState<Room | undefined>(undefined);

  // First hook -> Join the Room
  useEffect(() => {
    if (uuid && !room) {
      api.room
        .joinRoom(uuid)
        .then(res => {
          setRoom(res.data.room);
        })
        .catch(error => {
          // TODO: Provide real feedback
          console.error(error.response);
        });
    }
  }, [api.room, room, uuid]);

  // Second hook -> Connect to Room socket
  useEffect(() => {
    const socket = SocketIo(apiInfo.url);

    socket.on("connect", () => {
      socket.emit("authenticate", { token: user.token, roomUuid: uuid });
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

export default withRedux(RoomPage);
