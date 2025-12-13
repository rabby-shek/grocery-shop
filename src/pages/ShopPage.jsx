import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

const api = axios.create({
  baseURL: "http://localhost:8000/api/app",
});

const ShopPage = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/get-all-product");
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/get-all-categories");
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Filter by category
  let filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (p) =>
            p.category &&
            p.category.categoryName === activeCategory
        );

  // 🔹 Sort by price
  if (sortOrder === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  } else if (sortOrder === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <section
        className="breadcrumb-section"
        style={{ backgroundImage: "url('/assets/img/breadcrumb.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Shop</h2>
                <div className="breadcrumb__option">
                  <a href="/">Home</a>
                  <span>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-5">
              <div className="sidebar">
                <div className="sidebar__item">
                  <h4>Department</h4>
                  <ul>
                    <li
                      style={{ cursor: "pointer", backgroundColor: "#7fad39", marginBottom: "10px", padding: "10px 15px" }}
                      className={activeCategory === "all" ? "active" : ""}
                      onClick={() => setActiveCategory("all")}
                    >
                      All
                    </li>

                    {categories.map((cat) => (
                      <li
                      
                        key={cat._id}
                        style={{ cursor: "pointer", backgroundColor: "#7fad39", marginBottom: "10px", padding: "10px 15px" }}
                        className={
                          activeCategory === cat.categoryName ? "active" : ""
                        }
                        onClick={() => setActiveCategory(cat.categoryName)}
                      >
                        {cat.categoryName}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="col-lg-9 col-md-7">
              {/* Filter */}
              <div className="filter__item">
                <div className="row">
                  <div className="col-lg-4 col-md-5">
                    <div className="filter__sort">
                      <span>Sort By</span>
                      <select
                        onChange={(e) => setSortOrder(e.target.value)}
                      >
                        <option value="">Default</option>
                        <option value="low">Low to High (Price)</option>
                        <option value="high">High to Low (Price)</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <div className="filter__found">
                      <h6>
                        <span>{filteredProducts.length}</span> Products found
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="row">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="col-lg-4 col-md-6 col-sm-6"
                  >
                    <div className="product__item">
                      <div
                        className="product__item__pic"
                        style={{
                          backgroundImage: `url(http://localhost:8000${product.image})`,
                        }}
                      >
                        <ul className="product__item__pic__hover">
                          <li>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => addToCart(product)}
                            >
                              <i className="fa fa-shopping-cart" />
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="product__item__text">
                        <h6>{product.name}</h6>
                        <h5>${Number(product.price).toFixed(2)}</h5>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredProducts.length === 0 && (
                  <div className="col-12 text-center mt-4">
                    <h5>No products found</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
