import Axios, { AxiosInstance } from "axios";
import { createContext, useContext } from "react";

import AuthApi from "./AuthApi";
import RoomApi from "./RoomApi";

export default class Api {
  private readonly axios: AxiosInstance;

  public readonly auth: AuthApi;

  public readonly room: RoomApi;

  constructor(hostname: string, token?: string) {
    this.axios = Axios.create({
      baseURL: hostname,
    });
    if (token) {
      this.setToken(token);
    }

    this.auth = new AuthApi(this.axios);
    this.room = new RoomApi(this.axios);
  }

  setToken(token: string): void {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export const ApiContext = createContext<Api>(new Api(""));

export const useApi = (): Api => useContext(ApiContext);
