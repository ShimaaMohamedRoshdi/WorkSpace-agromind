import React, { useState } from "react";
import { mockData2 } from "../assets/images/mockData";
import ItemCard from "../components/ItemCard";
import ShopBanner from "../components/ShopBanner";

// Extract unique categories from mockData2
const categories = [
  "All",
  ...Array.from(new Set(mockData2.map((p) => p.category).filter(Boolean)))
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
        {/* Category Filter Buttons */}
        <div className="mb-4 d-flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${selectedCategory === cat ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="row cols-md-3 cols-sm-6 row-cols-lg-5">
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
