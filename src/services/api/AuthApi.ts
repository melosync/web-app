import { AxiosInstance, AxiosResponse } from "axios";

type Response = AxiosResponse<any>;

interface UserRegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface UserLoginPayload {
  email: string;
  password: string;
}

export default class AuthApi {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async registerUser(payload: UserRegisterPayload): Promise<Response> {
    return this.axios.post("/auth/local/register", payload);
  }

  public async loginUser(payload: UserLoginPayload): Promise<Response> {
    return this.axios.post("/auth/local/login", payload);
  }
}
