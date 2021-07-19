import '../styles/board-screen.scss';

import { useState, useEffect } from 'react';

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
  // 현재 생성된 post 개수
  const createdPostCount = useSelector((state: RootState) => state.post.count);
  // 보드 제목 수정 기능 활성화 여부를 관리
  const [boardEditing, setBoardEditing] = useState(false);
  // post 정보 가져오기
  const posts = useSelector((state: RootState) => state.post);
  // 입력 키 감지 이벤트 리스너
  useEffect(() => {
    // 일반 함수식으로 선언하기 (this 바인딩)
    function onKeyDown(e: KeyboardEvent) {
      // seleted가 null이면 실행하지 않음
      if (!selected) {
        return;
      }
      // 컨트롤 또는 커맨드 그리고 알트(옵션) 그리고 n키가 입력되어야하므로
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.code === 'KeyN') {
        // 만들어질 포스트 아이디
        const curCreatedPostId = createdPostCount + 1;
        // 새 포스트 정보 만들기
        const newPost = {
          // id 기본값
          postId: 0,
          title: '',
          content: '',
          position: {
            // x, y  좌표기본 값
            x: 100,
            y: 100,
          },
          size: {
            width: 3,
            height: 2,
          },
          hide: false,
        };
        dispatch(postActions.createPost({ selectedId: selected.id, newPost }));
        // 생성된 post 편집하기
        dispatch(postActions.setEditingPostId(curCreatedPostId));
        // 생성된 post title에 포커스
        document.getElementById(String(curCreatedPostId))?.focus();
      }
    }
    // 문서 전체에 이벤트 리스너 더하기
    document.addEventListener('keydown', onKeyDown);
    // 이벤트 지우기
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });
  // selected가 null인 경우
  if (!selected) {
    return (
      <div className="boardscreen">
        <div className="boardscreen-notice">보드를 생성하고 선택해주세요.</div>
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
        // 비어있는 곳을 눌렀을 때
        if (target === curTarget) {
          // 수정 포스트 아이디 초기화
          posts.editingId !== 0 ? dispatch(postActions.setEditingPostId(0)) : '';
          return;
        }
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
        let postId;
        curTarget.querySelectorAll('.editable').forEach((value) => {
          if (target === value) {
            postId = value.classList[1];
            // 리덕스에 저장
            dispatch(postActions.setEditingPostId(Number(postId)));
          }
        });
        // 감지되지 않았으면 비활성화
        // postId === '0' ?? dispatch(postActions.setEditingPostId(0));
      }}
      // 더블 클릭 이벤트
      onDoubleClick={(e) => {
        // input외 영역에서만 동작하도록 하기
        if (e.target === e.currentTarget) {
          // 새 post 정보 생성하기
          const newPost = {
            // id 기본값
            postId: 0,
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
