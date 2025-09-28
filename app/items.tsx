import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StatusBar,
  Alert,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AuthContext } from "../context/Auth";
import { Ionicons } from "@expo/vector-icons";

export default function Items() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useContext(AuthContext);

  const selectedRestaurantId = useSelector((state: any) => state.restaurant.selectedRestaurantId);
  const restaurants = useSelector((state: any) => state.restaurant.restaurants);

  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"veg" | "non-veg" | null>(null);
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  const [cartTotal, setCartTotal] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const r = restaurants.find((r: any) => r.restaurantId === selectedRestaurantId);
    if (r) setRestaurant(r);
    setLoading(false);
  }, [restaurants, selectedRestaurantId]);

  // Auto-add after login/signup
  useEffect(() => {
    if (user && restaurant && params.itemId) {
      const itemToAdd = restaurant.items.find((i: any) => i.itemId === Number(params.itemId));
      if (itemToAdd) handleAdd(itemToAdd);
    }
  }, [user, restaurant, params.itemId]);

  // Calculate cart total
  useEffect(() => {
    if (!restaurant) return;
    let total = 0;
    Object.keys(cartItems).forEach((id) => {
      const item = restaurant.items.find((i: any) => i.itemId === Number(id));
      if (item) total += item.price * cartItems[Number(id)];
    });
    setCartTotal(total);
  }, [cartItems, restaurant]);

  // Handle keyboard visibility (optional for sticky behavior)
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#1f5f61" />;
  if (!restaurant) return <View style={styles.centered}><Text>No restaurant found!</Text></View>;

  const normalizeFoodType = (foodType?: string) => {
    if (!foodType) return "";
    const t = foodType.toUpperCase();
    if (t === "VEG") return "veg";
    if (t === "NON_VEG" || t === "NON-VEG" || t === "NONVEG") return "non-veg";
    return "";
  };

  const filteredItems = restaurant.items.filter((item: any) => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType ? normalizeFoodType(item.foodType) === filterType : true;
    return matchesSearch && matchesType;
  });

  const handleLoginRedirect = (item: any) => {
    router.push({
      pathname: "/login",
      params: {
        returnTo: "items",
        restaurantId: restaurant.restaurantId,
        itemId: item.itemId,
      },
    });
  };

  const updateCart = async (itemId: number, quantity: number) => {
    if (!user) return;
    try {
      const res = await fetch("http://your-backend-url/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          itemId,
          quantity,   
          

        }),
      });
      const data = await res.json();
      if (!res.ok) Alert.alert("❌ Error", data.message || "Failed to update cart");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleAdd = (item: any) => {
    if (!user) return handleLoginRedirect(item);

    const newQty = (cartItems[item.itemId] || 0) + 1;
    setCartItems({ ...cartItems, [item.itemId]: newQty });
    updateCart(item.itemId, newQty);
  };

  const incrementItem = (item: any) => handleAdd(item);

  const decrementItem = (item: any) => {
    if (!user) return;
    const currentQty = cartItems[item.itemId] || 0;
    if (currentQty <= 0) return;
    const newQty = currentQty - 1;
    setCartItems({ ...cartItems, [item.itemId]: newQty });
    updateCart(item.itemId, newQty);
  };

  const totalItems = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      {/* Header */}
      <View style={styles.blackHeader}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>{restaurant.restaurantName}</Text>
        </View>

        <View style={styles.headerCard}>
          <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text>
          <Text style={styles.deliveryInfo}>
            {restaurant.deliveryTime || "Fast Delivery"} • {restaurant.distance || "Nearby"}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput
            placeholder="Search for dishes"
            style={styles.searchInput}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterRowSticky}>
          <TouchableOpacity
            style={[styles.filterBtn, filterType === "veg" && { backgroundColor: "#c8e6c9" }]}
            onPress={() => setFilterType(filterType === "veg" ? null : "veg")}
          >
            <Ionicons name="leaf" size={14} color="#088F8F" />
            <Text style={styles.filterText}> Veg</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterBtn, filterType === "non-veg" && { backgroundColor: "#ffcdd2" }]}
            onPress={() => setFilterType(filterType === "non-veg" ? null : "non-veg")}
          >
            <Ionicons name="flame" size={14} color="#C62828" />
            <Text style={styles.filterText}> Non-Veg</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.itemId.toString()}
          contentContainerStyle={{ paddingBottom: 120 }}
          ListHeaderComponent={() =>
            filteredItems.length > 0 ? (
              <Text style={styles.sectionHeading}>
                Showing {filteredItems.length} item{filteredItems.length > 1 ? "s" : ""}
              </Text>
            ) : (
              <Text style={[styles.sectionHeading, { color: "red" }]}>No matching items found.</Text>
            )
          }
          renderItem={({ item }: { item: any }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.itemImageUrl || "https://via.placeholder.com/100.png?text=Food" }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.itemName}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>
                  {item.description || ""}
                </Text>

                {user ? (
                  cartItems[item.itemId] > 0 ? (
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                      <TouchableOpacity onPress={() => decrementItem(item)} style={styles.quantityBtn}>
                        <Text style={styles.quantityText}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ marginHorizontal: 10 }}>{cartItems[item.itemId]}</Text>
                      <TouchableOpacity onPress={() => incrementItem(item)} style={styles.quantityBtn}>
                        <Text style={styles.quantityText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item)}>
                      <Text style={styles.addText}>ADD</Text>
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity style={styles.addButton} onPress={() => handleLoginRedirect(item)}>
                    <Text style={styles.addText}>ADD</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />

        {/* View Cart bar */}
        {totalItems > 0 && !keyboardVisible && (
          <TouchableOpacity
            style={styles.viewCartBar}
            onPress={() => router.push("/cart")}
            activeOpacity={0.8}
          >
            <Text style={styles.viewCartText}>
              {totalItems} item{totalItems > 1 ? "s" : ""} • ₹{cartTotal} • View Cart
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },

  blackHeader: {
    backgroundColor: "#000",
    paddingBottom: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topBar: {
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  topBarTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 10 },

  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 5,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  restaurantName: { fontSize: 20, fontWeight: "bold" },
  deliveryInfo: { fontSize: 14, color: "#666", marginTop: 4 },

  content: { flex: 1, paddingHorizontal: 15, backgroundColor: "#fff" },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 15,
  },
  searchInput: { flex: 1, marginHorizontal: 10, color: "#333" },

  filterRowSticky: { flexDirection: "row", marginVertical: 12, alignItems: "center" },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: { fontSize: 14, color: "#333" },

  sectionHeading: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },

  itemContainer: { flexDirection: "row", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#eee" },
  itemImage: { width: 90, height: 90, borderRadius: 10 },
  itemDetails: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemPrice: { color: "#2E7D32", fontWeight: "bold", marginTop: 2 },
  itemDesc: { color: "#666", fontSize: 12, marginTop: 4 },

  addButton: { marginTop: 6, backgroundColor: "#e0f7fa", paddingVertical: 4, paddingHorizontal: 16, borderRadius: 6, alignSelf: "flex-start" },
  addText: { color: "#00796B", fontWeight: "bold" },

  quantityBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e0f7fa",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: { color: "#00796B", fontWeight: "bold", fontSize: 18 },

  viewCartBar: {
    position: "absolute",
    bottom: 10,
    left: 15,
    right: 15,
    backgroundColor: "purple",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  viewCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
    



// import React, { useEffect, useState, useContext } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
//   StatusBar,
//   Alert,
//   Keyboard,
// } from "react-native";
// import { useSelector } from "react-redux";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { AuthContext } from "../context/Auth";
// import { LocationContext } from "../context/locationContent"; // 👈 use location
// import { Ionicons } from "@expo/vector-icons";

// export default function Items() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { user } = useContext(AuthContext);
//   const { location } = useContext(LocationContext); // 👈 get coords

//   const selectedRestaurantId = useSelector((state: any) => state.restaurant.selectedRestaurantId);
//   const restaurants = useSelector((state: any) => state.restaurant.restaurants);

//   const [restaurant, setRestaurant] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState<"veg" | "non-veg" | null>(null);
//   const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
//   const [cartTotal, setCartTotal] = useState(0);
//   const [keyboardVisible, setKeyboardVisible] = useState(false);

//   useEffect(() => {
//     const r = restaurants.find((r: any) => r.restaurantId === selectedRestaurantId);
//     if (r) setRestaurant(r);
//     setLoading(false);
//   }, [restaurants, selectedRestaurantId]);

//   // Auto-add after login/signup
//   useEffect(() => {
//     if (user && restaurant && params.itemId) {
//       const itemToAdd = restaurant.items.find((i: any) => i.itemId === Number(params.itemId));
//       if (itemToAdd) handleAdd(itemToAdd);
//     }
//   }, [user, restaurant, params.itemId]);

//   // Calculate cart total
//   useEffect(() => {
//     if (!restaurant) return;
//     let total = 0;
//     Object.keys(cartItems).forEach((id) => {
//       const item = restaurant.items.find((i: any) => i.itemId === Number(id));
//       if (item) total += item.price * cartItems[Number(id)];
//     });
//     setCartTotal(total);
//   }, [cartItems, restaurant]);

//   // Handle keyboard visibility (optional for sticky behavior)
//   useEffect(() => {
//     const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
//     const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
//     return () => {
//       showSub.remove();
//       hideSub.remove();
//     };
//   }, []);

//   if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#1f5f61" />;
//   if (!restaurant) return <View style={styles.centered}><Text>No restaurant found!</Text></View>;

//   const normalizeFoodType = (foodType?: string) => {
//     if (!foodType) return "";
//     const t = foodType.toUpperCase();
//     if (t === "VEG") return "veg";
//     if (t === "NON_VEG" || t === "NON-VEG" || t === "NONVEG") return "non-veg";
//     return "";
//   };

//   const filteredItems = restaurant.items.filter((item: any) => {
//     const matchesSearch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesType = filterType ? normalizeFoodType(item.foodType) === filterType : true;
//     return matchesSearch && matchesType;
//   });

//   const handleLoginRedirect = (item: any) => {
//     router.push({
//       pathname: "/login",
//       params: {
//         returnTo: "items",
//         restaurantId: restaurant.restaurantId,
//         itemId: item.itemId,
//       },
//     });
//   };

//   // ---------------- API CALLS ----------------
//   const updateCart = async (itemId: number, quantityChange: number) => {
//     if (!user) return;
//     try {
//       const res = await fetch(
//         "http://your-backend-url/customers/carts/items?detailedCart=false",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//           body: JSON.stringify({
//             itemId,
//             quantityChange,
//           }),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) {
//         Alert.alert("❌ Error", data.message || "Failed to update cart");
//         return;
//       }

//       // ✅ Update UI with backend response if detailedCart available
//       if (data.cart && data.cart.items) {
//         const newCart: { [key: number]: number } = {};
//         data.cart.items.forEach((i: any) => {
//           newCart[i.itemId] = i.quantity;
//         });
//         setCartItems(newCart);
//       }
//     } catch (err) {
//       console.log(err);
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   const confirmViewCart = async () => {
//     if (!user) return;
//     if (!location) {
//       Alert.alert("Error", "Please select a delivery location first");
//       return;
//     }
//     try {
//       const res = await fetch(
//         "http://192.168.0.102/customers/carts/items?detailedCart=false",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//           body: JSON.stringify({
//             viewCartRequest: {
//               savedAddressId: location.addressId || 0,
//               latitude: location.lat,
//               longitude: location.lng,
//             },
//           }),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) {
//         Alert.alert("❌ Error", data.message || "Failed to confirm cart");
//         return;
//       }

//       router.push("/cart");
//     } catch (err) {
//       console.log(err);
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   // ---------------- CART HANDLERS ----------------
//   const handleAdd = (item: any) => {
//     if (!user) return handleLoginRedirect(item);
//     const newQty = (cartItems[item.itemId] || 0) + 1;
//     setCartItems({ ...cartItems, [item.itemId]: newQty });
//     updateCart(item.itemId, 1);
//   };

//   const incrementItem = (item: any) => handleAdd(item);

//   const decrementItem = (item: any) => {
//     if (!user) return;
//     const currentQty = cartItems[item.itemId] || 0;
//     if (currentQty <= 0) return;
//     const newQty = currentQty - 1;
//     setCartItems({ ...cartItems, [item.itemId]: newQty });
//     updateCart(item.itemId, -1);
//   };

//   const totalItems = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

//   // ---------------- UI ----------------
//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#000" barStyle="light-content" />

//       {/* Header */}
//       <View style={styles.blackHeader}>
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={() => router.push("/")}>
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.topBarTitle}>{restaurant.restaurantName}</Text>
//         </View>

//         <View style={styles.headerCard}>
//           <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text>
//           <Text style={styles.deliveryInfo}>
//             {restaurant.deliveryTime || "Fast Delivery"} • {restaurant.distance || "Nearby"}
//           </Text>
//         </View>
//       </View>

//       {/* Content */}
//       <View style={styles.content}>
//         <View style={styles.searchContainer}>
//           <Ionicons name="search" size={20} color="#aaa" />
//           <TextInput
//             placeholder="Search for dishes"
//             style={styles.searchInput}
//             placeholderTextColor="#999"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//         </View>

//         <View style={styles.filterRowSticky}>
//           <TouchableOpacity
//             style={[styles.filterBtn, filterType === "veg" && { backgroundColor: "#c8e6c9" }]}
//             onPress={() => setFilterType(filterType === "veg" ? null : "veg")}
//           >
//             <Ionicons name="leaf" size={14} color="#088F8F" />
//             <Text style={styles.filterText}> Veg</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.filterBtn, filterType === "non-veg" && { backgroundColor: "#ffcdd2" }]}
//             onPress={() => setFilterType(filterType === "non-veg" ? null : "non-veg")}
//           >
//             <Ionicons name="flame" size={14} color="#C62828" />
//             <Text style={styles.filterText}> Non-Veg</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={filteredItems}
//           keyExtractor={(item) => item.itemId.toString()}
//           contentContainerStyle={{ paddingBottom: 120 }}
//           ListHeaderComponent={() =>
//             filteredItems.length > 0 ? (
//               <Text style={styles.sectionHeading}>
//                 Showing {filteredItems.length} item{filteredItems.length > 1 ? "s" : ""}
//               </Text>
//             ) : (
//               <Text style={[styles.sectionHeading, { color: "red" }]}>No matching items found.</Text>
//             )
//           }
//           renderItem={({ item }: { item: any }) => (
//             <View style={styles.itemContainer}>
//               <Image
//                 source={{ uri: item.itemImageUrl || "https://via.placeholder.com/100.png?text=Food" }}
//                 style={styles.itemImage}
//               />
//               <View style={styles.itemDetails}>
//                 <Text style={styles.itemName}>{item.itemName}</Text>
//                 <Text style={styles.itemPrice}>₹{item.price}</Text>
//                 <Text style={styles.itemDesc} numberOfLines={2}>
//                   {item.description || ""}
//                 </Text>

//                 {user ? (
//                   cartItems[item.itemId] > 0 ? (
//                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
//                       <TouchableOpacity onPress={() => decrementItem(item)} style={styles.quantityBtn}>
//                         <Text style={styles.quantityText}>-</Text>
//                       </TouchableOpacity>
//                       <Text style={{ marginHorizontal: 10 }}>{cartItems[item.itemId]}</Text>
//                       <TouchableOpacity onPress={() => incrementItem(item)} style={styles.quantityBtn}>
//                         <Text style={styles.quantityText}>+</Text>
//                       </TouchableOpacity>
//                     </View>
//                   ) : (
//                     <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item)}>
//                       <Text style={styles.addText}>ADD</Text>
//                     </TouchableOpacity>
//                   )
//                 ) : (
//                   <TouchableOpacity style={styles.addButton} onPress={() => handleLoginRedirect(item)}>
//                     <Text style={styles.addText}>ADD</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//           )}
//         />

//         {/* View Cart bar */}
//         {totalItems > 0 && !keyboardVisible && (
//           <TouchableOpacity
//             style={styles.viewCartBar}
//             onPress={confirmViewCart}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.viewCartText}>
//               {totalItems} item{totalItems > 1 ? "s" : ""} • ₹{cartTotal} • View Cart
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
//   blackHeader: {
//     backgroundColor: "#000",
//     paddingBottom: 60,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   topBar: {
//     paddingTop: 40,
//     paddingBottom: 12,
//     paddingHorizontal: 15,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   topBarTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
//   headerCard: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     elevation: 5,
//     padding: 20,
//     marginHorizontal: 15,
//     marginTop: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   restaurantName: { fontSize: 20, fontWeight: "bold" },
//   deliveryInfo: { fontSize: 14, color: "#666", marginTop: 4 },
//   content: { flex: 1, paddingHorizontal: 15, backgroundColor: "#fff" },
//   searchContainer: {
//     flexDirection: "row",
//     backgroundColor: "#f1f1f1",
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     alignItems: "center",
//     marginTop: 15,
//   },
//   searchInput: { flex: 1, marginHorizontal: 10, color: "#333" },
//   filterRowSticky: { flexDirection: "row", marginVertical: 12, alignItems: "center" },
//   filterBtn: {
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     backgroundColor: "#eee",
//     borderRadius: 20,
//     marginRight: 10,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   filterText: { fontSize: 14, color: "#333" },
//   sectionHeading: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
//   itemContainer: { flexDirection: "row", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#eee" },
//   itemImage: { width: 90, height: 90, borderRadius: 10 },
//   itemDetails: { flex: 1, marginLeft: 15 },
//   itemName: { fontSize: 16, fontWeight: "bold" },
//   itemPrice: { color: "#2E7D32", fontWeight: "bold", marginTop: 2 },
//   itemDesc: { color: "#666", fontSize: 12, marginTop: 4 },
//   addButton: { marginTop: 6, backgroundColor: "#e0f7fa", paddingVertical: 4, paddingHorizontal: 16, borderRadius: 6, alignSelf: "flex-start" },
//   addText: { color: "#00796B", fontWeight: "bold" },
//   quantityBtn: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#e0f7fa",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   quantityText: { color: "#00796B", fontWeight: "bold", fontSize: 18 },
//   viewCartBar: {
//     position: "absolute",
//     bottom: 10,
//     left: 15,
//     right: 15,
//     backgroundColor: "purple",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   viewCartText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });
