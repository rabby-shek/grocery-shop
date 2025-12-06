import React from "react";

const ShopPage = () => {
  return (
    <>
      <section
        class="breadcrumb-section "
        style={{ backgroundImage: "url('/assets/img/breadcrumb.jpg')" }}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="breadcrumb__text">
                <h2>Organi Shop</h2>
                <div class="breadcrumb__option">
                  <a href="./index.html">Home</a>
                  <span>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
              <div className="sidebar">
                <div className="sidebar__item">
                  <h4>Department</h4>
                  <ul>
                    <li>
                      <a href="#">Fresh Meat</a>
                    </li>
                    <li>
                      <a href="#">Vegetables</a>
                    </li>
                    <li>
                      <a href="#">Fruit &amp; Nut Gifts</a>
                    </li>
                    <li>
                      <a href="#">Fresh Berries</a>
                    </li>
                    <li>
                      <a href="#">Ocean Foods</a>
                    </li>
                    <li>
                      <a href="#">Butter &amp; Eggs</a>
                    </li>
                    <li>
                      <a href="#">Fastfood</a>
                    </li>
                    <li>
                      <a href="#">Fresh Onion</a>
                    </li>
                    <li>
                      <a href="#">Papayaya &amp; Crisps</a>
                    </li>
                    <li>
                      <a href="#">Oatmeal</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-7">
              <div className="filter__item">
                <div className="row">
                  <div className="col-lg-4 col-md-5">
                    <div className="filter__sort">
                      <span>Sort By</span>
                      <select>
                        <option value={0}>Low to high (Price)</option>
                        <option value={0}>High to low (Price)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="filter__found">
                      <h6>
                        <span>16</span> Products found
                      </h6>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-3">
                    <div className="filter__option"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic "
                      style={{
                        backgroundImage:
                          "url('/assets/img/product/product-1.jpg')",
                      }}
                    >
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-retweet" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a href="#">Crab Pool Security</a>
                      </h6>
                      <h5>$30.00</h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic "
                      style={{
                        backgroundImage:
                          "url('/assets/img/product/product-2.jpg')",
                      }}
                    >
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-retweet" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a href="#">Crab Pool Security</a>
                      </h6>
                      <h5>$30.00</h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic "
                      style={{
                        backgroundImage:
                          "url('/assets/img/product/product-3.jpg')",
                      }}
                    >
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-retweet" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a href="#">Crab Pool Security</a>
                      </h6>
                      <h5>$30.00</h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic "
                      style={{
                        backgroundImage:
                          "url('/assets/img/product/product-4.jpg')",
                      }}
                    >
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-retweet" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a href="#">Crab Pool Security</a>
                      </h6>
                      <h5>$30.00</h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic "
                      style={{
                        backgroundImage:
                          "url('/assets/img/product/product-5.jpg')",
                      }}
                    >
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-retweet" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a href="#">Crab Pool Security</a>
                      </h6>
                      <h5>$30.00</h5>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="product__pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">
                  <i className="fa fa-long-arrow-right" />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
