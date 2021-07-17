import { combineReducers } from "redux";

// modules
import post from "./post";

// root reducer
const rootReducer = combineReducers({
  post,
});

export default rootReducer;

// state의 타입
export type RootState = ReturnType<typeof rootReducer>;
