// import React, { useState, useContext } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { LocationContext } from "@/context/locationContent";
// import { useRouter } from "expo-router";   // 👈 add router

// export default function CartPage() {
//   const { location, addLocation, recentLocations } = useContext(LocationContext);
//   const [isAddressExpanded, setIsAddressExpanded] = useState(false);
//   const router = useRouter();  // 👈 initialize router

//   // Cart items
//   const cartItems = [
//     { id: "1", name: "Paneer Butter Masala", price: 250, quantity: 2, image: "https://via.placeholder.com/80" },
//     { id: "2", name: "Veg Biryani", price: 80, quantity: 1, image: "https://via.placeholder.com/80" },
//   ];

//   const cartSummary = {
//     itemTotal: 580,
//     taxes: { restaurantGst: 29, gstOnPlatformFee: 7 },
//     deliveryFee: 50,
//     platformFee: 10,
//   };

//   const totalPrice =
//     cartSummary.itemTotal +
//     cartSummary.taxes.restaurantGst +
//     cartSummary.taxes.gstOnPlatformFee +
//     cartSummary.deliveryFee +
//     cartSummary.platformFee;

//   // Filter only saved addresses
//   const savedAddresses = recentLocations.filter(loc => loc.saved);

//   // Handle selecting saved address
//   const handleSelectAddress = (addr: typeof location) => {
//     if (!addr) return;
//     addLocation({ ...addr, saved: true });
//     setIsAddressExpanded(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top Selected Address */}
//       <View style={styles.topAddress}>
//         <Text style={{ fontSize: 14, fontWeight: "600" }}>
//           {location?.saved ? location.address : "No saved address selected"}
//         </Text>
//       </View>

//       <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
//         {/* Address Section */}
//         <View style={styles.addressSection}>
//           <TouchableOpacity
//             style={styles.addressDropdown}
//             onPress={() => setIsAddressExpanded(prev => !prev)}
//           >
//             <Text style={styles.selectedAddressText}>
//               {location?.saved ? location.address : "Select Address"}
//             </Text>
//             <Ionicons
//               name={isAddressExpanded ? "chevron-up" : "chevron-down"}
//               size={20}
//               color="#555"
//             />
//           </TouchableOpacity>

//           {isAddressExpanded && (
//             <View style={styles.addressList}>
//               {/* Saved Addresses Only */}
//               {savedAddresses.map((addr, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[styles.addressCard, location?.address === addr.address && styles.selectedCard]}
//                   onPress={() => handleSelectAddress(addr)}
//                 >
//                   <Text style={styles.addressLabel}>{addr.label || "Saved"}</Text>
//                   <Text style={styles.addressText}>{addr.address}</Text>
//                 </TouchableOpacity>
//               ))}

