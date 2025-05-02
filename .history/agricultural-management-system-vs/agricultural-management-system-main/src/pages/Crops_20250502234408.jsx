import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import ShopBanner from "../components/ShopBanner";

const Crops = () => {
  const products = useSelector((state) => state.product.products);
  const [sortOption, setSortOption] = useState("nameAsc");

  if (!products || products.length === 0) {
    return <p className="text-center">No products available.</p>;
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div>
      <ShopBanner />
      <div className="container py-5 ">
        <h2 className="text-center mb-3 fw-bold">Explore Our Category</h2>
        <div className="d-flex justify-content-end mb-3 align-items-center">
          <label htmlFor="sort" className="me-2 fw-semibold">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="form-select w-auto"
            style={{ minWidth: "180px", cursor: "pointer", borderRadius: "0.375rem", borderColor: "#ced4da", padding: "0.375rem 0.75rem" }}
          >
            <option value="nameAsc">Name Ascending</option>
            <option value="nameDesc">Name Descending</option>
            <option value="priceAsc">Price Ascending</option>
            <option value="priceDesc">Price Descending</option>
          </select>
        </div>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
          {sortedProducts.map((product) => (
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
