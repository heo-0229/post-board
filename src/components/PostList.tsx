import '../styles/post-list.scss';

// Element
import { PostName } from './elements';

const PostList = () => {
  return (
    <div className="postlist">
      <PostName />
      {/* 포스트 추가 버튼 */}
      <div className="postlist-button-wrap">
        <button>+</button>
      </div>
    </div>
  );
};

export default PostList;
