import Axios, { AxiosInstance } from "axios";
import { createContext, useContext } from "react";

import AuthApi from "./AuthApi";

export default class Api {
  private readonly axios: AxiosInstance;

  public readonly auth: AuthApi;

  constructor(hostname: string) {
    this.axios = Axios.create({
      baseURL: hostname,
    });

    this.auth = new AuthApi(this.axios);
  }

  setToken(token: string) {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export const ApiContext = createContext<Api>(new Api(""));

export const useApi = () => useContext(ApiContext);
