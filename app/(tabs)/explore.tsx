// // import React, { useState, useContext } from "react";
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   StyleSheet,
// //   Image,
// //   TextInput,
// //   TouchableOpacity,
// //   Alert,
// //   StatusBar,
// // } from "react-native";
// // import { useLocalSearchParams, useRouter } from "expo-router";
// // import { Ionicons } from "@expo/vector-icons";
// // import { AuthContext } from "@/context/Auth";
// // import { useSelector } from "react-redux";

// // type MenuItem = {
// //   itemId: number;
// //   itemName: string;
// //   description?: string;
// //   price: number;
// //   foodType?: string;
// //   itemStatus?: string;
// //   itemImageUrl?: string;
// //   preparationTimeInMin?: number;
// // };

// // type Restaurant = {
// //   restaurantId: number;
// //   restaurantName: string;
// //   deliveryTime?: string | null;
// //   distance?: string | null;
// //   restaurantImageUrl?: string | null;
// //   items: MenuItem[];
// // };

// // export default function Explore() {
// //   const { restaurantData } = useLocalSearchParams<{ restaurantData?: string }>();
// //   const router = useRouter();
// //   const { user } = useContext(AuthContext);

// //   const restaurants: Restaurant[] = useSelector(
// //     (state: any) => state.restaurant.restaurants
// //   );

// //   // ✅ Hooks always first (fix hook order error)
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [filterType, setFilterType] = useState<"veg" | "non-veg" | null>(null);

// //   // Parse restaurant from params
// //   let restaurant: Restaurant | null = null;
// //   if (restaurantData) {
// //     try {
// //       restaurant = JSON.parse(restaurantData);
// //     } catch (err) {
// //       console.warn("❌ Invalid restaurantData param:", err);
// //     }
// //   }

// //   // ✅ Safe conditional rendering AFTER hooks
// //   if (!restaurant) {
// //     return (
// //       <View style={styles.container}>
// //         <Text>No restaurant data found!</Text>
// //       </View>
// //     );
// //   }

// //   const normalizeFoodType = (foodType?: string) => {
// //     if (!foodType) return "";
// //     const t = foodType.toUpperCase();
// //     if (t === "VEG") return "veg";
// //     if (t === "NON_VEG" || t === "NON-VEG" || t === "NONVEG") return "non-veg";
// //     return "";
// //   };

// //   const filteredItems = restaurant.items.filter((item) => {
// //     const matchSearch = item.itemName
// //       .toLowerCase()
// //       .includes(searchQuery.toLowerCase());
// //     const normalized = normalizeFoodType(item.foodType);
// //     const matchType = filterType === null ? true : normalized === filterType;
// //     return matchSearch && matchType;
// //   });

// //   const handleAdd = async (item: MenuItem) => {
// //     if (!user) {
// //       router.push("/login");
// //       return;
// //     }
// //     try {
// //       const res = await fetch("http://your-backend-url/api/cart", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${user.token}`,
// //         },
// //         body: JSON.stringify({
// //           customerId: user.customerId,
// //           restaurantId: restaurant?.restaurantId,
// //           itemId: item.itemId,
// //           quantity: 1,
// //         }),
// //       });

// //       const data = await res.json();
// //       if (res.ok) {
// //         Alert.alert("✅ Success", `${item.itemName} added to cart!`);
// //         router.push("/cart");
// //       } else {
// //         Alert.alert("❌ Error", data.message || "Failed to add item");
// //       }
// //     } catch (error) {
// //       console.error("❌ Add to cart error:", error);
// //       Alert.alert("Error", "Something went wrong");
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {/* ✅ StatusBar black only for this screen */}
// //       <StatusBar backgroundColor="#000" barStyle="light-content" />

