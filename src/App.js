import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/main"
import LogIn from "./components/login"
import UserDetails from "./components/userDetails";
import CreateUser from "./components/createUser";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/userdetails/:userId" element={<UserDetails />} />
        <Route exact path="/createUser" element={<CreateUser />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
