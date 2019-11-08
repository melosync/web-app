import { configureStore, combineReducers } from "redux-starter-kit";

import { userReducer } from "./user";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type StateStore = ReturnType<typeof rootReducer>;
export default store;
