import '../styles/board-list.scss';

// Element
import { BoardName } from './elements';

const BoardList = () => {
  return (
    <div className="boardlist">
      <BoardName />
      {/* 포스트 추가 버튼 */}
      <div className="boardlist-button-wrap">
        <button>+</button>
      </div>
    </div>
  );
};

export default BoardList;
