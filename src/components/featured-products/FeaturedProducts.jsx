import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/app",
});

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch products and categories from backend
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
      alert("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/get-all-categories");
      if (res.data.success) {
        const categoryNames = res.data.data.map((c) => c.categoryName);
        setCategories(["all", ...categoryNames]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch categories");
    }
  };

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.category &&
            product.category.categoryName === activeCategory
        );

  return (
    <section className="featured spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Featured Product</h2>
            </div>
            <div className="featured__controls">
              <ul>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={activeCategory === cat ? "active" : ""}
                    onClick={() => setActiveCategory(cat)}
                    style={{ cursor: "pointer" }}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row featured__filter">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="featured__item">
                <div
                  className="featured__item__pic"
                  style={{
                    backgroundImage: `url(http://localhost:8000${product.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "250px",
                  }}
                >
                  <ul className="featured__item__pic__hover">
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
                <div className="featured__item__text">
                  <h6>
                    <a href="#">{product.name}</a>
                  </h6>
                  <h5>${parseFloat(product.price || 0).toFixed(2)}</h5>
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
    </section>
  );
};

export default FeaturedProducts;
