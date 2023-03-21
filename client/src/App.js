import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar/Navbar';
import Signout from './Components/Navbar/Signout';
import ChangePass from './Components/Navbar/ChangePass';


function App() {


  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path='/logout' element={<Signout />} />
          <Route exact path='/changePassword' element={<ChangePass />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;

