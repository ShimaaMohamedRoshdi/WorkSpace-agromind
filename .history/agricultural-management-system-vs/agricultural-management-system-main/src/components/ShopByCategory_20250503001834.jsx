import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ShopByCategory = () => {
  const products = useSelector((state) => state.product.products || []);
  const products2 = useSelector((state) => state.product.products2 || []);
  const products3 = useSelector((state) => state.product.products3 || []);
  const products4 = useSelector((state) => state.product.products4 || []);

  // Combine all product arrays
  const allProducts = [...products, ...products2, ...products3, ...products4];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("nameAsc");

  // Extract unique categories from all products
  const categories = [
    "All",
    ...Array.from(new Set(allProducts.map((p) => p.category).filter(Boolean))),
  ];

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  // Sort filtered products based on sortOption
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Shop By Category</h2>
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn px-4 py-2 rounded-pill fw-bold shadow-sm ${
              selectedCategory === cat
                ? "btn-success text-white"
                : "btn-outline-success"
            }`}
            style={{
              fontSize: 16,
              letterSpacing: 0.5,
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="d-flex justify-content-end mb-3 align-items-center">
        <label htmlFor="sort" className="me-2 fw-semibold">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="form-select w-auto"
          style={{
            minWidth: "180px",
            cursor: "pointer",
            borderRadius: "0.375rem",
            borderColor: "#ced4da",
            padding: "0.375rem 0.75rem",
          }}
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
  );
};

export default ShopByCategory;
