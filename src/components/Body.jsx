import Product from "./Product";

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [productList, setproductList] = useState([]);

  const [searchText, setsearchText] = useState("");

  const [filteredList, setfilteredList] = useState([]);

  const fetchData = async () => {
    const data = await fetch(
      "https://dummyjson.com/products/category/groceries",
    );

    const json = await data.json();

    // optional chaining
    setproductList(json?.products);
    setfilteredList(json?.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // conditional rendering
  // if(productList.length===0){
  //   return <Shimmer/>
  // }

  console.log("body rendered");

  return productList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              // filter products and update ui

              console.log(searchText);

              const filteredProducts = productList.filter((res) => {
                return res.title
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setfilteredList(filteredProducts);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = productList.filter(
              (product) => product.rating > 4.5,
            );
            setproductList(filteredList);
            console.log(filteredList);
          }}
        >
          Top Rated Products
        </button>
      </div>

      <div className="super-saver">
        {filteredList.map((product) => (
          <Product key={product.id} groData={product} />
        ))}
      </div>
    </div>
  );
};
export default Body;
