import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAdminAuth = () => {
    const navigate = useNavigate();

    // Logout function
    const logout = async () => {
        const adminId = localStorage.getItem("adminId");
        const token = localStorage.getItem("adminToken");

        try {
            if (adminId && token) {
                // Call backend to clear token
                await axios.post("/api/auth/logout", { userId: adminId });
            }
        } catch (err) {
            console.error("Logout failed:", err);
        }

        // Clear localStorage
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminId");

        // Redirect to login
        navigate("/admin/auth");
    };

    // Check if admin is logged in
    const isAdminAuthenticated = () => {
        return !!localStorage.getItem("adminToken");
    };

    return { logout, isAdminAuthenticated };
};

export default useAdminAuth;
