// import React from 'react';
// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
// import { CartContext } from '../CartContext';
// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={({ route }): BottomTabNavigationOptions => ({
//         headerShown: false,
//         tabBarActiveTintColor: 'purple',
//         tabBarInactiveTintColor: 'gray',
//         tabBarIcon: ({ focused, color }) => {
//           let iconName: string;

//           switch (route.name) {
//             case 'index':
//               iconName = focused ? 'home' : 'home-outline';
//               break;
//             case 'explore':
//               iconName = focused ? 'search' : 'search-outline';
//               break;
//             case 'cart':
//               iconName = focused ? 'cart' : 'cart-outline';
//               break;
//             case 'orders':
//               iconName = focused ? 'cube' : 'cube-outline';
//               break;
//             case 'profile':
//               iconName = focused ? 'person' : 'person-outline';
//               break;
//             default:
//               iconName = 'alert-circle-outline';
//               break;
//           }

//           return <Ionicons name={iconName as any} size={24} color={color} />;
//         },
//       })}
//     >
//       <Tabs.Screen name="index" options={{ title: 'Home' }} />
//       <Tabs.Screen name="explore" options={{ title: 'Search' }} />
//       <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
//       <Tabs.Screen name="order" options={{ title: 'Orders' }} />
//       <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
//     </Tabs>
//   );
// }

// import React, { useContext } from 'react';
// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
// import { CartContext } from '../CartContext'; // adjust path as needed

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);

//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <Tabs
//       screenOptions={({ route }): BottomTabNavigationOptions => {
//         let iconName: string;

//         switch (route.name) {
//           case 'index':
//             iconName = 'home-outline';
//             break;
//           case 'explore':
//             iconName = 'search-outline';
//             break;
//           case 'cart':
//             iconName = 'cart-outline';
//             break;
//           case 'order':
//             iconName = 'cube-outline';
//             break;
//           case 'profile':
//             iconName = 'person-outline';
//             break;
//           default:
//             iconName = 'alert-circle-outline';
//         }

//         return {
//           headerShown: false,
//           tabBarActiveTintColor: 'purple',
//           tabBarInactiveTintColor: 'gray',
//           tabBarIcon: ({ color }) => (
//             <Ionicons name={iconName as any} size={24} color={color} />
//           ),
//         };
//       }}
//     >
//       <Tabs.Screen name="index" options={{ title: 'Home' }} />
//       <Tabs.Screen name="explore" options={{ title: 'Search' }} />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: 'Cart',
//           tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//           tabBarBadgeStyle: { backgroundColor: 'purple', color: 'white' },
//         }}
//       />
//       <Tabs.Screen name="order" options={{ title: 'Orders' }} />
//       <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
//     </Tabs>
//   );
// }


// import React, { useContext } from 'react';
// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
// import { CartContext } from '../../context/CartContext'; // Adjust path as needed

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);
//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <Tabs
//       screenOptions={({ route }): BottomTabNavigationOptions => {
//         let iconName: string;

//         switch (route.name) {
//           case 'index':
//             iconName = 'home-outline';
//             break;
//           case 'explore':
//             iconName = 'search-outline';
//             break;
//           case 'cart':
//             iconName = 'cart-outline';
//             break;
//           case 'order':
//             iconName = 'cube-outline';
//             break;
//           case 'profile':
//             iconName = 'person-outline';
//             break;
//           default:
//             iconName = 'alert-circle-outline';
//         }

//         return {
//           headerShown: false,
//           tabBarActiveTintColor: 'purple',
//           tabBarInactiveTintColor: 'gray',
//           tabBarIcon: ({ color, focused }) => (
//             <Ionicons
//               name={iconName as any}
//               size={24}
//               color={color}
//               style={{ marginBottom: -3 }} // Small adjustment for badge space
//             />
//           ),
//           tabBarLabelStyle: { fontSize: 12 },
//         };
//       }}
//     >
//       <Tabs.Screen name="index" options={{ title: 'Home' }} />
//       <Tabs.Screen name="explore" options={{ title: 'Search' }} />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: 'Cart',
//           tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//           tabBarBadgeStyle: {
//             backgroundColor: 'purple',
//             color: 'white',
//             fontSize: 11,
//             fontWeight: 'bold',
//             minWidth: 18,
//             height: 18,
//             borderRadius: 9,
//             alignItems: 'center',
//             justifyContent: 'center',
//           },
//         }}
//       />
//       <Tabs.Screen name="order" options={{ title: 'Orders' }} />
//       <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
//     </Tabs>
//   );
// }


