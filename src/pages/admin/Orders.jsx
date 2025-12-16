import React, { useState, useEffect } from "react";
import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api/app",
});

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const visibleOrders = orders.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/get-all-orders/"); // admin route or change as needed
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Orders</h3>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Products</th>
                <th>Total Amount</th>
                <th>Payment</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {visibleOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No orders found
                  </td>
                </tr>
              )}
              {visibleOrders.map((order, idx) => (
                <tr key={order._id}>
                  <td>{firstIndex + idx + 1}</td>
                  <td>{order.billingDetails?.email || "Unknown"}</td>
                  <td>
                    {order.products.map((p) => (
                      <div key={p.productId?._id}>
                        {p.name} x {p.quantity}
                      </div>
                    ))}
                  </td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Orders;