//               {/* Add New Address Button (Reuse usedetect flow) */}
//               <TouchableOpacity
//                 style={styles.addAddressCard}
//                 onPress={() =>
//                   router.push({
//                     pathname: "../map/usedetect",
//                     params: { mode: "saved" }, // 👈 you already handle this
//                   })
//                 }
//               >
//                 <Ionicons name="add-outline" size={22} color="purple" />
//                 <Text style={styles.addAddressText}>Add New Address</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* Cart Items */}
//         <View style={styles.cartSection}>
//           <Text style={styles.sectionTitle}>Items</Text>
//           {cartItems.map(item => (
//             <View key={item.id} style={styles.itemCard}>
//               <Image source={{ uri: item.image }} style={styles.itemImage} />
//               <View style={{ flex: 1, marginLeft: 12 }}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text style={styles.itemPrice}>
//                   ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Cart Summary */}
//         <View style={styles.summary}>
//           <Text style={styles.summaryTitle}>Price Details</Text>
//           <View style={styles.summaryRow}><Text>Item Total</Text><Text>₹{cartSummary.itemTotal}</Text></View>
//           <View style={styles.summaryRow}><Text>Restaurant GST</Text><Text>₹{cartSummary.taxes.restaurantGst}</Text></View>
//           <View style={styles.summaryRow}><Text>GST on Platform Fee</Text><Text>₹{cartSummary.taxes.gstOnPlatformFee}</Text></View>
//           <View style={styles.summaryRow}><Text>Delivery Fee</Text><Text>₹{cartSummary.deliveryFee}</Text></View>
//           <View style={styles.summaryRow}><Text>Platform Fee</Text><Text>₹{cartSummary.platformFee}</Text></View>
//           <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: "#eee", marginTop: 8, paddingTop: 8 }]}>
//             <Text style={styles.totalText}>Total</Text>
//             <Text style={styles.totalText}>₹{totalPrice}</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Bottom Button */}
//       <View style={{ position: "absolute", bottom: 15, left: 15, right: 15 }}>
//         {location?.saved ? (
//           <TouchableOpacity style={styles.checkoutButton}>
//             <Text style={styles.checkoutText}>Proceed to Checkout • ₹{totalPrice}</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={[styles.checkoutButton, { backgroundColor: "#fff", borderWidth: 1, borderColor: "pruple" }]}
//             onPress={() =>
//               router.push({
//                 pathname: "../map/usedetect",
//                 params: { mode: "saved" }, // 👈 same as above
//               })
//             }
//           >
//             <Text style={[styles.checkoutText, { color: "purple" }]}>+ Add New Address</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f8f8f8" },
//   topAddress: { padding: 15, backgroundColor: "#fff" },
//   addressSection: { paddingHorizontal: 15, marginBottom: 20 },
//   sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
//   addressDropdown: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#ccc" },
//   selectedAddressText: { fontSize: 14, color: "#555" },
//   addressList: { marginTop: 10 },
//   addressCard: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: "#eee" },
//   selectedCard: { borderColor: "#4323cfff", borderWidth: 2 },
//   addressLabel: { fontSize: 12, fontWeight: "700", color: "#444" },
//   addressText: { fontSize: 14, color: "#555" },
//   addAddressCard: { backgroundColor: "#fff", padding: 12, borderRadius: 10, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#1d1006ff" },
//   addAddressText: { fontWeight: "700", color: "#3c0ca2ff" },
//   addNewForm: { marginBottom: 10 },
//   input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: "#fff" },
//   saveAddressBtn: { backgroundColor: "#0e080909", padding: 12, borderRadius: 8, alignItems: "center" },
//   saveAddressText: { color: "#fff", fontWeight: "700" },
//   cartSection: { paddingHorizontal: 15, marginBottom: 20 },
//   itemCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10 },
//   itemImage: { width: 80, height: 80, borderRadius: 10 },
//   itemName: { fontSize: 16, fontWeight: "600", color: "#222" },
//   itemPrice: { fontSize: 14, color: "#666", marginTop: 4 },
  
//   // Summary
//   summary: {
//     backgroundColor: "#fff",
//     padding: 15,
//     marginHorizontal: 15,
//     borderRadius: 10,
//     marginBottom: 150,
//   },
//   summaryTitle: { fontWeight: "700", fontSize: 16, marginBottom: 10 },
//   summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
//   totalText: { fontWeight: "700", fontSize: 16, color: "#222" },

//   // Checkout button
//   checkoutButton: {
//     backgroundColor: "purple",
//     paddingVertical: 16,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingBottom:100
//   },
//   checkoutText: { color: "#fff", fontWeight: "700", fontSize: 16 },
// });dont remove

// import React, { useState, useContext } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { LocationContext } from "@/context/locationContent";
// import { useRouter } from "expo-router";
// import { useSelector } from "react-redux";

// export default function CartPage() {
//   const { location } = useContext(LocationContext); // ❌ don’t update context anymore
//   const [isAddressExpanded, setIsAddressExpanded] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(location); // ✅ local state for cart
//   const router = useRouter();

//   // ✅ Get saved addresses from Redux
//   const savedAddresses = useSelector(
//     (state: any) => state.location.savedAddresses || []
//   );