// //       {/* Black Header */}
// //       <View style={styles.blackHeader}>
// //         <View style={styles.topBar}>
// //           <TouchableOpacity onPress={() => router.back()}>
// //             <Ionicons name="arrow-back" size={22} color="#fff" />
// //           </TouchableOpacity>
// //           <Text style={styles.topBarTitle}>{restaurant.restaurantName}</Text>
// //         </View>

// //         {/* Floating Card */}
// //         <View style={styles.headerCard}>
// //           <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text>
// //           <Text style={styles.deliveryInfo}>
// //             {restaurant.deliveryTime || "Fast Delivery"} •{" "}
// //             {restaurant.distance || "Nearby"}
// //           </Text>
// //         </View>
// //       </View>

// //       {/* Content */}
// //       <View style={styles.content}>
// //         {/* Search Bar */}
// //         <View style={styles.searchContainer}>
// //           <Ionicons name="search" size={20} color="#aaa" />
// //           <TextInput
// //             placeholder="Search for dishes"
// //             style={styles.searchInput}
// //             placeholderTextColor="#999"
// //             value={searchQuery}
// //             onChangeText={setSearchQuery}
// //           />
// //         </View>

// //         {/* Filter Row */}
// //         <View style={styles.filterRowSticky}>
// //           <TouchableOpacity
// //             style={[
// //               styles.filterBtn,
// //               filterType === "veg" && { backgroundColor: "#c8e6c9" },
// //             ]}
// //             onPress={() => setFilterType(filterType === "veg" ? null : "veg")}
// //           >
// //             <Ionicons name="leaf" size={14} color="#088F8F" />
// //             <Text style={styles.filterText}> Veg</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[
// //               styles.filterBtn,
// //               filterType === "non-veg" && { backgroundColor: "#ffcdd2" },
// //             ]}
// //             onPress={() =>
// //               setFilterType(filterType === "non-veg" ? null : "non-veg")
// //             }
// //           >
// //             <Ionicons name="flame" size={14} color="#C62828" />
// //             <Text style={styles.filterText}> Non-Veg</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Menu List */}
// //         <FlatList
// //           data={filteredItems}
// //           keyExtractor={(item) => item.itemId.toString()}
// //           contentContainerStyle={{ paddingBottom: 100 }} // ✅ Prevent last item cut-off
// //           ListHeaderComponent={() =>
// //             filteredItems.length > 0 ? (
// //               <Text style={styles.sectionHeading}>
// //                 Showing {filteredItems.length} item
// //                 {filteredItems.length > 1 ? "s" : ""}
// //               </Text>
// //             ) : (
// //               <Text style={[styles.sectionHeading, { color: "red" }]}>
// //                 No matching items found.
// //               </Text>
// //             )
// //           }
// //           renderItem={({ item }) => (
// //             <View style={styles.itemContainer}>
// //               <Image
// //                 source={{
// //                   uri:
// //                     item.itemImageUrl ||
// //                     "https://via.placeholder.com/100.png?text=Food",
// //                 }}
// //                 style={styles.itemImage}
// //               />
// //               <View style={styles.itemDetails}>
// //                 <Text style={styles.itemName}>{item.itemName}</Text>
// //                 <Text style={styles.itemPrice}>₹{item.price}</Text>
// //                 <Text style={styles.itemDesc} numberOfLines={2}>
// //                   {item.description || ""}
// //                 </Text>
// //                 <TouchableOpacity
// //                   style={styles.addButton}
// //                   onPress={() => handleAdd(item)}
// //                 >
// //                   <Text style={styles.addText}>ADD</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>
// //           )}
// //         />
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: "#fff" },

// //   blackHeader: {
// //     backgroundColor: "#000",
// //     paddingBottom: 60,
// //     borderBottomLeftRadius: 20,
// //     borderBottomRightRadius: 20,
// //   },
// //   topBar: {
// //     paddingTop: 40,
// //     paddingBottom: 12,
// //     paddingHorizontal: 15,
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   topBarTitle: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     marginLeft: 10,
// //   },

