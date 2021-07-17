import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from './modules';

// 기본 미들웨어 적용
const middlewares = [...getDefaultMiddleware()];

// Chrome Extension
// window 타입 선언
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
// Redux devTools 설정
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 미들웨어와 리듀서를 엮어 store 생성
const store = createStore(rootReducer, enhancer);

export default store;
