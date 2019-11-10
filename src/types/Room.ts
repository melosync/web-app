import RoomMember from "./RoomMember";
import RoomPlaylist from "./RoomPlaylist";

export default interface Room {
  name: string;
  uuid: string;
  members: RoomMember[];
  playlist: RoomPlaylist;
}
