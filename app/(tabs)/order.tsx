// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// export default function order() {
//   const router = useRouter();
//   const { width } = useWindowDimensions();
//   const clamp = (size: number, min: number, max: number) =>
//     Math.min(Math.max((width / 375) * size, min), max);

//   return (
//     <View style={styles.page}>
//       {/* Header with inline arrow and title */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.push('/cart')} style={styles.backTitleContainer}>
//           <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 4 }} />
//           <Text style={styles.title}>order</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Body */}
//       <View style={[styles.body, { padding: clamp(20, 10, 40) }]}>
//         <Text style={[styles.text, { fontSize: clamp(24, 18, 34) }]}>Welcome to order</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   backTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   body: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontWeight: 'bold',
//     color: '#222',
//   },
// });

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   useWindowDimensions,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// export default function Order() {
//   const router = useRouter();
//   const { width } = useWindowDimensions();

//   const clamp = (size: number, min: number, max: number) =>
//     Math.min(Math.max((width / 375) * size, min), max);

//   return (
//     <View style={styles.page}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.push('/cart')} style={styles.backTitleContainer}>
//           <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 4 }} />
//           <Text style={styles.title}>Your Cart</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Body */}
//       <View style={[styles.body, { padding: clamp(20, 10, 40) }]}>
//         {/* Empty Cart Icon */}
//         <Ionicons name="bag-outline" size={64} color="#ccc" style={{ marginBottom: 20 }} />

//         {/* Title */}
//         <Text style={[styles.text, { fontSize: clamp(20, 18, 28), marginBottom: 10 }]}>
//           Your cart is empty
//         </Text>

//         {/* Subtitle */}
//         <Text style={{ color: '#555', textAlign: 'center', marginBottom: 20 }}>
//           Add some delicious items from our restaurants to get started!
//         </Text>

//         {/* Button */}
//         <TouchableOpacity
//           onPress={() => router.push('/')}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>Start Shopping</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   backTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   body: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   button: {
//     backgroundColor: '#f50',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 6,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });



// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// export default function Orders() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("Live Tracking");

//   return (
//     <View style={styles.page}>
//       {/* Header */}
//       <View style={styles.header}>
//         {/* Back button + Title */}
//         <View style={styles.topRow}>
//           <TouchableOpacity
//             onPress={() => router.back()}
//             style={styles.backContainer}
//           >
//             <Ionicons name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Orders</Text>
//         </View>

//         {/* Tabs */}
//         <View style={styles.tabs}>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === "Live Tracking" && styles.activeTab]}
//             onPress={() => setActiveTab("Live Tracking")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === "Live Tracking" && styles.activeTabText,
//               ]}
//             >
//               Live Tracking
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tab, activeTab === "Order History" && styles.activeTab]}
//             onPress={() => setActiveTab("Order History")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === "Order History" && styles.activeTabText,
//               ]}
//             >
//               Order History
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Body */}
//       <View style={styles.body}>
//         {activeTab === "Live Tracking" ? (
//           <>
//             {/* Restaurant Card */}
//             <View style={styles.restaurantCard}>
//               <View style={styles.rowBetween}>
//                 <Image
//                   source={{ uri: "https://i.imgur.com/YkW6x0R.png" }}
//                   style={styles.restaurantImage}
//                 />
//                 <View style={{ flex: 1, marginLeft: 10 }}>
//                   <Text style={styles.restaurantName}>Burger Palace</Text>
//                   <Text style={styles.orderId}>Order #order-123</Text>
//                   <Text style={styles.eta}>Estimated: 10-15 min</Text>
//                 </View>
//                 <Text style={styles.price}>$24.99</Text>
//               </View>
//               <Text style={styles.statusTag}>On the way</Text>
//             </View>

//             {/* Live Tracking Button */}
//             <TouchableOpacity style={styles.trackButton}>
//               <Ionicons
//                 name="navigate-outline"
//                 size={18}
//                 color="#fff"
//                 style={{ marginRight: 6 }}
//               />
//               <Text style={styles.trackButtonText}>View Live Tracking</Text>
//               <Text style={styles.liveTag}>LIVE</Text>
//             </TouchableOpacity>

//             {/* Order Status */}
//             <View style={styles.statusSection}>
//               <Text style={styles.statusTitle}>Order Status</Text>

//               <View style={styles.statusRow}>
//                 <Ionicons name="checkmark-circle" size={20} color="green" />
//                 <Text style={styles.statusText}>
//                   Order Confirmed {"\n"}
//                   <Text style={styles.statusSubText}>
//                     Restaurant is preparing your order
//                   </Text>
//                 </Text>
//                 <Text style={styles.time}>2:15 PM</Text>
//               </View>

//               <View style={styles.statusRow}>
//                 <Ionicons name="checkmark-circle" size={20} color="green" />
//                 <Text style={styles.statusText}>
//                   Preparing Food {"\n"}
//                   <Text style={styles.statusSubText}>
//                     Your delicious meal is being prepared
//                   </Text>
//                 </Text>
//                 <Text style={styles.time}>2:25 PM</Text>
//               </View>