//   // ✅ Filter: remaining saved addresses except the selected one
//   const remainingSavedAddresses = selectedAddress?.saved
//     ? savedAddresses.filter(
//         (addr: any) => addr.addressId !== selectedAddress?.addressId
//       )
//     : [];

//   // Cart items (dummy)
//   const cartItems = [
//     { id: "1", name: "Paneer Butter Masala", price: 250, quantity: 2, image: "https://via.placeholder.com/80" },
//     { id: "2", name: "Veg Biryani", price: 80, quantity: 1, image: "https://via.placeholder.com/80" },
//   ];

//   const cartSummary = {
//     itemTotal: 580,
//     taxes: { restaurantGst: 29, gstOnPlatformFee: 7 },
//     deliveryFee: 50,
//     platformFee: 10,
//   };

//   const totalPrice =
//     cartSummary.itemTotal +
//     cartSummary.taxes.restaurantGst +
//     cartSummary.taxes.gstOnPlatformFee +
//     cartSummary.deliveryFee +
//     cartSummary.platformFee;

//   // ✅ Handle selecting saved address (local only, not context)
//   const handleSelectAddress = (addr: any) => {
//     if (!addr) return;
//     setSelectedAddress({
//       lat: addr.latitude,
//       lng: addr.longitude,
//       address: addr.fullAddress,
//       saved: true,
//       addressId: addr.addressId,
//     });
//     setIsAddressExpanded(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top Selected Address (only if user came from saved) */}
//       {selectedAddress?.saved && (
//         <View style={styles.topAddress}>
//           <Text style={{ fontSize: 14, fontWeight: "600" }}>
//             {selectedAddress.address}
//           </Text>
//         </View>
//       )}

//       <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
//         {/* Address Section */}
//         <View style={styles.addressSection}>
//           {selectedAddress?.saved ? (
//             <>
//               {/* Dropdown only if address is selected */}
//               <TouchableOpacity
//                 style={styles.addressDropdown}
//                 onPress={() => setIsAddressExpanded(prev => !prev)}
//               >
//                 <Text style={styles.selectedAddressText}>
//                   {selectedAddress.address}
//                 </Text>
//                 {remainingSavedAddresses.length > 0 && (
//                   <Ionicons
//                     name={isAddressExpanded ? "chevron-up" : "chevron-down"}
//                     size={20}
//                     color="#555"
//                   />
//                 )}
//               </TouchableOpacity>

//               {isAddressExpanded && remainingSavedAddresses.length > 0 && (
//                 <View style={styles.addressList}>
//                   {remainingSavedAddresses.map((addr: any) => (
//                     <TouchableOpacity
//                       key={addr.addressId}
//                       style={styles.addressCard}
//                       onPress={() => handleSelectAddress(addr)}
//                     >
//                       <Text style={styles.addressLabel}>{addr.addressType}</Text>
//                       <Text style={styles.addressText}>{addr.fullAddress}</Text>
//                     </TouchableOpacity>
//                   ))}

//                   {/* Add New Address */}
//                   <TouchableOpacity
//                     style={styles.addAddressCard}
//                     onPress={() =>
//                       router.push({
//                         pathname: "../map/usedetect",
//                         params: { mode: "saved" },
//                       })
//                     }
//                   >
//                     <Ionicons name="add-outline" size={22} color="purple" />
//                     <Text style={styles.addAddressText}>Add New Address</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </>
//           ) : null}
//         </View>

