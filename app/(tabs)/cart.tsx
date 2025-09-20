// import React, { useContext } from "react";
// import { CartContext } from "../../context/CartContext";
// import { AuthContext } from "@/context/Auth";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   Alert,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");

// export interface CartItemType {
//   id: string;
//   name: string;
//   price: number | null;
//   quantity: number;
//   image?: string;
// }

// export default function Cart() {
//   const { cartItems, updateQuantity, removeFromCart, clearCart } =
//     useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const router = useRouter();

//   const DELIVERY_FEE = 2.99;
//   const SERVICE_FEE = 0.75;
//   const FREE_DELIVERY_THRESHOLD = 25;

//   const totalItemPrice = cartItems.reduce(
//     (sum, item) => sum + ((item.price || 0) * item.quantity),
//     0
//   );
//   const totalPrice = totalItemPrice + DELIVERY_FEE + SERVICE_FEE;
//   const remainingForFreeDelivery = Math.max(
//     FREE_DELIVERY_THRESHOLD - totalItemPrice,
//     0
//   );
//   const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       Alert.alert("Your cart is empty", "Please add items before proceeding.");
//       return;
//     }

//     if (!user) {
//       router.push("/login");
//       return;
//     }

//     router.push("/order");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>🛒 Your Cart ({totalQuantity})</Text>
//       </View>

//       {cartItems.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>Your cart is empty</Text>
//           <TouchableOpacity
//             onPress={() => router.back()}
//             style={styles.shopButton}
//           >
//             <Text style={styles.shopButtonText}>Start Shopping</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <ScrollView
//           style={{ flex: 1 }}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 150 }}
//         >
//           {/* Clear Cart */}
//           <TouchableOpacity onPress={clearCart}>
//             <Text style={styles.clearAll}>Clear All</Text>
//           </TouchableOpacity>

//           {/* Cart Items */}
//           {cartItems.map((item) => (
//             <View key={item.id} style={styles.item}>
//               {item.image ? (
//                 <Image source={{ uri: item.image }} style={styles.itemImage} />
//               ) : (
//                 <View style={[styles.itemImage, { backgroundColor: "#ccc" }]} />
//               )}
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text style={styles.itemPrice}>
//                   ₹{(item.price || 0).toFixed(2)} × {item.quantity} = ₹
//                   {((item.price || 0) * item.quantity).toFixed(2)}
//                 </Text>
//               </View>

//               {/* Quantity Controls */}
//               <View style={styles.quantityContainer}>
//                 <TouchableOpacity
//                   style={styles.qtyButton}
//                   onPress={() => updateQuantity(item.id, -1)}
//                 >
//                   <Text style={styles.qtySymbol}>-</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.qtyText}>{item.quantity}</Text>
//                 <TouchableOpacity
//                   style={styles.qtyButton}
//                   onPress={() => updateQuantity(item.id, 1)}
//                 >
//                   <Text style={styles.qtySymbol}>+</Text>
//                 </TouchableOpacity>
//               </View>

//               {/* Delete */}
//               <TouchableOpacity onPress={() => removeFromCart(item.id)}>
//                 <Text style={styles.delete}>🗑️</Text>
//               </TouchableOpacity>
//             </View>
//           ))}

//           {/* Checkout Summary */}
//           <View style={styles.summary}>
//             <Text style={styles.summaryTitle}>Order Summary</Text>
//             <View style={styles.summaryRow}>
//               <Text>Subtotal ({totalQuantity} items)</Text>
//               <Text>₹{totalItemPrice.toFixed(2)}</Text>
//             </View>
//             <View style={styles.summaryRow}>
//               <Text>Delivery Fee</Text>
//               <Text>₹{DELIVERY_FEE.toFixed(2)}</Text>
//             </View>
//             <View style={styles.summaryRow}>
//               <Text>Service Fee</Text>
//               <Text>₹{SERVICE_FEE.toFixed(2)}</Text>
//             </View>
//             {remainingForFreeDelivery > 0 && (
//               <Text style={styles.freeDeliveryMsg}>
//                 Add ₹{remainingForFreeDelivery.toFixed(2)} more for free
//                 delivery!
//               </Text>
//             )}
//             <View style={styles.summaryRow}>
//               <Text style={styles.totalText}>Total</Text>
//               <Text style={styles.totalText}>₹{totalPrice.toFixed(2)}</Text>
//             </View>
//           </View>

