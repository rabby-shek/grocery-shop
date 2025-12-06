import React, { useState } from "react";

const ImageCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {/* CSS INSIDE COMPONENT */}
      <style>{`
        .custom-carousel {
          position: relative;
          margin-top: 20px;
        }

        .carousel-wrapper {
          width: 100%;
          height: 350px;
          overflow: hidden;
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          color: white;
          border: none;
          padding: 10px 12px;
          cursor: pointer;
          font-size: 18px;
          border-radius: 4px;
          z-index: 10;
        }

        .carousel-btn.left {
          left: 10px;
        }

        .carousel-btn.right {
          right: 10px;
        }

        .carousel-thumbs {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }

        .carousel-thumbs .thumb {
          width: 60px;
          height: 60px;
          cursor: pointer;
          border-radius: 4px;
          object-fit: cover;
          opacity: 0.6;
          border: 2px solid transparent;
          transition: 0.3s;
        }

        .carousel-thumbs .thumb.active {
          opacity: 1;
          border-color: #7fad39; /* green */
        }

        .carousel-thumbs .thumb:hover {
          opacity: 1;
        }
      `}</style>

      <div className="custom-carousel">
        <div className="carousel-wrapper">
          <img
            src={images[current]}
            alt="product slide"
            className="carousel-image"
          />
        </div>

        <button className="carousel-btn left" onClick={prevSlide}>
          ❮
        </button>
        <button className="carousel-btn right" onClick={nextSlide}>
          ❯
        </button>

        <div className="carousel-thumbs">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setCurrent(i)}
              className={`thumb ${i === current ? "active" : ""}`}
              alt="thumb"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
