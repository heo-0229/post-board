// style
import './styles/app.scss';

// Components
import { PostList, PostScreen } from './components';

const App = () => {
  return (
    <div className="app">
      <PostList />
      <PostScreen />
    </div>
  );
};

export default App;
