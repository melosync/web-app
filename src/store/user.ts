import { createSlice } from "redux-starter-kit";

import { Action } from "./Action";

const userState = {
  name: "",
  token: "",
  loggedIn: false,
};

const itemFromStorage = localStorage.getItem("MELOSYNC_USER");
try {
  if (itemFromStorage !== null) {
    const userFromStorage = JSON.parse(itemFromStorage);
    if (userFromStorage && userFromStorage.name && userFromStorage.token) {
      userState.name = userFromStorage.name;
      userState.token = userFromStorage.token;
      userState.loggedIn = true;
    }
  }
  // eslint-disable-next-line no-empty
} catch (error) {}

export type UserState = typeof userState;

const userReducers = {
  setUser: (state: UserState, action: Action<UserState>) => {
    state.name = action.payload.name;
    state.token = action.payload.token;
    state.loggedIn = action.payload.loggedIn;
    localStorage.setItem(
      "MELOSYNC_USER",
      JSON.stringify({ name: state.name, token: state.token })
    );
  },
  resetUser: (state: UserState) => {
    state.name = "";
    state.token = "";
    state.loggedIn = false;
    localStorage.removeItem("MELOSYNC_USER");
  },
};
export type UserReducers = typeof userReducers;

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: userReducers,
});

export default userSlice;
export const { actions: userActions, reducer: userReducer } = userSlice;