//               <View style={styles.statusRow}>
//                 <Ionicons name="checkmark-circle" size={20} color="green" />
//                 <Text style={styles.statusText}>
//                   Ready for Pickup {"\n"}
//                   <Text style={styles.statusSubText}>
//                     Driver is on the way to restaurant
//                   </Text>
//                 </Text>
//                 <Text style={styles.time}>2:45 PM</Text>
//               </View>

//               <View style={styles.statusRow}>
//                 <Ionicons name="checkmark-circle" size={20} color="green" />
//                 <Text style={styles.statusText}>
//                   Order Picked Up {"\n"}
//                   <Text style={styles.statusSubText}>
//                     Driver is heading to your location
//                   </Text>
//                 </Text>
//                 <Text style={styles.time}>2:50 PM</Text>
//               </View>

//               <View style={styles.statusRow}>
//                 <Ionicons name="checkmark-circle" size={20} color="orange" />
//                 <Text style={styles.statusText}>
//                   Delivered {"\n"}
//                   <Text style={styles.statusSubText}>Enjoy your meal!</Text>
//                 </Text>
//                 <Text style={styles.time}>Est. 3:05 PM</Text>
//               </View>
//             </View>
//           </>
//         ) : (
//           <Text style={styles.bodyText}>Your past orders will show here.</Text>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#fff",
//   },
//   topRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   backContainer: {
//     marginRight: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   tabs: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 8,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     alignItems: "center",
//     marginRight: 8,
//   },
//   activeTab: {
//     backgroundColor: "purple",
//     borderColor: "purple",
//   },
//   tabText: {
//     color: "#000",
//     fontWeight: "500",
//   },
//   activeTabText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   body: {
//     flex: 1,
//     padding: 16,
//   },
//   restaurantCard: {
//     backgroundColor: "#f9f9f9",
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#eee",
//     position: "relative",
//   },
//   rowBetween: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   restaurantImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//   },
//   restaurantName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#222",
//   },
//   orderId: {
//     fontSize: 14,
//     color: "#666",
//   },
//   eta: {
//     fontSize: 12,
//     color: "green",
//     marginTop: 2,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   statusTag: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     backgroundColor: "#d1f7d6",
//     color: "green",
//     fontSize: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//     fontWeight: "bold",
//   },
//   trackButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#007bff",
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   trackButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginRight: 8,
//   },
//   liveTag: {
//     backgroundColor: "red",
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "bold",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   statusSection: {
//     marginTop: 10,
//   },
//   statusTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 12,
//     color: "#222",
//   },
//   statusRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   statusText: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 15,
//     color: "#333",
//   },
//   statusSubText: {
//     fontSize: 13,
//     color: "#666",
//   },
//   time: {
//     fontSize: 13,
//     color: "#666",
//     marginLeft: 6,
//   },
//   bodyText: {
//     fontSize: 16,
//     color: "#444",
//     textAlign: "center",
//     marginTop: 50,
//   },
// });


// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// export default function Orders() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("Live Tracking");

//   return (
//     <View style={styles.page}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.topRow}>
//           <TouchableOpacity
//             onPress={() => router.back()}
//             style={styles.backContainer}
//           >
//             <Ionicons name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Orders</Text>
//         </View>

//         {/* Tabs */}
//         <View style={styles.tabs}>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === "Live Tracking" && styles.activeTab]}
//             onPress={() => setActiveTab("Live Tracking")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === "Live Tracking" && styles.activeTabText,
//               ]}
//             >
//               Live Tracking
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tab, activeTab === "Order History" && styles.activeTab]}
//             onPress={() => setActiveTab("Order History")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === "Order History" && styles.activeTabText,
//               ]}
//             >
//               Order History
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Body */}
//       <View style={styles.body}>
//         {activeTab === "Live Tracking" ? (
//           <>
//             {/* Restaurant Card */}
//             <View style={styles.restaurantCard}>
//               <View style={styles.rowBetween}>
//                 <Image
//                   source={{ uri: "https://i.imgur.com/YkW6x0R.png" }}
//                   style={styles.restaurantImage}
//                 />
//                 <View style={{ flex: 1, marginLeft: 10 }}>
//                   <Text style={styles.restaurantName}>Burger Palace</Text>
//                   <Text style={styles.orderId}>Order #order-123</Text>
//                   <Text style={styles.eta}>Estimated: 10-15 min</Text>
//                 </View>
//                 <Text style={styles.price}>$24.99</Text>
//               </View>
//               <Text style={styles.statusTag}>On the way</Text>
//             </View>

//             {/* Live Tracking Button */}
//             <TouchableOpacity style={styles.trackButton}>
//               <Ionicons
//                 name="navigate-outline"
//                 size={18}
//                 color="#fff"
//                 style={{ marginRight: 6 }}
//               />
//               <Text style={styles.trackButtonText}>View Live Tracking</Text>
//               <Text style={styles.liveTag}>LIVE</Text>
//             </TouchableOpacity>

//             {/* Order Status */}
//             <View style={styles.statusSection}>
//               <Text style={styles.statusTitle}>Order Status</Text>

