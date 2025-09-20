// import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";


// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   restaurantId: string;
//   quantity: number;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, amount: number) => void;
//   clearCart: () => void;
// }

// export const CartContext = createContext<CartContextType>({
//   cartItems: [],
//   addToCart: () => {},
//   removeFromCart: () => {},
//   updateQuantity: () => {},
//   clearCart: () => {},
// });

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);


//   useEffect(() => {
//     (async () => {
//       const storedCart = await AsyncStorage.getItem("cart");
//       if (storedCart) setCartItems(JSON.parse(storedCart));
//     })();
//   }, []);

//   useEffect(() => {
//     AsyncStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (item: CartItem) => {
//     const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
//     if (existingItem) {
   
//       setCartItems((prev) =>
//         prev.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//     } else {
     
//       setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (id: string) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: string, amount: number) => {
//     setCartItems((prev) =>
//       prev
//         .map((item) =>
//           item.id === id
//             ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
//             : item
//         )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// interface CartItem {
//   id: string;
//   name: string;
//   price: number|null;
//   restaurantId: string;
//   quantity: number;
//   image:string
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, amount: number) => void;
//   clearCart: () => void;
// }

// export const CartContext = createContext<CartContextType>({
//   cartItems: [],
//   addToCart: () => {},
//   removeFromCart: () => {},
//   updateQuantity: () => {},
//   clearCart: () => {},
// });

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Load from storage on mount
//   useEffect(() => {
//     (async () => {
//       try {
//         const storedCart = await AsyncStorage.getItem("cart");
//         if (storedCart) {
//           setCartItems(JSON.parse(storedCart));
//         }
//       } catch (e) {
//         console.error("Failed to load cart from storage:", e);
//       }
//     })();
//   }, []);

//   // Save to storage on change
//   useEffect(() => {
//     AsyncStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (item: CartItem) => {
//     const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
//     if (existingItem) {
//       setCartItems((prev) =>
//         prev.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (id: string) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: string, amount: number) => {
//     setCartItems((prev) =>
//       prev
//         .map((item) =>
//           item.id === id
//             ? { ...item, quantity: item.quantity + amount }
//             : item
//         )
//         .filter((item) => item.quantity > 0) // Remove if quantity <= 0
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     AsyncStorage.removeItem("cart");
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Export CartItem type
export interface CartItem {
  id: string;
  name: string;
  price: number | null;
  restaurantId: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to load cart:", e);
      }
    })();
  }, []);

  // Save cart to AsyncStorage on change
  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const existing = cartItems.find((i) => i.id === item.id);
    if (existing) {
      setCartItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + amount } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    AsyncStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
