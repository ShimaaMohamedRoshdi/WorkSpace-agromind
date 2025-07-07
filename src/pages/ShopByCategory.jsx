import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import './ShopByCategory.css';

const ShopByCategory = () => {
  // Get products from Redux store
  const products = useSelector((state) => state.product.products || []);
  const products2 = useSelector((state) => state.product.products2 || []);
  const products3 = useSelector((state) => state.product.products3 || []);
  const products4 = useSelector((state) => state.product.products4 || []);

  // Combine all products
  const allProducts = [...products, ...products2, ...products3, ...products4];

  // State for filters
  const [activeCategory, setActiveCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("nameAsc");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [categories, setCategories] = useState([
    "Crop",
    "Vegetable", 
    "Fruit",
    "Herb",
    "Organic Pesticide",
    "Herbicide",
  ]);
  const [loading, setLoading] = useState(false);

  // Remove any API calls that might be overriding your categories
  useEffect(() => {
    // No API calls here, just use the hardcoded categories
    console.log("Using categories:", categories);
  }, []);

  // Debug: Log all products and their categories
  useEffect(() => {
    console.log("All products:", allProducts);
    console.log(
      "Product categories:",
      allProducts.map((p) => p.category)
    );
  }, [allProducts]);

  // Debug: Log when category changes
  useEffect(() => {
    console.log("Active category changed to:", activeCategory);
  }, [activeCategory]);

  // Filter products
  let filteredProducts = [...allProducts];

  // Apply category filter
  if (activeCategory) {
    console.log(`Filtering by category: ${activeCategory}`);
    filteredProducts = filteredProducts.filter((product) => {
      const match = product.category === activeCategory;
      console.log(
        `Product: ${product.name}, Category: ${product.category}, Match: ${match}`
      );
      return match;
    });
  }

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply price filter
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= priceRange.min && product.price <= priceRange.max
  );

  // Sort products
  filteredProducts.sort((a, b) => {
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

  // Handle category button click
  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? "" : category);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Shop By Category</h2>
      <div className="row">
        {/* Filters */}
        <div className="col-md-3">
          <div className="mb-3">
            <label className="form-label">Sort by:</label>
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
              <option value="priceAsc">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Search:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price Range:</label>
            <div className="d-flex gap-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: Number(e.target.value) })
                }
              />
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: Number(e.target.value) })
                }
              />
            </div>
          </div>
          {/* Categories */}
          <div className="mb-3 p-4 rounded-3 border border-2 border-success">
            <h5 className="fw-bold">Categories</h5>
            {loading ? (
              <p>Loading categories...</p>
            ) : (
              <>
                <div className="form-check">
                  <input
                    className="form-check-input me-2"
                    type="radio"
                    id="category-all"
                    name="category"
                    checked={activeCategory === ""}
                    onChange={() => setActiveCategory("")}
                  />
                  <label className="form-check-label" htmlFor="category-all">
                    All Products
                  </label>
                </div>
                <div className="category-list">
                  {categories.map((category) => (
                    <div 
                      className="form-check" 
                      key={typeof category === 'object' ? category.Id : category}
                    >
                      <input
                        className="form-check-input me-2"
                        type="radio"
                        id={`category-${typeof category === 'object' ? category.Id : category}`}
                        name="category"
                        checked={activeCategory === (typeof category === 'object' ? category.CategoryName : category)}
                        onChange={() => setActiveCategory(typeof category === 'object' ? category.CategoryName : category)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`category-${typeof category === 'object' ? category.Id : category}`}
                      >
                        {typeof category === 'object' ? category.CategoryName : category}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="mb-3">
            <h6 className="fw-bold">Selected:</h6>
            <p className="border border-success p-2 rounded">{activeCategory || "All Products"}</p>
          </div>
        </div>
        {/* Products */}
        <div className="col-md-8">
          {activeCategory && (
            <h4 className="mb-3">Category: {activeCategory}</h4>
          )}
          {filteredProducts.length === 0 ? (
            <p className="text-center">
              No products found matching your criteria.
            </p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -10px' }}>
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="product-card-container"
                  style={{ 
                    width: windowWidth < 576 ? '100%' : '33.333%', 
                    padding: '0 10px', 
                    marginBottom: '20px',
                    boxSizing: 'border-box'
                  }}
                >
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




















