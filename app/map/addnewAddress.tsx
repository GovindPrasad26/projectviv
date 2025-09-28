// import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import MapView, { Region } from "react-native-maps";
// import axios from "axios";
// import debounce from "lodash.debounce";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { AuthContext } from "@/context/Auth";

// const { width, height } = Dimensions.get("window");
// const GOOGLE_API_KEY = "AIzaSyDbhDt1_GZG_bW-3f5s6cfSTY2CepE4GEg";

// export default function AddNewAddress() {
//   const mapRef = useRef<MapView>(null);
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { user } = useContext(AuthContext);

//   const [region, setRegion] = useState<Region | null>(null);
//   const [currentAddress, setCurrentAddress] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [houseFlatBlock, setHouseFlatBlock] = useState("");
//   const [apartmentRoadArea, setApartmentRoadArea] = useState("");
//   const [floor, setFloor] = useState("");
//   const [label, setLabel] = useState("");
//   const [receiverPhone, setReceiverPhone] = useState("");
//   const [customLabel, setCustomLabel] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [mapLocked, setMapLocked] = useState(false);

//   const isEditMode = Array.isArray(params.edit)
//     ? params.edit[0] === "true"
//     : params.edit === "true";

//   const getParamString = (param: string | string[] | undefined) =>
//     Array.isArray(param) ? param[0] : param || "";

//   // Load initial data once
//   useEffect(() => {
//     const paramHouseFlatBlock = getParamString(params.houseFlatBlock);
//     const paramFloor = getParamString(params.floor);
//     const paramApartmentRoadArea = getParamString(params.apartmentRoadArea);
//     const paramLabel = getParamString(params.label);
//     const paramCustomLabel = getParamString(params.customAddressLabel);
//     const paramPhone = getParamString(params.phone);
//     const paramLat = getParamString(params.lat);
//     const paramLng = getParamString(params.lng);
//     const paramAddress = getParamString(params.address);
//     const paramFullAddress = getParamString(params.fullAddress);

//     setHouseFlatBlock(paramHouseFlatBlock);
//     setFloor(paramFloor);
//     setApartmentRoadArea(paramApartmentRoadArea);

//     // ✅ Prefill phone number if available
//     if (paramPhone) setReceiverPhone(paramPhone);

//     if (["Home", "Work"].includes(paramLabel)) {
//       setLabel(paramLabel);
//     } else if (paramLabel === "Others" || paramCustomLabel) {
//       setLabel("Others");
//       setCustomLabel(paramCustomLabel || "");
//     }

//     if (paramLat && paramLng) {
//       setRegion({
//         latitude: parseFloat(paramLat),
//         longitude: parseFloat(paramLng),
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     }

//     if (paramAddress || paramFullAddress) {
//       setCurrentAddress(paramAddress || paramFullAddress || "");
//       setSearchQuery(paramAddress || paramFullAddress || "");
//     }

//     setShowForm(true);
//     setMapLocked(isEditMode);
//     setLoading(false);
//   }, []);

//   // Fetch address from lat/lon
//   const fetchAddressFromCoords = useCallback(
//     debounce(async (lat: number, lng: number) => {
//       try {
//         const res = await axios.get(
//           `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
//         );
//         const addr = res.data?.results?.[0]?.formatted_address;
//         if (addr) setCurrentAddress(addr);
//       } catch (e) {
//         console.log("Geocode error:", e);
//       }
//     }, 500),
//     []
//   );

//   const handleRegionChangeComplete = (newRegion: Region) => {
//     if (!mapLocked) {
//       setRegion(newRegion);
//       fetchAddressFromCoords(newRegion.latitude, newRegion.longitude);
//     }
//   };

//   const handleSaveOrUpdateAddress = async () => {
//     if (!houseFlatBlock || !apartmentRoadArea) {
//       Alert.alert("Missing Details", "Please fill all mandatory fields!");
//       return;
//     }
//     if (!receiverPhone || !/^[6-9]\d{9}$/.test(receiverPhone)) {
//       Alert.alert("Invalid Phone", "Enter a valid 10-digit phone number.");
//       return;
//     }
//     if (label === "Others" && !customLabel) {
//       Alert.alert("Missing Details", "Please enter a label name!");
//       return;
//     }
//     if (!user) {
//       Alert.alert("Login Required", "You must be logged in!");
//       return;
//     }
//     if (!region) {
//       Alert.alert("Error", "Location not detected. Please try again.");
//       return;
//     }

