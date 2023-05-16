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
            {cookies.userId
              ? <Route path='/games/upload' element={<UploadGame />} />
              : <Route path='/games/upload' element={<Login />} />
            }

            <Route path='/games/one/:id' element={<OneGame />} />
            <Route path='/assets' element={<Assets />} />
            <Route path='/gamejams' element={<GameJams />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </ScrollToTopNavigator>

      </div>

    </div>
  );
}

export default App;