// import React, { useContext } from 'react';
// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { useWindowDimensions, Platform } from 'react-native';
// import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
// import { CartContext } from '../../context/CartContext';

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);
//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   const { width, height } = useWindowDimensions();

//   // Define breakpoints similar to Bootstrap
//   const isSmall = width < 480;   // Small phones
//   const isMedium = width >= 480 && width < 768; // Large phones/tablets
//   const isLarge = width >= 768;  // Tablets / Laptops

//   return (
//     <Tabs
//       screenOptions={({ route }): BottomTabNavigationOptions => {
//         let iconName: string;

//         switch (route.name) {
//           case 'index':
//             iconName = 'home-outline';
//             break;
//           case 'explore':
//             iconName = 'search-outline';
//             break;
//           case 'cart':
//             iconName = 'cart-outline';
//             break;
//           case 'order':
//             iconName = 'cube-outline';
//             break;
//           case 'profile':
//             iconName = 'person-outline';
//             break;
//           default:
//             iconName = 'alert-circle-outline';
//         }

//         return {
//           headerShown: false,
//           tabBarActiveTintColor: 'purple',
//           tabBarInactiveTintColor: 'gray',

//           // Responsive tab bar style
//           tabBarStyle: {
//             height: isSmall ? 55 : isMedium ? 65 : 75,
//             paddingBottom: Platform.OS === 'ios' ? 10 : 6,
//             paddingTop: isLarge ? 10 : 4,
//           },

//           // Responsive label style
//           tabBarLabelStyle: {
//             fontSize: isSmall ? 10 : isMedium ? 12 : 14,
//             fontWeight: isLarge ? '600' : '500',
//           },

//           tabBarIcon: ({ color }) => (
//             <Ionicons
//               name={iconName as any}
//               size={isSmall ? 20 : isMedium ? 24 : 28} // responsive icon size
//               color={color}
//               style={{ marginBottom: -3 }}
//             />
//           ),
//         };
//       }}
//     >
//       <Tabs.Screen name="index" options={{ title: 'Home' }} />
//       <Tabs.Screen name="explore" options={{ title: 'Search' }} />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: 'Cart',
//           tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//           tabBarBadgeStyle: {
//             backgroundColor: 'purple',
//             color: 'white',
//             fontSize: 11,
//             fontWeight: 'bold',
//             minWidth: 18,
//             height: 18,
//             borderRadius: 9,
//             alignItems: 'center',
//             justifyContent: 'center',
//           },
//         }}
//       />
//       <Tabs.Screen name="order" options={{ title: 'Orders' }} />
//       <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
//     </Tabs>
//   );
// }



// import React, { useContext } from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   useWindowDimensions,
//   Platform,
//   SafeAreaView,
//   View,
// } from "react-native";
// import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
// import { CartContext } from "../../context/CartContext";

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);
//   const cartItemCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   const { width } = useWindowDimensions();

//   // Define responsive breakpoints
//   const isSmall = width < 480; // Small phones
//   const isMedium = width >= 480 && width < 768; // Large phones
//   const isLarge = width >= 768; // Tablets / Laptops

//   // Dynamic sizes
//   const tabBarHeight = isSmall ? 55 : isMedium ? 65 : 80;
//   const iconSize = isSmall ? 22 : isMedium ? 26 : 32;
//   const labelSize = isSmall ? 10 : isMedium ? 12 : 14;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Tabs
//         screenOptions={({ route }): BottomTabNavigationOptions => {
//           let iconName: string;

//           switch (route.name) {
//             case "index":
//               iconName = "home-outline";
//               break;
//             case "explore":
//               iconName = "search-outline";
//               break;
//             case "cart":
//               iconName = "cart-outline";
//               break;
//             case "order":
//               iconName = "cube-outline";
//               break;
//             case "profile":
//               iconName = "person-outline";
//               break;
//             default:
//               iconName = "alert-circle-outline";
//           }

//           return {
//             headerShown: false,
//             tabBarActiveTintColor: "purple",
//             tabBarInactiveTintColor: "gray",