//         {/* Cart Items */}
//         <View style={styles.cartSection}>
//           <Text style={styles.sectionTitle}>Items</Text>
//           {cartItems.map(item => (
//             <View key={item.id} style={styles.itemCard}>
//               <Image source={{ uri: item.image }} style={styles.itemImage} />
//               <View style={{ flex: 1, marginLeft: 12 }}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text style={styles.itemPrice}>
//                   ₹{item.price} × {item.quantity} = ₹
//                   {item.price * item.quantity}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Cart Summary */}
//         <View style={styles.summary}>
//           <Text style={styles.summaryTitle}>Price Details</Text>
//           <View style={styles.summaryRow}><Text>Item Total</Text><Text>₹{cartSummary.itemTotal}</Text></View>
//           <View style={styles.summaryRow}><Text>Restaurant GST</Text><Text>₹{cartSummary.taxes.restaurantGst}</Text></View>
//           <View style={styles.summaryRow}><Text>GST on Platform Fee</Text><Text>₹{cartSummary.taxes.gstOnPlatformFee}</Text></View>
//           <View style={styles.summaryRow}><Text>Delivery Fee</Text><Text>₹{cartSummary.deliveryFee}</Text></View>
//           <View style={styles.summaryRow}><Text>Platform Fee</Text><Text>₹{cartSummary.platformFee}</Text></View>
//           <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: "#eee", marginTop: 8, paddingTop: 8 }]}>
//             <Text style={styles.totalText}>Total</Text>
//             <Text style={styles.totalText}>₹{totalPrice}</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Checkout or Add New */}
//       <View style={{ position: "absolute", bottom: 15, left: 15, right: 15 }}>
//         {selectedAddress?.saved ? (
//           <TouchableOpacity style={styles.checkoutButton}>
//             <Text style={styles.checkoutText}>
//               Proceed to Checkout • ₹{totalPrice}
//             </Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={[
//               styles.checkoutButton,
//               { backgroundColor: "#fff", borderWidth: 1, borderColor: "purple" },
//             ]}
//             onPress={() =>
//               router.push({
//                 pathname: "../map/usedetect",
//                 params: { mode: "saved" },
//               })
//             }
//           >
//             <Text style={[styles.checkoutText, { color: "purple" }]}>
//               + Add New Address
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f8f8f8" },
//   topAddress: { padding: 15, backgroundColor: "#fff" },
//   addressSection: { paddingHorizontal: 15, marginBottom: 20 },
//   sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
//   addressDropdown: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   selectedAddressText: { fontSize: 14, color: "#555" },
//   addressList: { marginTop: 10 },
//   addressCard: {
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   addressLabel: { fontSize: 12, fontWeight: "700", color: "#444" },
//   addressText: { fontSize: 14, color: "#555" },
//   addAddressCard: {
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#1d1006ff",
//   },
//   addAddressText: { fontWeight: "700", color: "#3c0ca2ff" },
//   cartSection: { paddingHorizontal: 15, marginBottom: 20 },
//   itemCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   itemImage: { width: 80, height: 80, borderRadius: 10 },
//   itemName: { fontSize: 16, fontWeight: "600", color: "#222" },
//   itemPrice: { fontSize: 14, color: "#666", marginTop: 4 },
//   summary: {
//     backgroundColor: "#fff",
//     padding: 15,
//     marginHorizontal: 15,
//     borderRadius: 10,
//     marginBottom: 150,
//   },
//   summaryTitle: { fontWeight: "700", fontSize: 16, marginBottom: 10 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 6,
//   },
//   totalText: { fontWeight: "700", fontSize: 16, color: "#222" },
//   checkoutButton: {
//     backgroundColor: "purple",
//     paddingVertical: 16,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingBottom:100,
//     marginBottom:9,
//   },
//   checkoutText: { fontWeight: "700", fontSize: 16 },
// });


// import React, { useState, useContext, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Animated,
//   Dimensions,
//   Pressable,
//   Platform
// } from "react-native";


// const { height, width } = Dimensions.get("window");
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { LocationContext } from "@/context/locationContent";
// import { useRouter } from "expo-router";
// import { useSelector } from "react-redux";



// export default function CartPage() {
//   const { location } = useContext(LocationContext);
//   const [selectedAddress, setSelectedAddress] = useState(location);
//   const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
//   const slideAnim = useRef(new Animated.Value(height)).current; // start off-screen
//   const router = useRouter();

