import React from 'react'
import HeroSection from '../components/hero-section/HeroSection';
import FeaturedProducts from '../components/featured-products/FeaturedProducts';
import Categories from '../components/categories/Categories';

const HomePage = () => {
  return (
    <>
     
      <HeroSection />
      <Categories />
      <FeaturedProducts />
<div className="banner">
  <div className="container">
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-6">
        <div className="banner__pic">
          <img src="/assets/img/banner/banner-1.jpg" alt />
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6">
        <div className="banner__pic">
          <img src="/assets/img/banner/banner-2.jpg" alt />
        </div>
      </div>
    </div>
  </div>
</div>


 
    </>
  )
}

export default HomePage;
