import RoomPlaylistItem from "./RoomPlaylistItem";

export default interface RoomPlaylistCurrent {
  item: RoomPlaylistItem;
  playingSince: Date;
  musicOffset: number;
}
