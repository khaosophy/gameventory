import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import GamesList from './pages/games-list';
import Home from './pages/home';
import Login from './pages/login';
import PasswordReset from './pages/password-reset';
import Register from './pages/register';
import AddGame from './pages/add-game';
import NotFoundPage from './pages/404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          
          {/* todo: these games routes should be protected */}
          {/* https://www.robinwieruch.de/react-router-private-routes/ */}
          <Route path="/games" element={<GamesList />} />
          <Route path="/games/add" element={<AddGame />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          {/* todo: 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
