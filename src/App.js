import React, { useState } from "react";
import Login from "./components/Login";
import AddQuestion from "./components/AddQuestion";
import "./Theme.css";

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminCode, setAdminCode] = useState("");

  return (
    <div className="App">
      {!isAdminLoggedIn ? (
        <Login
          onLoginSuccess={(code) => {
            setIsAdminLoggedIn(true);
            setAdminCode(code);
          }}
        />
      ) : (
        <AddQuestion adminCode={adminCode} />
      )}
    </div>
  );
}

export default App;