//               <View style={styles.statusRow}>
//                 <Ionicons name="checkmark-circle" size={20} color="green" />
//                 <Text style={styles.statusText}>
//                   Order Confirmed {"\n"}
//                   <Text style={styles.statusSubText}>
//                     Restaurant is preparing your order
//                   </Text>
//                 </Text>
//                 <Text style={styles.time}>2:15 PM</Text>
//               </View>

//               <View style={styles.statusRow}>
//                 <Ionicons name="checkmark-circle" size={20} color="green" />
//                 <Text style={styles.statusText}>
//                   Preparing Food {"\n"}
//                   <Text style={styles.statusSubText}>
//                     Your delicious meal is being prepared
//                   </Text>
//                 </Text>
//                 <Text style={styles.time}>2:25 PM</Text>
//               </View>

//               <View style={styles.statusRow}>
//                 <Ionicons name="checkmark-circle" size={20} color="green" />
//                 <Text style={styles.statusText}>
//                   Ready for Pickup {"\n"}
//                   <Text style={styles.statusSubText}>
//                     Driver is on the way to restaurant
//                   </Text>
//                 </Text>
//                 <Text style={styles.time}>2:45 PM</Text>
//               </View>

//               <View style={styles.statusRow}>
//                 <Ionicons name="checkmark-circle" size={20} color="green" />
//                 <Text style={styles.statusText}>
//                   Order Picked Up {"\n"}
//                   <Text style={styles.statusSubText}>
//                     Driver is heading to your location
//                   </Text>
//                 </Text>
//                 <Text style={styles.time}>2:50 PM</Text>
//               </View>

//               <View style={styles.statusRow}>
//                 <Ionicons name="checkmark-circle" size={20} color="orange" />
//                 <Text style={styles.statusText}>
//                   Delivered {"\n"}
//                   <Text style={styles.statusSubText}>Enjoy your meal!</Text>
//                 </Text>
//                 <Text style={styles.time}>Est. 3:05 PM</Text>
//               </View>
//             </View>

//             {/* Delivery Partner Card */}
//             <View style={styles.deliveryCard}>
//               <Image
//                 source={{ uri: "https://i.imgur.com/1X4HqkJ.png" }}
//                 style={styles.deliveryImage}
//               />
//               <View style={{ flex: 1, marginLeft: 10 }}>
//                 <Text style={styles.deliveryName}>Mike Johnson</Text>
//                 <Text style={styles.deliveryDetails}>
//                   ⭐ 4.9 · Honda Civic - ABC 123
//                 </Text>
//               </View>
//               <TouchableOpacity style={styles.callButton}>
//                 <Ionicons name="call" size={22} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           </>
//         ) : (
//           <Text style={styles.bodyText}>Your past orders will show here.</Text>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#fff",
//   },
//   topRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
//   backContainer: { marginRight: 8 },
//   headerTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
//   tabs: { flexDirection: "row", alignItems: "center" },
//   tab: {
//     flex: 1,
//     paddingVertical: 8,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     alignItems: "center",
//     marginRight: 8,
//   },
//   activeTab: { backgroundColor: "purple", borderColor: "purple" },
//   tabText: { color: "#000", fontWeight: "500" },
//   activeTabText: { color: "#fff", fontWeight: "bold" },
//   body: { flex: 1, padding: 16 },
//   restaurantCard: {
//     backgroundColor: "#f9f9f9",
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#eee",
//     position: "relative",
//   },
//   rowBetween: { flexDirection: "row", alignItems: "center" },
//   restaurantImage: { width: 50, height: 50, borderRadius: 8 },
//   restaurantName: { fontSize: 16, fontWeight: "bold", color: "#222" },
//   orderId: { fontSize: 14, color: "#666" },
//   eta: { fontSize: 12, color: "green", marginTop: 2 },
//   price: { fontSize: 16, fontWeight: "bold", color: "#000" },
//   statusTag: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     backgroundColor: "#d1f7d6",
//     color: "green",
//     fontSize: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//     fontWeight: "bold",
//   },
//   trackButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#007bff",
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   trackButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginRight: 8,
//   },
//   liveTag: {
//     backgroundColor: "red",
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "bold",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   statusSection: { marginTop: 10 },
//   statusTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 12,
//     color: "#222",
//   },
//   statusRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   statusText: { flex: 1, marginLeft: 8, fontSize: 15, color: "#333" },
//   statusSubText: { fontSize: 13, color: "#666" },
//   time: { fontSize: 13, color: "#666", marginLeft: 6 },
//   bodyText: {
//     fontSize: 16,
//     color: "#444",
//     textAlign: "center",
//     marginTop: 50,
//   },

//   // Delivery Partner Card
//   deliveryCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: 16,
//     borderRadius: 10,
//     marginTop: 16,
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   deliveryImage: { width: 50, height: 50, borderRadius: 25 },
//   deliveryName: { fontSize: 16, fontWeight: "bold", color: "#222" },
//   deliveryDetails: { fontSize: 14, color: "#666" },
//   callButton: {
//     backgroundColor: "green",
//     padding: 10,
//     borderRadius: 30,
//   },
// });


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   useWindowDimensions,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// export default function Orders() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("Live Tracking");

