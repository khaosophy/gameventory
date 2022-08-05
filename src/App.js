import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import GamesList from './pages/games-list';
import Account from './pages/account';
import Login from './pages/login';
import PasswordReset from './pages/password-reset';
import PasswordChange from './pages/change-password';
import Register from './pages/register';
import AddGame from './pages/add-game';
import NotFoundPage from './pages/404';
import ProtectedRoute from './components/protected-route';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">          
          <Route element={<ProtectedRoute />}>
            {/**
             * If a user is logged in, direct them to the games page. Otherwise, ask them to log in.
             */}
            <Route index element={<Navigate to="/games" />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="/games/add" element={<AddGame />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/change-password" element={<PasswordChange />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