//             tabBarStyle: {
//               height: tabBarHeight,
//               paddingBottom: Platform.OS === "ios" ? 12 : 8,
//               paddingTop: isLarge ? 8 : 4,
//             },

//             tabBarLabelStyle: {
//               fontSize: labelSize,
//               fontWeight: isLarge ? "600" : "500",
//             },

//             tabBarIcon: ({ color }) => (
//               <View>
//                 <Ionicons
//                   name={iconName as any}
//                   size={iconSize}
//                   color={color}
//                 />
//               </View>
//             ),
//           };
//         }}
//       >
//         <Tabs.Screen name="index" options={{ title: "Home" }} />
//         <Tabs.Screen name="explore" options={{ title: "Search" }} />
//         <Tabs.Screen
//           name="cart"
//           options={{
//             title: "Cart",
//             tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//             tabBarBadgeStyle: {
//               backgroundColor: "purple",
//               color: "white",
//               fontSize: 11,
//               fontWeight: "bold",
//               minWidth: 18,
//               height: 18,
//               borderRadius: 9,
//               alignItems: "center",
//               justifyContent: "center",
//             },
//           }}
//         />
//         <Tabs.Screen name="order" options={{ title: "Orders" }} />
//         <Tabs.Screen name="profile" options={{ title: "Profile" }} />
//       </Tabs>
//     </SafeAreaView>
//   );
// }


// import React, { useContext } from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   useWindowDimensions,
//   Platform,
//   SafeAreaView,
//   View,
// } from "react-native";
// import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
// import { CartContext } from "../../context/CartContext";

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);
//   const cartItemCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   const { width } = useWindowDimensions();

//   // Responsive breakpoints
//   const isSmall = width < 480; // Small phones
//   const isMedium = width >= 480 && width < 768; // Large phones
//   const isLarge = width >= 768; // Tablets / Laptops

//   // Dynamic sizing
//   const tabBarHeight = isSmall ? 55 : isMedium ? 65 : 80;
//   const iconSize = isSmall ? 22 : isMedium ? 26 : 32;
//   const labelSize = isSmall ? 10 : isMedium ? 12 : 14;

//   // Adjust icon vertical alignment
//   const iconOffset = isSmall ? -2 : isMedium ? -3 : -4; // move up slightly

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       <Tabs
//         screenOptions={({ route }): BottomTabNavigationOptions => {
//           let iconName: string;

//           switch (route.name) {
//             case "index":
//               iconName = "home-outline";
//               break;
//             case "explore":
//               iconName = "search-outline";
//               break;
//             case "cart":
//               iconName = "cart-outline";
//               break;
//             case "order":
//               iconName = "cube-outline";
//               break;
//             case "profile":
//               iconName = "person-outline";
//               break;
//             default:
//               iconName = "alert-circle-outline";
//           }

//           return {
//             headerShown: false,
//             tabBarActiveTintColor: "purple",
//             tabBarInactiveTintColor: "gray",

//             tabBarStyle: {
//               height: tabBarHeight,
//               paddingBottom: Platform.OS === "ios" ? 12 : 8,
//               paddingTop: isLarge ? 8 : 4,
//             },

//             tabBarLabelStyle: {
//               fontSize: labelSize,
//               fontWeight: isLarge ? "600" : "500",
//             },

//             // Icon with vertical adjustment
//             tabBarIcon: ({ color }) => (
//               <View style={{ marginTop: iconOffset }}>
//                 <Ionicons name={iconName as any} size={iconSize} color={color} />
//               </View>
//             ),
//           };
//         }}
//       >
//         <Tabs.Screen name="index" options={{ title: "Home" }} />
//         <Tabs.Screen name="explore" options={{ title: "Search" }} />
//         <Tabs.Screen
//           name="cart"
//           options={{
//             title: "Cart",
//             tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//             tabBarBadgeStyle: {
//               backgroundColor: "purple",
//               color: "white",
//               fontSize: 11,
//               fontWeight: "bold",
//               minWidth: 18,
//               height: 18,
//               borderRadius: 9,
//               alignItems: "center",
//               justifyContent: "center",
//             },
//           }}
//         />
//         <Tabs.Screen name="order" options={{ title: "Orders" }} />
//         <Tabs.Screen name="profile" options={{ title: "Profile" }} />
//       </Tabs>
//     </SafeAreaView>
//   );
// }

