import React from "react";

const Categories = () => {
  return (
    <div className="bg-light p-3 rounded shadow-sm w-100"> {/* ✅ Fix alignment */}
      <h5 className="fw-bold text-success">Categories</h5>
      <ul className="list-unstyled">
        <li className="py-2">Jam And Jelly (2)</li>
        <li className="py-2">Superfood (5)</li>
        <li className="py-2">Vegetables (6)</li>
        <li className="py-2">Premium Nuts (3)</li>
        <li className="py-2">Detox Drinks (1)</li>
      </ul>
    </div>
  );
};

export default Categories;
