import '../styles/board-list.scss';

// Element
import { BoardName } from './elements';

// Reudx, Action
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../redux/modules/board';
import { RootState } from '../redux/modules';

const BoardList = () => {
  const dispatch = useDispatch();
  // 보드 정보 가져오기
  const { list } = useSelector((state: RootState) => state.board);

  return (
    <div className="boardlist">
      {/* 보드 리스트 출력 */}
      {list.map((board) => {
        return <BoardName boardId={board.id} name={board.name} key={board.id} />;
      })}
      {/* 포스트 추가 버튼 */}
      <div className="boardlist-button-wrap">
        <button
          onClick={() => {
            dispatch(boardActions.createBoard());
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default BoardList;
