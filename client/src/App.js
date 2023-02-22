import React, { useState } from "react";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  return (
    <div className="App">
      {
        currentForm === "login" ? <login /> : <Register />
      }
      <Login />
    </div>
  );
}

export default App;
