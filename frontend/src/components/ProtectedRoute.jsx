import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If user is NOT logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If logged in, show the page
  return children;
}

export default ProtectedRoute;
