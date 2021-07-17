import React from 'react';
import '../styles/post-list.scss';

// Element
import { PostName } from './elements';

const PostList = () => {
  return (
    <div className="postlist">
      <PostName />
      {/* 포스트 추가 버튼 */}
      <button>+</button>
    </div>
  );
};

export default PostList;
