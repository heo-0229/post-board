import { combineReducers } from 'redux';
// redux-persist
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// modules
import board from './board';
import post from './post';

// persist
const persistConfig = {
  key: 'root',
  // localStorage에 저장
  storage,
  // 두 모듈 다 저장
  whitelist: ['board', 'post'],
};

// root reducer
const rootReducer = combineReducers({
  board,
  post,
});

export default persistReducer(persistConfig, rootReducer);

// state의 타입
export type RootState = ReturnType<typeof rootReducer>;
