import '../../styles/post.scss';

// PostType import
import { PostType } from '../../redux/modules/post';

const Post = (props: { post: PostType }) => {
  const { title, content, position } = props.post;
  console.log(position);
  return (
    <div className="post" style={{ top: position.y, left: position.x }}>
      {/* 포스트 상태바, 버튼 */}
      <div className="post-bar">
        <span className="post-bar-name">{title}</span>
        <div className="post-bar-button-wrap">
          <button className="hide">−</button>
          <button className="remove">x</button>
        </div>
      </div>
      <span className="post-text">{content}</span>
    </div>
  );
};

export default Post;
