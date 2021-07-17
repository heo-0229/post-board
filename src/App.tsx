// style
import './styles/app.scss';

// Components
import { BoardList, BoardScreen } from './components';

const App = () => {
  return (
    <div className="app">
      <BoardList />
      <BoardScreen />
    </div>
  );
};

export default App;
