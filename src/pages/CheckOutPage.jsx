import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import useUserAuth from "../hooks/useUserAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart, totalPrice } = useCart();
  const { getUser, isAuthenticated } = useUserAuth();
  const navigate = useNavigate();

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: getUser()?.email || "",
 
  });

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      alert("Please login first.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/app/orders/create", {
        userId: getUser()._id,
        products: cart.map((p) => ({
          productId: p._id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        })),
        billingDetails: billing,
        totalAmount: totalPrice,
        paymentMethod: "cod", // can add select later
      });

      alert("Order placed successfully!");
      clearCart();
      navigate("/"); // go to order history page
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div className="container my-5">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Billing Details */}
          <div className="col-md-6">
            <h4>Billing Details</h4>
            {Object.keys(billing).map((key) => (
              <div className="mb-3" key={key}>
                <label className="form-label">{key}</label>
                <input
                  type="text"
                  name={key}
                  value={billing[key]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-md-6">
            <h4>Your Order</h4>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li key={item._id} className="list-group-item d-flex justify-content-between">
                  {item.name} x {item.quantity}
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total</strong>
                <strong>${totalPrice.toFixed(2)}</strong>
              </li>
            </ul>
            <button type="submit" className="btn btn-primary w-100">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
