import Container from "@material-ui/core/Container";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SocketIo from "socket.io-client";

import { useApi } from "../../services/api";
import { StateStore } from "../../store";
import TypeOfConnect from "../../store/utils/TypeOfConnect";
import Room from "../../types/Room";
import RoomMember from "../../types/RoomMember";
import RoomPlaylistItem from "../../types/RoomPlaylistItem";

import MemberList from "./MemberList";
import VideoContainer from "./VideoContainer";
import Styles from "./RoomPage.module.scss";

const withRedux = connect((state: StateStore) => {
  return { user: state.user, apiInfo: state.apiInfo };
});

type Props = TypeOfConnect<typeof withRedux>;

function updateMemberInList(
  roomRef: React.MutableRefObject<Room | undefined>,
  setRoom: (room: Room) => void,
  member: RoomMember
): void {
  const existingMemberIdx = roomRef.current!.members.findIndex(
    m => m.id === member.id
  );
  if (existingMemberIdx !== -1) {
    // The member is already in the list, editing its status
    roomRef.current = {
      ...roomRef.current!,
      members: roomRef.current!.members.map((m, idx) => {
        if (existingMemberIdx !== idx) {
          return m;
        }

        return {
          ...m,
          isConnected: member.isConnected,
        };
      }),
    };
  } else {
    // This is a new member, adding it in the list
    roomRef.current = {
      ...roomRef.current!,
      members: [
        ...roomRef.current!.members,
        {
          id: member.id,
          name: member.name,
          isConnected: member.isConnected,
        },
      ],
    };
  }
  setRoom(roomRef.current);
}

const RoomPage: React.FC<Props> = props => {
  const { user, apiInfo } = props;

  const api = useApi();
  const history = useHistory();
  const { uuid } = useParams();

  const socketClient = useRef<SocketIOClient.Socket | undefined>();
  const [room, setRoom] = useState<Room | undefined>();
  const roomRef = useRef<Room | undefined>(room);

  // First hook -> Join the Room
  useEffect(() => {
    if (uuid && !room) {
      api.room
        .joinRoom(uuid)
        .then(res => {
          const roomData = res.data.room;
          roomRef.current = roomData;
          setRoom(roomRef.current);
        })
        .catch(error => {
          // TODO: Provide real feedback
          console.error(error.response);
          history.push("/");
        });
    }
  }, [room, uuid, api.room, history]);

  // Second hook -> Connect to Room socket
  useEffect(() => {
    if (room && !socketClient.current) {
      socketClient.current = SocketIo(apiInfo.url);
      const socket = socketClient.current;

      socket.on("connect", () => {
        socket.emit("authenticate", {
          token: user.token,
          roomUuid: roomRef.current!.uuid,
        });
      });

      socket.on("user_join", (newMember: RoomMember) => {
        updateMemberInList(roomRef, setRoom, newMember);
      });

      socket.on("user_leave", (leavingMemberId: string) => {
        const leavingMember = roomRef.current!.members.find(
          m => m.id === leavingMemberId
        );
        if (leavingMember) {
          updateMemberInList(roomRef, setRoom, {
            ...leavingMember,
            isConnected: false,
          });
        }
      });

      socket.on("music_add", (music: RoomPlaylistItem) => {
        console.info("SOCKET: music_add: ", music);
        // TODO: Add the music to the list (or in "current" if the playlist is empty)
      });

      socket.on("music_start", () => {
        console.info("SOCKET: music_start");
        // TODO: Start the player
      });

      socket.on("music_pause", () => {
        console.info("SOCKET: music_pause");
        // TODO: pause the player
      });

      socket.on("music_next", (musicUuid: string) => {
        console.info("SOCKET: music_next: ", musicUuid);
        // TODO: play next music
      });

      socket.on("exception", (errorMessage?: string) => {
        const message = errorMessage || "An error occurred";
        console.error(`Socket: ${message}`);
      });
    }
  }, [room, apiInfo.url, user.token]);

  return (
    <Container className={Styles.RoomContainer}>
      <MemberList members={(room && room.members) || []} />
      <VideoContainer />
    </Container>
  );
};

export default withRedux(RoomPage);