//   const savedAddresses = useSelector(
//     (state: any) => state.location.savedAddresses || []
//   );

//   const remainingSavedAddresses = selectedAddress?.saved
//     ? savedAddresses.filter(
//         (addr: any) => addr.addressId !== selectedAddress?.addressId
//       )
//     : savedAddresses;

//   const cartItems = [
//     { id: "1", name: "Full-on Bowl Meal", price: 399, quantity: 1, image: "https://via.placeholder.com/80" },
//   ];

//   const cartSummary = {
//     itemTotal: 399,
//     taxes: { restaurantGst: 20, gstOnPlatformFee: 5 },
//     deliveryFee: 40,
//     platformFee: 10,
//   };

//   const totalPrice =
//     cartSummary.itemTotal +
//     cartSummary.taxes.restaurantGst +
//     cartSummary.taxes.gstOnPlatformFee +
//     cartSummary.deliveryFee +
//     cartSummary.platformFee;

//   const handleSelectAddress = (addr: any) => {
//     setSelectedAddress({
//       lat: addr.latitude,
//       lng: addr.longitude,
//       address: addr.fullAddress,
//       saved: true,
//       addressId: addr.addressId,
//     });
//     closeBottomSheet();
//   };

//   // ---------------- Bottom Sheet Animations ----------------
//   const openBottomSheet = () => {
//     setIsBottomSheetVisible(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeBottomSheet = () => {
//     Animated.timing(slideAnim, {
//       toValue: height,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setIsBottomSheetVisible(false));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* ---------------- TOP BAR ADDRESS ---------------- */}
//       {selectedAddress?.saved && (
//         <TouchableOpacity
//           style={styles.topAddressBar}
//           onPress={openBottomSheet}
//         >
//           <Text style={styles.topAddressTitle}>{selectedAddress.address}</Text>
//           <Ionicons name="chevron-down" size={20} color="#444" />
//         </TouchableOpacity>
//       )}

//       <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
//         {/* ---------------- CART ITEMS ---------------- */}
//         <View style={styles.cartSection}>
//           <Text style={styles.sectionTitle}>Items</Text>
//           {cartItems.map((item) => (
//             <View key={item.id} style={styles.itemCard}>
//               <Image source={{ uri: item.image }} style={styles.itemImage} />
//               <View style={{ flex: 1, marginLeft: 12 }}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text style={styles.itemPrice}>
//                   ₹{item.price} × {item.quantity} = ₹
//                   {item.price * item.quantity}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* ---------------- PRICE DETAILS ---------------- */}
//         <View style={styles.summary}>
//           <Text style={styles.summaryTitle}>Price Details</Text>
//           <View style={styles.summaryRow}>
//             <Text>Item Total</Text>
//             <Text>₹{cartSummary.itemTotal}</Text>
//           </View>
//           <View style={styles.summaryRow}>
//             <Text>Restaurant GST</Text>
//             <Text>₹{cartSummary.taxes.restaurantGst}</Text>
//           </View>
//           <View style={styles.summaryRow}>
//             <Text>GST on Platform Fee</Text>
//             <Text>₹{cartSummary.taxes.gstOnPlatformFee}</Text>
//           </View>
//           <View style={styles.summaryRow}>
//             <Text>Delivery Fee</Text>
//             <Text>₹{cartSummary.deliveryFee}</Text>
//           </View>
//           <View style={styles.summaryRow}>
//             <Text>Platform Fee</Text>
//             <Text>₹{cartSummary.platformFee}</Text>
//           </View>
//           <View
//             style={[
//               styles.summaryRow,
//               { borderTopWidth: 1, borderTopColor: "#eee", marginTop: 8, paddingTop: 8 },
//             ]}
//           >
//             <Text style={styles.totalText}>Total</Text>
//             <Text style={styles.totalText}>₹{totalPrice}</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* ---------------- ADDRESS + CHECKOUT ---------------- */}
//       <View style={styles.bottomSection}>
//         {selectedAddress?.saved ? (
//           <TouchableOpacity style={styles.checkoutButton}>
//             <Text style={styles.checkoutText}>
//               Proceed to Pay • ₹{totalPrice}
//             </Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity style={styles.addOrSelectCard} onPress={openBottomSheet}>
//             <Ionicons name="location-outline" size={22} color="#fff" />
//             <Text style={styles.addOrSelectText}>Add or Select Address</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* ---------------- BOTTOM SHEET ---------------- */}
//       {isBottomSheetVisible && (
//         <Pressable style={styles.overlay} onPress={closeBottomSheet}>
//           <Animated.View
//             style={[
//               styles.bottomSheet,
//               { transform: [{ translateY: slideAnim }] },
//             ]}
//           >
//             <View style={styles.sheetHandle} />
//             <ScrollView>
//               {/* Add New Address */}
//               <TouchableOpacity
//                 style={styles.addAddressCard}
//                 onPress={() =>
//                   router.push({
//                     pathname: "../map/usedetect",
//                     params: { mode: "saved" },
//                   })
//                 }
//               >
//                 <Ionicons name="add-outline" size={22} color="purple" />
//                 <Text style={styles.addAddressText}>Add New Address</Text>
//               </TouchableOpacity>

