import { createReducer, createAction } from '@reduxjs/toolkit';

// BoardType 선언
interface BoardType {
  // 보드의 고유 번호
  id: number;
  // 보드 이름
  name: string;
}

// BoardListType 선언
interface BoardListType {
  // 생성된 보드의 리스트
  list: BoardType[];
  // 선택된 보드의 고유 번호
  selected: number | null;
}

// 초기상태
export const initialState: BoardListType = {
  list: [],
  selected: null,
};

// board를 생성하는 액션 생성자
const createBoard = createAction('board/CREATE_BOARD');

// 리듀서
// 스토어에 접근하여 상태관리
const board = createReducer(initialState, {
  [createBoard.type]: (state: BoardListType) => {
    // 현재 list의 길이 + 1을 하여, id 생성
    const id = state.list.length + 1;
    // 생성할 보드 정보
    const newBoard: BoardType = { id, name: '새 보드' };
    state.list.push(newBoard);
  },
});

// 내보낼 액션들
export const boardActions = {
  createBoard,
};

export default board;
