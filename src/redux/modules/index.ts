import { combineReducers } from 'redux';

// modules
import board from './board';
import post from './post';

// root reducer
const rootReducer = combineReducers({
  board,
  post,
});

export default rootReducer;

// state의 타입
export type RootState = ReturnType<typeof rootReducer>;
