import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import ShopBanner from "../components/ShopBanner";

const Crops = () => {
  const products = useSelector((state) => state.product.products);

  if (!products || products.length === 0) {
    return <p className="text-center">No products available.</p>;
  }

  return (
    
  <div>
    <ShopBanner/>
      <div className="container py-5 ">
    
    <h2 className="text-center mb-5 fw-bold">Explore Our Category</h2>
    <div
      className="row row-cols-1 row-cols-md-3 row-cols-lg-5
   g-4"
    >
      {products.map((product) => (
        <div key={product.id} className="col">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  </div>
  </div>
  );
};

export default Crops;
