import { AxiosInstance, AxiosResponse } from "axios";

import YoutubeApiItem from "../../types/YoutubeApiItem";

type Response = AxiosResponse<any>;

export default class RoomApi {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async createRoom(): Promise<Response> {
    return this.axios.post("/rooms");
  }

  public async joinRoom(uuid: string): Promise<Response> {
    return this.axios.post(`/rooms/${uuid}/join`);
  }

  public async addMusic(uuid: string, item: YoutubeApiItem): Promise<Response> {
    return this.axios.post(`/rooms/${uuid}/music-add`, {
      video_id: item.id,
      title: item.title,
      img: item.img,
    });
  }

  public async playMusic(uuid: string): Promise<Response> {
    return this.axios.post(`/rooms/${uuid}/music-play`);
  }

  public async pauseMusic(uuid: string, musicUuid: string): Promise<Response> {
    return this.axios.post(`/rooms/${uuid}/music-pause`, { uuid: musicUuid });
  }

  public async nextMusic(uuid: string, musicUuid: string): Promise<Response> {
    return this.axios.post(`/rooms/${uuid}/music-next`, {
      uuid: musicUuid,
    });
  }
}