// import React, { useContext } from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   useWindowDimensions,
//   Platform,
//   SafeAreaView,
//   View,
//   StyleSheet,
// } from "react-native";
// import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
// import { CartContext } from "../../context/CartContext";

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);
//   const cartItemCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   const { width } = useWindowDimensions();

//   // Responsive breakpoints
//   const isSmall = width < 480;
//   const isMedium = width >= 480 && width < 768;
//   const isLarge = width >= 768;

//   const tabBarHeight = isSmall ? 55 : isMedium ? 65 : 75;
//   const iconSize = isSmall ? 22 : isMedium ? 26 : 30;
//   const labelSize = isSmall ? 10 : isMedium ? 12 : 14;
//   const iconOffset = isLarge ? -2 : 0;

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <Tabs
//           screenOptions={({ route }): BottomTabNavigationOptions => {
//             let iconName: string;

//             switch (route.name) {
//               case "index":
//                 iconName = "home-outline";
//                 break;
//               case "explore":
//                 iconName = "search-outline";
//                 break;
//               case "cart":
//                 iconName = "cart-outline";
//                 break;
//               case "order":
//                 iconName = "cube-outline";
//                 break;
//               case "profile":
//                 iconName = "person-outline";
//                 break;
//               default:
//                 iconName = "alert-circle-outline";
//             }

//             return {
//               headerShown: false,
//               tabBarActiveTintColor: "purple",
//               tabBarInactiveTintColor: "gray",

//               tabBarStyle: {
//                 height: tabBarHeight,
//                 paddingBottom: Platform.OS === "ios" ? 8 : 6,
//                 paddingTop: 4,
//               },

//               tabBarLabelStyle: {
//                 fontSize: labelSize,
//                 marginTop: -2,
//                 fontWeight: isLarge ? "600" : "500",
//               },

//               tabBarIcon: ({ color }) => (
//                 <View style={{ marginTop: iconOffset }}>
//                   <Ionicons
//                     name={iconName as any}
//                     size={iconSize}
//                     color={color}
//                   />
//                 </View>
//               ),
//             };
//           }}
//         >
//           <Tabs.Screen name="index" options={{ title: "Home" }} />
//           <Tabs.Screen name="explore" options={{ title: "Search" }} />
//           <Tabs.Screen
//             name="cart"
//             options={{
//               title: "Cart",
//               tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//               tabBarBadgeStyle: {
//                 backgroundColor: "purple",
//                 color: "white",
//                 fontSize: 11,
//                 fontWeight: "bold",
//                 minWidth: 18,
//                 height: 18,
//                 borderRadius: 9,
//                 alignItems: "center",
//                 justifyContent: "center",
//               },
//             }}
//           />
//           <Tabs.Screen name="order" options={{ title: "Orders" }} />
//           <Tabs.Screen name="profile" options={{ title: "Profile" }} />
//         </Tabs>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//   },
// });


// import React, { useContext } from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   useWindowDimensions,
//   Platform,
//   SafeAreaView,
//   View,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
// import { useRouter } from "expo-router";
// import { CartContext } from "../../context/CartContext";

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);
//   const router = useRouter();

//   const cartItemCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   const { width } = useWindowDimensions();

//   const isSmall = width < 480;
//   const isMedium = width >= 480 && width < 768;
//   const isLarge = width >= 768;

//   const tabBarHeight = isSmall ? 55 : isMedium ? 65 : 75;
//   const iconSize = isSmall ? 22 : isMedium ? 26 : 30;
//   const labelSize = isSmall ? 10 : isMedium ? 12 : 14;
//   const iconOffset = isLarge ? -2 : 0;

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <Tabs
//           screenOptions={({ route }): BottomTabNavigationOptions => {
//             let iconName: string;

//             switch (route.name) {
//               case "index":
//                 iconName = "home-outline";
//                 break;
//               case "explore":
//                 iconName = "search-outline";
//                 break;
//               case "cart":
//                 iconName = "cart-outline";
//                 break;
//               case "order":
//                 iconName = "cube-outline";
//                 break;
//               default:
//                 iconName = "alert-circle-outline";
//             }

