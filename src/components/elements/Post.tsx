import '../../styles/post.scss';

const Post = () => {
  return (
    <div className="post">
      {/* 포스트 상태바, 버튼 */}
      <div className="post-bar">
        <span className="post-bar-name">포스트 이름</span>
        <div className="post-bar-button-wrap">
          <button className="hide">−</button>
          <button className="remove">x</button>
        </div>
      </div>
      <span className="post-text">포스트 텍스트</span>
    </div>
  );
};

export default Post;
