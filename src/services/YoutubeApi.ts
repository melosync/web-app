import Axios, { AxiosInstance } from "axios";
import { createContext, useContext } from "react";

import YoutubeApiItem from "../types/YoutubeApiItem";

export default class YoutubeApi {
  private readonly axios: AxiosInstance;

  private apiKey?: string;

  constructor(hostname: string, apiKey?: string) {
    this.axios = Axios.create({
      baseURL: hostname,
    });
    this.apiKey = apiKey;
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  async search(query: string): Promise<YoutubeApiItem[]> {
    if (!this.apiKey) {
      throw new Error("Missing api key");
    }

    const res = await this.axios.get("/search", {
      params: {
        part: "snippet",
        type: "video",
        q: query,
        key: this.apiKey,
      },
    });
    return res.data.items.map((i: any) => {
      return {
        id: i.id.videoId,
        title: i.snippet.title,
        img: i.snippet.thumbnails.high.url,
      } as YoutubeApiItem;
    });
  }
}

export const YoutubeApiContext = createContext<YoutubeApi>(new YoutubeApi(""));

export const useYoutubeApi = (): YoutubeApi => useContext(YoutubeApiContext);
