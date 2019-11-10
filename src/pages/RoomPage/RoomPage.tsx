import Container from "@material-ui/core/Container";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SocketIo from "socket.io-client";
import { Button } from "@material-ui/core";

import Api, { useApi } from "../../services/api";
import { StateStore } from "../../store";
import TypeOfConnect from "../../store/utils/TypeOfConnect";
import Room from "../../types/Room";
import RoomMember from "../../types/RoomMember";
import RoomPlaylistItem from "../../types/RoomPlaylistItem";
import YoutubeApiItem from "../../types/YoutubeApiItem";

import MemberList from "./MemberList";
import VideoContainer from "./VideoContainer";
import Styles from "./RoomPage.module.scss";
import PlaylistQueue from "./PlaylistQueue/PlaylistQueue";
import SearchMusicButton from "./SearchMusicButton/SearchMusicButton";

const withRedux = connect((state: StateStore) => {
  return { user: state.user, apiInfo: state.apiInfo };
});

type Props = TypeOfConnect<typeof withRedux>;

const onMusicSelected = (api: Api, roomUuid: string) => async (
  item: YoutubeApiItem
): Promise<void> => {
  await api.room.addMusic(roomUuid, item);
};

const nextMusic = (api: Api, room: Room) => async (): Promise<void> => {
  if (room.playlist.items.length > 1) {
    await api.room.nextMusic(room.uuid, room.playlist.items[1].uuid);
  }
};

const musicOffset = (playingSince: Date, offset: number): number => {
  const now = new Date();
  const playedFor = now.getTime() - playingSince.getTime();
  return offset + playedFor;
};

const userFromId = (members: RoomMember[]) => (
  memberId: string
): RoomMember => {
  const member = members.find(m => m.id === memberId);
  if (!member) {
    throw new Error("Member not found");
  }
  return member;
};

function updateMemberInList(
  roomRef: React.MutableRefObject<Room | undefined>,
  setRoom: (room: Room) => void,
  member: RoomMember
): void {
  if (!roomRef.current) {
    return;
  }

  const existingMemberIdx = roomRef.current.members.findIndex(
    m => m.id === member.id
  );
  if (existingMemberIdx !== -1) {
    // The member is already in the list, editing its status
    roomRef.current = {
      ...roomRef.current,
      members: roomRef.current.members.map((m, idx) => {
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
      ...roomRef.current,
      members: [
        ...roomRef.current.members,
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
          roomData.playlist.playingSince = new Date(
            roomData.playlist.playingSince
          );
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

  useEffect(() => {
    if (room && !socketClient.current) {
      socketClient.current = SocketIo(apiInfo.url);
      const socket = socketClient.current;

      socket.on("connect", () => {
        if (!roomRef.current) {
          return;
        }

        socket.emit("authenticate", {
          token: user.token,
          roomUuid: roomRef.current.uuid,
        });
      });

      socket.on("user_join", (newMember: RoomMember) => {
        updateMemberInList(roomRef, setRoom, newMember);
      });

      socket.on("user_leave", (leavingMemberId: string) => {
        if (!roomRef.current) {
          return;
        }

        const leavingMember = roomRef.current.members.find(
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
        if (!roomRef.current) {
          return;
        }

        roomRef.current = {
          ...roomRef.current,
          playlist: {
            ...roomRef.current.playlist,
            items: [...roomRef.current.playlist.items, music],
          },
        };
        setRoom(roomRef.current);
      });

      socket.on("music_start", () => {
        if (!roomRef.current) {
          return;
        }

        roomRef.current = {
          ...roomRef.current,
          playlist: {
            ...roomRef.current.playlist,
            isPlaying: true,
          },
        };
        setRoom(roomRef.current);
      });

      socket.on("music_pause", () => {
        if (!roomRef.current) {
          return;
        }

        roomRef.current = {
          ...roomRef.current,
          playlist: {
            ...roomRef.current.playlist,
            isPlaying: false,
          },
        };
        setRoom(roomRef.current);
      });

      socket.on("music_next", () => {
        if (!roomRef.current) {
          return;
        }

        roomRef.current = {
          ...roomRef.current,
          playlist: {
            items: roomRef.current.playlist.items.slice(1),
            isPlaying: true,
            musicOffset: 0,
            playingSince: new Date(),
          },
        };
        setRoom(roomRef.current);
      });

      socket.on("exception", (errorMessage?: string) => {
        const message = errorMessage || "An error occurred";
        console.error(`Socket: ${message}`);
      });
    }
  }, [room, apiInfo.url, user.token]);

  const currentItem = room && room.playlist.items[0];
  const nextItems = room && room.playlist.items.slice(1);
  const onPlay = async (): Promise<void> => {
    if (uuid) {
      await api.room.playMusic(uuid);
    }
  };
  const onPause = async (): Promise<void> => {
    if (uuid && room) {
      await api.room.pauseMusic(uuid, room.playlist.items[0].uuid);
    }
  };
  const onEnd = (): void => {
    if (!room) {
      return;
    }
    nextMusic(api, room)();
  };

  return (
    <Container className={Styles.RoomContainer}>
      <MemberList members={(room && room.members) || []} />
      {room && currentItem && (
        <VideoContainer
          item={currentItem}
          play={room.playlist.isPlaying}
          playFrom={musicOffset(
            room.playlist.playingSince,
            room.playlist.musicOffset
          )}
          onPlay={onPlay}
          onPause={onPause}
          onEnd={onEnd}
        />
      )}

      {uuid && room && (
        <div>
          <SearchMusicButton onMusicSelected={onMusicSelected(api, uuid)} />
          <Button onClick={nextMusic(api, room)}>Next</Button>
        </div>
      )}

      {room && (
        <PlaylistQueue
          items={nextItems || []}
          userFromId={userFromId(room.members)}
        />
      )}
    </Container>
  );
};

export default withRedux(RoomPage);
