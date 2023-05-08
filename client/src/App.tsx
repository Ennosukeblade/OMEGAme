import './App.css';
import NavBar from './components/Navbar';
import Games from './pages/Games';
import { Routes, Route } from 'react-router-dom'
import { UploadGame } from './pages/UploadGame';
//import 'bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Games />} />
        <Route path='/games/upload' element={<UploadGame />} />
      </Routes>
    </div>
  );
}

export default App;