//               {/* Saved Addresses */}
//               {(selectedAddress?.saved ? remainingSavedAddresses : savedAddresses).map(
//                 (addr: any) => (
//                   <TouchableOpacity
//                     key={addr.addressId}
//                     style={styles.addressCard}
//                     onPress={() => handleSelectAddress(addr)}
//                   >
//                     <Text style={styles.addressLabel}>{addr.addressType}</Text>
//                     <Text style={styles.addressText}>{addr.fullAddress}</Text>
//                   </TouchableOpacity>
//                 )
//               )}
//             </ScrollView>
//           </Animated.View>
//         </Pressable>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({

//   container: { flex: 1, backgroundColor: "#f8f8f8" },

//   // ---------------- TOP ADDRESS ----------------
//   topAddressBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingVertical: Platform.OS === "ios" ? 14 : 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//   },
//   topAddressTitle: { fontSize: 14, fontWeight: "600", color: "#222" },

//   // ---------------- CART ----------------
//   cartSection: { paddingHorizontal: 16, marginTop: 15 },
//   sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
//   itemCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   itemImage: { width: 80, height: 80, borderRadius: 10 },
//   itemName: { fontSize: 16, fontWeight: "600", color: "#222" },
//   itemPrice: { fontSize: 14, color: "#666", marginTop: 4 },

//   // ---------------- SUMMARY ----------------
//   summary: {
//     backgroundColor: "#fff",
//     padding: 16,
//     marginHorizontal: 16,
//     borderRadius: 10,
//     marginBottom: 100,
//   },
//   summaryTitle: { fontWeight: "700", fontSize: 16, marginBottom: 10 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 6,
//   },
//   totalText: { fontWeight: "700", fontSize: 16, color: "#222" },

//   // ---------------- BOTTOM BUTTON ----------------
//   bottomSection: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     paddingHorizontal: 16,
//     paddingVertical: Platform.OS === "ios" ? 14 : 12,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//   },
//   checkoutButton: {
//     backgroundColor: "purple",
//     paddingVertical: height < 700 ? 12 : 16, // smaller padding on small screens
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   checkoutText: {
//     fontWeight: "700",
//     fontSize: width < 360 ? 14 : 16, // smaller font on tiny devices
//     color: "#fff",
//   },
//   addOrSelectCard: {
//     backgroundColor: "purple",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: height < 700 ? 12 : 16,
//     borderRadius: 8,
//   },
//   addOrSelectText: {
//     color: "#fff",
//     fontWeight: "700",
//     marginLeft: 8,
//     fontSize: width < 360 ? 14 : 16,
//   },

//   // ---------------- BOTTOM SHEET ----------------
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.3)",
//   },
//   bottomSheet: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     maxHeight: height * 0.6, // cap at 60% screen height
//     minHeight: height * 0.3, // at least 30%
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 16,
//   },
//   sheetHandle: {
//     width: 60,
//     height: 5,
//     borderRadius: 3,
//     backgroundColor: "#ccc",
//     alignSelf: "center",
//     marginBottom: 10,
//   },

