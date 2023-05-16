import './App.css';
import NavBar from './components/Navbar';
import AllGames from './pages/AllGames';
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { UploadGame } from './pages/UploadGame';
import bgImage from '../src/assets/img/BG.svg'
import OneGame from './components/OneGame';
import ScrollToTopNavigator from './components/ScrollToTopNavigator';
import Assets from './pages/Assets';
import GameJams from './pages/GameJams';
import Login from './pages/Login';
import Register from './pages/Register';
import { useCookies } from 'react-cookie';

import OneGameJam from './components/GameJamCard';
import OneGameJamPage from './pages/OneGameJamPage';
import HostJam from './pages/HostJam';

function App() {
  const [cookies] = useCookies(['userId', 'firstName', 'lastName']);
  return (
    // style={{ backgroundImage: `url(${bgImage})` }}
    <div className="App">
      {/* <div className="App bg-gradient-to-t from-cyan-50 to-pink-100"> */}
      <NavBar userId={cookies.userId} firstName={cookies.firstName} lastName={cookies.lastName} />
      <div>
        <ScrollToTopNavigator>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/games' element={<AllGames />} />
            {cookies.userId
              ? <Route path='/games/upload/:id' element={<UploadGame />} />
              : <Route path='/games/upload/:id' element={<Login />} />
            }
            <Route path='/games/one/:id' element={<OneGame />} />
            <Route path='/assets' element={<Assets />} />
            <Route path='/gamejams' element={<GameJams />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/OneGameJam/:id' element={<OneGameJam />} /> */}
            <Route path='/OneGameJam/:id' element={<OneGameJamPage />} />
            <Route path='/HostJam' element={<HostJam />} />
          </Routes>
        </ScrollToTopNavigator>

      </div>

    </div>
  );
}

export default App;
