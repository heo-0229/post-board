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
            id={`${postId}`}
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
            onClick={(e) => {
              e.stopPropagation();
              dispatch(postActions.togglePostHideMode({ boardId: selectedId, postId }));
            }}
          >
            −
          </button>
          {/* 삭제 */}
          <button
            className="remove"
            onClick={(e) => {
              e.stopPropagation();
              if (content) {
                if (!window.confirm('내용이 있는 포스트입니다. 정말로 삭제하시겠습니까?')) {
                  // 취소 눌렀을 시 삭제 안하기
                }
              }
              // 내용이 없거나 확인을 눌렀을 시 삭제
              dispatch(postActions.deletePost({ boardId: selectedId, postId }));
            }}
          >
            x
          </button>
        </div>
      </div>
      {/* 수정 기능 */}
      {editingId === postId ? (
        <textarea
          className={`post-text ${postId} editable ${hide ? 'hidemode' : ''}`}
          value={content}
          onChange={(e) => {
            // 컨텐츠 수정
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
