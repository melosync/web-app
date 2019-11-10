import { AxiosInstance, AxiosResponse } from "axios";

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
}
