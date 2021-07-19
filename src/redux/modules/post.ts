import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// PostType 선언
export interface PostType {
  // 포스트 고유 id
  postId: number;
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
  // 수정할 포스트 아이디
  editingId?: number;
  // 총 포스트의 수
  count: number;
}

// 초기상태
export const initialState: PostListType = { count: 0 };

// Post를 생성하는 액션 생성자
const createPost = createAction<{ selectedId: number; newPost: PostType }>('post/CREATE_POST');
// 수정할 Post Id를 저장하는 액션 생성자
const setEditingPostId = createAction<number>('post/SET_EDITING_POST_ID');
// Post의 제목을 수정하는 액션 생성자
const editPostTitle = createAction<{ selectedId: number; postId: number; newTitle: string }>('post/EDIT_POST_TITLE');
// Post의 내용을 수정하는 액션 생성자
const editPostContent = createAction<{ selectedId: number; postId: number; newContent: string }>('post/EDIT_POST_CONTENT');
// Post의 숨김을 활성화/비활성화하는 액션 생성자
const togglePostHideMode = createAction<{ boardId: number; postId: number }>('post/TOGGLE_POST_HIDE_MODE');
// Post를 삭제하는 액션 생성자
const deletePost = createAction<{ boardId: number; postId: number }>('post/DELETE_POST');

// 리듀서
// 스토어에 접근하여 상태관리
const post = createReducer(initialState, {
  // 포스트를 생성하는 리듀서
  [createPost.type]: (state: PostListType, action: PayloadAction<{ selectedId: number; newPost: PostType }>) => {
    // 해당 보드에 만들어진 포스트가 있을 때(배열이 있을 때)
    // 생성될 포스트의 아이디
    state.count += 1;
    const newPostId = state.count;
    // 생성될 아이디 넣기
    action.payload.newPost.postId = newPostId;
    if (Object.keys(state).includes(String(action.payload.selectedId))) {
      state[action.payload.selectedId].push(action.payload.newPost);
    } else {
      // 보드에 첫 포스트를 만들 때
      state[action.payload.selectedId] = [];
      state[action.payload.selectedId].push(action.payload.newPost);
    }
  },
  // 수정 포스트 아이디를 저장하는 리듀서
  [setEditingPostId.type]: (state: PostListType, action: PayloadAction<number>) => {
    state.editingId = action.payload;
  },
  // 포스트 제목을 수정하는 리듀서
  [editPostTitle.type]: (state: PostListType, action: PayloadAction<{ selectedId: number; postId: number; newTitle: string }>) => {
    const { selectedId, postId, newTitle } = action.payload;
    // 수정할 id와 같은 포스트 정보를 찾아서 접근하여 수정
    // 수정할 인덱스 찾기
    const editIndex = state[selectedId].findIndex((p) => {
      return p.postId === postId;
    });
    // 수정
    state[selectedId][editIndex].title = newTitle;
  },
  // 포스트 내용을 수정하는 리듀서
  [editPostContent.type]: (state: PostListType, action: PayloadAction<{ selectedId: number; postId: number; newContent: string }>) => {
    const { selectedId, postId, newContent } = action.payload;
    // 수정할 id와 같은 포스트 정보를 찾아서 접근하여 수정
    // 수정할 인덱스 찾기
    const editIndex = state[selectedId].findIndex((p) => {
      return p.postId === postId;
    });
    // 수정
    state[selectedId][editIndex].content = newContent;
  },
  [togglePostHideMode.type]: (state: PostListType, action: PayloadAction<{ boardId: number; postId: number }>) => {
    const { boardId, postId } = action.payload;
    // 숨김 모드를 토글할 포스트가 위치한 index 찾기
    const indexToHide = state[boardId].findIndex((value) => value.postId === postId);
    state[boardId][indexToHide].hide = !state[boardId][indexToHide].hide;
  },
  [deletePost.type]: (state: PostListType, action: PayloadAction<{ boardId: number; postId: number }>) => {
    const { boardId, postId } = action.payload;
    // 삭제할 포스트 인덱스 찾기
    const indexToDelete = state[boardId].findIndex((value) => value.postId === postId);
    state[boardId].splice(indexToDelete, 1);
  },
});

// 내보낼 액션들
export const postActions = {
  createPost,
  editPostTitle,
  editPostContent,
  setEditingPostId,
  togglePostHideMode,
  deletePost,
};

export default post;
