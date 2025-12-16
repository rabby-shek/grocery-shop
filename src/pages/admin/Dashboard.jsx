import React, { useEffect, useState } from "react";
import Widget from "../../components/admin/Widget";
import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaBoxes,
  FaTags,
} from "react-icons/fa";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0); // new state

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productRes, categoryRes, orderRes, userRes] = await Promise.all([
        fetch("http://localhost:8000/api/app/get-all-product"),
        fetch("http://localhost:8000/api/app/get-all-categories"),
        fetch("http://localhost:8000/api/app/get-all-orders"),
        fetch("http://localhost:8000/api/auth/get-all-users"), // fetch non-admin users
      ]);

      const productData = await productRes.json();
      const categoryData = await categoryRes.json();
      const orderData = await orderRes.json();
      const userData = await userRes.json();

      setTotalProducts(productData?.data?.length || 0);
      setTotalCategories(categoryData?.data?.length || 0);
      setTotalOrders(orderData?.orders?.length || 0);
      setTotalUsers(userData?.users?.length || 0); // set users
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <Widget
          title="Total Products"
          value={totalProducts}
          icon={<FaBoxes />}
          bgColor="primary"
        />

        <Widget
          title="Categories"
          value={totalCategories}
          icon={<FaTags />}
          bgColor="success"
        />

        <Widget
          title="Orders"
          value={totalOrders}
          icon={<FaShoppingCart />}
          bgColor="warning"
        />

        <Widget
          title="Users"
          value={totalUsers}
          icon={<FaUsers />}
          bgColor="info"
        />
      </div>
    </div>
  );
};

export default Dashboard;
