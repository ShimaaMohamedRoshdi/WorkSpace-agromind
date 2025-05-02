import React, { useState } from "react";

// Sample data (mockData as example)
import { mockData, mockData2, mockData3 } from "../assets/images/mockData";
import ProductCard from "./"; // Import ProductCard component

const ShopByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([
    ...mockData,
    ...mockData2,
    ...mockData3,
  ]);

  // Handle category change
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // Filter products based on selected category
    if (category === "All") {
      setFilteredData([...mockData, ...mockData2, ...mockData3]); // Show all items
    } else {
      setFilteredData(
        [...mockData, ...mockData2, ...mockData3].filter(
          (product) => product.category === category
        )
      );
    }
  };

  return (
    <div className="shop-by-category">
      <h2>Shop by Category</h2>

      {/* Dropdown to select category */}
      <div className="category-filter">
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="All">All Categories</option>
          <option value="Crop">Crop</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Fruit">Fruit</option>
          <option value="Herb">Herb</option>
          <option value="Organic Pesticide">Organic Pesticide</option>
        </select>
      </div>

      {/* Display filtered products */}
      <div className="product-list">
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <ProductCard key={product.id} product={product} /> // Use ProductCard component
          ))
        ) : (
          <p>No products available in this category</p>
        )}
      </div>
    </div>
  );
};

export default ShopByCategory;
