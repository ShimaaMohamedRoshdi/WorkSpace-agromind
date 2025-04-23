

import React from "react";
import ProductCard from "./ProductCard";
import imgg1 from "../assets/images/img-1.png";
import imgg2 from "../assets/images/img-2.png";
import imgg3 from "../assets/images/img-3.png";
import imgg5 from "../assets/images/img-4.png";
import imgg6 from "../assets/images/img-5.png";
import imgg7 from "../assets/images/img-6.png";
import imgg12 from "../assets/images/img-7.png";
import imgg9 from "../assets/images/img-9.png";

const Products = () => {
  const products = [
    { category: "Food", image: imgg1, name: "Organic Delicious Pomegranate", price: 53.56 },
    { category: "Fish", image: imgg2, name: "100% Natural Fresh Sea Fish", price: 53.56 },
    { category: "Food", image: imgg3, name: "Organic Delicious Cutting Pear", price: 53.56 },
    { category: "Vegetable", image: imgg9, name: "Organic Delicious Fresh Tomato", price: 53.56 },
    { category: "Vegetable", image: imgg5, name: "Organic Delicious Fresh Tomato", price: 53.56 },
    { category: "Vegetable", image: imgg6, name: "Organic Delicious Fresh Tomato", price: 53.56 },
    { category: "Vegetable", image: imgg7, name: "Organic Delicious Fresh Tomato", price: 53.56 },
    { category: "Vegetable", image: imgg12, name: "Organic Delicious Fresh Tomato", price: 53.56 },
  ];

  return (
    <div className="container py-5">
         <h5 className="text-warning fw-bold text-center">
          <span className="icon-decoration">🌾</span> Healthy Foods{" "}
          <span className="icon-decoration">🌾</span>
          <h1 className="text-white fw-bold mt-3 ">
          What We Provide For Your Better Health
        </h1>
        </h5>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="row col-md-3 col-lg-3 mb-1 text-center "> {/* Each card gets a column */}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

