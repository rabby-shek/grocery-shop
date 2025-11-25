import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext";

// Images
import feature1 from "../../assets/img/featured/feature-1.jpg";
import feature2 from "../../assets/img/featured/feature-2.jpg";
import feature3 from "../../assets/img/featured/feature-3.jpg";
import feature4 from "../../assets/img/featured/feature-4.jpg";
import feature5 from "../../assets/img/featured/feature-5.jpg";
import feature6 from "../../assets/img/featured/feature-6.jpg";
import feature7 from "../../assets/img/featured/feature-7.jpg";
import feature8 from "../../assets/img/featured/feature-8.jpg";
import OrganicMeat from "../../assets/img/featured/organic-meat.jpg";
import SteakMeat from "../../assets/img/featured/steak-meat.jpg";
import ChickenBreast from "../../assets/img/featured/raw-chicken-breasts.jpg";

const products = [
  { id: 1, name: "Crab Pool Security", price: 30, category: ["fresh-meat"], img: feature1 },
  { id: 2, name: "Fresh Vegetable Pack", price: 25, category: ["vegetables", "fastfood"], img: feature2 },
  { id: 3, name: "Organic Meat", price: 40, category: ["fresh-meat"], img: OrganicMeat },
  { id: 4, name: "Fast Food Combo", price: 20, category: ["fastfood", "oranges"], img: feature4 },
  { id: 5, name: "Orange Juice Pack", price: 15, category: ["oranges"], img: feature5 },
  { id: 6, name: "Steak Meat", price: 50, category: ["fresh-meat"], img: SteakMeat },
  { id: 7, name: "Green Vegetables", price: 18, category: ["vegetables"], img: feature7 },
  { id: 8, name: "Burger Meal", price: 22, category: ["fastfood"], img: feature8 },
  { id: 9, name: "Mixed Fruit Pack", price: 28, category: ["oranges"], img: feature1 },
  { id: 10, name: "Chicken Breast", price: 35, category: ["fresh-meat"], img: ChickenBreast },
  { id: 11, name: "Tomato & Cucumber", price: 12, category: ["vegetables"], img: feature3 },
  { id: 12, name: "Pizza Slice", price: 8, category: ["fastfood"], img: feature4 },
  { id: 13, name: "Orange Snack", price: 10, category: ["oranges"], img: feature5 },
  { id: 15, name: "Salad Bowl", price: 20, category: ["vegetables"], img: feature7 },
  { id: 16, name: "French Fries", price: 7, category: ["fastfood"], img: feature8 },
];

const categories = ["all", "oranges", "fresh-meat", "vegetables", "fastfood"];

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category.includes(activeCategory));

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
            <div
              key={product.id}
              className="col-lg-3 col-md-4 col-sm-6"
            >
              <div className="featured__item">
                <div
                  className="featured__item__pic"
                  style={{
                    backgroundImage: `url(${product.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "250px",
                  }}
                >
                  <ul className="featured__item__pic__hover">
                    {/* <li>
                      <a href="#">
                        <i className="fa fa-heart" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet" />
                      </a>
                    </li> */}
                    <li>
                      <a
                      style={{
                        cursor: "pointer"
                      }}
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
                  <h5>${product.price.toFixed(2)}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