//     const addressData = {
//       fullAddress: currentAddress,
//       houseFlatBlock,
//       floor,
//       apartmentRoadArea,
//       latitude: region.latitude,
//       longitude: region.longitude,
//       addressType: label === "Others" ? "OTHER" : label.toUpperCase(),
//       customAddressLabel: label === "Others" ? customLabel : "",
//       phone: receiverPhone,
//     };

//     try {
//       let res;
//       if (isEditMode && params.addressId) {
//         // Update existing address
//         res = await axios.put(
//           `http://192.168.0.106:9094/customers/address/${getParamString(params.addressId)}`,
//           addressData,
//           { headers: { Authorization: `Bearer ${user.token}` } }
//         );
//         if (res.status >= 200 && res.status < 300) {
//           Alert.alert("✅ Success", "Address updated successfully!", [
//             { text: "OK", onPress: () => router.push("/") },
//           ]);
//         }
//       } else {
//         // Save new address
//         res = await axios.post(
//           "http://192.168.0.106:9094/customers/address",
//           addressData,
//           { headers: { Authorization: `Bearer ${user.token}` } }
//         );
//         if (res.status >= 200 && res.status < 300) {
//           Alert.alert("✅ Success", "Address saved successfully!", [
//             { text: "OK", onPress: () => router.push("/") },
//           ]);
//         }
//       }
//     } catch (err) {
//       console.log("Save Address Error:", err);
//       Alert.alert("Error", "Something went wrong! Please try again later.");
//     }
//   };

//   if (loading || !region) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="purple" />
//         <Text>Fetching location...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Map */}
//       <View style={[styles.mapContainer, showForm && { height: height * 0.4 }]}>
//         <MapView
//           ref={mapRef}
//           style={StyleSheet.absoluteFillObject}
//           region={region}
//           scrollEnabled={!mapLocked}
//           zoomEnabled={!mapLocked}
//           onRegionChangeComplete={handleRegionChangeComplete}
//           showsUserLocation
//         />
//         {!mapLocked && (
//           <View style={styles.markerFixed}>
//             <Image
//               source={{
//                 uri: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
//               }}
//               style={{ width: 40, height: 40 }}
//               resizeMode="contain"
//             />
//           </View>
//         )}
//       </View>

//       {/* Form */}
//       <ScrollView style={styles.formContainer} contentContainerStyle={{ paddingBottom: 40 }}>
//         <Text style={styles.locationTitle}>{currentAddress}</Text>

//         <TextInput
//           placeholder="House / Flat / Block No.*"
//           value={houseFlatBlock}
//           onChangeText={setHouseFlatBlock}
//           style={styles.input}
//         />
//         <TextInput placeholder="Floor" value={floor} onChangeText={setFloor} style={styles.input} />
//         <TextInput
//           placeholder="Apartment / Road / Area*"
//           value={apartmentRoadArea}
//           onChangeText={setApartmentRoadArea}
//           style={styles.input}
//         />

//         {/* Save As */}
//         <View style={styles.saveAsContainer}>
//           {["Home", "Work", "Others"].map((item) => (
//             <TouchableOpacity
//               key={item}
//               style={[styles.saveAsBtn, label === item && styles.selectedSaveAsBtn]}
//               onPress={() => {
//                 setLabel(item);
//                 if (item === "Others") setCustomLabel("");
//               }}
//             >
//               <Text style={[styles.saveAsText, label === item && styles.selectedSaveAsText]}>
//                 {item}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {label === "Others" && (
//           <TextInput
//             placeholder="Save As"
//             value={customLabel}
//             onChangeText={setCustomLabel}
//             style={styles.input}
//           />
//         )}

//         <TextInput
//           placeholder="Receiver Phone*"
//           value={receiverPhone}
//           onChangeText={setReceiverPhone}
//           keyboardType="phone-pad"
//           style={styles.input}
//         />

