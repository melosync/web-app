import RoomPlaylistItem from "./RoomPlaylistItem";
import RoomPlaylistCurrent from "./RoomPlaylistCurrent";

export default interface RoomPlaylist {
  current?: RoomPlaylistCurrent;
  nextItems: RoomPlaylistItem[];
  isPlaying: boolean;
}
