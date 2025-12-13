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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productRes, categoryRes] = await Promise.all([
        fetch("http://localhost:8000/api/app/get-all-product"),
        fetch("http://localhost:8000/api/app/get-all-categories"),
      ]);

      const productData = await productRes.json();
      const categoryData = await categoryRes.json();

      setTotalProducts(productData?.data?.length || 0);
      setTotalCategories(categoryData?.data?.length || 0);
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
          value="320"
          icon={<FaShoppingCart />}
          bgColor="warning"
        />

        <Widget
          title="Revenue"
          value="$12,500"
          icon={<FaDollarSign />}
          bgColor="danger"
        />
      </div>
    </div>
  );
};

export default Dashboard;