//         <TouchableOpacity style={styles.saveBtn} onPress={handleSaveOrUpdateAddress}>
//           <Text style={styles.saveBtnText}>{isEditMode ? "Update Address" : "Save Address"}</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   mapContainer: { width, height: height * 0.55 },
//   markerFixed: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -20,
//     marginTop: -40,
//   },
//   formContainer: { flex: 1, paddingHorizontal: 15, paddingTop: 10 },
//   locationTitle: { fontSize: 16, fontWeight: "600", marginBottom: 15 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//   },
//   saveAsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   saveAsBtn: {
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginHorizontal: 3,
//     borderRadius: 8,
//   },
//   selectedSaveAsBtn: { backgroundColor: "purple", borderColor: "purple" },
//   saveAsText: { textAlign: "center", color: "#555" },
//   selectedSaveAsText: { color: "#fff" },
//   saveBtn: {
//     backgroundColor: "purple",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 15,
//   },
//   saveBtnText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
// });


import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import axios from "axios";
import debounce from "lodash.debounce";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AuthContext } from "@/context/Auth";
import { LocationContext } from "@/context/locationContent";

const { width, height } = Dimensions.get("window");
const GOOGLE_API_KEY = "AIzaSyDbhDt1_GZG_bW-3f5s6cfSTY2CepE4GEg";

