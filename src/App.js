import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PostAd from './pages/PostAd';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postAdvertisement" element={<PostAd />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
