import '../../styles/post.scss';

// PostType import
import { PostType } from '../../redux/modules/post';

// redux, actions
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/modules';
import { postActions } from '../../redux/modules/post';

const Post = (props: { post: PostType; selectedId: number }) => {
  const dispatch = useDispatch();
  // 현재 보드 id 가져오기
  const { title, content, position, postId, hide } = props.post;
  const { selectedId } = props;
  //수정할 포스트 id 가져오기
  const { editingId } = useSelector((state: RootState) => state.post);
  // 리덕스에 저장된 보드 id
  return (
    <div className="post" style={{ top: position.y, left: position.x }}>
      {/* 포스트 상태바, 버튼 */}
      <div className="post-bar">
        {/* 수정 기능 */}
        {editingId === postId ? (
          <input
            className={`post-bar-name ${postId} editable`}
            value={title}
            onChange={(e) => dispatch(postActions.editPostTitle({ selectedId, postId, newTitle: e.target.value }))}
          />
        ) : (
          <input disabled className={`post-bar-name ${postId} editable`} value={title} />
        )}
        <div className="post-bar-button-wrap">
          {/* 숨김 토글 */}
          <button
            className="hide"
            onClick={() => {
              dispatch(postActions.togglePostHideMode({ boardId: selectedId, postId }));
            }}
          >
            −
          </button>
          <button className="remove">x</button>
        </div>
      </div>
      {/* 수정 기능 */}
      {editingId === postId ? (
        <textarea
          className={`post-text ${postId} editable ${hide ? 'hidemode' : ''}`}
          value={content}
          onChange={(e) => {
            dispatch(postActions.editPostContent({ selectedId, postId, newContent: e.target.value }));
          }}
        />
      ) : (
        <textarea disabled className={`post-text ${postId} editable ${hide ? 'hidemode' : ''}`} value={content} />
      )}
    </div>
  );
};

export default Post;
