

// import React, { useContext, useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   useWindowDimensions,
//   FlatList,
//   ActivityIndicator,
//   Image,
//   Platform,
//   KeyboardAvoidingView,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { useRouter } from "expo-router";
// import axios from "axios";
// import { AuthContext } from "@/context/Auth";
// import { LocationContext } from "@/context/locationContent";
// import { useDispatch, useSelector } from "react-redux";
// import { setSavedAddresses } from "../actioncreator/saveaddaction";

// const GOOGLE_API_KEY = "AIzaSyDbhDt1_GZG_bW-3f5s6cfSTY2CepE4GEg";

// export default function LocationScreen() {
//   const router = useRouter();
//   const { width } = useWindowDimensions();
//   const { user } = useContext(AuthContext);
//   const { addLocation, recentLocations } = useContext(LocationContext);

//   const dispatch = useDispatch();
//   const savedAddresses = useSelector((state: any) => state.location.savedAddresses || []);

//   const [searchText, setSearchText] = useState("");
//   const [places, setPlaces] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingSaved, setFetchingSaved] = useState(false);

//   const isTablet = width > 768;
//   const horizontalPadding = isTablet ? 40 : 15;

//   // Debounce helper
//   const debounce = (fn: Function, delay: number) => {
//     let timeout: ReturnType<typeof setTimeout>;
//     return (...args: any[]) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => fn(...args), delay);
//     };
//   };

//   // ------------------- FETCH SAVED ADDRESSES -------------------
//   const fetchSavedAddresses = async () => {
//     if (!user?.token) {
//       dispatch(setSavedAddresses([]));
//       return;
//     }
//     try {
//       setFetchingSaved(true);
//       const res = await axios.get(`http://192.168.0.106:9094/customers/address`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });

//       if (res.status >= 200 && res.status < 300) {
//         const addresses = Array.isArray(res.data) ? res.data : [];
//         dispatch(setSavedAddresses(addresses));
//       } else {
//         dispatch(setSavedAddresses([]));
//       }
//     } catch (err: any) {
//       console.log("Fetch Saved Addresses Error:", err?.response?.data || err?.message);
//       dispatch(setSavedAddresses([]));
//     } finally {
//       setFetchingSaved(false);
//     }
//   };

//   useEffect(() => {
//     fetchSavedAddresses();
//   }, [user]);

//   // ------------------- DELETE ADDRESS -------------------
//   const deleteAddress = async (id: number) => {
//     if (!user?.token) return Alert.alert("Error", "Login required");
//     try {
//       const res = await axios.delete(`http://192.168.0.106:9094/customers/address/${id}`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });

//       if (res.status >= 200 && res.status < 300) {
//         const updated = savedAddresses.filter((addr: any) => addr.addressId !== id);
//         dispatch(setSavedAddresses(updated));
//         Alert.alert("Deleted", "Address removed successfully");
//       } else {
//         Alert.alert("Error", "Failed to delete address");
//       }
//     } catch (err: any) {
//       console.log("Delete Address Error:", err?.response?.data || err?.message);
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   const confirmDelete = (id: number) => {
//     Alert.alert(
//       "Delete Address",
//       "Are you sure you want to delete this address?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Delete", style: "destructive", onPress: () => deleteAddress(id) },
//       ]
//     );
//   };

//   // ------------------- HANDLE SAVED ADDRESS CLICK -------------------
//   const handleSavedAddressClick = (item: any) => {
//     const lat = item.latitude;
//     const lng = item.longitude;
//     const address = item.fullAddress || "";

//     if (lat === undefined || lng === undefined) {
//       return Alert.alert("Location Unavailable", "Coordinates for this saved address are missing.");
//     }

//     addLocation({ address, lat, lng });

//     // Navigate to usedetect in edit mode for pencil / saved address
//     router.push({
//       pathname: "../map/usedetect",
//       params: {
//         edit: "true",
//         lat: lat.toString(),
//         lng: lng.toString(),
//         address,
//         addressId: item.addressId,
//         houseFlatBlock: item.houseFlatBlock || "",
//         floor: item.floor || "",
//         apartmentRoadArea: item.apartmentRoadArea || "",
//         label: item.addressType,
//         customAddressLabel: item.customAddressLabel,
//         phone: item.phone || "",
//       },
//     });
//   };

//   // ------------------- GOOGLE PLACES AUTOCOMPLETE -------------------
//   const searchPlacesAPI = async (text: string) => {
//     if (text.length < 2) {
//       setPlaces([]);
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&language=en&components=country:in`
//       );
//       setPlaces(res.data.status === "OK" ? res.data.predictions : []);
//     } catch (e) {
//       console.log("Autocomplete API Error:", e);
//       setPlaces([]);
//     }
//     setLoading(false);
//   };

//   const searchPlaces = useCallback(debounce(searchPlacesAPI, 300), []);

//   const selectPlace = async (placeId: string, description: string) => {
//     try {
//       const res = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
//       );
//       const loc = res.data.result?.geometry?.location;
//       const formattedAddress = res.data.result?.formatted_address || "";

//       if (!loc) {
//         Alert.alert("Error", "Failed to get location");
//         return;
//       }

//       addLocation({ address: formattedAddress, lat: loc.lat, lng: loc.lng });
//       setSearchText("");
//       setPlaces([]);

//       // Navigate to usedetect for selected place (current/recent flow)
//       router.push({
//         pathname: "../map/usedetect",
//         params: {
//           mode: "current",
//           lat: loc.lat.toString(),
//           lng: loc.lng.toString(),
//           address: formattedAddress,
//         },
//       });
//     } catch (e) {
//       console.log("Place Details API Error:", e);
//     }
//   };

//   const renderSuggestion = ({ item }: { item: any }) => (
//     <TouchableOpacity
//       style={styles.suggestionItem}
//       onPress={() => selectPlace(item.place_id, item.description)}
//     >
//       <Text style={styles.suggestionText}>{item.description}</Text>
//     </TouchableOpacity>
//   );

//   // ------------------- RENDER MAIN CONTENT -------------------
//   const renderMainContent = () => {
//     if (searchText.length > 0) {
//       return (
//         <>
//           <View style={styles.buttonRow}>
//             <TouchableOpacity
//               style={styles.locationButton}
//               onPress={() =>
//                 router.push({
//                   pathname: "../map/usedetect",
//                   params: { mode: "current" },
//                 })
//               }
//             >
//               <Ionicons name="locate-outline" size={22} color="black" />
//               <Text style={styles.buttonText}>Use Current Location</Text>
//             </TouchableOpacity>

//             {user && (
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => router.push({
//                     pathname:"../map/usedetect",
//                     params:{mode:"saved"}
//                   })}
//               >
//                 <Ionicons name="add-outline" size={22} color="#fff" />
//                 <Text style={styles.addButtonText}>Add New Address</Text>
//               </TouchableOpacity>
//             )}
//           </View>

//           {loading ? (
//             <ActivityIndicator size="small" color="purple" style={{ marginTop: 20 }} />
//           ) : (
//             <FlatList
//               data={places}
//               keyExtractor={(item) => item.place_id}
//               renderItem={renderSuggestion}
//               keyboardShouldPersistTaps="handled"
//               style={{ flex: 1 }}
//             />
//           )}
//         </>
//       );
//     }

//     return (
//       <FlatList
//         ListHeaderComponent={
//           <>
//             <View style={styles.buttonRow}>
//               <TouchableOpacity
//                 style={styles.locationButton}
//                 onPress={() =>
//                   router.push({
//                     pathname: "../map/usedetect",
//                     params: { mode: "current" },
//                   })
//                 }
//               >
//                 <Ionicons name="locate-outline" size={22} color="black" />
//                 <Text style={styles.buttonText}>Use Current Location</Text>
//               </TouchableOpacity>

//               {user && (
//                 <TouchableOpacity
//                   style={styles.addButton}
//                   onPress={() => router.push({
//                     pathname:"../map/usedetect",
//                     params:{mode:"saved"}
//                   })}
//                 >
//                   <Ionicons name="add-outline" size={22} color="#fff" />
//                   <Text style={styles.addButtonText}>Add New Address</Text>
//                 </TouchableOpacity>
//               )}
//             </View>

//             {!user && (
//               <View style={styles.lockContainer}>
//                 <Image
//                   source={{ uri: "https://cdn-icons-png.flaticon.com/512/6195/6195699.png" }}
//                   style={styles.lockImage}
//                 />
//                 <Text style={styles.lockTitle}>Looks like you’re logged out</Text>
//                 <Text style={styles.lockSubtitle}>Please log in to see saved addresses</Text>
//                 <TouchableOpacity
//                   style={styles.loginButton}
//                   onPress={() => router.push("/login")}
//                 >
//                   <Text style={styles.loginButtonText}>Login to Jokha</Text>
//                 </TouchableOpacity>
//               </View>
//             )}

//             {user && (
//               <>
//                 <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>
//                 {fetchingSaved ? (
//                   <ActivityIndicator size="small" color="purple" />
//                 ) : savedAddresses.length > 0 ? (
//                   savedAddresses.map((item: any) => (
//                     <View key={item.addressId} style={styles.addressItem}>
//                       <Ionicons
//                         name={
//                           item.label?.toLowerCase() === "home"
//                             ? "home-outline"
//                             : item.label?.toLowerCase() === "work"
//                             ? "business-outline"
//                             : "location-outline"
//                         }
//                         size={22}
//                         color="black"
//                         style={{ marginRight: 10 }}
//                       />

//                       <TouchableOpacity
//                         style={{ flex: 1 }}
//                         onPress={() => handleSavedAddressClick(item)}
//                       >
//                         <Text style={styles.addressName}>{item.label}</Text>
//                         <Text style={styles.addressText} numberOfLines={1}>
//                           {item.fullAddress || ""}
//                         </Text>
//                       </TouchableOpacity>

//                       <View style={styles.inlineButtons}>
//                         <TouchableOpacity
//                           onPress={() =>
//                             router.push({
//                               pathname: "../map/usedetect",
//                               params: {
//                                 edit: "true",
//                                 addressId: item.addressId,
//                                 address: item.fullAddress || "",
//                                 houseFlatBlock: item.houseFlatBlock || "",
//                                 floor: item.floor || "",
//                                 apartmentRoadArea: item.apartmentRoadArea || "",
//                                 label: item.addressType,
//                                 customAddressLabel: item.customAddressLabel,
//                                 phone: item.phone || "",
//                                 lat: item.latitude?.toString() || "",
//                                 lng: item.longitude?.toString() || "",
//                               },
//                             })
//                           }
//                           style={styles.iconButton}
//                         >
//                           <Ionicons name="pencil-outline" size={20} color="blue" />
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                           onPress={() => confirmDelete(item.addressId)}
//                           style={styles.iconButton}
//                         >
//                           <Ionicons name="trash-outline" size={20} color="red" />
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   ))
//                 ) : (
//                   <View style={styles.noAddressContainer}>
//                     <Text style={styles.noAddressText}>
//                       You don’t have any saved addresses
//                     </Text>
//                     <Text style={styles.noAddressSubText}>
//                       Add a new address and continue ordering
//                     </Text>
//                   </View>
//                 )}
//               </>
//             )}

//             {recentLocations.length > 0 && (
//               <>
//                 <Text style={styles.sectionTitle}>RECENTLY SEARCHED</Text>
//                 {recentLocations.map((item, idx) => (
//                   <TouchableOpacity
//                     key={idx}
//                     style={styles.addressItem}
//                     onPress={() =>
//                       router.push({
//                         pathname: "../map/usedetect",
//                         params: {
//                           mode: "current",
//                           lat: item.lat?.toString() || "0",
//                           lng: item.lng?.toString() || "0",
//                           address: item.address,
//                         },
//                       })
//                     }
//                   >
//                     <Ionicons
//                       name="time-outline"
//                       size={22}
//                       color="black"
//                       style={{ marginRight: 10 }}
//                     />
//                     <Text style={styles.addressText}>{item.address}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </>
//             )}
//           </>
//         }
//         data={[]}
//         keyExtractor={(addr, idx) => idx.toString()}
//         renderItem={() => null}
//         contentContainerStyle={{ paddingBottom: 50 }}
//         showsVerticalScrollIndicator={false}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >
//         <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => router.back()}>
//               <Ionicons name="arrow-back" size={26} color="black" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Select Your Location</Text>
//           </View>

//           <View style={styles.searchBar}>
//             <Ionicons name="search-outline" size={22} color="#888" />
//             <TextInput
//               placeholder="Search an area or address"
//               style={styles.searchInput}
//               placeholderTextColor="#888"
//               value={searchText}
//               onChangeText={(text) => {
//                 setSearchText(text);
//                 searchPlaces(text);
//               }}
//             />
//           </View>

//           {renderMainContent()}
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#fff" },
//   container: { flex: 1, paddingBottom: 40 },
//   header: { flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 20 },
//   headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 15 },
//   searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", padding: 12, borderRadius: 10, marginBottom: 10 },
//   searchInput: { marginLeft: 10, fontSize: 15, flex: 1 },
//   suggestionItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
//   suggestionText: { fontSize: 15, color: "#333" },
//   buttonRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 15 },
//   locationButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", padding: 16, borderRadius: 12, flex: 1, marginRight: 10, justifyContent: "center", elevation: 3 },
//   addButton: { flexDirection: "row", alignItems: "center", backgroundColor: "purple", padding: 16, borderRadius: 12, flex: 1, marginLeft: 10, justifyContent: "center", elevation: 3 },
//   buttonText: { marginLeft: 8, fontSize: 15, fontWeight: "600", color: "black" },
//   addButtonText: { marginLeft: 6, fontSize: 15, fontWeight: "600", color: "#fff" },
//   sectionTitle: { fontSize: 13, fontWeight: "bold", color: "#888", marginTop: 15, marginBottom: 8 },
//   addressItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#eee" },
//   addressName: { fontSize: 14, fontWeight: "bold" },
//   addressText: { fontSize: 14, color: "#333" },
  // lockContainer: { justifyContent: "center", alignItems: "center", marginTop: 40, padding: 20 },
  // lockImage: { width: 120, height: 120, marginBottom: 20 },
  // lockTitle: { fontSize: 18, fontWeight: "bold", color: "#000", marginBottom: 5 },
  // lockSubtitle: { fontSize: 14, color: "#666", marginBottom: 20, textAlign: "center" },
  // loginButton: { backgroundColor: "purple", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  // loginButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
//   noAddressContainer: { justifyContent: "center", alignItems: "center", marginTop: 40, padding: 20 },
//   noAddressText: { fontSize: 16, fontWeight: "bold", color: "#000", marginBottom: 5, textAlign: "center" },
//   noAddressSubText: { fontSize: 14, color: "#666", textAlign: "center" },
//   inlineButtons: { flexDirection: "row" },
//   iconButton: { marginLeft: 10 },
// });...................................................................................................

// LocationScreen.tsx



// import React, { useContext, useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   useWindowDimensions,
//   FlatList,
//   ActivityIndicator,
//   Image,
//   Platform,
//   KeyboardAvoidingView,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { useRouter } from "expo-router";
// import axios from "axios";
// import { AuthContext } from "@/context/Auth";
// import { LocationContext } from "@/context/locationContent";
// import { useDispatch, useSelector } from "react-redux";
// import { setSavedAddresses } from "../actioncreator/saveaddaction";

// const GOOGLE_API_KEY = "AIzaSyDbhDt1_GZG_bW-3f5s6cfSTY2CepE4GEg";

// export default function LocationScreen() {
//   const router = useRouter();
//   const { width } = useWindowDimensions();
//   const { user } = useContext(AuthContext);
//   const { addLocation, recentLocations } = useContext(LocationContext);

//   const dispatch = useDispatch();
//   const savedAddresses = useSelector(
//     (state: any) => state.location.savedAddresses || []
//   );

//   const [searchText, setSearchText] = useState("");
//   const [places, setPlaces] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingSaved, setFetchingSaved] = useState(false);

//   const isTablet = width > 768;
//   const horizontalPadding = isTablet ? 40 : 15;

//   // debounce helper
//   const debounce = (fn: Function, delay: number) => {
//     let timeout: ReturnType<typeof setTimeout>;
//     return (...args: any[]) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => fn(...args), delay);
//     };
//   };

//   // ---------------- FETCH SAVED ADDRESSES ----------------
//   const fetchSavedAddresses = async () => {
//     if (!user?.token) {
//       dispatch(setSavedAddresses([]));
//       return;
//     }
//     try {
//       setFetchingSaved(true);
//       const res = await axios.get(`http://192.168.0.106:9094/customers/address`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       const addresses = Array.isArray(res.data) ? res.data : [];
//       dispatch(setSavedAddresses(addresses));
//     } catch (err: any) {
//       console.log("Fetch Saved Error:", err?.response?.data || err?.message);
//       dispatch(setSavedAddresses([]));
//     } finally {
//       setFetchingSaved(false);
//     }
//   };

//   useEffect(() => {
//     fetchSavedAddresses();
//   }, [user]);

//   // ---------------- DELETE ADDRESS ----------------
//   const deleteAddress = async (id: number) => {
//     if (!user?.token) return Alert.alert("Error", "Login required");
//     try {
//       const res = await axios.delete(
//         `http://192.168.0.106:9094/customers/address/${id}`,
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       if (res.status >= 200 && res.status < 300) {
//         const updated = savedAddresses.filter((a: any) => a.addressId !== id);
//         dispatch(setSavedAddresses(updated));
//         Alert.alert("Deleted", "Address removed successfully");
//       }
//     } catch (err: any) {
//       console.log("Delete Error:", err?.response?.data || err?.message);
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   const confirmDelete = (id: number) => {
//     Alert.alert("Delete Address", "Are you sure?", [
//       { text: "Cancel", style: "cancel" },
//       { text: "Delete", style: "destructive", onPress: () => deleteAddress(id) },
//     ]);
//   };

//   // ---------------- HANDLE SAVED CLICK ----------------
//   const handleSavedClick = (item: any) => {
//     router.push({
//       pathname: "../map/usedetect",
//       params: {
//         edit: "true",
//         lat: item.latitude?.toString() || "",
//         lng: item.longitude?.toString() || "",
//         address: item.fullAddress,
//         addressId: item.addressId,
//         houseFlatBlock: item.houseFlatBlock || "",
//         floor: item.floor || "",
//         apartmentRoadArea: item.apartmentRoadArea || "",
//         label: item.addressType,
//         customAddressLabel: item.customAddressLabel,
//         phone: item.phone || "",
//       },
//     });
//   };

//   // ---------------- GOOGLE PLACES ----------------
//   const searchPlacesAPI = async (text: string) => {
//     if (text.length < 2) return setPlaces([]);
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&language=en&components=country:in`
//       );
//       setPlaces(res.data.status === "OK" ? res.data.predictions : []);
//     } catch (e) {
//       console.log("Autocomplete Error:", e);
//       setPlaces([]);
//     }
//     setLoading(false);
//   };

//   const searchPlaces = useCallback(debounce(searchPlacesAPI, 300), []);

//   const selectPlace = async (placeId: string, description: string) => {
//     try {
//       const res = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
//       );
//       const loc = res.data.result?.geometry?.location;
//       const formatted = res.data.result?.formatted_address || description;

//       if (!loc) return Alert.alert("Error", "Location unavailable");

//       addLocation({ address: formatted, lat: loc.lat, lng: loc.lng });
//       setSearchText("");
//       setPlaces([]);

//       router.push({
//         pathname: "../map/usedetect",
//         params: {
//           mode: "current",
//           lat: loc.lat.toString(),
//           lng: loc.lng.toString(),
//           address: formatted,
//         },
//       });
//     } catch (e) {
//       console.log("Place Details Error:", e);
//     }
//   };

//   const renderSuggestion = ({ item }: { item: any }) => (
//     <TouchableOpacity
//       style={styles.suggestionItem}
//       onPress={() => selectPlace(item.place_id, item.description)}
//     >
//       <Text style={styles.suggestionText}>{item.description}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >
//         <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => router.back()}>
//               <Ionicons name="arrow-back" size={26} color="black" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Select Address</Text>
//           </View>

//           {/* Search Bar */}
//           <View style={styles.searchBar}>
//             <Ionicons name="search-outline" size={22} color="#888" />
//             <TextInput
//               placeholder="Search an area or address"
//               style={styles.searchInput}
//               placeholderTextColor="#888"
//               value={searchText}
//               onChangeText={(t) => {
//                 setSearchText(t);
//                 searchPlaces(t);
//               }}
//             />
//           </View>

//           {/* Buttons */}
//           <View style={styles.buttonRow}>
//             <TouchableOpacity
//               style={styles.locationButton}
//               onPress={() =>
//                 router.push({ pathname: "../map/usedetect", params: { mode: "current" } })
//               }
//             >
//               <Ionicons name="locate-outline" size={22} color="black" />
//               <Text style={styles.buttonText}>Use Current Location</Text>
//             </TouchableOpacity>

//             {user && (
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() =>
//                   router.push({ pathname: "../map/usedetect", params: { mode: "saved" } })
//                 }
//               >
//                 <Ionicons name="add-outline" size={22} color="#fff" />
//                 <Text style={styles.addButtonText}>Add New Address</Text>
//               </TouchableOpacity>
//             )}
//           </View>

//           {/* Suggestions or Saved/Recent */}
//           {searchText.length > 0 ? (
//             loading ? (
//               <ActivityIndicator size="small" color="purple" style={{ marginTop: 20 }} />
//             ) : (
//               <FlatList
//                 data={places}
//                 keyExtractor={(i) => i.place_id}
//                 renderItem={renderSuggestion}
//                 keyboardShouldPersistTaps="handled"
//               />
//             )
//           ) : (
//             <FlatList
//               data={[]}
//               renderItem={() => null}
//               keyboardShouldPersistTaps="handled"
//               contentContainerStyle={{ paddingBottom: 50 }}
//               ListHeaderComponent={
//                 <View>
//                   {/* Saved Addresses */}
//                   {user ? (
//                     <View>
//                       <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>
//                       {fetchingSaved ? (
//                         <ActivityIndicator size="small" color="purple" />
//                       ) : savedAddresses.length > 0 ? (
//                         <View>
//                           {savedAddresses.map((item: any) => (
//                             <View key={item.addressId} style={styles.addressItem}>
//                               <Ionicons
//                                 name={
//                                   item.addressType?.toLowerCase() === "home"
//                                     ? "home-outline"
//                                     : item.addressType?.toLowerCase() === "work"
//                                     ? "business-outline"
//                                     : "location-outline"
//                                 }
//                                 size={22}
//                                 color="black"
//                                 style={{ marginRight: 10 }}
//                               />
//                               <TouchableOpacity
//                                 style={{ flex: 1 }}
//                                 onPress={() => handleSavedClick(item)}
//                               >
//                                 <Text style={styles.addressName}>{item.addressType}</Text>
//                                 <Text style={styles.addressText} numberOfLines={1}>
//                                   {item.fullAddress}
//                                 </Text>
//                               </TouchableOpacity>
//                               <View style={styles.inlineButtons}>
//                                 <TouchableOpacity
//                                   onPress={() => handleSavedClick(item)}
//                                   style={styles.iconButton}
//                                 >
//                                   <Ionicons name="pencil-outline" size={20} color="blue" />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                   onPress={() => confirmDelete(item.addressId)}
//                                   style={styles.iconButton}
//                                 >
//                                   <Ionicons name="trash-outline" size={20} color="red" />
//                                 </TouchableOpacity>
//                               </View>
//                             </View>
//                           ))}
//                         </View>
//                       ) : (
//                         <View style={styles.noAddressContainer}>
//                           <Text style={styles.noAddressText}>
//                             You don’t have any saved addresses
//                           </Text>
//                           <Text style={styles.noAddressSubText}>
//                             Add a new address and continue ordering
//                           </Text>
//                         </View>
//                       )}
//                     </View>
//                   ) : (
//                     <View style={styles.lockContainer}>
//                       <Image
//                         source={{ uri: "https://cdn-icons-png.flaticon.com/512/6195/6195699.png" }}
//                         style={styles.lockImage}
//                       />
//                       <Text style={styles.lockTitle}>Looks like you’re logged out</Text>
//                       <Text style={styles.lockSubtitle}>
//                         Please log in to see saved addresses
//                       </Text>
//                       <TouchableOpacity
//                         style={styles.loginButton}
//                         onPress={() => router.push("/login")}
//                       >
//                         <Text style={styles.loginButtonText}>Login to Jokha</Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}

//                   {/* Recent Locations */}
//                   {recentLocations.length > 0 && (
//                     <View>
//                       <Text style={styles.sectionTitle}>RECENTLY SEARCHED</Text>
//                       {recentLocations.map((item, idx) => (
//                         <TouchableOpacity
//                           key={idx}
//                           style={styles.addressItem}
//                           onPress={() =>
//                             router.push({
//                               pathname: "../map/usedetect",
//                               params: {
//                                 mode: "current",
//                                 lat: item.lat?.toString(),
//                                 lng: item.lng?.toString(),
//                                 address: item.address,
//                               },
//                             })
//                           }
//                         >
//                           <Ionicons
//                             name="time-outline"
//                             size={22}
//                             color="black"
//                             style={{ marginRight: 10 }}
//                           />
//                           <Text style={styles.addressText}>{item.address}</Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                   )}
//                 </View>
//               }
//             />
//           )}
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   lockContainer: { justifyContent: "center", alignItems: "center", marginTop: 40, padding: 20 },
//   lockImage: { width: 120, height: 120, marginBottom: 20 },
//   lockTitle: { fontSize: 18, fontWeight: "bold", color: "#000", marginBottom: 5 },
//   lockSubtitle: { fontSize: 14, color: "#666", marginBottom: 20, textAlign: "center" },
//   loginButton: { backgroundColor: "purple", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
//   loginButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
//   safeArea: { flex: 1, backgroundColor: "#fff" },
//   container: { flex: 1 },
//   header: { flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 20 },
//   headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 15 },
//   searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", padding: 12, borderRadius: 10 },
//   searchInput: { marginLeft: 10, fontSize: 15, flex: 1 },
//   buttonRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 15 },
//   locationButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", padding: 16, borderRadius: 12, flex: 1, marginRight: 10, justifyContent: "center" },
//   addButton: { flexDirection: "row", alignItems: "center", backgroundColor: "purple", padding: 16, borderRadius: 12, flex: 1, marginLeft: 10, justifyContent: "center" },
//   buttonText: { marginLeft: 8, fontSize: 15, fontWeight: "600", color: "black" },
//   addButtonText: { marginLeft: 6, fontSize: 15, fontWeight: "600", color: "#fff" },
//   sectionTitle: { fontSize: 13, fontWeight: "bold", color: "#888", marginTop: 15, marginBottom: 8 },
//   addressItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#eee" },
//   addressName: { fontSize: 14, fontWeight: "bold" },
//   addressText: { fontSize: 14, color: "#333" },
//   inlineButtons: { flexDirection: "row" },
//   iconButton: { marginLeft: 10 },
//   noAddressContainer: { justifyContent: "center", alignItems: "center", marginTop: 40, padding: 20 },
//   noAddressText: { fontSize: 16, fontWeight: "bold", color: "#000", marginBottom: 5, textAlign: "center" },
//   noAddressSubText: { fontSize: 14, color: "#666", textAlign: "center" },
//   suggestionItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
//   suggestionText: { fontSize: 15, color: "#333" },
// });//working








import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
  Image,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import axios from "axios";
import { AuthContext } from "@/context/Auth";
import { LocationContext } from "@/context/locationContent";
import { useDispatch, useSelector } from "react-redux";
import { setSavedAddresses } from "../actioncreator/saveaddaction";

const GOOGLE_API_KEY = "AIzaSyDbhDt1_GZG_bW-3f5s6cfSTY2CepE4GEg";

export default function LocationScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { user } = useContext(AuthContext);
  const { addLocation, recentLocations } = useContext(LocationContext);

  const dispatch = useDispatch();
  const savedAddresses = useSelector(
    (state: any) => state.location.savedAddresses || []
  );
console.log("Saved Addresses from Redux:", savedAddresses);
  const [searchText, setSearchText] = useState("");
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSaved, setFetchingSaved] = useState(false);

  const isTablet = width > 768;
  const horizontalPadding = isTablet ? 40 : 15;

  const debounce = (fn: Function, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  // ---------------- FETCH SAVED ADDRESSES ----------------
  const fetchSavedAddresses = async () => {
    if (!user?.token) {
      dispatch(setSavedAddresses([]));
      return;
    }
    try {
      setFetchingSaved(true);
      const res = await axios.get(`http://192.168.0.102:9094/customers/address`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const addresses = Array.isArray(res.data) ? res.data : [];
      dispatch(setSavedAddresses(addresses));
    } catch (err: any) {
      console.log("Fetch Saved Error:", err?.response?.data || err?.message);
      dispatch(setSavedAddresses([]));
    } finally {
      setFetchingSaved(false);
    }
  };

  useEffect(() => {
    fetchSavedAddresses();
  }, [user]);

  // ---------------- DELETE ADDRESS ----------------
  const deleteAddress = async (id: number) => {
    if (!user?.token) return Alert.alert("Error", "Login required");
    try {
      const res = await axios.delete(
        `http://192.168.0.102:9094/customers/address/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (res.status >= 200 && res.status < 300) {
        const updated = savedAddresses.filter((a: any) => a.addressId !== id);
        dispatch(setSavedAddresses(updated));
        Alert.alert("Deleted", "Address removed successfully");
      }
    } catch (err: any) {
      console.log("Delete Error:", err?.response?.data || err?.message);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert("Delete Address", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteAddress(id) },
    ]);
  };

  // ---------------- HANDLE SAVED CLICK ----------------
  const handleSavedClick = (item: any) => {
    // Update location context
    addLocation({
      lat: item.latitude,
      lng: item.longitude,
      address: item.fullAddress,
      saved: true,
    });

    // Navigate directly to home
    router.push("/");
  };

  // ---------------- HANDLE PENCIL ICON ----------------
  const handleEditClick = (item: any) => {
    router.push({
      pathname: "../map/usedetect",
      params: {
        edit: "true",
        lat: item.latitude?.toString(),
        lng: item.longitude?.toString(),
        address: item.fullAddress,
        addressId: item.addressId,
        houseFlatBlock: item.houseFlatBlock || "",
        floor: item.floor || "",
        apartmentRoadArea: item.apartmentRoadArea || "",
        label: item.addressType,
        customAddressLabel: item.customAddressLabel,
        phone: item.phone || "",
      },
    });
  };

  // ---------------- HANDLE RECENT CLICK ----------------
  const handleRecentClick = (item: any) => {
    // Recent location: addLocation with saved: false
    addLocation({
      lat: item.lat,
      lng: item.lng,
      address: item.address,
      saved: false,
    });

    // Navigate to home
    router.push("/");
  };

  // ---------------- GOOGLE PLACES ----------------
  const searchPlacesAPI = async (text: string) => {
    if (text.length < 2) return setPlaces([]);
    setLoading(true);
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&language=en&components=country:in`
      );
      setPlaces(res.data.status === "OK" ? res.data.predictions : []);
    } catch (e) {
      console.log("Autocomplete Error:", e);
      setPlaces([]);
    }
    setLoading(false);
  };

  const searchPlaces = useCallback(debounce(searchPlacesAPI, 300), []);

  const selectPlace = async (placeId: string, description: string) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const loc = res.data.result?.geometry?.location;
      const formatted = res.data.result?.formatted_address || description;

      if (!loc) return Alert.alert("Error", "Location unavailable");

      addLocation({ lat: loc.lat, lng: loc.lng, address: formatted, saved: false });
      setSearchText("");
      setPlaces([]);

      router.push({
        pathname: "../map/usedetect",
        params: {
          mode: "current",
          lat: loc.lat.toString(),
          lng: loc.lng.toString(),
          address: formatted,
        },
      });
    } catch (e) {
      console.log("Place Details Error:", e);
    }
  };

  const renderSuggestion = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => selectPlace(item.place_id, item.description)}
    >
      <Text style={styles.suggestionText}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={26} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Address</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={22} color="#888" />
            <TextInput
              placeholder="Search an area or address"
              style={styles.searchInput}
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={(t) => {
                setSearchText(t);
                searchPlaces(t);
              }}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={() =>
                router.push({ pathname: "../map/usedetect", params: { mode: "current" } })
              }
            >
              <Ionicons name="locate-outline" size={22} color="black" />
              <Text style={styles.buttonText}>Use Current Location</Text>
            </TouchableOpacity>

            {user && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                  router.push({ pathname: "../map/usedetect", params: { mode: "saved" } })
                }
              >
                <Ionicons name="add-outline" size={22} color="#fff" />
                <Text style={styles.addButtonText}>Add New Address</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Suggestions or Saved/Recent */}
          {searchText.length > 0 ? (
            loading ? (
              <ActivityIndicator size="small" color="purple" style={{ marginTop: 20 }} />
            ) : (
              <FlatList
                data={places}
                keyExtractor={(i) => i.place_id}
                renderItem={renderSuggestion}
                keyboardShouldPersistTaps="handled"
              />
            )
          ) : (
            <FlatList
              data={[]}
              renderItem={() => null}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 50 }}
              ListHeaderComponent={
                <View>
                  {/* Saved Addresses */}
                  {user ? (
                    <View>
                      <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>
                      {fetchingSaved ? (
                        <ActivityIndicator size="small" color="purple" />
                      ) : savedAddresses.length > 0 ? (
                        <View>
                          {savedAddresses.map((item: any) => (
                            <View key={item.addressId} style={styles.addressItem}>
                              <Ionicons
                                name={
                                  item.addressType?.toLowerCase() === "home"
                                    ? "home-outline"
                                    : item.addressType?.toLowerCase() === "work"
                                    ? "business-outline"
                                    : "location-outline"
                                }
                                size={22}
                                color="black"
                                style={{ marginRight: 10 }}
                              />
                              <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => handleSavedClick(item)}
                              >
                                <Text style={styles.addressName}>{item.addressType}</Text>
                                <Text style={styles.addressText} numberOfLines={1}>
                                  {item.fullAddress}
                                </Text>
                              </TouchableOpacity>
                              <View style={styles.inlineButtons}>
                                <TouchableOpacity
                                  onPress={() => handleEditClick(item)}
                                  style={styles.iconButton}
                                >
                                  <Ionicons name="pencil-outline" size={20} color="blue" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => confirmDelete(item.addressId)}
                                  style={styles.iconButton}
                                >
                                  <Ionicons name="trash-outline" size={20} color="red" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          ))}
                        </View>
                      ) : (
                        <View style={styles.noAddressContainer}>
                          <Text style={styles.noAddressText}>
                            You don’t have any saved addresses
                          </Text>
                          <Text style={styles.noAddressSubText}>
                            Add a new address and continue ordering
                          </Text>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View style={styles.lockContainer}>
                      <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/6195/6195699.png" }}
                        style={styles.lockImage}
                      />
                      <Text style={styles.lockTitle}>Looks like you’re logged out</Text>
                      <Text style={styles.lockSubtitle}>
                        Please log in to see saved addresses
                      </Text>
                      <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => router.push("/login")}
                      >
                        <Text style={styles.loginButtonText}>Login to Jokha</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Recent Locations */}
                  {recentLocations.length > 0 && (
                    <View>
                      <Text style={styles.sectionTitle}>RECENTLY SEARCHED</Text>
                      {recentLocations.map((item, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.addressItem}
                          onPress={() => handleRecentClick(item)}
                        >
                          <Ionicons
                            name="time-outline"
                            size={22}
                            color="black"
                            style={{ marginRight: 10 }}
                          />
                          <Text style={styles.addressText}>{item.address}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              }
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ------------------- STYLES -------------------
const styles = StyleSheet.create({
  lockContainer: { justifyContent: "center", alignItems: "center", marginTop: 40, padding: 20 },
  lockImage: { width: 120, height: 120, marginBottom: 20 },
  lockTitle: { fontSize: 18, fontWeight: "bold", color: "#000", marginBottom: 5 },
  lockSubtitle: { fontSize: 14, color: "#666", marginBottom: 20, textAlign: "center" },
  loginButton: { backgroundColor: "purple", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  loginButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 15 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", padding: 12, borderRadius: 10 },
  searchInput: { marginLeft: 10, fontSize: 15, flex: 1 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 15 },
  locationButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", padding: 16, borderRadius: 12, flex: 1, marginRight: 10, justifyContent: "center" },
  addButton: { flexDirection: "row", alignItems: "center", backgroundColor: "purple", padding: 16, borderRadius: 12, flex: 1, marginLeft: 10, justifyContent: "center" },
  buttonText: { marginLeft: 8, fontSize: 15, fontWeight: "600", color: "black" },
  addButtonText: { marginLeft: 6, fontSize: 15, fontWeight: "600", color: "#fff" },
  sectionTitle: { fontSize: 13, fontWeight: "bold", color: "#888", marginTop: 15, marginBottom: 8 },
  addressItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#eee" },
  addressName: { fontSize: 14, fontWeight: "bold" },
  addressText: { fontSize: 14, color: "#333" },
  inlineButtons: { flexDirection: "row" },
  iconButton: { marginLeft: 10 },
  noAddressContainer: { justifyContent: "center", alignItems: "center", marginTop: 40, padding: 20 },
  noAddressText: { fontSize: 16, fontWeight: "bold", color: "#000", marginBottom: 5, textAlign: "center" },
  noAddressSubText: { fontSize: 14, color: "#666", textAlign: "center" },
  suggestionItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  suggestionText: { fontSize: 15, color: "#333" },
});
   