// //   headerCard: {
// //     backgroundColor: "#fff",
// //     borderRadius: 12,
// //     elevation: 5,
// //     padding: 20,
// //     marginHorizontal: 15,
// //     marginTop: 10,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.2,
// //     shadowRadius: 6,
// //     shadowOffset: { width: 0, height: 3 },
// //   },
// //   restaurantName: { fontSize: 20, fontWeight: "bold" },
// //   deliveryInfo: { fontSize: 14, color: "#666", marginTop: 4 },

// //   content: { flex: 1, paddingHorizontal: 15, backgroundColor: "#fff" },

// //   searchContainer: {
// //     flexDirection: "row",
// //     backgroundColor: "#f1f1f1",
// //     borderRadius: 10,
// //     paddingHorizontal: 12,
// //     paddingVertical: 8,
// //     alignItems: "center",
// //     marginTop: 15,
// //   },
// //   searchInput: { flex: 1, marginHorizontal: 10, color: "#333" },

// //   filterRowSticky: {
// //     flexDirection: "row",
// //     marginVertical: 12,
// //     alignItems: "center",
// //   },
// //   filterBtn: {
// //     paddingVertical: 6,
// //     paddingHorizontal: 14,
// //     backgroundColor: "#eee",
// //     borderRadius: 20,
// //     marginRight: 10,
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   filterText: { fontSize: 14, color: "#333" },

// //   sectionHeading: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },

// //   itemContainer: {
// //     flexDirection: "row",
// //     paddingVertical: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#eee",
// //   },
// //   itemImage: { width: 90, height: 90, borderRadius: 10 },
// //   itemDetails: { flex: 1, marginLeft: 15 },
// //   itemName: { fontSize: 16, fontWeight: "bold" },
// //   itemPrice: { color: "#2E7D32", fontWeight: "bold", marginTop: 2 },
// //   itemDesc: { color: "#666", fontSize: 12, marginTop: 4 },

// //   addButton: {
// //     marginTop: 6,
// //     backgroundColor: "#e0f7fa",
// //     paddingVertical: 4,
// //     paddingHorizontal: 16,
// //     borderRadius: 6,
// //     alignSelf: "flex-start",
// //   },
// //   addText: { color: "#00796B", fontWeight: "bold" },
// // });

// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StatusBar,
//   ActivityIndicator,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
// import { AuthContext } from "@/context/Auth";

// type MenuItem = {
//   itemId: number;
//   itemName: string;
//   description?: string;
//   price: number;
//   foodType?: string;
//   itemStatus?: string;
//   itemImageUrl?: string;
//   preparationTimeInMin?: number;
// };

// type Restaurant = {
//   restaurantId: number;
//   restaurantName: string;
//   deliveryTime?: string;
//   distance?: string;
//   restaurantImageUrl?: string;
//   items: MenuItem[];
// };

// export default function Explore() {
//   const { restaurantId } = useLocalSearchParams<{ restaurantId?: string }>();
//   const router = useRouter();
//   const { user } = useContext(AuthContext);

//   const restaurants: Restaurant[] = useSelector(
//     (state: any) => state.restaurant.restaurants
//   );

//   const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState<"veg" | "non-veg" | null>(null);

//   // Fetch restaurant from Redux or fallback to API
//   useEffect(() => {
//     if (!restaurantId) return;

//     // Try to find in Redux first
//     const fromRedux = restaurants.find(
//       (r) => r.restaurantId.toString() === restaurantId
//     );
//     if (fromRedux) {
//       setRestaurant(fromRedux);
//       return;
//     }

//     // Fallback API fetch
//     setLoading(true);
//     fetch(`http://your-backend-url/restaurants/${restaurantId}`)
//       .then((res) => res.json())
//       .then((data: Restaurant) => setRestaurant(data))
//       .catch((err) => {
//         console.error("Error fetching restaurant:", err);
//         Alert.alert("Error", "Restaurant not found");
//       })
//       .finally(() => setLoading(false));
//   }, [restaurantId, restaurants]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#1f5f61" />
//       </View>
//     );
//   }

