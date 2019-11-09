import { createSlice } from "redux-starter-kit";

import { Action } from "./Action";

const MELOSYNC_USER = "MELOSYNC_USER";

const userState = {
  id: "",
  name: "",
  token: "",
  loggedIn: false,
};

// Try to retrieve User from LocalStorage
const itemFromStorage = localStorage.getItem(MELOSYNC_USER);
try {
  if (itemFromStorage) {
    const stored = JSON.parse(itemFromStorage);
    if (stored && stored.id && stored.name && stored.token) {
      userState.id = stored.id;
      userState.name = stored.name;
      userState.token = stored.token;
      userState.loggedIn = true;
    }
  }
} catch (error) {
  // If the user is not set the userState will have the default values
}

export type UserState = typeof userState;

const userReducers = {
  setUser: (state: UserState, action: Action<UserState>) => {
    // Update UserState
    state.id = action.payload.id;
    state.name = action.payload.name;
    state.token = action.payload.token;
    state.loggedIn = action.payload.loggedIn;

    // Save UserState in LocalStorage
    localStorage.setItem(
      MELOSYNC_USER,
      JSON.stringify({ id: state.id, name: state.name, token: state.token })
    );
  },
  resetUser: (state: UserState) => {
    state.id = "";
    state.name = "";
    state.token = "";
    state.loggedIn = false;
    localStorage.removeItem(MELOSYNC_USER);
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: userReducers,
});

export type UserReducers = typeof userReducers;
export const { actions: userActions, reducer: userReducer } = userSlice;
export default userSlice;