//           {/* Login Card & Proceed Button */}
//           {!user ? (
//             <View style={styles.loginCard}>
//               <Text style={styles.loginCardTitle}>Almost There</Text>
//               <Text style={styles.loginCardText}>
//                 Login/Create Account quickly to place your order.
//               </Text>
//               <TouchableOpacity
//                 style={styles.loginProceedButton}
//                 onPress={handleCheckout}
//               >
//                 <Text style={styles.loginProceedText}>
//                   Proceed with Phone Number
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <TouchableOpacity
//               style={styles.checkoutButton}
//               onPress={handleCheckout}
//             >
//               <Text style={styles.checkoutText}>
//                 Proceed to Checkout • ₹{totalPrice.toFixed(2)}
//               </Text>
//             </TouchableOpacity>
//           )}
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 15 },
//   header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
//   headerTitle: { fontSize: 22, fontWeight: "700", color: "#222" },
//   clearAll: { color: "red", alignSelf: "flex-end", marginBottom: 10, fontSize: 14 },
//   emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   emptyText: { fontSize: 18, color: "gray", marginBottom: 15 },
//   shopButton: { backgroundColor: "orange", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
//   shopButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fafafa",
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   itemImage: {
//     width: width * 0.18,
//     height: width * 0.18,
//     borderRadius: 10,
//     marginRight: 12,
//   },
//   itemName: { fontSize: 16, fontWeight: "600", color: "#222" },
//   itemPrice: { fontSize: 13, color: "#666", marginTop: 4 },
//   quantityContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f1f1f1",
//     borderRadius: 8,
//     marginHorizontal: 8,
//   },
//   qtyButton: { paddingVertical: 6, paddingHorizontal: 12 },
//   qtySymbol: { fontSize: 18, fontWeight: "600", color: "#444" },
//   qtyText: { marginHorizontal: 8, fontSize: 16, fontWeight: "600" },
//   delete: { fontSize: 18, color: "red", marginLeft: 8 },
//   summary: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#eee",
//     marginBottom: 10,
//   },
//   summaryTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#222" },
//   summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
//   freeDeliveryMsg: {
//     backgroundColor: "#E8F5E9",
//     color: "green",
//     padding: 10,
//     borderRadius: 8,
//     marginVertical: 8,
//     fontSize: 14,
//     textAlign: "center",
//   },
//   totalText: { fontSize: 18, fontWeight: "700", color: "#222" },
//   checkoutButton: {
//     backgroundColor: "purple",
//     paddingVertical: 16,
//     borderRadius: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     elevation: 3,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
//   loginCard: {
//     backgroundColor: "#cba4f722",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 10,
//     marginTop: 5,
//     shadowColor: "white",
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   loginCardTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#333",
//   },
//   loginCardText: {
//     color: "#666",
//     fontSize: 14,
//     marginTop: 4,
//     marginBottom: 10,
//   },
//   loginProceedButton: {
//     backgroundColor: "purple",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "100%",
//   },
//   loginProceedText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });


import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "@/context/Auth";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export interface CartItemType {
  id: string;
  name: string;
  price: number | null;
  quantity: number;
  image?: string;
}

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const DELIVERY_FEE = 2.99;
  const SERVICE_FEE = 0.75;
  const FREE_DELIVERY_THRESHOLD = 25;

  const totalItemPrice = cartItems.reduce(
    (sum, item) => sum + ((item.price || 0) * item.quantity),
    0
  );
  const totalPrice = totalItemPrice + DELIVERY_FEE + SERVICE_FEE;
  const remainingForFreeDelivery = Math.max(
    FREE_DELIVERY_THRESHOLD - totalItemPrice,
    0
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Correct navigation to AddNewAddress with query params
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Your cart is empty", "Please add items before proceeding.");
      return;
    }

    if (!user) {
      router.push("/login");
      return;
    }

    const cartParam = encodeURIComponent(JSON.stringify(cartItems));
    router.push(`../map/addnewAddress?cart=${cartParam}&totalPrice=${totalPrice.toFixed(2)}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Your Cart ({totalQuantity})</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.shopButton}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearAll}>Clear All</Text>
          </TouchableOpacity>

          {cartItems.map((item) => (
            <View key={item.id} style={styles.item}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              ) : (
                <View style={[styles.itemImage, { backgroundColor: "#ccc" }]} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>
                  ₹{(item.price || 0).toFixed(2)} × {item.quantity} = ₹
                  {((item.price || 0) * item.quantity).toFixed(2)}
                </Text>
              </View>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => updateQuantity(item.id, -1)}
                >
                  <Text style={styles.qtySymbol}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => updateQuantity(item.id, 1)}
                >
                  <Text style={styles.qtySymbol}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text>Subtotal ({totalQuantity} items)</Text>
              <Text>₹{totalItemPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Delivery Fee</Text>
              <Text>₹{DELIVERY_FEE.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Service Fee</Text>
              <Text>₹{SERVICE_FEE.toFixed(2)}</Text>
            </View>
            {remainingForFreeDelivery > 0 && (
              <Text style={styles.freeDeliveryMsg}>
                Add ₹{remainingForFreeDelivery.toFixed(2)} more for free
                delivery!
              </Text>
            )}
            <View style={styles.summaryRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>₹{totalPrice.toFixed(2)}</Text>
            </View>
          </View>

          {!user ? (
            <View style={styles.loginCard}>
              <Text style={styles.loginCardTitle}>Almost There</Text>
              <Text style={styles.loginCardText}>
                Login/Create Account quickly to place your order.
              </Text>
              <TouchableOpacity
                style={styles.loginProceedButton}
                onPress={handleCheckout}
              >
                <Text style={styles.loginProceedText}>
                  Proceed with Phone Number
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>
                Proceed to Checkout • ₹{totalPrice.toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#222" },
  clearAll: { color: "red", alignSelf: "flex-end", marginBottom: 10, fontSize: 14 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "gray", marginBottom: 15 },
  shopButton: { backgroundColor: "orange", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  shopButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  itemImage: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: 10,
    marginRight: 12,
  },
  itemName: { fontSize: 16, fontWeight: "600", color: "#222" },
  itemPrice: { fontSize: 13, color: "#666", marginTop: 4 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  qtyButton: { paddingVertical: 6, paddingHorizontal: 12 },
  qtySymbol: { fontSize: 18, fontWeight: "600", color: "#444" },
  qtyText: { marginHorizontal: 8, fontSize: 16, fontWeight: "600" },
  delete: { fontSize: 18, color: "red", marginLeft: 8 },
  summary: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
  summaryTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#222" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  freeDeliveryMsg: {
    backgroundColor: "#E8F5E9",
    color: "green",
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    fontSize: 14,
    textAlign: "center",
  },
  totalText: { fontSize: 18, fontWeight: "700", color: "#222" },
  checkoutButton: {
    backgroundColor: "purple",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    marginTop: 10,
    marginBottom: 20,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  loginCard: {
    backgroundColor: "#cba4f722",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    marginTop: 5,
  },
  loginCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  loginCardText: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 10,
  },
  loginProceedButton: {
    backgroundColor: "purple",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  loginProceedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
