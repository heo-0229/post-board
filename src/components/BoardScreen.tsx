import '../styles/board-screen.scss';

import { useState } from 'react';

// element
import { Post } from './elements';

// Reudx, Action
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/modules';
import { boardActions } from '../redux/modules/board';
import { postActions } from '../redux/modules/post';

const BoardScreen = () => {
  const dispatch = useDispatch();
  // 현재 보드 id, name 정보 가져오기
  const { selected } = useSelector((state: RootState) => state.board);
  // 보드 제목 수정 기능 활성화 여부를 관리
  const [boardEditing, setBoardEditing] = useState(false);
  // post 정보 가져오기
  const posts = useSelector((state: RootState) => state.post);
  // selected가 null인 경우
  if (!selected) {
    return (
      <div className="boardscreen">
        <div className="boardscreen-notice">보드를 선택해주세요.</div>
      </div>
    );
  }
  return (
    <div
      className="boardscreen"
      // 클릭 이벤트
      onClick={(e) => {
        const target = e.target;
        const curTarget = e.currentTarget;
        // 클릭 영역을 감지
        if (target === curTarget.querySelector('input')) {
          // 클릭 영역이 input 영역이면 input 활성화
          setBoardEditing(true);
        } else {
          // 클릭 영역이 input 밖이면 input 비활성화
          setBoardEditing(false);
        }
        // Post의 클릭 영역 감지
        // title 영역이면 활성화
        // 활성화될 Post 번호 찾기
        let postId = '0';
        curTarget.querySelectorAll('.editable').forEach((value) => {
          if (target === value) {
            postId = value.classList[1];
            // 리덕스에 저장
            dispatch(postActions.setEditingPostId(Number(postId)));
          }
        });
      }}
      // 더블 클릭 이벤트
      onDoubleClick={(e) => {
        // input외 영역에서만 동작하도록 하기
        if (e.target === e.currentTarget) {
          // 새 post 정보 생성하기
          const newPost = {
            // id 기본값
            postId: 1,
            title: '',
            content: '',
            position: {
              // x, y  좌표 구하기
              x: e.clientX - e.currentTarget.getBoundingClientRect().x,
              y: e.clientY,
            },
            size: {
              width: 3,
              height: 2,
            },
            hide: false,
          };
          // 생성한 post 정보 리덕스에 보내기
          dispatch(postActions.createPost({ selectedId: selected.id, newPost }));
        }
      }}
    >
      {/* 현재 선택된 보드의 정보 */}
      {/* 수정 활성화 되었을때 / 안되었을 때 */}
      {boardEditing ? (
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
        {/* 현재 보드의 포스트들 출력 */}
        {posts[selected.id]?.map((post, idx) => {
          return <Post post={post} key={idx} selectedId={selected.id} />;
        })}
      </div>
    </div>
  );
};

export default BoardScreen;
