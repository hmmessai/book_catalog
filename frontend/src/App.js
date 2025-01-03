import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Label from './Components/Others/Label';
import AuthProvider from './Components/Auth/AuthContext';
import SignUp from './Pages/Signup';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */
      </Routes>
    </>
  )
}

export default App;
