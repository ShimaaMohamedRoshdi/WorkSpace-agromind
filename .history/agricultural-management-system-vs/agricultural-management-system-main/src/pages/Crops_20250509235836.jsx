import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ShopBanner from "../components/ShopBanner";
import mockCrops from "../assets/images/";

const Crops = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Use mock data instead of API call
    const mapped = mockCrops.map((crop) => {
      const startDate = crop.plantingDate || crop.StartDate || null;
      const duration = crop.duration || crop.Duration || 0;
      let endDate = null;
      if (startDate && duration) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + duration);
        endDate = end.toISOString().split("T")[0];
      }
      return {
        ...crop,
        startDate: startDate ? startDate.split("T")[0] : "N/A",
        endDate: endDate || "N/A",
        duration,
        name: crop.cropName || crop.CropName || "Unnamed Crop",
        price: crop.totalCost || crop.TotalCost || 0,
        category: crop.cropType || crop.CropType || "Uncategorized",
        id: crop.id || crop.Id,
        image: crop.cropImage || crop.PictureUrl || "",
        rating: crop.rating || 4,
        discount: crop.discount || 0,
        originalPrice: crop.originalPrice || 0,
      };
    });
    setProducts(mapped);
  }, []);

  if (!products || products.length === 0) {
    return <p className="text-center">No products available.</p>;
  }

  return (
    <div>
      <ShopBanner />
      <div className="container py-5 ">
        <h2 className="text-center mb-3 fw-bold">Explore Our Category</h2>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
          {products.length === 0 ? (
            <p className="text-center fw-semibold fs-5">
              No products found matching your criteria.
            </p>
          ) : (
            products.map((product) => (
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

export default Crops;
