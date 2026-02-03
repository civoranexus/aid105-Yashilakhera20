import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import UserType from "./pages/UserType";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/user-type" element={<UserType />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔴 THIS CONNECTS LOGIN → DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
