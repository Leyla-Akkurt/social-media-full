import "./App.css";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Messengar from "./pages/messengar/Messengar";
import Settings from "./pages/settings/Settings";

function App() {
  const {user}=useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={user ? <Home />:<Register/>} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/login" element={user ? <Navigate to="/"/> :<Login />} />
          <Route path="/register" element={user ? <Navigate to="/"/> :<Register />}/>
          <Route path="/messengar" element={!user ? <Navigate to="/"/> :<Messengar />}/>
          <Route path="/settings" element={!user ? <Navigate to="/"/> :<Settings />}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
