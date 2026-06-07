import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
const ProductCard = ({product}) => {
  const { addToCart  ,cartitems} = useCart();
  const productInCart = cartitems.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart?`(${productInCart.quantity})` : "";
  return (
    <div className="product-card" >
      <img src={product.image} className="product-card-image" alt={product.name} />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${product.price}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary" to={`/products/${product.id}`}>View Details</Link>
          <button className="btn btn-primary" onClick={() => addToCart(product.id)}>Add to cart {productQuantityLabel} </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
