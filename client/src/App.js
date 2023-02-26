import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { AuthContextProvider } from './context/AuthContext';


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