//             return {
//               headerShown: false,
//               tabBarActiveTintColor: "purple",
//               tabBarInactiveTintColor: "gray",
//               tabBarStyle: {
//                 height: tabBarHeight,
//                 paddingBottom: Platform.OS === "ios" ? 8 : 6,
//                 paddingTop: 4,
//               },
//               tabBarLabelStyle: {
//                 fontSize: labelSize,
//                 marginTop: -2,
//                 fontWeight: isLarge ? "600" : "500",
//               },
//               tabBarIcon: ({ color }) => (
//                 <View style={{ marginTop: iconOffset }}>
//                   <Ionicons
//                     name={iconName as any}
//                     size={iconSize}
//                     color={color}
//                   />
//                 </View>
//               ),
//             };
//           }}
//         >
//           {/* <Tabs.Screen
//             name="index"
//             options={{
//               title: "Home",
//               headerShown: true,
//               headerRight: () => (
//                 <TouchableOpacity
//                   onPress={() => router.push("/profile")}
//                   style={{ marginRight: 15 }}
//                 >
//                   <Ionicons name="person-circle-outline" size={28} color="purple" />
//                 </TouchableOpacity>
//               ),
//             }}
//           /> */}
//           <Tabs.Screen name="index" options={{ title: "Home" }} />
//           <Tabs.Screen name="explore" options={{ title: "Search" }} />
//           <Tabs.Screen
//             name="cart"
//             options={{
//               title: "Cart",
//               tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//               tabBarBadgeStyle: {
//                 backgroundColor: "purple",
//                 color: "white",
//                 fontSize: 11,
//                 fontWeight: "bold",
//                 minWidth: 18,
//                 height: 18,
//                 borderRadius: 9,
//                 alignItems: "center",
//                 justifyContent: "center",
//               },
//             }}
//           />
//           <Tabs.Screen name="order" options={{ title: "Orders" }} />
//           {/* 🚫 Removed Profile tab from footer */}
//         </Tabs>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//   },
// });

//dont touch


// import React, { useContext } from "react";
// import { Tabs, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   useWindowDimensions,
//   Platform,
//   SafeAreaView,
//   View,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
// import { CartContext } from "../../context/CartContext";
// import { AuthContext } from "@/context/Auth";

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const router = useRouter();

//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   const { width } = useWindowDimensions();
//   const isSmall = width < 480;
//   const isMedium = width >= 480 && width < 768;
//   const isLarge = width >= 768;

//   const tabBarHeight = isSmall ? 55 : isMedium ? 65 : 75;
//   const iconSize = isSmall ? 22 : isMedium ? 26 : 30;
//   const labelSize = isSmall ? 10 : isMedium ? 12 : 14;
//   const iconOffset = isLarge ? -2 : 0;

//   const handleProfileClick = () => {
//     if (user) {
//       router.push("/profile"); // ✅ If logged in → Go to Profile
//     } else {
//       router.push("/login");   // ❌ Not logged in → Redirect to Login
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <Tabs
//           screenOptions={({ route }): BottomTabNavigationOptions => {
//             let iconName: string;

//             switch (route.name) {
//               case "index":
//                 iconName = "home-outline";
//                 break;
//               case "explore":
//                 iconName = "search-outline";
//                 break;
//               case "cart":
//                 iconName = "cart-outline";
//                 break;
//               case "order":
//                 iconName = "cube-outline";
//                 break;
//               default:
//                 iconName = "alert-circle-outline";
//             }

//             return {
//               headerShown: false,
//               tabBarActiveTintColor: "purple",
//               tabBarInactiveTintColor: "gray",
//               tabBarStyle: {
//                 height: tabBarHeight,
//                 paddingBottom: Platform.OS === "ios" ? 8 : 6,
//                 paddingTop: 4,
//               },
//               tabBarLabelStyle: {
//                 fontSize: labelSize,
//                 marginTop: -2,
//                 fontWeight: isLarge ? "600" : "500",
//               },
//               tabBarIcon: ({ color }) => (
//                 <View style={{ marginTop: iconOffset }}>
//                   <Ionicons
//                     name={iconName as any}
//                     size={iconSize}
//                     color={color}
//                   />
//                 </View>
//               ),
//             };
//           }}
//         >
//           <Tabs.Screen
//             name="index"
//             options={{
//               title: "Home",
//               headerShown: false,
//               headerRight: () => (
//                 <TouchableOpacity
//                   onPress={handleProfileClick}
//                   style={{ marginRight: 15 }}
//                 >
//                   <Ionicons name="person-circle-outline" size={28} color="purple" />
//                 </TouchableOpacity>
//               ),
//             }}
//           />
//           <Tabs.Screen name="explore" options={{ title: "Search" }} />
//           <Tabs.Screen
//             name="cart"
//             options={{
//               title: "Cart",
//               tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//               tabBarBadgeStyle: {
//                 backgroundColor: "purple",
//                 color: "white",
//                 fontSize: 11,
//                 fontWeight: "bold",
//                 minWidth: 18,
//                 height: 18,
//                 borderRadius: 9,
//                 alignItems: "center",
//                 justifyContent: "center",
//               },
//             }}
//           />
//           <Tabs.Screen name="order" options={{ title: "Orders" }} />
//         </Tabs>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//   },
// });