//   const { width } = useWindowDimensions();
//   const isSmall = width < 480;
//   const isMedium = width >= 480 && width < 768;

//   const fontScale = isSmall ? 0.9 : isMedium ? 1 : 1.1;
//   const imageSize = isSmall ? 45 : isMedium ? 55 : 65;

//   return (
//     <View style={styles.page}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.topRow}>
//           <TouchableOpacity
//             onPress={() => router.back()}
//             style={styles.backContainer}
//           >
//             <Ionicons name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={[styles.headerTitle, { fontSize: 18 * fontScale }]}>
//             Orders
//           </Text>
//         </View>

//         {/* Tabs */}
//         <View style={styles.tabs}>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === "Live Tracking" && styles.activeTab]}
//             onPress={() => setActiveTab("Live Tracking")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === "Live Tracking" && styles.activeTabText,
//                 { fontSize: 14 * fontScale },
//               ]}
//             >
//               Live Tracking
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tab, activeTab === "Order History" && styles.activeTab]}
//             onPress={() => setActiveTab("Order History")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === "Order History" && styles.activeTabText,
//                 { fontSize: 14 * fontScale },
//               ]}
//             >
//               Order History
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Body with ScrollView */}
//       <ScrollView
//         contentContainerStyle={{ flexGrow: 1, padding: 16 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {activeTab === "Live Tracking" ? (
//           <>
//             {/* Restaurant Card */}
//             <View style={styles.restaurantCard}>
//               <View style={styles.rowBetween}>
//                 <Image
//                   source={{ uri: "https://i.imgur.com/YkW6x0R.png" }}
//                   style={[styles.restaurantImage, { width: imageSize, height: imageSize }]}
//                 />
//                 <View style={{ flex: 1, marginLeft: 10 }}>
//                   <Text style={[styles.restaurantName, { fontSize: 16 * fontScale }]}>
//                     Burger Palace
//                   </Text>
//                   <Text style={[styles.orderId, { fontSize: 14 * fontScale }]}>
//                     Order #order-123
//                   </Text>
//                   <Text style={[styles.eta, { fontSize: 12 * fontScale }]}>
//                     Estimated: 10-15 min
//                   </Text>
//                 </View>
//                 <Text style={[styles.price, { fontSize: 16 * fontScale }]}>$24.99</Text>
//               </View>
//               <Text style={styles.statusTag}>On the way</Text>
//             </View>

//             {/* Live Tracking Button */}
//             <TouchableOpacity style={styles.trackButton}>
//               <Ionicons
//                 name="navigate-outline"
//                 size={18}
//                 color="#fff"
//                 style={{ marginRight: 6 }}
//               />
//               <Text style={[styles.trackButtonText, { fontSize: 16 * fontScale }]}>
//                 View Live Tracking
//               </Text>
//               <Text style={styles.liveTag}>LIVE</Text>
//             </TouchableOpacity>

//             {/* Order Status */}
//             <View style={styles.statusSection}>
//               <Text style={[styles.statusTitle, { fontSize: 18 * fontScale }]}>
//                 Order Status
//               </Text>

//               {[
//                 {
//                   title: "Order Confirmed",
//                   sub: "Restaurant is preparing your order",
//                   time: "2:15 PM",
//                 },
//                 {
//                   title: "Preparing Food",
//                   sub: "Your delicious meal is being prepared",
//                   time: "2:25 PM",
//                 },
//                 {
//                   title: "Ready for Pickup",
//                   sub: "Driver is on the way to restaurant",
//                   time: "2:45 PM",
//                 },
//                 {
//                   title: "Order Picked Up",
//                   sub: "Driver is heading to your location",
//                   time: "2:50 PM",
//                 },
//                 {
//                   title: "Delivered",
//                   sub: "Enjoy your meal!",
//                   time: "Est. 3:05 PM",
//                   color: "orange",
//                 },
//               ].map((step, i) => (
//                 <View style={styles.statusRow} key={i}>
//                   <Ionicons
//                     name="checkmark-circle"
//                     size={20}
//                     color={step.color || "green"}
//                   />
//                   <Text style={[styles.statusText, { fontSize: 15 * fontScale }]}>
//                     {step.title} {"\n"}
//                     <Text style={[styles.statusSubText, { fontSize: 13 * fontScale }]}>
//                       {step.sub}
//                     </Text>
//                   </Text>
//                   <Text style={[styles.time, { fontSize: 13 * fontScale }]}>
//                     {step.time}
//                   </Text>
//                 </View>
//               ))}
//             </View>

//             {/* Delivery Partner Card */}
//             <View style={styles.deliveryCard}>
//               <Image
//                 source={{ uri: "https://i.imgur.com/1X4HqkJ.png" }}
//                 style={[
//                   styles.deliveryImage,
//                   { width: imageSize, height: imageSize, borderRadius: imageSize / 2 },
//                 ]}
//               />
//               <View style={{ flex: 1, marginLeft: 10 }}>
//                 <Text style={[styles.deliveryName, { fontSize: 16 * fontScale }]}>
//                   Mike Johnson
//                 </Text>
//                 <Text style={[styles.deliveryDetails, { fontSize: 14 * fontScale }]}>
//                   ⭐ 4.9 · Honda Civic - ABC 123
//                 </Text>
//               </View>
//               <TouchableOpacity style={styles.callButton}>
//                 <Ionicons name="call" size={22} color="#fff" />
//               </TouchableOpacity>

              
//             </View>

