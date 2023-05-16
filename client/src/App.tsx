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
import OneGameJam from './components/GameJamCard';
import OneGameJamPage from './pages/OneGameJamPage';
import HostJam from './pages/HostJam';

function App() {
  return (
    <div className="App bg-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* <div className="App bg-gradient-to-t from-cyan-50 to-pink-100"> */}
      <NavBar />
      <div>
        <ScrollToTopNavigator>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/games/upload/:id' element={<UploadGame  />} />
            <Route path='/games/one/:id' element={<OneGame />} />
            <Route path='/assets' element={<Assets />} />
            <Route path='/gamejams' element={<GameJams />} />
            {/* <Route path='/OneGameJam/:id' element={<OneGameJam />} /> */}
            <Route path='/OneGameJam/:id' element={<OneGameJamPage/>}/>
            <Route path='/HostJam' element={<HostJam/>}/>
          </Routes>
        </ScrollToTopNavigator>

      </div>

    </div>
  );
}

export default App;
