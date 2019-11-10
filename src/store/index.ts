import { configureStore, combineReducers } from "redux-starter-kit";

import { apiInfoReducer } from "./ApiInfoStore";
import { userReducer } from "./UserStore";

const rootReducer = combineReducers({
  apiInfo: apiInfoReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type StateStore = ReturnType<typeof rootReducer>;
export default store;