// import React, { useContext } from "react";
// import { Tabs, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { Platform } from "react-native";
// import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
// import { CartContext } from "../../context/CartContext";
// import { AuthContext } from "@/context/Auth";

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const router = useRouter();

//   // Calculate total items in the cart
//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <Tabs
//       screenOptions={({ route }): BottomTabNavigationOptions => {
//         // Mapping icons to tab names
//         const iconMap: Record<string, string> = {
//           icon: "restaurant-outline", // ✅ Jokha icon added
//           index: "fast-food-outline",
//           explore: "search-outline",
//           cart: "cart-outline",
//           order: "cube-outline",
//         };

//         return {
//           headerShown: false,
//           tabBarActiveTintColor: "purple",
//           tabBarInactiveTintColor: "gray",
//           tabBarStyle: {
//             height: 60,
//             paddingBottom: Platform.OS === "ios" ? 8 : 6,
//             paddingTop: 4,
//           },
//           tabBarLabelStyle: {
//             fontSize: 12,
//             fontWeight: "600",
//           },
//           tabBarIcon: ({ color }) => (
//             <Ionicons
//               name={iconMap[route.name] as any}
//               size={24}
//               color={color}
//             />
//           ),
//         };
//       }}
//     >
//       {/* ✅ Jokha Tab Added */}
//       <Tabs.Screen
//         name="icon"
//         options={{
//           title: "Jokha",
//         }}
//       />

//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Food",
//         }}
//       />

//       <Tabs.Screen name="explore" options={{ title: "Search" }} />

//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: "Cart",
//           tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//           tabBarBadgeStyle: {
//             backgroundColor: "purple",
//             color: "white",
//             fontSize: 11,
//             fontWeight: "bold",
//           },
//         }}
//       />

//       <Tabs.Screen name="order" options={{ title: "Order" }} />
//     </Tabs>
//   );
// }


// import React, { useContext } from "react";
// import { Tabs, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { Platform } from "react-native";
// import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
// import { CartContext } from "../../context/CartContext";
// import { AuthContext } from "@/context/Auth";

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const router = useRouter();

//   // Calculate total items in the cart
//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <Tabs
//       screenOptions={({ route }): BottomTabNavigationOptions => {
//         const iconMap: Record<string, string> = {
//           icon: "restaurant-outline", // Jokha
//           index: "fast-food-outline", // Food
//           explore: "search-outline", // Search
//           cart: "cart-outline", // Cart
//           order: "cube-outline", // Orders
//         };

//         return {
//           headerShown: false,
//           tabBarActiveTintColor: "purple",
//           tabBarInactiveTintColor: "#777",

//           // ✅ Full width footer touching edges
//           tabBarStyle: {
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             backgroundColor: "#fff",
//             height: 65,
//             borderTopLeftRadius: 15,
//             borderTopRightRadius: 15,
//             elevation: 6,
//             shadowColor: "#000",
//             shadowOpacity: 0.08,
//             shadowOffset: { width: 0, height: 4 },
//             shadowRadius: 8,
//           },

//           tabBarLabelStyle: {
//             fontSize: 12,
//             fontWeight: "600",
//             marginBottom: 4,
//           },

