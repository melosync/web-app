import { AuthInfo } from "../types/AuthInfo";

import Api from "./Api";

export default class AuthService {
  static async Register(
    name: string,
    password: string,
    email: string
  ): Promise<AuthInfo> {
    const res = await Api.post("auth/local/register", {
      name,
      password,
      email,
    });
    return { name: res.data.name, token: res.data.token };
  }

  static async Login(password: string, email: string): Promise<AuthInfo> {
    const res = await Api.post("auth/local/login", {
      password,
      email,
    });
    return { name: res.data.name, token: res.data.token };
  }
}
