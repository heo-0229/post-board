import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// PostType 선언
export interface PostType {
  // 포스트가 위치한 보드의 id
  id: number;
  // 포스트 제목
  title: string;
  // 포스트 내용
  content: string;
  // 포스트 위치 좌표
  position: {
    x: number;
    y: number;
  };
  // 포스트의 크기
  size: {
    width: number;
    height: number;
  };
  // 포스트 기리기 활성화 유무ㅡ
  hide: boolean;
}

// PostListType 선언
interface PostListType {
  // 보드 id를 key로, 해당 보드에 있는 포스트 정보들이 배열의 형태로 vlaue
  [id: number]: PostType[];
}

// 초기상태
export const initialState: PostListType = {};

// Post를 생성하는 액션 생성자
const createPost = createAction<PostType>('Post/CREATE_POST');

// 리듀서
// 스토어에 접근하여 상태관리
const post = createReducer(initialState, {
  [createPost.type]: (state: PostListType, action: PayloadAction<PostType>) => {
    // 해당 보드에 만들어진 포스트가 있을 때(배열이 있을 때)
    if (Object.keys(state).includes(String(action.payload.id))) {
      state[action.payload.id].push(action.payload);
    } else {
      // 보드에 첫 포스트를 만들 때
      state[action.payload.id] = [];
      state[action.payload.id].push(action.payload);
    }
  },
});

// 내보낼 액션들
export const postActions = {
  createPost,
};

export default post;