//           tabBarHideOnKeyboard: true, // ✅ Hide tab bar when keyboard opens
//           tabBarIcon: ({ color }) => (
//             <Ionicons
//               name={iconMap[route.name] as any}
//               size={26}
//               color={color}
//             />
//           ),
//         };
//       }}
//     >
//       <Tabs.Screen name="icon" options={{ title: "Jokha" }} />
//       <Tabs.Screen name="index" options={{ title: "Food" }} />
//       <Tabs.Screen name="explore" options={{ title: "Search" }} />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: "Cart",
//           tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//           tabBarBadgeStyle: {
//             backgroundColor: "purple",
//             color: "white",
//             fontSize: 11,
//             fontWeight: "bold",
//           },
//         }}
//       />
//       <Tabs.Screen name="order" options={{ title: "Order" }} />
//     </Tabs>
//   );
// }

// import React, { useContext } from "react";
// import { Tabs, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { Platform } from "react-native";
// import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
// import { CartContext } from "../../context/CartContext";
// import { AuthContext } from "@/context/Auth";

// export default function TabsLayout() {
//   const { cartItems } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const router = useRouter();

//   // ✅ Calculate total items in the cart
//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <Tabs
//       screenOptions={({ route }): BottomTabNavigationOptions => {
//         const iconMap: Record<string, string> = {
//           icon: "restaurant-outline", // Jokha
//           index: "fast-food-outline", // Food
//           explore: "search-outline", // Search
//           cart: "cart-outline", // Cart
//           order: "cube-outline", // Orders
//         };

//         return {
//           headerShown: false,
//           tabBarActiveTintColor: "purple", // Purple
//           tabBarInactiveTintColor: "#777",

//           // ✅ Proper tab bar styling with padding to avoid overlapping
//           tabBarStyle: {
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             backgroundColor: "#fff",
//             height: 65,
//             borderTopLeftRadius: 15,
//             borderTopRightRadius: 15,
//             elevation: 8,
//             shadowColor: "#000",
//             shadowOpacity: 0.1,
//             shadowOffset: { width: 0, height: 4 },
//             shadowRadius: 8,
//             paddingBottom: Platform.OS === "ios" ? 10 : 6,
//           },

//           tabBarLabelStyle: {
//             fontSize: 12,
//             fontWeight: "600",
//             marginBottom: 4,
//           },

//           // ✅ Hides tab bar when keyboard opens
//           tabBarHideOnKeyboard: true,

//           // ✅ Use icons
//           tabBarIcon: ({ color }) => (
//             <Ionicons
//               name={iconMap[route.name] as any}
//               size={26}
//               color={color}
//             />
//           ),
//         };
//       }}
//     >
//       <Tabs.Screen name="icon" options={{ title: "Jokha" }} />
//       <Tabs.Screen name="index" options={{ title: "Food" }} />
//       <Tabs.Screen name="explore" options={{ title: "Search" }} />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: "Cart",
//           tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
//           tabBarBadgeStyle: {
//             backgroundColor: "purple",
//             color: "white",
//             fontSize: 11,
//             fontWeight: "bold",
//           },
//         }}
//       />
//       <Tabs.Screen name="order" options={{ title: "Order" }} />
//     </Tabs>
//   );
// }//dont touch


import React, { useContext } from "react";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "@/context/Auth";

export default function TabsLayout() {
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // ✅ Calculate total items in the cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Tabs
      screenOptions={({ route }): BottomTabNavigationOptions => {
        const iconMap: Record<string, string> = {
          icon: "restaurant-outline", // Jokha
          index: "fast-food-outline", // Food
          explore: "search-outline", // Search
          cart: "cart-outline", // Cart
          order: "cube-outline", // Orders
        };

        return {
          headerShown: false,
          tabBarActiveTintColor: "purple", // Active tab color
          tabBarInactiveTintColor: "#777",

          // ✅ Proper tab bar styling
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            height: 65,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            elevation: 8,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            paddingBottom: Platform.OS === "ios" ? 10 : 6,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 4,
          },

          tabBarHideOnKeyboard: true,

          // ✅ Icons
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={iconMap[route.name] as any}
              size={26}
              color={color}
            />
          ),
        };
      }}
    >
      <Tabs.Screen name="icon" options={{ title: "Jokha" }} />
      <Tabs.Screen name="index" options={{ title: "Food" }} />
      {/* <Tabs.Screen name="explore" options={{ title: "Search" }} /> */}

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "purple",
            color: "white",
            fontSize: 11,
            fontWeight: "bold",
          },
        }}
      />

      <Tabs.Screen name="order" options={{ title: "Order" }} />
    </Tabs>
  );
}
