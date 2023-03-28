import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Teacher from "./Components/Register/Teacher";
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper } from './middleware/wrapper';
import Navbar from './Components/Navbar/Navbar';
import Signout from './Components/Navbar/Signout';
import ChangePass from './Components/Navbar/ChangePass';
import Create from './Components/Classroom/Create';
import Join from './Components/Classroom/Join';


function App() {


  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addTeacher" element={<Wrapper access='Admin'><Teacher /></Wrapper>} />
          <Route path="/createRoom" element={<Wrapper access='Teacher'><Create /></Wrapper>} />
          <Route exact path="/join/:roomId" element={<Wrapper access='Student'><Join /></Wrapper>} />
          <Route path='/logout' element={<Signout />} />
          <Route path='/changePassword' element={<ChangePass />} />
        </Routes>
        <ToastContainer />

      </Router>
    </AuthContextProvider>
  );
}

export default App;

