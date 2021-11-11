import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Forum from './Pages/Forum';
import SavedSongs from './Pages/SavedSongs';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import DiscoveredSongs from './Pages/DiscoveredSongs';

function App() {
  return (
    <div className='App'>
      {true ? (
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/savedSongs' element={<SavedSongs />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/discoveredSongs' element={<DiscoveredSongs />} />
          </Routes>
        </div>
      ) : (
        <div>Not signed in: Authentication</div>
      )}
    </div>
  );
}

export default App;
