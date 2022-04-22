import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import GamesList from './pages/games-list';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/games" element={<GamesList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
