import React from 'react';
import Widget from '../../components/admin/Widget';
import { FaUsers, FaShoppingCart, FaDollarSign, FaChartLine } from "react-icons/fa";
const Dashboard = () => {
  return (
 <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        <Widget title="Total Users" value="1200" icon={<FaUsers />} bgColor="primary" />
        <Widget title="Orders" value="320" icon={<FaShoppingCart />} bgColor="success" />
        <Widget title="Revenue" value="$12,500" icon={<FaDollarSign />} bgColor="warning" />
        <Widget title="Growth" value="25%" icon={<FaChartLine />} bgColor="danger" />
      </div>
    </div>
  )
}

export default Dashboard
