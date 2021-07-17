import { combineReducers } from "redux";

// modules
// import board from "./moduels/board";

// root reducer
const rootReducer = combineReducers({
  // board,
});

export default rootReducer;

// state의 타입
export type RootState = ReturnType<typeof rootReducer>;
