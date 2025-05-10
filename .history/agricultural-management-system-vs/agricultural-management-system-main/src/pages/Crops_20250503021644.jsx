import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import ShopBanner from "../components/ShopBanner";

const Crops = () => {
  const products = useSelector((state) => state.product.products);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("nameAsc");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  if (!products || products.length === 0) {
    return <p className="text-center">No products available.</p>;
  }

  // Normalize categories and collect unique values (lowercase, fallback to "uncategorized")
  const categories = Array.from(
    new Set(
      products.map((p) => (p.category || "Uncategorized").toLowerCase())
    )
  );

  // Toggle category selection (using lowercase values)
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter by selected categories
  let filtered = selectedCategories.length
    ? products.filter((p) =>
        selectedCategories.includes(
          (p.category || "Uncategorized").toLowerCase()
        )
      )
    : products;

  // Filter by search
  if (searchTerm.trim()) {
    filtered = filtered.filter((p) =>
      (p.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by price range
  filtered = filtered.filter(
    (p) => p.price >= priceRange.min && p.price <= priceRange.max
  );
