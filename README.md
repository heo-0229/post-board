# Post-board

[프로젝트 진행 노션 링크 📕](https://www.notion.so/74d5f1762a8a4081b69dfff4ad278d88)

노션에 프로젝트를 진행하면서 태스크 관리와 상세한 내용을 좀 더 보기 쉽게 정리해놨습니다!

## 1. 사용 라이브러리

* **@reduxjs/toolkit**: 전역 상태 관리

* **redux-persist**:로컬호스트에 메모 정보 저장

* **typescript**: 정적 타입 관리

* **ESLint, prettier**: 코드 컨벤션 준수 및 가독성 향상

  

## 2. 프로젝트 실행 및 테스트 실행

* yarn 설치

```shell
npm intall -g yarn
```

* `package.json`의존성 모듈 설치

```shell
yarn install
```

* 리액트 앱 실행

```shell
yarn start
```



## 3. 요구사항 접근 및 전략

### a. UI & Components

- UI는 위를 토대로 만들기
- Components
  - 아토믹 디자인 패턴을 참고하여 components, elelments 디렉토리 만들어서 관리
  - App.tsx: 앱 전체를 감싸는 컴포넌트
    - BoardList.tsx: 생성된 보드 목록을 표시하는 컴포넌트
      - BoardName.tsx: 보드 이름 엘리먼트
    - BoardScreen.tsx: 포스트들을 출력하는 보드  스크린 컴포넌트
      - Post.tsx: 각각의 포스트 엘리먼트

#### Data

- Redux로 데이터 전역관리
  - Dcuks 패턴
  - post.ts: post 리스트, 각 post 정보를 관리하는 모듈



### b. [+]버튼- 보드 생성 기능
  #### 필요한 것

  - Board는 Redux에서 관리
    - board.ts 모듈
    - 관리하는 정보: board의 리스트(배열)
  - BoardList.tsx 컴포넌트의 버튼에 onClick 이벤트 추가
    - Board를 생성하는 함수

  #### board.ts

  - 상태 타입 선언

  ```tsx
  // BoardType 선언
  interface BoardType {
    // 보드의 고유 번호
    id: number;
    // 보드 이름
    name: string;
  }
  
  // BoardListType 선언
  interface BoardListType {
    // 생성된 보드의 리스트
    list: BoardType[];
    // 선택된 보드의 고유 번호
    selected: BoardType | null;
  }
  ```

  보드는 여러개가 생성될 것이므로 배열의 형태이다. 배열은 각각 객체의 형태인데, 보드를 구별할 수 있도록 id와 보드의 이름인 name이 key로 필요하다. 그리고 선택된 보드의 번호, name은 selected에 저장한다.

  - 액션 생성자, 리듀서 만들기

  ```tsx
  // board를 생성하는 액션 생성자
  const createBoard = createAction('board/CREATE_BOARD');
  
  // 리듀서
  // 스토어에 접근하여 상태관리
  const board = createReducer(initialState, {
    [createBoard.type]: (state: BoardListType) => {
      // 현재 list의 길이 + 1을 하여, id 생성
      const id = state.list.length + 1;
      // 생성할 보드 정보
      const newBoard: BoardType = { id, name: '새 보드' };
      state.list.push(newBoard);
    },
  });
  ```

  #### BoardList.tsx

  - button에 onClick 이벤트가 일어나면, 리듀서 호출

  ```tsx
  {/* 포스트 추가 버튼 */}
        <div className="boardlist-button-wrap">
          <button
            onClick={() => {
              dispatch(boardActions.createBoard());
            }}
          >
            +
          </button>
  ```

### c. 보드 선택 기능

  #### 필요한 것

  - 보드가 선택되었을 때 리덕스의 state 최신화
    - board.tsx 모듈에 액션생성자, 리듀서 선언
  - BoardName.tsx에 onClick 이벤트 추가
    - 선언한 액션 실행
  - BoardScreen.tsx에 선택된 보드 이름 표시

  #### board.tsx

  - 액션 생성자, 리듀서 선언

  ```tsx
  ...
  // 선택된 board를 감지하는 액션 생성자
  const selectBoard = createAction<BoardType>('board/SELECT_BOARD');
  ...
  // 리듀서
  // 스토어에 접근하여 상태관리
  const board = createReducer(initialState, {
    ...
    // 보드를 선택하는 리듀서
    [selectBoard.type]: (state: BoardListType, action: PayloadAction<BoardType>) => {
      // 선택된 보드 id 기록
      state.selected = action.payload;
    },
  });
  ...
  ```

  #### BoardName.tsx

  - onClick 이벤트 추가

  ```tsx
  ...
  <div
        className="boardname"
        onClick={() => {
          dispatch(boardActions.selectBoard({ id: boardId, name }));
        }}
      >
  ...
  ```

  #### BoardList.tsx

  - 선택된 보드는 selected 속성 넘기기
    - BoardName에서 selected인 경우 별도의 클래스를 주어서 표시하는 스타일 추가

  ```tsx
  return (
      <div className="boardlist">
        {/* 보드 리스트 출력 */}
        {list.map((board) => {
          if (board.id === selected?.id) {
            return <BoardName selected boardId={board.id} name={board.name} key={board.id} />;
          }
          return <BoardName boardId={board.id} name={board.name} key={board.id} />;
        })}
        ...
    );
  ```

### d. 보드 이름 수정 기능
  #### 필요한 것

  - 보드 이름이 수정될 때 리덕스의 state 최신화
    - 액션 생성자, 리듀서 선언
  - BoardScreen.tsx에서 보드명 클릭시 수정 활성화
    - onClick 이벤트로 input 박스를 눌렀을 때만 활성화 시키기
  - 보드명 수정 실시간 반영
    - onChange 이벤트로 리덕스에 실시간 반영

  #### board.tsx

  - 보드 수정 액션 생성자, 리듀서 선언

  ```tsx
  ...
  // board name의 수정을 감지하는 액션 생성자
  const editBoardName = createAction<BoardType>('board/EDIT_BOARD_NAME');
  ...
  // 리듀서
  // 스토어에 접근하여 상태관리
  const board = createReducer(initialState, {
    ...
    [editBoardName.type]: (state, action: PayloadAction<BoardType>) => {
      // 수정된 보드 이름 기록
      if (state.selected) {
        state.selected.name = action.payload.name;
        // 리스트에도 최신화
        state.list[action.payload.id - 1].name = action.payload.name;
      }
    },
  });
  ```

  #### BoardScreen.tsx

  - 수정 활성화 및 수정시 실시간 반영 적용

  ```tsx
  ...
  return (
      <div
        className="boardscreen"
        onClick={(e) => {
          // 클릭 영역을 감지
          if (e.target === e.currentTarget.querySelector('input')) {
            // 클릭 영역이 input 영역이면 input 활성화
            setIsEditing(true);
          } else {
            // 클릭 영역이 input 밖이면 input 비활성화
            setIsEditing(false);
          }
        }}
      >
        {/* 현재 선택된 보드의 정보 */}
        {/* 수정 활성화 되었을때 / 안되었을 때 */}
        {isEditing ? (
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
          {/* <Post /> */}
        </div>
      </div>
    );
  };
  ...
  ```

### e. 더블 클릭시 포스트 생성 기능
  #### 필요한 것

  - post 기능 관련 모듈 만들기
    - post에 필요한 정보
    - post 생성 액션 생성자, 리듀서 선언
  - BoardScreen.tsx에 더블 클릭시 생성 이벤트
  - 생성된 포스트들 화면에 표시

  #### post.ts

  - post에 필요한 정보

  ```tsx
  // PostType 선언
  export interface PostType {
    // 포스트 고유 id
    postId: number;
    // 포스트 제목
    title: string;
    // 포스트 내용
    content: string;
    // 포스트 위치 좌표
    position: {
      x: number;
      y: number;
    };
    // 포스트의 크기
    size: {
      width: number;
      height: number;
    };
    // 포스트 기리기 활성화 유무ㅡ
    hide: boolean;
  }
  
  // PostListType 선언
  interface PostListType {
    // 보드 id를 key로, 해당 보드에 있는 포스트 정보들이 배열의 형태로 vlaue
    [id: number]: PostType[];
  }
  ```

  - 액션 생성자, 리듀서 선언

  ```tsx
  // Post를 생성하는 액션 생성자
  const createPost = createAction<PostType>('Post/CREATE_POST');
  
  // 리듀서
  // 스토어에 접근하여 상태관리
  const post = createReducer(initialState, {
    // 포스트를 생성하는 리듀서
    [createPost.type]: (state: PostListType, action: PayloadAction<{ selectedId: number; newPost: PostType }>) => {
      // 해당 보드에 만들어진 포스트가 있을 때(배열이 있을 때)
      if (Object.keys(state).includes(String(action.payload.selectedId))) {
        // 생성될 포스트의 아이디
        const newPostId = state[action.payload.selectedId].length + 1;
        // 생성될 아이디 넣기
        action.payload.newPost.postId = newPostId;
        state[action.payload.selectedId].push(action.payload.newPost);
      } else {
        // 보드에 첫 포스트를 만들 때
        state[action.payload.selectedId] = [];
        state[action.payload.selectedId].push(action.payload.newPost);
      }
    },
  });
  ```

  #### BoardScreen.tsx

  - 더블클릭 생성 이벤트
    - 액션 실행

  ```tsx
  return (
      <div
        className="boardscreen"
        ...
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
  ...
  ```

  - 생성된 포스트들 화면 표시

  ```tsx
  <div>
      {/* Post */}
      {/* 현재 보드의 포스트들 출력 */}
      {posts[selected.id]?.map((post, idx) => {
        return <Post post={post} key={idx} />;
      })}
  </div>
  ```

### f. 포스트 제목, 내용 수정 기능

#### 필요한 것

- post.ts 모듈에 제목, 내용 수정 기능 관련 액션 생성자, 리듀서 선언
- BoardScreen.tsx 에서 각 위치를 클릭시에 수정 기능 활성화
  - 입력 감지시 액션 실행
- Post.tsx
  - 수정 기능 활성화/비활성화
  - 제목, 내용 수정시 리덕스에 최신화

#### post.ts

- 포스트 관련 기능을 관리하는 모듈
- 수정 포스트 아이디를 저장, 제목과 내용을 수정하는 액션 생성자, 리듀서를 각각 만들기

```tsx
...
// 수정할 Post Id를 저장하는 액션 생성자
const setEditingPostId = createAction<number>('post/SET_EDITING_POST_ID');
// Post의 제목을 수정하는 액션 생성자
const editPostTitle = createAction<{ selectedId: number; postId: number; newTitle: string }>('post/EDIT_POST_TITLE');
// Post의 내용을 수정하는 액션 생성자
const editPostContent = createAction<{ selectedId: number; postId: number; newContent: string }>('post/EDIT_POST_CONTENT');
...
// 리듀서
// 스토어에 접근하여 상태관리
const post = createReducer(initialState, {
  ...
  // 수정 포스트 아이디를 저장하는 리듀서
  [setEditingPostId.type]: (state: PostListType, action: PayloadAction<number>) => {
    state.editingId = action.payload;
  },
  // 포스트 제목을 수정하는 리듀서
  [editPostTitle.type]: (state: PostListType, action: PayloadAction<{ selectedId: number; postId: number; newTitle: string }>) => {
    const { selectedId, postId, newTitle } = action.payload;
    // 수정할 id와 같은 포스트 정보를 찾아서 접근하여 수정
    // 수정할 인덱스 찾기
    const editIndex = state[selectedId].findIndex((p) => {
      return p.postId === postId;
    });
    // 수정
    state[selectedId][editIndex].title = newTitle;
  },
  // 포스트 내용을 수정하는 리듀서
  [editPostContent.type]: (state: PostListType, action: PayloadAction<{ selectedId: number; postId: number; newContent: string }>) => {
    const { selectedId, postId, newContent } = action.payload;
    // 수정할 id와 같은 포스트 정보를 찾아서 접근하여 수정
    // 수정할 인덱스 찾기
    const editIndex = state[selectedId].findIndex((p) => {
      return p.postId === postId;
    });
    // 수정
    state[selectedId][editIndex].content = newContent;
  },
});
...
```

### g. BoardScreen.tsx

- 포스트 클릭시, 해당 포스트를 수정할 수 있도록 이벤트 감지

```tsx
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
					// 수정모드도 비활성화
          dispatch(postActions.setEditingPostId(Number(null)));
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
					// 감지되지 않았으면 비활성화
        postId === '0' ?? dispatch(postActions.setEditingPostId(Number(null)));
        });
      }}
			...
    >
			...

		<div>
        {/* Post */}
        {/* 현재 보드의 포스트들 출력 */}
        {posts[selected.id]?.map((post, idx) => {
          return <Post post={post} key={idx} selectedId={selected.id} />;
        })}
      </div>
    </div>
```

#### Post.tsx

```tsx
...		
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
          <button className="hide">−</button>
          <button className="remove">x</button>
        </div>
      </div>
      {/* 수정 기능 */}
      {editingId === postId ? (
        <textarea
          className={`post-text ${postId} editable`}
          value={content}
          onChange={(e) => {
            dispatch(postActions.editPostContent({ selectedId, postId, newContent: e.target.value }));
          }}
        />
      ) : (
        <textarea disabled className={`post-text ${postId} editable`} value={content} />
      )}
...
```

### g. [-] 버튼 포스트 본문 영역 숨기기 기능

- 열기 /  닫기

  #### 필요한 것

  - post.ts
    - 숨김 기능 관련 액션생성자, 리듀서 선언
    - 포스트 배열에서 해당 포스트를 찾아서 숨김
  - Post.tsx
    - 버튼 클릭시 숨김 액션 실행
    - 해당 포스트의 본문 display: none

  #### post.ts

  - 숨김 기능 액션 생성자, 리듀서 선언
  - 포스트 배열에서 해당 포스트의 인덱스를 `findeIndex`로 찾음
  - state에 숨길 포스트를 접근하여 토글로 `hide` 처리

  ```tsx
  ...
  // Post의 숨김을 활성화/비활성화하는 액션 생성자
  const togglePostHideMode = createAction<{ boardId: number; postId: number }>('post/TOGGLE_POST_HIDE_MODE');
  ...
  // 리듀서
  // 스토어에 접근하여 상태관리
  const post = createReducer(initialState, {
   ...
    [togglePostHideMode.type]: (state: PostListType, action: PayloadAction<{ boardId: number; postId: number }>) => {
      const { boardId, postId } = action.payload;
      // 숨김 모드를 토글할 포스트가 위치한 index 찾기
      const indexToHide = state[boardId].findIndex((value) => value.postId === postId);
      state[boardId][indexToHide].hide = !state[boardId][indexToHide].hide;
    },
  });
  ...
  ```

  #### BoardScreen.tsx

  - props로 넘어온 `hide` 를 삼항연산자의 조건으로 추어 참일 경우 `textarea`에 클래스 `hidemode`주기
  - 스타일에 클래스가 `hidemode`이면 `display:none` 주기

  ```tsx
  ...
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
  ...
  ```

### h. [x] 버튼 포스트 삭제 기능

- 열기 / 닫기

  #### 필요한 것

  - post.ts
    - 삭제 기능 액션 생성자, 리듀서 선언
    - 포스트배열에서 삭제할 포스트 찾기
  - Post.tsx
    - 버튼 클릭시 삭제 액션 실행

  #### post.ts

  - 삭제 기능 액션 생성자, 리듀서 선언

  ```tsx
  ...
  // Post를 삭제하는 액션 생성자
  const deletePost = createAction<{ boardId: number; postId: number }>('post/DELETE_POST');
  ...
  // 리듀서
  // 스토어에 접근하여 상태관리
  const post = createReducer(initialState, {
    ...
    [deletePost.type]: (state: PostListType, action: PayloadAction<{ boardId: number; postId: number }>) => {
      const { boardId, postId } = action.payload;
      // 삭제할 포스트 인덱스 찾기
      console.log(boardId, postId);
      const indexToDelete = state[boardId].findIndex((value) => value.postId === postId);
      state[boardId].splice(indexToDelete, 1);
    },
  });
  ...
  ```

  #### Post.tsx

  - 삭제 버튼에 클릭 이벤트 실행 시, 액션 실행

  ```tsx
  ...
  </button>
            {/* 삭제 */}
            <button
              className="remove"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(postActions.deletePost({ boardId: selectedId, postId }));
              }}
            >
              x
            </button>
  ...
  ```

### i. ctrl (or cmd) + alt + N 포스트 생성 기능
  #### 필요한 것

  - BoardScreen.tsx
    - 키입력 감지
      - 윈도우, 맥 대응되는 키들
        - crtl, cmd
        - alt, option
    - 빈 포스트 생성 후 포커스
      - Post.tsx에 id를 부여하여 포커스하기

  #### BoardScreen.tsx

  - ctrl (or cmd) + alt + N 감지
  - 포스트 생성 후, 제목 포커스

  ```tsx
  ...
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
  ...
  ```

  ### j. Post.tsx

  - 생성된 post에 id부여하여 포커스 되도록하기

  ```tsx
  ...
  <input
      className={`post-bar-name ${postId} editable`}
      id={`${postId}`}
      value={title}
      onChange={(e) => dispatch(postActions.editPostTitle({ selectedId, postId, newTitle: e.target.value }))}
    />
  ...
  ```

### k. 페이지 새로고침 시 데이터 유지
  - redux-persist 세팅

  #### redeux - modules - index.ts

  - 리듀서 관리 파일

  ```tsx
  import { combineReducers } from 'redux';
  // redux-persist
  import { persistReducer } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  
  // modules
  import board from './board';
  import post from './post';
  
  // persist
  const persistConfig = {
    key: 'root',
    // localStorage에 저장
    storage,
    // 두 모듈 다 저장
    whitelist: ['board', 'post'],
  };
  
  // root reducer
  const rootReducer = combineReducers({
    board,
    post,
  });
  
  export default persistReducer(persistConfig, rootReducer);
  
  // state의 타입
  export type RootState = ReturnType<typeof rootReducer>;
  ```

  #### index.tsx

  - 리액트 앱을 렌더링하는 파일
  - Persist Store 주입

  ```tsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  import './styles/reset.scss';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  
  // store
  import { Provider } from 'react-redux';
  import store from './redux/configureStore';
  // persist
  import { PersistGate } from 'redux-persist/integration/react';
  import { persistStore } from 'redux-persist';
  
  const persistor = persistStore(store);
  
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
  
  reportWebVitals();
  ```



# Reference

[3. 타입스크립트로 리액트 상태 관리하기](https://react.vlpt.us/using-typescript/03-ts-manage-state.html)

[SASS / 변수 선언하고 사용하기](https://www.codingfactory.net/10107)

[[특정 영역 외 클릭\] event.target & event.currentTarget](https://velog.io/@sa833591/이벤트-위임-이벤트-버블링-이벤트-캡처-등)

[Element.getBoundingClientRect() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

[React에서 을 쓸 때 주의할 것](https://velog.io/@towozy/React를-쓰면서-착각할-수-있는-몇가지-요소-3kjukr898l)
