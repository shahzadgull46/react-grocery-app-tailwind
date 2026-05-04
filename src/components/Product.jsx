
// groData is the prop 

const Product = ({ groData }) => {
  const {product_name,brands,ecoscore_grade,image_front_small_url,quantity} =groData
  return (
    <div className="product">
      <div><img className="product-img" src={image_front_small_url} alt="" /></div>
      <span>{product_name} -</span>
      <span>{quantity}</span>
      <p>{brands}</p>
      <p>Eco Score: {ecoscore_grade || "N/A"}</p>
  {/* <p>Nutri Score: {groData.nutriscore_grade || "N/A"}</p> */}
      <button className="buttons">Add to cart</button>
    </div>
  );
};
export default Product;