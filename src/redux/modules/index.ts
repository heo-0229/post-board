import { combineReducers } from 'redux';

// modules
import board from './board';

// root reducer
const rootReducer = combineReducers({
  board,
});

export default rootReducer;

// state의 타입
export type RootState = ReturnType<typeof rootReducer>;
