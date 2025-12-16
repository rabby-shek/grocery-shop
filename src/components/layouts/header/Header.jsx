import React, { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import useUserAuth from "../../../hooks/useUserAuth";
const Header = () => {
  const location = useLocation();
  const { cart } = useCart();
  const { isAuthenticated, getUser, logout } = useUserAuth();

  // Total items in cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Ref + spacer to avoid content being hidden behind fixed header
  const headerRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  useEffect(() => {
    function updateHeight() {
      const h = headerRef.current ? headerRef.current.offsetHeight : 0;
      setSpacerHeight(h);
    }

    // measure on mount
    updateHeight();

    // re-measure on resize (for responsive)
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  

  return (
    <>
      <div>
        {/* Humberger Begin */}
        <div className="humberger__menu__overlay" />
        <div className="humberger__menu__wrapper">
          <div className="humberger__menu__logo">
            <NavLink to="/">Bloomy</NavLink>
          </div>
          <div className="humberger__menu__cart">
            <ul>
              <li>
                <NavLink to="/cart">
                  <i className="fa fa-shopping-bag" /> <span>{totalItems}</span>
                </NavLink>
              </li>
            </ul>
            <div className="header__cart__price">
              item: <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        {/* Humberger End */}

        {/* Header Section Begin */}
        {/* headerRef used to measure height; inline style makes it fixed */}
        <header
          className="header"
          ref={headerRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            zIndex: 9999,
            background: "#fff",
            // optional: keep same stacking context/look as original
            boxSizing: "border-box",
          }}
        >
          <div className="header__top">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="header__top__left">
                    <ul>
                      <li>
                        <i className="fa fa-envelope" /> bloomy@gmail.com
                      </li>
                      <li>Free Shipping for all Order of $99</li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="header__top__right">
                    <div className="header__top__right__social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-linkedin" />
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest-p" />
                      </a>
                    </div>

                    <div className="header__top__right__auth">
                      {isAuthenticated() ? (
                        <div className="d-flex align-items-center">
                          <span style={{ marginRight: "10px" }}>
                            <i className="fa fa-user" style={{ marginRight: "10px" }} />{getUser().username ? getUser().username : ""}
                          </span>
                          <button className="btn btn-dark" onClick={logout}>
                            Logout
                          </button>
                        </div>
                      ) : (
                        <NavLink to="/user/auth/login">
                          <i className="fa fa-user" /> Login
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="header__logo">
                  <NavLink to="/">
                    <h2 style={{ fontWeight: "bold" }}>Bloomy</h2>
                  </NavLink>
                </div>
              </div>

              <div class="col-lg-6">
                <nav class="header__menu">
                  <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>
                      <NavLink to="/">Home</NavLink>
                    </li>

                    <li
                      className={location.pathname === "/shop" ? "active" : ""}
                    >
                      <NavLink to="/shop">Shop</NavLink>
                    </li>

                    <li
                      className={
                        location.pathname === "/contact" ? "active" : ""
                      }
                    >
                      <NavLink to="/contact">Contact</NavLink>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="col-lg-3">
                <div className="header__cart">
                  <ul>
                    <li>
                      <NavLink to="/cart">
                        <i className="fa fa-shopping-bag" />{" "}
                        <span>{totalItems ? totalItems : 0}</span>
                      </NavLink>
                    </li>
                  </ul>
                  <div className="header__cart__price">
                    item: <span>${totalPrice ? totalPrice.toFixed(2) : 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="humberger__open">
              <i className="fa fa-bars" />
            </div>
          </div>
        </header>
        {/* Header Section End */}

        {/* Spacer so page content doesn't hide under the fixed header */}
        <div aria-hidden="true" style={{ height: spacerHeight }} />
      </div>
    </>
  );
};

export default Header;
