import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import UserType from "./pages/UserType";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/user-type" element={<UserType />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
