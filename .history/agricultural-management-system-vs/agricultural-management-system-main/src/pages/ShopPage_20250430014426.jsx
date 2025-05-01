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
        <div className="row">
          {/* Sidebar: Category List */}
          <div className="col-md-3 mb-4">
            <div className="list-group">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`list-group-item list-group-item-action ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                  style={{ cursor: "pointer" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {/* Products Grid */}
          <div className="col-md-9">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col">
                  <ItemCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
