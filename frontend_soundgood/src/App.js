import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Forum from "./Pages/Forum";
import SavedSongs from "./Pages/SavedSongs";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DiscoveredSongs from "./Pages/DiscoveredSongs";
import Landing from "./Pages/Landing";
import Register from "./Pages/Register.js";
import Login from "./Pages/Login.js";
import Post from "./Pages/Post";

const App = () => {
  const isLoggedIn = () => {
    return (
      localStorage.getItem("userToken") !== null &&
      localStorage.getItem("userToken") !== "null"
    );
  };

  console.log(isLoggedIn());
  console.log(
    localStorage.getItem("userToken") !== null &&
      localStorage.getItem("userToken") !== "null"
  );
  return (
    <div className="App">
      {isLoggedIn() ? (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/savedSongs" element={<SavedSongs />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/discoveredSongs" element={<DiscoveredSongs />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
