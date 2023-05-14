import './App.css';
import NavBar from './components/Navbar';
import Games from './pages/Games';
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { UploadGame } from './pages/UploadGame';
import bgImage from '../src/assets/img/BG.svg'
import OneGame from './components/OneGame';
import GameJams from './pages/GameJams';

function App() {
  return (
    <div className="App bg-repeat-y sm:bg-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* <div className="App bg-gradient-to-t from-cyan-50 to-pink-100"> */}
      <NavBar />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/games' element={<Games />} />
          <Route path='/gamejams' element={<GameJams />} />
          <Route path='/games/upload' element={<UploadGame />} />
          <Route path='/games/one' element={<OneGame />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
