import { createSlice } from "redux-starter-kit";

import { Action } from "./Action";

const roomState = {
  uuid: "",
  name: "",
  members: [],
  playlist: {
    nextItems: [],
  },
};

export type RoomState = typeof roomState;

const roomReducers = {
  setRoom: (state: RoomState, action: Action<RoomState>) => {
    state.name = action.payload.name;
    state.uuid = action.payload.uuid;
    state.members = action.payload.members;
    state.playlist = action.payload.playlist;
  },
};
export type RoomReducers = typeof roomReducers;

const roomSlice = createSlice({
  name: "room",
  initialState: roomState,
  reducers: roomReducers,
});

export default roomSlice;
export const { actions: roomActions, reducer: roomReducer } = roomSlice;
