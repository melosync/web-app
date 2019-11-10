import RoomPlaylistItem from "./RoomPlaylistItem";

export default interface RoomPlaylist {
  items: RoomPlaylistItem[];
  isPlaying: boolean;
  playingSince: Date;
  musicOffset: number;
}