//   if (!restaurant) {
//     return (
//       <View style={styles.centered}>
//         <Text>No restaurant data found!</Text>
//       </View>
//     );
//   }

//   const normalizeFoodType = (foodType?: string) => {
//     if (!foodType) return "";
//     const t = foodType.toUpperCase();
//     if (t === "VEG") return "veg";
//     if (t === "NON_VEG" || t === "NON-VEG" || t === "NONVEG") return "non-veg";
//     return "";
//   };

//   const filteredItems = restaurant.items.filter((item) => {
//     const matchSearch = item.itemName
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const normalized = normalizeFoodType(item.foodType);
//     const matchType = filterType === null ? true : normalized === filterType;
//     return matchSearch && matchType;
//   });

//   const handleAdd = async (item: MenuItem) => {
//     if (!user) {
//       router.push("/login");
//       return;
//     }

//     try {
//       const res = await fetch("http://your-backend-url/api/cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           customerId: user.customerId,
//           restaurantId: restaurant.restaurantId,
//           itemId: item.itemId,
//           quantity: 1,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         Alert.alert("✅ Success", `${item.itemName} added to cart!`);
//         router.push("/cart");
//       } else {
//         Alert.alert("❌ Error", data.message || "Failed to add item");
//       }
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#000" barStyle="light-content" />

//       {/* Header */}
//       <View style={styles.blackHeader}>
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.topBarTitle}>{restaurant.restaurantName}</Text>
//         </View>

//         <View style={styles.headerCard}>
//           <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text>
//           <Text style={styles.deliveryInfo}>
//             {restaurant.deliveryTime || "Fast Delivery"} •{" "}
//             {restaurant.distance || "Nearby"}
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
//             style={[
//               styles.filterBtn,
//               filterType === "veg" && { backgroundColor: "#c8e6c9" },
//             ]}
//             onPress={() => setFilterType(filterType === "veg" ? null : "veg")}
//           >
//             <Ionicons name="leaf" size={14} color="#088F8F" />
//             <Text style={styles.filterText}> Veg</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.filterBtn,
//               filterType === "non-veg" && { backgroundColor: "#ffcdd2" },
//             ]}
//             onPress={() =>
//               setFilterType(filterType === "non-veg" ? null : "non-veg")
//             }
//           >
//             <Ionicons name="flame" size={14} color="#C62828" />
//             <Text style={styles.filterText}> Non-Veg</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={filteredItems}
//           keyExtractor={(item) => item.itemId.toString()}
//           contentContainerStyle={{ paddingBottom: 100 }}
//           ListHeaderComponent={() =>
//             filteredItems.length > 0 ? (
//               <Text style={styles.sectionHeading}>
//                 Showing {filteredItems.length} item
//                 {filteredItems.length > 1 ? "s" : ""}
//               </Text>
//             ) : (
//               <Text style={[styles.sectionHeading, { color: "red" }]}>
//                 No matching items found.
//               </Text>
//             )
//           }
//           renderItem={({ item }: { item: MenuItem }) => (
//             <View style={styles.itemContainer}>
//               <Image
//                 source={{
//                   uri:
//                     item.itemImageUrl ||
//                     "https://via.placeholder.com/100.png?text=Food",
//                 }}
//                 style={styles.itemImage}
//               />
//               <View style={styles.itemDetails}>
//                 <Text style={styles.itemName}>{item.itemName}</Text>
//                 <Text style={styles.itemPrice}>₹{item.price}</Text>
//                 <Text style={styles.itemDesc} numberOfLines={2}>
//                   {item.description || ""}
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.addButton}
//                   onPress={() => handleAdd(item)}
//                 >
//                   <Text style={styles.addText}>ADD</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
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

