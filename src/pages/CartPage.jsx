import React from "react";
import { useCart } from "../contexts/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th className="shoping__product">Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center">
                        Your cart is empty
                      </td>
                    </tr>
                  ) : (
                    cart.map((item) => (
                      <tr key={item.id}>
                        <td className="shoping__cart__item">
                          <img
                            src={item.img}
                            alt={item.name}
                            style={{ width: "80px" }}
                          />
                          <h5>{item.name}</h5>
                        </td>

                        <td className="shoping__cart__price">
                          ${item.price.toFixed(2)}
                        </td>

                        <td className="shoping__cart__quantity">
                          <div className="quantity">
                            <div className="pro-qty">
                              <input
                                type="number"
                                min={1}
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.id,
                                    parseInt(e.target.value)
                                  )
                                }
                              />
                            </div>
                          </div>
                        </td>

                        <td className="shoping__cart__total">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>

                        <td className="shoping__cart__item__close">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <span className="icon_close" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="shoping__cart__btns">
              <a href="#" className="primary-btn cart-btn">
                CONTINUE SHOPPING
              </a>
              <button className="primary-btn cart-btn cart-btn-right">
                <span className="icon_loading" />
                Update Cart
              </button>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="shoping__continue">
              <div className="shoping__discount">
                <h5>Discount Codes</h5>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Coupon applied!");
                  }}
                >
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="submit" className="site-btn">
                    APPLY COUPON
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="shoping__checkout">
              <h5>Cart Total</h5>
              <ul>
                <li>
                  Subtotal <span>${subtotal.toFixed(2)}</span>
                </li>
                <li>
                  Total <span>${subtotal.toFixed(2)}</span>
                </li>
              </ul>
              <a href="#" className="primary-btn">
                PROCEED TO CHECKOUT
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
