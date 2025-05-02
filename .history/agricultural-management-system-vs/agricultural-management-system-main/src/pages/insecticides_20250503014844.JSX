import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import BannerInsecticides from "../components/BannerInsecticides";

const Insecticides = () => {
  const products = useSelector((state) => state.product.products5);
  const [sortOption, setSortOption] = useState("nameAsc");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  if (!products || products.length === 0) {
    return <p className="text-center">No products available.</p>;
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const withinPriceRange = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesSearch && withinPriceRange;
  });

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

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: value === "" ? (name === "min" ? 0 : Infinity) : Number(value),
    }));
  };

  return (
    <div>
      <BannerInsecticides />
      <div className="container py-5 ">
        <h2 className="text-center mb-3 fw-bold">Explore Insecticides</h2>
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
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
          {sortedProducts.length === 0 ? (
            <p className="text-center fw-semibold fs-5">No products found matching your criteria.</p>
          ) : (
            sortedProducts.map((product) => (
              <div key={product.id} className="col">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Insecticides;
