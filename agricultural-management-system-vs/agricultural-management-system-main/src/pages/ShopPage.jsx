import React from "react";
import { mockData2 } from "../assets/images/mockData";
import ItemCard from "../components/ItemCard";
import Categories from "../components/Categories";
import ShopBanner from "../components/ShopBanner";

const ShopPage = () => {
  return (
    
  <div>
    <ShopBanner/>
      <div className="container mt-4">
    
    <div className="row g-0"> {/* ✅ Fix spacing */}
      
      {/* Left Sidebar - Categories */}
      <div className="col-lg-2 col-md-4">
        <Categories />
      </div>

      {/* Right Side - Products */}
      <div className="col-lg-9 col-md-8">
        <div className="row">
          {mockData2.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6 col-sm-6 mb-2">
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
