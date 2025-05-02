import React, { useState } from "react";
import { mockData2 } from "../assets/images/mockData";
import ItemCard from "../components/ItemCard";
import ShopBanner from "../components/ShopBanner";

// Extract unique categories from mockData2
const categories = [
  "All",
  ...Array.from(new Set(mockData2.map((p) => p.category).filter(Boolean))),
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("nameAsc");

  const filteredProducts =
    selectedCategory === "All"
      ? mockData2
      : mockData2.filter((p) => p.category === selectedCategory);

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
    <div>
      <ShopBanner />
      <div className="container py-5">
        {/* Modern Horizontal Category Bar */}
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
              }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Sort Dropdown */}
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
        {/* Products Grid */}
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {sortedProducts.map((product) => (
            <div key={product.id} className="col">
              <ItemCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
