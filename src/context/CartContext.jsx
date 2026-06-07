import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/product";



const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartitems, setcartitems] = useState([]);

  function addToCart(productId) {
    const existing = cartitems.find((item) => item.id === productId);
    if (existing) {
      const currentQuantity = existing.quantity;
      const updatedCartItems = cartitems.map((item) =>
        item.id === productId
          ? { id: productId, quantity: currentQuantity + 1 }
          : item,
      );
      setcartitems(updatedCartItems);
    } else {
      setcartitems([...cartitems, { id: productId, quantity: 1 }]);
    }
  }

  function getCartItemsWithProducts() {
    return cartitems.map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product);
  }


function removeFromCart(productId) {
    setcartitems(cartitems.filter((item) => item.id !== productId));
  }


function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setcartitems(
      cartitems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }
 
function getCartTotal() {
    const total = cartitems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
    return total;
  }

  function clearCart() {
    setcartitems([]);
  }


  return (
    <CartContext.Provider value={{ cartitems, addToCart,getCartItemsWithProducts,removeFromCart,updateQuantity,getCartTotal,clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
