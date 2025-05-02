// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import ProductCard from "../components/ProductCard";

// const ShopByCategory = () => {
//   const products = useSelector((state) => state.product.products || []);
//   const products2 = useSelector((state) => state.product.products2 || []);
//   const products3 = useSelector((state) => state.product.products3 || []);
//   const products4 = useSelector((state) => state.product.products4 || []);
//   const allProducts = [...products, ...products2, ...products3, ...products4];

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [sortOption, setSortOption] = useState("nameAsc");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

//   // Normalize categories and collect unique values (lowercase, fallback to "uncategorized")
//   const categories = Array.from(
//     new Set(
//       allProducts.map((p) => (p.category || "Uncategorized").toLowerCase())
//     )
//   );

//   // Toggle category selection (using lowercase values)
//   const toggleCategory = (category) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories(selectedCategories.filter((c) => c !== category));
//     } else {
//       setSelectedCategories([...selectedCategories, category]);
//     }
//   };

//   // Filter by selected categories
//   let filtered = selectedCategories.length
//     ? allProducts.filter((p) =>
//         selectedCategories.includes(
//           (p.category || "Uncategorized").toLowerCase()
//         )
//       )
//     : allProducts;

//   // Filter by search
//   if (searchTerm.trim()) {
//     filtered = filtered.filter((p) =>
//       (p.name || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }

//   // Filter by price range
//   filtered = filtered.filter(
//     (p) => p.price >= priceRange.min && p.price <= priceRange.max
//   );

//   // Sort the filtered products
//   const sortedProducts = [...filtered].sort((a, b) => {
//     switch (sortOption) {
//       case "nameAsc":
//         return (a.name || "").localeCompare(b.name || "");
//       case "nameDesc":
//         return (b.name || "").localeCompare(a.name || "");
//       case "priceAsc":
//         return a.price - b.price;
//       case "priceDesc":
//         return b.price - a.price;
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4 fw-bold">Shop By Category</h2>
//       <div className="row">
//         {/* Filters Panel */}
//         <div className="col-md-3 mb-4">
//           {/* Sort */}
//           <div className="mb-3">
//             <label htmlFor="sort" className="form-label fw-semibold">
//               Sort by:
//             </label>
//             <select
//               id="sort"
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="form-select"
//               style={{ cursor: "pointer" }}
//             >
//               <option value="nameAsc">Name Ascending</option>
//               <option value="nameDesc">Name Descending</option>
//               <option value="priceAsc">Price Ascending</option>
//               <option value="priceDesc">Price Descending</option>
//             </select>
//           </div>

//           {/* Search */}
//           <div className="mb-3">
//             <label htmlFor="search" className="form-label fw-semibold">
//               Search:
//             </label>
//             <input
//               type="text"
//               id="search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="form-control"
//               placeholder="Search by name"
//             />
//           </div>

//           {/* Price Range */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Price Range:</label>
//             <div className="d-flex gap-2">
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Min"
//                 value={priceRange.min}
//                 onChange={(e) =>
//                   setPriceRange({ ...priceRange, min: +e.target.value })
//                 }
//               />
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Max"
//                 value={priceRange.max}
//                 onChange={(e) =>
//                   setPriceRange({ ...priceRange, max: +e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           {/* Categories */}
//           <div
//             className="border rounded p-3 shadow-sm"
//             style={{ maxHeight: "400px", overflowY: "auto" }}
//           >
//             <h5 className="mb-3">Categories</h5>
//             <form>
//               {categories.map((cat, index) => (
//                 <div className="form-check" key={`${cat}-${index}`}>
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id={`cat-${cat}`}
//                     checked={selectedCategories.includes(cat)}
//                     onChange={() => toggleCategory(cat)}
//                   />
//                   <label
//                     className="form-check-label text-capitalize"
//                     htmlFor={`cat-${cat}`}
//                   >
//                     {cat}
//                   </label>
//                 </div>
//               ))}
//             </form>

//             {/* Selected Categories */}
//             {selectedCategories.length > 0 && (
//               <div className="mt-3">
//                 <h6 className="fw-semibold">Selected:</h6>
//                 <ul className="list-group list-group-flush">
//                   {selectedCategories.map((cat) => (
//                     <li
//                       key={`selected-${cat}`}
//                       className="list-group-item text-capitalize py-1"
//                     >
//                       {cat}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="col-md-9">
//           {sortedProducts.length === 0 ? (
//             <p className="text-center">
//               No products found matching the filters.
//             </p>
//           ) : (
//             <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
//               {sortedProducts.map((product) => (
//                 <div key={`product-${product.id}`} className="col">
//                   <ProductCard product={product} />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopByCategory;
import React from "react";

const ShopByCategory = () => {
  return <div>ShopByCategory</div>;
};

export default ShopByCategory;
