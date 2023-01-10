import 'App.css';
import BottomNav from 'components/BottomNav/BottomNav';
import Detail from 'pages/Detail/Detail';
import List from 'pages/List/List';
import Login from 'pages/Login/Login';
import { useRouterSelector } from 'store/slices/routerSlice';

function App() {
  const { currentPage } = useRouterSelector();

  return (
    <div className="container">
      <div className="transition-wrapper">
        {currentPage === 1 && <Login />}
        {currentPage === 2 && <List />}
        {currentPage === 3 && <Detail />}
        {currentPage !== 1 && <BottomNav />}
      </div>
    </div>
  );
}

export default App;
