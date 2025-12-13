import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ClientLayout from "../layouts/ClientLayout";
import CartPage from "../pages/CartPage";
import ContactPage from "../pages/ContactPage";
import CheckOutPage from "../pages/CheckOutPage";
import ShopPage from "../pages/ShopPage";
import ProductDetails from "../pages/ProductDetails";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Category from "../pages/admin/Category";
import Products from "../pages/admin/Products";
import PrivateAdminRoute from "./PrivateAdminRoute";
import UserLogin from "../pages/UserLogin";
const Route = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "checkout",
        element: <CheckOutPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "product-details",
        element: <ProductDetails />,
      },
      {
        path: "user-login",
        element: <UserLogin />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        element: <PrivateAdminRoute />, // Protect all children inside this
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "users", element: <Users /> },
          { path: "categories", element: <Category /> },
          { path: "products", element: <Products /> },
        ],
      },
    ],
  },
  {
    path: "admin/auth",
    element: <AdminLogin />,
  },
]);
export default Route;
