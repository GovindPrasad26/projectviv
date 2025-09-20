
// import React, { useContext, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Platform,
//   Alert,
//   Linking,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import { useRouter } from "expo-router";
// import { AuthContext } from "@/context/Auth";
// import { LocationContext } from "@/context/locationContent";
// import { GOOGLE_API_KEY } from "@/constants/config";

// export default function Header() {
//   const { user } = useContext(AuthContext);
//   const { location, setLocation } = useContext(LocationContext);
//   const router = useRouter();

//   // Fetch location if not already in context
//   useEffect(() => {
//     if (!location) {
//       requestLocation();
//     }
//   }, [location]);

//   const requestLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert(
//           "Permission Required",
//           "We need your location to show your address.",
//           [
//             { text: "Open Settings", onPress: () => Linking.openSettings() },
//             { text: "Cancel", style: "cancel" },
//           ]
//         );
//         return;
//       }

//       const loc = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Highest,
//       });

//       const res = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.coords.latitude},${loc.coords.longitude}&key=${GOOGLE_API_KEY}`
//       );
//       const data = await res.json();
//       const fullAddress =
//         data?.results?.[0]?.formatted_address || "Address not found";

//       // ✅ Store directly in context
//       setLocation({ address: fullAddress, lat: loc.coords.latitude, lng: loc.coords.longitude });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <View style={styles.headerWrapper}>
//       <View style={styles.header}>
//         <View style={styles.locationWrapper}>
//           <Ionicons name="location-sharp" size={20} color="white" />
//           <View style={{ marginLeft: 6 }}>
//             <Text style={styles.locationTitle}>Delivering to</Text>
//             <TouchableOpacity
//               onPress={() => router.push("/location")}
//               style={styles.locationTouchable}
//             >
//               {location ? (
//                 <Text style={styles.locationText} numberOfLines={1}>
//                   {location.address}
//                 </Text>
//               ) : (
//                 <ActivityIndicator size="small" color="white" />
//               )}
//               <Ionicons name="chevron-forward" size={16} color="white" />
       
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity onPress={() => router.push(user ? "/profile" : "/login")}>
//           <Ionicons name="person-circle" size={32} color="whitesmoke" />
             
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   headerWrapper: { marginTop: Platform.OS === "android" ? 12 : 0 },
//   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 8 },
//   locationWrapper: { flexDirection: "row", alignItems: "center", flex: 1 },
//   locationTitle: { fontSize: 14, fontWeight: "600", color: "white" },
//   locationTouchable: { flexDirection: "row", alignItems: "center", maxWidth: 250 },
//   locationText: { fontSize: 12, color: "white", maxWidth: 200 },
// });


import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/Auth";
import { LocationContext } from "@/context/locationContent";
import { GOOGLE_API_KEY } from "@/constants/config";

export default function Header() {
  const { user } = useContext(AuthContext);
  const { location, setLocation } = useContext(LocationContext);
  const router = useRouter();

  // Fetch location if not already in context
  useEffect(() => {
    if (!location) {
      requestLocation();
    }
  }, [location]);

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need your location to show your address.",
          [
            { text: "Open Settings", onPress: () => Linking.openSettings() },
            { text: "Cancel", style: "cancel" },
          ]
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.coords.latitude},${loc.coords.longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await res.json();
      const fullAddress =
        data?.results?.[0]?.formatted_address || "Address not found";

      // ✅ Store directly in context
      setLocation({
        address: fullAddress,
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        {/* Location Section */}
        <View style={styles.locationWrapper}>
          <Ionicons name="location-sharp" size={20} color="black" />
          <View style={{ marginLeft: 6 }}>
            <Text style={styles.locationTitle}>Delivering to</Text>
            <TouchableOpacity
              onPress={() => router.push("/location")}
              style={styles.locationTouchable}
            >
              {location ? (
                <Text style={styles.locationText} numberOfLines={1}>
                  {location.address}
                </Text>
              ) : (
                <ActivityIndicator size="small" color="white" />
              )}
              {/* Updated chevron with black circle background */}
              <View style={styles.iconCircle}>
                <Ionicons name="chevron-forward" size={16} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Section */}
        <TouchableOpacity
          onPress={() => router.push(user ? "/profile" : "/login")}
        >
          {/* <Ionicons name="person-circle" size={32} color="whitesmoke" /> */}
            <View style={styles.iconCircleLarge}>
    <Ionicons name="person" size={24} color="white" />
  </View>

        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  iconCircleLarge: {
  backgroundColor: "black", // black circle background
  borderRadius: 40,
  padding: 6, // more padding to make it bigger
  alignItems: "center",
  justifyContent: "center",
  marginTop:10,
  marginRight:8
},

  headerWrapper: { marginTop: Platform.OS === "android" ? 12 : 0 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  locationWrapper: { flexDirection: "row", alignItems: "center", flex: 1 },
  locationTitle: { fontSize: 14, fontWeight: "600", color: "black" },
  locationTouchable: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 230,
  },
  locationText: { fontSize: 12, color: "gray", maxWidth: 200 },
  iconCircle: {
    backgroundColor: "", // circle background
    borderRadius: 50,
    padding: 4,
    marginLeft: 6,
  },
});
