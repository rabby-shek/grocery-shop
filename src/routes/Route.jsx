import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ClientLayout from "../layouts/ClientLayout";
import CartPage from "../pages/CartPage";
import ContactPage from "../pages/ContactPage";
import CheckOutPage from "../pages/CheckOutPage";
import ShopPage from "../pages/ShopPage";
import ProductDetails from "../pages/ProductDetails";
import AdminLogin from "../pages/admin/AdminLogin";
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
    ],
  },
  {
    path: "admin/auth",
    element: <AdminLogin />
  }
]);
export default Route;
