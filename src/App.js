import './app/css/App.css';
import Routes from './app/Routes';
import 'rsuite/styles/index.less';
import SignoutRoutes from './app/SignoutRoutes';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setUser} from './redux/actions/Users';
import 'rsuite/dist/rsuite.min.css';
function App() {
  const {isLogged} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user')) || null;
  useEffect(() => {
    if (user && user.isSuccess) {
      dispatch(setUser({...user, isLogged: true}));
    } else {
      dispatch(setUser({isLogged: false}));
    }
  }, []);

  return isLogged ? <Routes /> : <SignoutRoutes />;
}

export default App;
