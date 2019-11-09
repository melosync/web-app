import Api from "./Api";

export default class RoomService {
  static async CreateRoom(name: string): Promise<string> {
    const res = await Api.post("rooms/", {
      name,
    });
    return res.data.room.uuid;
  }

  static async JoinRoom(uuid: string): Promise<string> {
    const res = await Api.post(`rooms/${uuid}/join`);
    return res.data.room;
  }
}
