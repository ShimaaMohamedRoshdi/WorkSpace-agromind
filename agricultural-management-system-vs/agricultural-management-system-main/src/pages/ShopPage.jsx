import React from "react";
import { mockData2 } from "../assets/images/mockData";
import ItemCard from "../components/ItemCard";

import ShopBanner from "../components/ShopBanner";

const ShopPage = () => {
  return (
    <div>
      <ShopBanner />
      <div className="  container py-5">
        <div className="row cols-md-3 cols-sm-6 row-cols-lg-5  ">
          {mockData2.map((product) => (
            <div key={product.id} className="col">
              <ItemCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
