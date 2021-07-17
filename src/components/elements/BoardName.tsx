import '../../styles/board-name.scss';

const BoardName = (props: { boardId: number; name: string }) => {
  const { boardId, name } = props;
  return (
    <div className="boardname">
      <span>
        {/* id와 boardName 표시 */}
        {boardId}. {name}
      </span>
    </div>
  );
};

export default BoardName;