export default function AddNewAddress() {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const { addLocation } = useContext(LocationContext);

  const [region, setRegion] = useState<Region | null>(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [houseFlatBlock, setHouseFlatBlock] = useState("");
  const [apartmentRoadArea, setApartmentRoadArea] = useState("");
  const [floor, setFloor] = useState("");
  const [label, setLabel] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [customLabel, setCustomLabel] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [mapLocked, setMapLocked] = useState(false);

  const isEditMode = Array.isArray(params.edit)
    ? params.edit[0] === "true"
    : params.edit === "true";

  const getParamString = (param: string | string[] | undefined) =>
    Array.isArray(param) ? param[0] : param || "";

  useEffect(() => {
    const paramHouseFlatBlock = getParamString(params.houseFlatBlock);
    const paramFloor = getParamString(params.floor);
    const paramApartmentRoadArea = getParamString(params.apartmentRoadArea);
    const paramLabel = getParamString(params.label);
    const paramCustomLabel = getParamString(params.customAddressLabel);
    const paramPhone = getParamString(params.phone);
    const paramLat = getParamString(params.lat);
    const paramLng = getParamString(params.lng);
    const paramAddress = getParamString(params.address);
    const paramFullAddress = getParamString(params.fullAddress);

    setHouseFlatBlock(paramHouseFlatBlock);
    setFloor(paramFloor);
    setApartmentRoadArea(paramApartmentRoadArea);

    if (paramPhone) setReceiverPhone(paramPhone);

    if (["Home", "Work"].includes(paramLabel)) {
      setLabel(paramLabel);
    } else if (paramLabel === "Others" || paramCustomLabel) {
      setLabel("Others");
      setCustomLabel(paramCustomLabel || "");
    }

    if (paramLat && paramLng) {
      setRegion({
        latitude: parseFloat(paramLat),
        longitude: parseFloat(paramLng),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }

    if (paramAddress || paramFullAddress) {
      setCurrentAddress(paramAddress || paramFullAddress || "");
      setSearchQuery(paramAddress || paramFullAddress || "");
    }

    setShowForm(true);
    setMapLocked(isEditMode);
    setLoading(false);
  }, []);

  const fetchAddressFromCoords = useCallback(
    debounce(async (lat: number, lng: number) => {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
        );
        const addr = res.data?.results?.[0]?.formatted_address;
        if (addr) setCurrentAddress(addr);
      } catch (e) {
        console.log("Geocode error:", e);
      }
    }, 500),
    []
  );

  const handleRegionChangeComplete = (newRegion: Region) => {
    if (!mapLocked) {
      setRegion(newRegion);
      fetchAddressFromCoords(newRegion.latitude, newRegion.longitude);
    }
  };

  const handleSaveOrUpdateAddress = async () => {
    if (!houseFlatBlock || !apartmentRoadArea) {
      Alert.alert("Missing Details", "Please fill all mandatory fields!");
      return;
    }
    if (!receiverPhone || !/^[6-9]\d{9}$/.test(receiverPhone)) {
      Alert.alert("Invalid Phone", "Enter a valid 10-digit phone number.");
      return;
    }
    if (label === "Others" && !customLabel) {
      Alert.alert("Missing Details", "Please enter a label name!");
      return;
    }
    if (!user) {
      Alert.alert("Login Required", "You must be logged in!");
      return;
    }
    if (!region) {
      Alert.alert("Error", "Location not detected. Please try again.");
      return;
    }

    const addressData = {
      fullAddress: currentAddress,
      houseFlatBlock,
      floor,
      apartmentRoadArea,
      latitude: region.latitude,
      longitude: region.longitude,
      addressType: label === "Others" ? "OTHER" : label.toUpperCase(),
      customAddressLabel: label === "Others" ? customLabel : "",
      phone: receiverPhone,
    };

    try {
      let res;
      if (isEditMode && params.addressId) {
        res = await axios.put(
          `http://192.168.0.102:9094/customers/address/${getParamString(params.addressId)}`,
          addressData,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      } else {
        res = await axios.post(
          "http://192.168.0.102:9094/customers/address",
          addressData,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      }

      if (res.status >= 200 && res.status < 300) {
        // ✅ Update LocationContext with saved: true
        addLocation({
          address: currentAddress,
          lat: region.latitude,
          lng: region.longitude,
          saved: true,
          houseFlatBlock,
          floor,
          apartmentRoadArea,
          label,
          customAddressLabel: label === "Others" ? customLabel : "",
          phone: receiverPhone,
        });

        Alert.alert(
          "✅ Success",
          isEditMode ? "Address updated successfully!" : "Address saved successfully!",
          [{ text: "OK", onPress: () => router.push("/") }]
        );
      }
    } catch (err) {
      console.log("Save Address Error:", err);
      Alert.alert("Error", "Something went wrong! Please try again later.");
    }
  };

  if (loading || !region) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="purple" />
        <Text>Fetching location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={[styles.mapContainer, showForm && { height: height * 0.4 }]}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          region={region}
          scrollEnabled={!mapLocked}
          zoomEnabled={!mapLocked}
          onRegionChangeComplete={handleRegionChangeComplete}
          showsUserLocation
        />
        {!mapLocked && (
          <View style={styles.markerFixed}>
            <Image
              source={{
                uri: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
              }}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </View>
        )}
      </View>

      {/* Form */}
      <ScrollView style={styles.formContainer} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.locationTitle}>{currentAddress}</Text>

        <TextInput
          placeholder="House / Flat / Block No.*"
          value={houseFlatBlock}
          onChangeText={setHouseFlatBlock}
          style={styles.input}
        />
        <TextInput placeholder="Floor" value={floor} onChangeText={setFloor} style={styles.input} />
        <TextInput
          placeholder="Apartment / Road / Area*"
          value={apartmentRoadArea}
          onChangeText={setApartmentRoadArea}
          style={styles.input}
        />

        {/* Save As */}
        <View style={styles.saveAsContainer}>
          {["Home", "Work", "Others"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.saveAsBtn, label === item && styles.selectedSaveAsBtn]}
              onPress={() => {
                setLabel(item);
                if (item === "Others") setCustomLabel("");
              }}
            >
              <Text style={[styles.saveAsText, label === item && styles.selectedSaveAsText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {label === "Others" && (
          <TextInput
            placeholder="Save As"
            value={customLabel}
            onChangeText={setCustomLabel}
            style={styles.input}
          />
        )}

        <TextInput
          placeholder="Receiver Phone*"
          value={receiverPhone}
          onChangeText={setReceiverPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveOrUpdateAddress}>
          <Text style={styles.saveBtnText}>{isEditMode ? "Update Address" : "Save Address"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapContainer: { width, height: height * 0.55 },
  markerFixed: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -20,
    marginTop: -40,
  },
  formContainer: { flex: 1, paddingHorizontal: 15, paddingTop: 10 },
  locationTitle: { fontSize: 16, fontWeight: "600", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  saveAsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  saveAsBtn: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 3,
    borderRadius: 8,
  },
  selectedSaveAsBtn: { backgroundColor: "purple", borderColor: "purple" },
  saveAsText: { textAlign: "center", color: "#555" },
  selectedSaveAsText: { color: "#fff" },
  saveBtn: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  saveBtnText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