//   filterRowSticky: {
//     flexDirection: "row",
//     marginVertical: 12,
//     alignItems: "center",
//   },
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

//   itemContainer: {
//     flexDirection: "row",
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   itemImage: { width: 90, height: 90, borderRadius: 10 },
//   itemDetails: { flex: 1, marginLeft: 15 },
//   itemName: { fontSize: 16, fontWeight: "bold" },
//   itemPrice: { color: "#2E7D32", fontWeight: "bold", marginTop: 2 },
//   itemDesc: { color: "#666", fontSize: 12, marginTop: 4 },

//   addButton: {
//     marginTop: 6,
//     backgroundColor: "#e0f7fa",
//     paddingVertical: 4,
//     paddingHorizontal: 16,
//     borderRadius: 6,
//     alignSelf: "flex-start",
//   },
//   addText: { color: "#00796B", fontWeight: "bold" },
// });


// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StatusBar,
//   ActivityIndicator,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
// import { AuthContext } from "@/context/Auth";

// type MenuItem = {
//   itemId: number;
//   itemName: string;
//   description?: string;
//   price: number;
//   foodType?: string;
//   itemStatus?: string;
//   itemImageUrl?: string;
//   preparationTimeInMin?: number;
// };

// type Restaurant = {
//   restaurantId: number;
//   restaurantName: string;
//   deliveryTime?: string;
//   distance?: string;
//   restaurantImageUrl?: string;
//   items: MenuItem[];
// };

// export default function Explore() {
//   const { restaurantId } = useLocalSearchParams<{ restaurantId?: string }>();
//   const router = useRouter();
//   const { user } = useContext(AuthContext);

//   const restaurants: Restaurant[] = useSelector(
//     (state: any) => state.restaurant.restaurants
//   );

//   const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState<"veg" | "non-veg" | null>(null);

//   // ----------------- Debug console -----------------
//   useEffect(() => {
//     console.log("🚀 Explore page loaded");
//     console.log("restaurantId param:", restaurantId);
//     console.log("restaurants in Redux on load:", restaurants);
//   }, [restaurants, restaurantId]);

//   // Fetch restaurant from Redux or fallback API
//   useEffect(() => {
//     if (!restaurantId) return;

//     // Try to find in Redux first
//     const fromRedux = restaurants.find(
//       (r) => r.restaurantId.toString() === restaurantId
//     );

//     console.log("Trying to find restaurant in Redux:", fromRedux);

//     if (fromRedux) {
//       setRestaurant(fromRedux);
//       return;
//     }

//     // Fallback API fetch
//     console.log("Redux empty or restaurant not found, fetching from API...");
//     setLoading(true);
//     fetch(`http://your-backend-url/restaurants/${restaurantId}`)
//       .then((res) => res.json())
//       .then((data: Restaurant) => {
//         console.log("Fetched restaurant from API:", data);
//         setRestaurant(data);
//       })
//       .catch((err) => {
//         console.error("Error fetching restaurant:", err);
//         Alert.alert("Error", "Restaurant not found");
//       })
//       .finally(() => setLoading(false));
//   }, [restaurantId, restaurants]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#1f5f61" />
//       </View>
//     );
//   }

//   if (!restaurant) {
//     console.log("❌ No restaurant found to display");
//     return (
//       <View style={styles.centered}>
//         <Text>No restaurant data found!</Text>
//       </View>
//     );
//   }

//   const normalizeFoodType = (foodType?: string) => {
//     if (!foodType) return "";
//     const t = foodType.toUpperCase();
//     if (t === "VEG") return "veg";
//     if (t === "NON_VEG" || t === "NON-VEG" || t === "NONVEG") return "non-veg";
//     return "";
//   };

//   const filteredItems = restaurant.items.filter((item) => {
//     const matchSearch = item.itemName
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const normalized = normalizeFoodType(item.foodType);
//     const matchType = filterType === null ? true : normalized === filterType;
//     return matchSearch && matchType;
//   });

