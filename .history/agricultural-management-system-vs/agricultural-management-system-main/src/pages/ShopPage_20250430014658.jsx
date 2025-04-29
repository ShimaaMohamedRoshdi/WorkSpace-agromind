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

  const filteredProducts =
    selectedCategory === "All"
      ? mockData2
      : mockData2.filter((p) => p.category === selectedCategory);

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
        {/* Products Grid */}
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredProducts.map((product) => (
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
