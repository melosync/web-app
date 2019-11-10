import { createSlice } from "redux-starter-kit";

import envOrThrow from "../utils/envOrThrow";

const apiInfoState = {
  url: "",
};

// Try to retrieve api url from env
apiInfoState.url = envOrThrow("REACT_APP_API_ENDPOINT");

export type ApiInfoState = typeof apiInfoState;

const apiInfoReducers = {};

const apiInfoSlice = createSlice({
  name: "apiInfo",
  initialState: apiInfoState,
  reducers: apiInfoReducers,
});

export type ApiReducers = typeof apiInfoReducers;
export const {
  actions: apiInfoActions,
  reducer: apiInfoReducer,
} = apiInfoSlice;
export default apiInfoSlice;
