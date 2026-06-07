import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/product";
import { useCart } from "../context/CartContext";
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState(null);

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (!foundProduct) {
      navigate("/");
      return;
    }
    setproduct(foundProduct);
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  const { addToCart, cartitems } = useCart();
  const productInCart = cartitems.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">{product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                addToCart(product.id);
              }}
            >
              Add to Cart {productQuantityLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
