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
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  const filteredProducts =
    selectedCategory === "All"
      ? mockData2
      : mockData2.filter((p) => p.category === selectedCategory);

  const filteredAndSearchedProducts = filteredProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const withinPriceRange = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesSearch && withinPriceRange;
  });

  const sortedProducts = [...filteredAndSearchedProducts].sort((a, b) => {
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

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: value === "" ? (name === "min" ? 0 : Infinity) : Number(value),
    }));
  };

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
        {/* Search and Price Filters */}
        <div className="d-flex justify-content-between mb-3 align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="search" className="fw-semibold">
              Search:
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              placeholder="Search by name"
              style={{ minWidth: "200px" }}
            />
          </div>
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="minPrice" className="fw-semibold">
              Min Price:
            </label>
            <input
              type="number"
              id="minPrice"
              name="min"
              value={priceRange.min === 0 ? "" : priceRange.min}
              onChange={handlePriceChange}
              className="form-control"
              placeholder="0"
              style={{ width: "100px" }}
              min="0"
            />
            <label htmlFor="maxPrice" className="fw-semibold">
              Max Price:
            </label>
            <input
              type="number"
              id="maxPrice"
              name="max"
              value={priceRange.max === Infinity ? "" : priceRange.max}
              onChange={handlePriceChange}
              className="form-control"
              placeholder="No max"
              style={{ width: "100px" }}
              min="0"
            />
          </div>
          <div className="d-flex justify-content-end align-items-center gap-2">
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
        </div>
        {/* Products Grid */}
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {sortedProducts.length === 0 ? (
            <p className="text-center fw-semibold fs-5">No products found matching your criteria.</p>
          ) : (
            sortedProducts.map((product) => (
              <div key={product.id} className="col">
                <ItemCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
