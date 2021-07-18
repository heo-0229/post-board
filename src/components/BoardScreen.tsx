import '../styles/board-screen.scss';

import { useState } from 'react';

// element
// import { Post } from './elements';

// Reudx, Action
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/modules';
import { boardActions } from '../redux/modules/board';

const BoardScreen = () => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state: RootState) => state.board);
  const [isEditing, setIsEditing] = useState(false);
  // selected가 null인 경우
  if (!selected) {
    return <div className="boardscreen" />;
  }
  return (
    <div
      className="boardscreen"
      onClick={(e) => {
        // 클릭 영역을 감지
        if (e.target === e.currentTarget.querySelector('input')) {
          // 클릭 영역이 input 영역이면 input 활성화
          setIsEditing(true);
        } else {
          // 클릭 영역이 input 밖이면 input 비활성화
          setIsEditing(false);
        }
      }}
    >
      {/* 현재 선택된 보드의 정보 */}
      {/* 수정 활성화 되었을때 / 안되었을 때 */}
      {isEditing ? (
        <input
          className="boardscreen-info"
          value={selected.name}
          onChange={(e) => {
            dispatch(boardActions.editBoardName({ id: selected.id, name: e.target.value }));
          }}
        />
      ) : (
        <input disabled className="boardscreen-info" value={selected.name} />
      )}
      <div>
        {/* Post */}
        {/* <Post /> */}
      </div>
    </div>
  );
};

export default BoardScreen;
