import { useState } from "react"
import { CartContext } from "./CartContext"

export default function CartProvider ({children}) {
  const [cart, setCart] = useState([]);
  
  const addItem = (item, quantity) => {

    console.log(isInCart(item.id));

    if(isInCart(item.id)) {
      const newCart = cart.map((product) => {
        if(product.id === item.id ) {
          product.quantity = product.quantity + quantity;
          return product
        } else {
          return product
        }
      })
      setCart(newCart);

    } else {
      const product = {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: quantity,
        category: item.category,
        image: item.image,
        stock: item.stock,
      };
      setCart([...cart, product]);
    }

    console.log(cart);
  };

  const clear = () => {
    setCart([]);
  };

  const removeItem = (productId) => {
    setCart(cart.filter((product) => product.id !== productId))
  };

  const isInCart = (productId) => {
    if(cart.find((product) => product.id === productId)) {
      return true;
    } else{
      return false;
    }
  };

  return <CartContext.Provider value={{cart, addItem, clear, removeItem}}>{children}</CartContext.Provider>
};