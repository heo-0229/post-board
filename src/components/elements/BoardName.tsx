import '../../styles/board-name.scss';

// Reudx, Action
import { useDispatch } from 'react-redux';
import { boardActions } from '../../redux/modules/board';

const BoardName = (props: { boardId: number; name: string; selected?: boolean }) => {
  const dispatch = useDispatch();
  const { boardId, name, selected } = props;

  // 선택된 boardname인 경우
  if (selected) {
    return (
      <div
        className="boardname selected"
        onClick={() => {
          dispatch(boardActions.selectBoard({ id: boardId, name }));
        }}
      >
        <span>
          {/* id와 boardName 표시 */}
          {boardId}. {name}
        </span>
      </div>
    );
  }
  return (
    <div
      className="boardname"
      onClick={() => {
        dispatch(boardActions.selectBoard({ id: boardId, name }));
      }}
    >
      <span>
        {/* id와 boardName 표시 */}
        {boardId}. {name}
      </span>
    </div>
  );
};

export default BoardName;
