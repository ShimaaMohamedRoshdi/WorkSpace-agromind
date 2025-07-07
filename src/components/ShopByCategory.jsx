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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("nameAsc");

  // Extract unique categories from all products
  const categories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  );

  // Handle checkbox toggle for categories
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter products by selected categories (if none selected, show all)
  const filteredProducts =
    selectedCategories.length === 0
      ? allProducts
      : allProducts.filter((p) => selectedCategories.includes(p.category));

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
      <div className="row">
        {/* Left side: Sort dropdown above category checkboxes */}
        <div className="col-md-3 mb-4">
          <div className="mb-3">
            <label htmlFor="sort" className="form-label fw-semibold">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="form-select"
              style={{ cursor: "pointer" }}
            >
              <option value="nameAsc">Name Ascending</option>
              <option value="nameDesc">Name Descending</option>
              <option value="priceAsc">Price Ascending</option>
              <option value="priceDesc">Price Descending</option>
            </select>
          </div>
          <div className="border rounded p-3 shadow-sm" style={{ maxHeight: "400px", overflowY: "auto" }}>
            <h5 className="mb-3">Categories</h5>
            <form>
              {categories.map((cat) => (
                <div className="form-check" key={cat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`cat-${cat}`}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <label className="form-check-label" htmlFor={`cat-${cat}`}>
                    {cat}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right side: Products grid */}
        <div className="col-md-9">
          {sortedProducts.length === 0 ? (
            <p className="text-center">No products found for selected categories.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
              {sortedProducts.map((product) => (
                <div key={product.id} className="col">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
