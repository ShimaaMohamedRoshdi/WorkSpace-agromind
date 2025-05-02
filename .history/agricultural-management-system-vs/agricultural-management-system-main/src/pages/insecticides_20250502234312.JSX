import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import BannerInsecticides from "../components/BannerInsecticides";

const Insecticides = () => {
  const products = useSelector((state) => state.product.products5);
  const [sortOption, setSortOption] = useState("nameAsc");

  if (!products || products.length === 0) {
    return <p className="text-center">No products available.</p>;
  }

  const sortedProducts = [...products].sort((a, b) => {
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
      <BannerInsecticides />
      <div className="container py-5 ">