//           </>
//         ) : (
//           <Text style={styles.bodyText}>Your past orders will show here.</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#fff",
//   },
//   topRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
//   backContainer: { marginRight: 8 },
//   headerTitle: { fontWeight: "bold", color: "#000" },
//   tabs: { flexDirection: "row", alignItems: "center" },
//   tab: {
//     flex: 1,
//     paddingVertical: 8,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     alignItems: "center",
//     marginRight: 8,
//   },
//   activeTab: { backgroundColor: "purple", borderColor: "purple" },
//   tabText: { color: "#000", fontWeight: "500" },
//   activeTabText: { color: "#fff", fontWeight: "bold" },

//   restaurantCard: {
//     backgroundColor: "#f9f9f9",
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#eee",
//     position: "relative",
//   },
//   rowBetween: { flexDirection: "row", alignItems: "center" },
//   restaurantImage: { borderRadius: 8 },
//   restaurantName: { fontWeight: "bold", color: "#222" },
//   orderId: { color: "#666" },
//   eta: { color: "green", marginTop: 2 },
//   price: { fontWeight: "bold", color: "#000" },
//   statusTag: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     backgroundColor: "#d1f7d6",
//     color: "green",
//     fontSize: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//     fontWeight: "bold",
//   },
//   trackButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#007bff",
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   trackButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     marginRight: 8,
//   },
//   liveTag: {
//     backgroundColor: "red",
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "bold",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   statusSection: { marginTop: 10 },
//   statusTitle: {
//     fontWeight: "bold",
//     marginBottom: 12,
//     color: "#222",
//   },
//   statusRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   statusText: { flex: 1, marginLeft: 8, color: "#333" },
//   statusSubText: { color: "#666" },
//   time: { color: "#666", marginLeft: 6 },
//   bodyText: {
//     fontSize: 16,
//     color: "#444",
//     textAlign: "center",
//     marginTop: 50,
//   },

//   deliveryCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: 16,
//     borderRadius: 10,
//     marginTop: 16,
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   deliveryImage: {},
//   deliveryName: { fontWeight: "bold", color: "#222" },
//   deliveryDetails: { color: "#666" },
//   callButton: {
//     backgroundColor: "green",
//     padding: 10,
//     borderRadius: 30,
//   },
// });


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   useWindowDimensions,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Orders() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("Live Tracking");

//   const { width } = useWindowDimensions();
//   const isSmall = width < 480;
//   const isMedium = width >= 480 && width < 768;

//   const fontScale = isSmall ? 0.9 : isMedium ? 1 : 1.1;
//   const imageSize = isSmall ? 45 : isMedium ? 55 : 65;

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
//       <View style={styles.page}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.topRow}>
//             <TouchableOpacity
//               onPress={() => router.back()}
//               style={styles.backContainer}
//             >
//               <Ionicons name="arrow-back" size={24} color="black" />
//             </TouchableOpacity>
//             <Text style={[styles.headerTitle, { fontSize: 18 * fontScale }]}>
//               Orders
//             </Text>
//           </View>

