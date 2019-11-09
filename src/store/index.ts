import { configureStore, combineReducers } from "redux-starter-kit";

import { userReducer } from "./UserStore";
import { roomReducer } from "./room";

const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type StateStore = ReturnType<typeof rootReducer>;
export default store;
