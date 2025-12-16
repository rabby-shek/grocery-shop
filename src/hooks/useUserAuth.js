import { useNavigate } from "react-router-dom";
import axios from "axios";

const useUserAuth = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const userId = localStorage.getItem("userId");

    try {
      if (userId) {
        await axios.post(
          "http://localhost:8000/api/auth/logout",
          { userId }
        );
      }
    } catch (err) {
      console.error("Logout error:", err);
    }

    // clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");

    navigate("/");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

    const getUser = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : {};
  };


  return { logout, isAuthenticated, getUser };
};

export default useUserAuth;