//   const handleAdd = async (item: MenuItem) => {
//     if (!user) {
//       router.push("/login");
//       return;
//     }
//     try {
//       const res = await fetch("http://your-backend-url/api/cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           customerId: user.customerId,
//           restaurantId: restaurant.restaurantId,
//           itemId: item.itemId,
//           quantity: 1,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Alert.alert("✅ Success", `${item.itemName} added to cart!`);
//         router.push("/cart");
//       } else {
//         Alert.alert("❌ Error", data.message || "Failed to add item");
//       }
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#000" barStyle="light-content" />

//       {/* Header */}
//       <View style={styles.blackHeader}>
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.topBarTitle}>{restaurant.restaurantName}</Text>
//         </View>

//         <View style={styles.headerCard}>
//           <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text>
//           <Text style={styles.deliveryInfo}>
//             {restaurant.deliveryTime || "Fast Delivery"} •{" "}
//             {restaurant.distance || "Nearby"}
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
//             style={[
//               styles.filterBtn,
//               filterType === "veg" && { backgroundColor: "#c8e6c9" },
//             ]}
//             onPress={() => setFilterType(filterType === "veg" ? null : "veg")}
//           >
//             <Ionicons name="leaf" size={14} color="#088F8F" />
//             <Text style={styles.filterText}> Veg</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.filterBtn,
//               filterType === "non-veg" && { backgroundColor: "#ffcdd2" },
//             ]}
//             onPress={() =>
//               setFilterType(filterType === "non-veg" ? null : "non-veg")
//             }
//           >
//             <Ionicons name="flame" size={14} color="#C62828" />
//             <Text style={styles.filterText}> Non-Veg</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={filteredItems}
//           keyExtractor={(item) => item.itemId.toString()}
//           contentContainerStyle={{ paddingBottom: 100 }}
//           ListHeaderComponent={() =>
//             filteredItems.length > 0 ? (
//               <Text style={styles.sectionHeading}>
//                 Showing {filteredItems.length} item
//                 {filteredItems.length > 1 ? "s" : ""}
//               </Text>
//             ) : (
//               <Text style={[styles.sectionHeading, { color: "red" }]}>
//                 No matching items found.
//               </Text>
//             )
//           }
//           renderItem={({ item }: { item: MenuItem }) => (
//             <View style={styles.itemContainer}>
//               <Image
//                 source={{
//                   uri:
//                     item.itemImageUrl ||
//                     "https://via.placeholder.com/100.png?text=Food",
//                 }}
//                 style={styles.itemImage}
//               />
//               <View style={styles.itemDetails}>
//                 <Text style={styles.itemName}>{item.itemName}</Text>
//                 <Text style={styles.itemPrice}>₹{item.price}</Text>
//                 <Text style={styles.itemDesc} numberOfLines={2}>
//                   {item.description || ""}
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.addButton}
//                   onPress={() => handleAdd(item)}
//                 >
//                   <Text style={styles.addText}>ADD</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
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

//   filterRowSticky: {
//     flexDirection: "row",
//     marginVertical: 12,
//     alignItems: "center",
//   },
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

//   itemContainer: {
//     flexDirection: "row",
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   itemImage: { width: 90, height: 90, borderRadius: 10 },
//   itemDetails: { flex: 1, marginLeft: 15 },
//   itemName: { fontSize: 16, fontWeight: "bold" },
//   itemPrice: { color: "#2E7D32", fontWeight: "bold", marginTop: 2 },
//   itemDesc: { color: "#666", fontSize: 12, marginTop: 4 },

//   addButton: {
//     marginTop: 6,
//     backgroundColor: "#e0f7fa",
//     paddingVertical: 4,
//     paddingHorizontal: 16,
//     borderRadius: 6,
//     alignSelf: "flex-start",
//   },
//   addText: { color: "#00796B", fontWeight: "bold" },
// });
