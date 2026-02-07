import { Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import UserType from "./pages/UserType";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/user-type" element={<UserType />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}
