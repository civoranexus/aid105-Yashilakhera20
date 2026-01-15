import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import UserType from "./pages/UserType";
import Login from "./pages/Login";
import "./App.css";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/user-type" element={<UserType />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/signup" element={<Signup />} />

    </Routes>
  );
}

export default App;