//           {/* Tabs */}
//           <View style={styles.tabs}>
//             <TouchableOpacity
//               style={[
//                 styles.tab,
//                 activeTab === "Live Tracking" && styles.activeTab,
//               ]}
//               onPress={() => setActiveTab("Live Tracking")}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === "Live Tracking" && styles.activeTabText,
//                   { fontSize: 14 * fontScale },
//                 ]}
//               >
//                 Live Tracking
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.tab,
//                 activeTab === "Order History" && styles.activeTab,
//               ]}
//               onPress={() => setActiveTab("Order History")}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === "Order History" && styles.activeTabText,
//                   { fontSize: 14 * fontScale },
//                 ]}
//               >
//                 Order History
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Body with ScrollView */}
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1, padding: 16 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {activeTab === "Live Tracking" ? (
//             <>
//               {/* Restaurant Card */}
//               <View style={styles.restaurantCard}>
//                 <View style={styles.rowBetween}>
//                   <Image
//                     source={{ uri: "https://i.imgur.com/YkW6x0R.png" }}
//                     style={[
//                       styles.restaurantImage,
//                       { width: imageSize, height: imageSize },
//                     ]}
//                   />
//                   <View style={{ flex: 1, marginLeft: 10 }}>
//                     <Text
//                       style={[
//                         styles.restaurantName,
//                         { fontSize: 16 * fontScale },
//                       ]}
//                     >
//                       Burger Palace
//                     </Text>
//                     <Text
//                       style={[styles.orderId, { fontSize: 14 * fontScale }]}
//                     >
//                       Order #order-123
//                     </Text>
//                     <Text style={[styles.eta, { fontSize: 12 * fontScale }]}>
//                       Estimated: 10-15 min
//                     </Text>
//                   </View>
//                   <Text style={[styles.price, { fontSize: 16 * fontScale }]}>
//                     $24.99
//                   </Text>
//                 </View>
//                 <Text style={styles.statusTag}>On the way</Text>
//               </View>

//               {/* Live Tracking Button */}
//               <TouchableOpacity style={styles.trackButton}>
//                 <Ionicons
//                   name="navigate-outline"
//                   size={18}
//                   color="#fff"
//                   style={{ marginRight: 6 }}
//                 />
//                 <Text
//                   style={[styles.trackButtonText, { fontSize: 16 * fontScale }]}
//                 >
//                   View Live Tracking
//                 </Text>
//                 <Text style={styles.liveTag}>LIVE</Text>
//               </TouchableOpacity>

//               {/* Order Status */}
//               <View style={styles.statusSection}>
//                 <Text
//                   style={[styles.statusTitle, { fontSize: 18 * fontScale }]}
//                 >
//                   Order Status
//                 </Text>

//                 {[
//                   {
//                     title: "Order Confirmed",
//                     sub: "Restaurant is preparing your order",
//                     time: "2:15 PM",
//                   },
//                   {
//                     title: "Preparing Food",
//                     sub: "Your delicious meal is being prepared",
//                     time: "2:25 PM",
//                   },
//                   {
//                     title: "Ready for Pickup",
//                     sub: "Driver is on the way to restaurant",
//                     time: "2:45 PM",
//                   },
//                   {
//                     title: "Order Picked Up",
//                     sub: "Driver is heading to your location",
//                     time: "2:50 PM",
//                   },
//                   {
//                     title: "Delivered",
//                     sub: "Enjoy your meal!",
//                     time: "Est. 3:05 PM",
//                     color: "orange",
//                   },
//                 ].map((step, i) => (
//                   <View style={styles.statusRow} key={i}>
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={20}
//                       color={step.color || "green"}
//                     />
//                     <Text
//                       style={[styles.statusText, { fontSize: 15 * fontScale }]}
//                     >
//                       {step.title} {"\n"}
//                       <Text
//                         style={[
//                           styles.statusSubText,
//                           { fontSize: 13 * fontScale },
//                         ]}
//                       >
//                         {step.sub}
//                       </Text>
//                     </Text>
//                     <Text style={[styles.time, { fontSize: 13 * fontScale }]}>
//                       {step.time}
//                     </Text>
//                   </View>
//                 ))}
//               </View>

//               {/* Delivery Partner Card */}
//               <View style={styles.deliveryCard}>
//                 <Image
//                   source={{ uri: "https://i.imgur.com/1X4HqkJ.png" }}
//                   style={[
//                     styles.deliveryImage,
//                     {
//                       width: imageSize,
//                       height: imageSize,
//                       borderRadius: imageSize / 2,
//                     },
//                   ]}
//                 />
//                 <View style={{ flex: 1, marginLeft: 10 }}>
//                   <Text
//                     style={[
//                       styles.deliveryName,
//                       { fontSize: 16 * fontScale },
//                     ]}
//                   >
//                     Mike Johnson
//                   </Text>
//                   <Text
//                     style={[
//                       styles.deliveryDetails,
//                       { fontSize: 14 * fontScale },
//                     ]}
//                   >
//                     ⭐ 4.9 · Honda Civic - ABC 123
//                   </Text>
//                 </View>
//                 <TouchableOpacity style={styles.callButton}>
//                   <Ionicons name="call" size={22} color="#fff" />
//                 </TouchableOpacity>
//               </View>

//               {/* Order Items Card */}
//               <View style={styles.orderCard}>
//                 <Text style={styles.orderTitle}>Order Items</Text>

//                 <View style={styles.itemRow}>
//                   <Text style={styles.itemQty}>2x</Text>
//                   <Text style={styles.itemName}>Classic Beef Burger</Text>
//                   <Text style={styles.itemPrice}>$12.99</Text>
//                 </View>

//                 <View style={styles.itemRow}>
//                   <Text style={styles.itemQty}>1x</Text>
//                   <Text style={styles.itemName}>Sweet Potato Fries</Text>
//                   <Text style={styles.itemPrice}>$6.99</Text>
//                 </View>

//                 <View style={styles.itemRow}>
//                   <Text style={styles.itemQty}>1x</Text>
//                   <Text style={styles.itemName}>Chocolate Shake</Text>
//                   <Text style={styles.itemPrice}>$5.99</Text>
//                 </View>

//                 {/* Buttons */}
//                 <View style={styles.buttonRow}>
//                   <TouchableOpacity style={styles.cancelBtn}>
//                     <Text style={styles.cancelText}>Cancel Order</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.helpBtn}>
//                     <Text style={styles.helpText}>Need Help?</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </>
//           ) : (
//             <Text style={styles.bodyText}>
//               Your past orders will show here.
//             </Text>
//           )}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff", // ensures white background on notched areas
//   },
//   page: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#fff",
//   },
//   topRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
//   backContainer: { marginRight: 8 },
//   headerTitle: { fontWeight: "bold", color: "#000" },
//   tabs: { flexDirection: "row", alignItems: "center" },
//   tab: {
//     flex: 1,
//     paddingVertical: 8,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     alignItems: "center",
//     marginRight: 8,
//   },
//   activeTab: { backgroundColor: "purple", borderColor: "purple" },
//   tabText: { color: "#000", fontWeight: "500" },
//   activeTabText: { color: "#fff", fontWeight: "bold" },

//   restaurantCard: {
//     backgroundColor: "#f9f9f9",
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#eee",
//     position: "relative",
//   },
//   rowBetween: { flexDirection: "row", alignItems: "center" },
//   restaurantImage: { borderRadius: 8 },
//   restaurantName: { fontWeight: "bold", color: "#222" },
//   orderId: { color: "#666" },
//   eta: { color: "green", marginTop: 2 },
//   price: { fontWeight: "bold", color: "#000" },
//   statusTag: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     backgroundColor: "#d1f7d6",
//     color: "green",
//     fontSize: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//     fontWeight: "bold",
//   },
//   trackButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#007bff",
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   trackButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     marginRight: 8,
//   },
//   liveTag: {
//     backgroundColor: "red",
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "bold",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   statusSection: { marginTop: 10 },
//   statusTitle: {
//     fontWeight: "bold",
//     marginBottom: 12,
//     color: "#222",
//   },
//   statusRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   statusText: { flex: 1, marginLeft: 8, color: "#333" },
//   statusSubText: { color: "#666" },
//   time: { color: "#666", marginLeft: 6 },
//   bodyText: {
//     fontSize: 16,
//     color: "#444",
//     textAlign: "center",
//     marginTop: 50,
//   },

//   deliveryCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: 16,
//     borderRadius: 10,
//     marginTop: 16,
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   deliveryImage: {},
//   deliveryName: { fontWeight: "bold", color: "#222" },
//   deliveryDetails: { color: "#666" },
//   callButton: {
//     backgroundColor: "green",
//     padding: 10,
//     borderRadius: 30,
//   },

//   // Order Items Card
//   orderCard: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginTop: 16,
//     borderWidth: 1,
//     borderColor: "#eee",
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   orderTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginBottom: 12,
//     color: "#222",
//   },
//   itemRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   itemQty: { fontWeight: "bold", color: "#000", marginRight: 6 },
//   itemName: { flex: 1, color: "#333", fontSize: 15 },
//   itemPrice: { fontWeight: "600", color: "#000" },

//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 16,
//   },
//   cancelBtn: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "red",
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     marginRight: 8,
//   },
//   cancelText: { color: "red", fontWeight: "600" },
//   helpBtn: {
//     flex: 1,
//     backgroundColor: "orange",
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     marginLeft: 8,
//   },
//   helpText: { color: "#fff", fontWeight: "600" },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Live Tracking");

  const { width } = useWindowDimensions();
  const isSmall = width < 480;
  const isMedium = width >= 480 && width < 768;

  const fontScale = isSmall ? 0.9 : isMedium ? 1 : 1.1;
  const imageSize = isSmall ? 45 : isMedium ? 55 : 65;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backContainer}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { fontSize: 18 * fontScale }]}>
              Orders
            </Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "Live Tracking" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("Live Tracking")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Live Tracking" && styles.activeTabText,
                  { fontSize: 14 * fontScale },
                ]}
              >
                Live Tracking
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "Order History" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("Order History")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Order History" && styles.activeTabText,
                  { fontSize: 14 * fontScale },
                ]}
              >
                Order History
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Body */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "Live Tracking" ? (
            <>
              {/* Restaurant Card */}
              <View style={styles.restaurantCard}>
                <View style={styles.rowBetween}>
                  <Image
                    source={{ uri: "https://i.imgur.com/YkW6x0R.png" }}
                    style={[
                      styles.restaurantImage,
                      { width: imageSize, height: imageSize },
                    ]}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text
                      style={[
                        styles.restaurantName,
                        { fontSize: 16 * fontScale },
                      ]}
                    >
                      Burger Palace
                    </Text>
                    <Text
                      style={[styles.orderId, { fontSize: 14 * fontScale }]}
                    >
                      Order #order-123
                    </Text>
                    <Text style={[styles.eta, { fontSize: 12 * fontScale }]}>
                      Estimated: 10-15 min
                    </Text>
                  </View>
                  <Text style={[styles.price, { fontSize: 16 * fontScale }]}>
                    $24.99
                  </Text>
                </View>
                <Text style={styles.statusTag}>On the way</Text>
              </View>

              {/* Live Tracking Button */}
              <TouchableOpacity style={styles.trackButton} onPress={() => router.push("../map/livetacking")}>
                <Ionicons
                  name="navigate-outline"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[styles.trackButtonText, { fontSize: 16 * fontScale }]}
                >
                  View Live Tracking
                </Text>
                <Text style={styles.liveTag}>LIVE</Text>
              </TouchableOpacity>

              {/* Order Status */}
              <View style={styles.statusSection}>
                <Text
                  style={[styles.statusTitle, { fontSize: 18 * fontScale }]}
                >
                  Order Status
                </Text>

                {[
                  {
                    title: "Order Confirmed",
                    sub: "Restaurant is preparing your order",
                    time: "2:15 PM",
                  },
                  {
                    title: "Preparing Food",
                    sub: "Your delicious meal is being prepared",
                    time: "2:25 PM",
                  },
                  {
                    title: "Ready for Pickup",
                    sub: "Driver is on the way to restaurant",
                    time: "2:45 PM",
                  },
                  {
                    title: "Order Picked Up",
                    sub: "Driver is heading to your location",
                    time: "2:50 PM",
                  },
                  {
                    title: "Delivered",
                    sub: "Enjoy your meal!",
                    time: "Est. 3:05 PM",
                    color: "orange",
                  },
                ].map((step, i) => (
                  <View style={styles.statusRow} key={i}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={step.color || "green"}
                    />
                    <Text
                      style={[styles.statusText, { fontSize: 15 * fontScale }]}
                    >
                      {step.title} {"\n"}
                      <Text
                        style={[
                          styles.statusSubText,
                          { fontSize: 13 * fontScale },
                        ]}
                      >
                        {step.sub}
                      </Text>
                    </Text>
                    <Text style={[styles.time, { fontSize: 13 * fontScale }]}>
                      {step.time}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Delivery Partner Card */}
              <View style={styles.deliveryCard}>
                <Image
                  source={{ uri: "https://i.imgur.com/1X4HqkJ.png" }}
                  style={[
                    styles.deliveryImage,
                    {
                      width: imageSize,
                      height: imageSize,
                      borderRadius: imageSize / 2,
                    },
                  ]}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text
                    style={[styles.deliveryName, { fontSize: 16 * fontScale }]}
                  >
                    Mike Johnson
                  </Text>
                  <Text
                    style={[
                      styles.deliveryDetails,
                      { fontSize: 14 * fontScale },
                    ]}
                  >
                    ⭐ 4.9 · Honda Civic - ABC 123
                  </Text>
                </View>
                <TouchableOpacity style={styles.callButton}>
                  <Ionicons name="call" size={22} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Order Items */}
              <View style={styles.orderCard}>
                <Text style={styles.orderTitle}>Order Items</Text>

                <View style={styles.itemRow}>
                  <Text style={styles.itemQty}>2x</Text>
                  <Text style={styles.itemName}>Classic Beef Burger</Text>
                  <Text style={styles.itemPrice}>$12.99</Text>
                </View>

                <View style={styles.itemRow}>
                  <Text style={styles.itemQty}>1x</Text>
                  <Text style={styles.itemName}>Sweet Potato Fries</Text>
                  <Text style={styles.itemPrice}>$6.99</Text>
                </View>

                <View style={styles.itemRow}>
                  <Text style={styles.itemQty}>1x</Text>
                  <Text style={styles.itemName}>Chocolate Shake</Text>
                  <Text style={styles.itemPrice}>$5.99</Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>Cancel Order</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.helpBtn}>
                    <Text style={styles.helpText}>Need Help?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.bodyText}>
              Your past orders will show here.
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  page: { flex: 1, backgroundColor: "#fff" },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // extra padding so last card is visible
  },
  header: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  backContainer: { marginRight: 8 },
  headerTitle: { fontWeight: "bold", color: "#000" },
  tabs: { flexDirection: "row", alignItems: "center" },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginRight: 8,
  },
  activeTab: { backgroundColor: "purple", borderColor: "purple" },
  tabText: { color: "#000", fontWeight: "500" },
  activeTabText: { color: "#fff", fontWeight: "bold" },

  restaurantCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    position: "relative",
  },
  rowBetween: { flexDirection: "row", alignItems: "center" },
  restaurantImage: { borderRadius: 8 },
  restaurantName: { fontWeight: "bold", color: "#222" },
  orderId: { color: "#666" },
  eta: { color: "green", marginTop: 2 },
  price: { fontWeight: "bold", color: "#000" },
  statusTag: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#d1f7d6",
    color: "green",
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: "bold",
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  trackButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 8,
  },
  liveTag: {
    backgroundColor: "red",
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusSection: { marginTop: 10 },
  statusTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statusText: { flex: 1, marginLeft: 8, color: "#333" },
  statusSubText: { color: "#666" },
  time: { color: "#666", marginLeft: 6 },
  bodyText: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginTop: 50,
  },

  deliveryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  deliveryImage: {},
  deliveryName: { fontWeight: "bold", color: "#222" },
  deliveryDetails: { color: "#666" },
  callButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 30,
  },

  orderCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#222",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  itemQty: { fontWeight: "bold", color: "#000", marginRight: 6 },
  itemName: { flex: 1, color: "#333", fontSize: 15 },
  itemPrice: { fontWeight: "600", color: "#000" },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  cancelText: { color: "red", fontWeight: "600" },
  helpBtn: {
    flex: 1,
    backgroundColor: "orange",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  helpText: { color: "#fff", fontWeight: "600" },
});