//   // ---------------- ADDRESS LIST ----------------
//   addAddressCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "purple",
//     marginBottom: 10,
//   },
//   addAddressText: { fontWeight: "700", color: "purple", marginLeft: 8 },
//   addressCard: {
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#eee",
//     marginBottom: 10,
//   },
//   addressLabel: { fontSize: 12, fontWeight: "700", color: "#444" },
//   addressText: { fontSize: 14, color: "#555" },
// });
 
import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Pressable,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LocationContext } from "@/context/locationContent";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const { height, width } = Dimensions.get("window");

export default function CartPage() {
  const { location } = useContext(LocationContext);
  const [selectedAddress, setSelectedAddress] = useState(location);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current; // start off-screen
  const router = useRouter();

  const savedAddresses = useSelector(
    (state: any) => state.location.savedAddresses || []
  );

  const remainingSavedAddresses = selectedAddress?.saved
    ? savedAddresses.filter(
        (addr: any) => addr.addressId !== selectedAddress?.addressId
      )
    : savedAddresses;

  const cartItems = [
    { id: "1", name: "Full-on Bowl Meal", price: 399, quantity: 1, image: "https://via.placeholder.com/80" },
  ];

  const cartSummary = {
    itemTotal: 399,
    taxes: { restaurantGst: 20, gstOnPlatformFee: 5 },
    deliveryFee: 40,
    platformFee: 10,
  };

  const totalPrice =
    cartSummary.itemTotal +
    cartSummary.taxes.restaurantGst +
    cartSummary.taxes.gstOnPlatformFee +
    cartSummary.deliveryFee +
    cartSummary.platformFee;

  const handleSelectAddress = (addr: any) => {
    setSelectedAddress({
      lat: addr.latitude,
      lng: addr.longitude,
      address: addr.fullAddress,
      saved: true,
      addressId: addr.addressId,
    });
    closeBottomSheet();
  };

  // ---------------- Bottom Sheet Animations ----------------
  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsBottomSheetVisible(false));
  };

  const goBack = () => {
    router.back(); // go back to items page
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ---------------- TOP BAR WITH BACK ARROW ---------------- */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Cart</Text>
      </View>

      {/* ---------------- TOP BAR ADDRESS ---------------- */}
      {selectedAddress?.saved && (
        <TouchableOpacity
          style={styles.topAddressBar}
          onPress={openBottomSheet}
        >
          <Text style={styles.topAddressTitle}>{selectedAddress.address}</Text>
          <Ionicons name="chevron-down" size={20} color="#444" />
        </TouchableOpacity>
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
        {/* ---------------- CART ITEMS ---------------- */}
        <View style={styles.cartSection}>
          <Text style={styles.sectionTitle}>Items</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>
                  ₹{item.price} × {item.quantity} = ₹
                  {item.price * item.quantity}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ---------------- PRICE DETAILS ---------------- */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Price Details</Text>
          <View style={styles.summaryRow}>
            <Text>Item Total</Text>
            <Text>₹{cartSummary.itemTotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Restaurant GST</Text>
            <Text>₹{cartSummary.taxes.restaurantGst}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>GST on Platform Fee</Text>
            <Text>₹{cartSummary.taxes.gstOnPlatformFee}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Delivery Fee</Text>
            <Text>₹{cartSummary.deliveryFee}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Platform Fee</Text>
            <Text>₹{cartSummary.platformFee}</Text>
          </View>
          <View
            style={[
              styles.summaryRow,
              { borderTopWidth: 1, borderTopColor: "#eee", marginTop: 8, paddingTop: 8 },
            ]}
          >
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>₹{totalPrice}</Text>
          </View>
        </View>
      </ScrollView>

      {/* ---------------- ADDRESS + CHECKOUT ---------------- */}
      {selectedAddress?.saved ? (
        <View style={styles.bottomSectionRow}>
          <TouchableOpacity style={[styles.checkoutButton, { backgroundColor: "blue" }]}>
            <Text style={styles.checkoutText}>Proceed to Pay</Text>
          </TouchableOpacity>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>₹{totalPrice}</Text>
            <Text style={styles.bill}>View Detail Bill</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.addOrSelectCard} onPress={openBottomSheet}>
          <Ionicons name="location-outline" size={22} color="#fff" />
          <Text style={styles.addOrSelectText}>Add or Select Address</Text>
        </TouchableOpacity>
      )}

      {/* ---------------- BOTTOM SHEET ---------------- */}
      {isBottomSheetVisible && (
        <Pressable style={styles.overlay} onPress={closeBottomSheet}>
          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.sheetHandle} />
            <ScrollView>
              {/* Add New Address */}
              <TouchableOpacity
                style={styles.addAddressCard}
                onPress={() =>
                  router.push({
                    pathname: "../map/usedetect",
                    params: { mode: "saved" },
                  })
                }
              >
                <Ionicons name="add-outline" size={22} color="purple" />
                <Text style={styles.addAddressText}>Add New Address</Text>
              </TouchableOpacity>

              {/* Saved Addresses */}
              {(selectedAddress?.saved ? remainingSavedAddresses : savedAddresses).map(
                (addr: any) => (
                  <TouchableOpacity
                    key={addr.addressId}
                    style={styles.addressCard}
                    onPress={() => handleSelectAddress(addr)}
                  >
                    <Text style={styles.addressLabel}>{addr.addressType}</Text>
                    <Text style={styles.addressText}>{addr.fullAddress}</Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>
          </Animated.View>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
 
  bill:{
    color:'green',
    fontFamily:'40'
  },
  // ---------------- TOP BAR ----------------
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  topBarTitle: { fontSize: 18, fontWeight: "700", color: "#222", marginLeft: 12 },

  // ---------------- TOP ADDRESS ----------------
  topAddressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  topAddressTitle: { fontSize: 14, fontWeight: "600", color: "#222" },

  // ---------------- CART ----------------
  cartSection: { paddingHorizontal: 16, marginTop: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemImage: { width: 80, height: 80, borderRadius: 10 },
  itemName: { fontSize: 16, fontWeight: "600", color: "#222" },
  itemPrice: { fontSize: 14, color: "#666", marginTop: 4 },

  // ---------------- SUMMARY ----------------
  summary: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 100,
  },
  summaryTitle: { fontWeight: "700", fontSize: 16, marginBottom: 10 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalText: { fontWeight: "700", fontSize: 16, color: "#222" },

  // ---------------- BOTTOM BUTTON ----------------
  bottomSectionRow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  checkoutButton: {
    flex: 1,
    paddingVertical: height < 700 ? 12 : 16,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  checkoutText: {
    fontWeight: "700",
    fontSize: width < 360 ? 14 : 16,
    color: "#fff",
  },
  amountBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 8,
  },
  amountText: { fontWeight: "700", fontSize: 16, color: "#222" },
  addOrSelectCard: {
    backgroundColor: "purple",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height < 700 ? 12 : 16,
    borderRadius: 8,
    margin: 16,
  },
  addOrSelectText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: width < 360 ? 14 : 16,
  },

  // ---------------- BOTTOM SHEET ----------------
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: height * 0.6,
    minHeight: height * 0.3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  sheetHandle: {
    width: 60,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 10,
  },

  // ---------------- ADDRESS LIST ----------------
  addAddressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "purple",
    marginBottom: 10,
  },
  addAddressText: { fontWeight: "700", color: "purple", marginLeft: 8 },
  addressCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
  addressLabel: { fontSize: 12, fontWeight: "700", color: "#444" },
  addressText: { fontSize: 14, color: "#555" },
});
