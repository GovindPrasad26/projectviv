// import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   Keyboard,
//   Animated,
//   Easing,
// } from "react-native";
// import MapView, { Region } from "react-native-maps";
// import * as Location from "expo-location";
// import axios from "axios";
// import debounce from "lodash.debounce";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { LocationContext } from "@/context/locationContent";

// const { width, height } = Dimensions.get("window");
// const GOOGLE_API_KEY = "AIzaSyDbhDt1_GZG_bW-3f5s6cfSTY2CepE4GEg"; // replace with your API key

// interface PlacePrediction {
//   description: string;
//   place_id: string;
// }

// export default function LocationPicker() {
//   const mapRef = useRef<MapView>(null);
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { addLocation } = useContext(LocationContext);

//   const [region, setRegion] = useState<Region | null>(null);
//   const [currentAddress, setCurrentAddress] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [places, setPlaces] = useState<PlacePrediction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [markerLocked, setMarkerLocked] = useState(false);

//   const bottomCardHeight = useRef(new Animated.Value(150)).current;
//   const firstRender = useRef(true);

//   // detect if this was opened for saving a new address
//   const isForSavedAddress = params.mode === "saved";

//   // Debounced function to fetch address from coordinates
//   const fetchAddressFromCoords = useCallback(
//     debounce(async (lat: number, lng: number) => {
//       try {
//         const res = await axios.get(
//           `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
//         );
//         const addr = res.data?.results?.[0]?.formatted_address;
//         if (addr && addr !== currentAddress) setCurrentAddress(addr);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     }, 500),
//     [currentAddress]
//   );

//   const fetchCurrentLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setLoading(false);
//         return;
//       }
//       const loc = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Highest,
//       });
//       const initialRegion: Region = {
//         latitude: loc.coords.latitude,
//         longitude: loc.coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       };
//       setRegion(initialRegion);
//       fetchAddressFromCoords(initialRegion.latitude, initialRegion.longitude);
//       setMarkerLocked(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   // Run only once on mount
//   useEffect(() => {
//     if (firstRender.current) {
//       const addr =
//         (params.address as string) ||
//         (params.fullAddress as string) ||
//         "";

//       if (params.lat && params.lng && addr) {
//         const selectedRegion: Region = {
//           latitude: parseFloat(params.lat as string),
//           longitude: parseFloat(params.lng as string),
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         };
//         setRegion(selectedRegion);
//         setCurrentAddress(addr);
//         setSearchQuery(addr);

//         if (params.edit === "true") {
//           setMarkerLocked(true);
//         }

//         setLoading(false);
//       } else {
//         fetchCurrentLocation();
//       }

//       firstRender.current = false;
//     }
//   }, []);

//   const animateBottomCard = (toValue: number) => {
//     Animated.timing(bottomCardHeight, {
//       toValue,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: false,
//     }).start();
//   };

//   const searchPlaces = async (text: string) => {
//     setSearchQuery(text);
//     animateBottomCard(350);
//     if (!region || text.length < 2) return setPlaces([]);
//     try {
//       const res = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&location=${region.latitude},${region.longitude}&radius=2000`
//       );
//       setPlaces(res.data.predictions || []);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const selectPlace = async (placeId: string, description: string) => {
//     setSearchQuery(description);
//     setPlaces([]);
//     Keyboard.dismiss();
//     animateBottomCard(150);
//     try {
//       const res = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
//       );
//       const loc = res.data?.result?.geometry?.location;
//       const addr = res.data?.result?.formatted_address;
//       if (loc && addr) {
//         const newRegion: Region = {
//           latitude: loc.lat,
//           longitude: loc.lng,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         };
//         setRegion(newRegion);
//         fetchAddressFromCoords(newRegion.latitude, newRegion.longitude);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handleRegionChangeComplete = (newRegion: Region) => {
//     if (
//       !region ||
//       region.latitude !== newRegion.latitude ||
//       region.longitude !== newRegion.longitude
//     ) {
//       setRegion(newRegion);
//       fetchAddressFromCoords(newRegion.latitude, newRegion.longitude);
//     }
//   };

//   const handleConfirm = () => {
//     if (!region) return;

//     if (isForSavedAddress) {
//       // 👉 Navigate to AddNewAddress with coords + address
//       router.push({
//         pathname: "/map/addnewAddress",
//         params: {
//           lat: region.latitude.toString(),
//           lng: region.longitude.toString(),
//           address: currentAddress,
//         },
//       });
//     } else if (params.edit === "true") {
//       // 👉 Edit existing address flow
//       router.replace({
//         pathname: "/map/addnewAddress",
//         params: {
//           ...params,
//           lat: region.latitude.toString(),
//           lng: region.longitude.toString(),
//           address: currentAddress,
//           locked: "true",
//         },
//       });
//     } else {
//       // 👉 Default flow: save location into context
//       addLocation({
//         address: currentAddress,
//         lat: region.latitude,
//         lng: region.longitude,
//         saved:false//error
//       });
//       router.push("/icon");
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
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search for a place"
//         value={searchQuery}
//         onFocus={() => animateBottomCard(350)}
//         onChangeText={searchPlaces}
//       />
//       {places.length > 0 && (
//         <FlatList
//           style={styles.placesList}
//           data={places}
//           keyExtractor={(item) => item.place_id}
//           keyboardShouldPersistTaps="handled"
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.placeItem}
//               onPress={() => selectPlace(item.place_id, item.description)}
//             >
//               <Text style={styles.placeText}>{item.description}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         region={region}
//         onRegionChangeComplete={handleRegionChangeComplete}
//         showsUserLocation
//       />
//       <View style={styles.markerFixed}>
//         <Animated.Image
//           source={{
//             uri: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
//           }}
//           style={{ width: 40, height: 60 }}
//         />
//       </View>
//       <Animated.View style={[styles.bottomCard, { height: bottomCardHeight }]}>
//         <Text style={styles.currentLocationText}>Selected Location</Text>
//         <Text style={styles.addressText}>{currentAddress}</Text>
//         <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
//           <Text style={styles.confirmText}>Confirm & Proceed</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { width, height },
//   searchInput: {
//     position: "absolute",
//     top: 40,
//     left: 15,
//     right: 15,
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     elevation: 5,
//     zIndex: 2,
//   },
//   placesList: {
//     position: "absolute",
//     top: 95,
//     left: 15,
//     right: 15,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     elevation: 5,
//     zIndex: 2,
//     maxHeight: 200,
//   },
//   placeItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
//   placeText: { fontSize: 15, color: "#333" },
//   markerFixed: {
//     position: "absolute",
//     top: height / 2 - 40,
//     left: width / 2 - 20,
//     zIndex: 10,
//   },
//   bottomCard: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     backgroundColor: "#fff",
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 10,
//     alignItems: "center",
//   },
//   currentLocationText: { fontSize: 14, color: "#555", marginBottom: 5 },
//   addressText: { fontSize: 16, fontWeight: "500", textAlign: "center", color: "#333" },
//   confirmBtn: {
//     backgroundColor: "purple",
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     marginTop: 15,
//   },
//   confirmText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
// });


import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Animated,
  Easing,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import debounce from "lodash.debounce";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LocationContext } from "@/context/locationContent";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const GOOGLE_API_KEY = "AIzaSyDbhDt1_GZG_bW-3f5s6cfSTY2CepE4GEg   "; // Replace with your key

interface PlacePrediction {
  description: string;
  place_id: string;
}

export default function LocationPicker() {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addLocation } = useContext(LocationContext);

  const [region, setRegion] = useState<Region | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [places, setPlaces] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [markerLocked, setMarkerLocked] = useState(false);
  const [showBottomCard, setShowBottomCard] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const firstRender = useRef(true);
  const isForSavedAddress = params.mode === "saved";

  // Debounced function to fetch address from coordinates
  const fetchAddressFromCoords = useCallback(
    debounce(async (lat: number, lng: number) => {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
        );
        const addr = res.data?.results?.[0]?.formatted_address;
        if (addr && addr !== currentAddress) setCurrentAddress(addr);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 500),
    [currentAddress]
  );

  // Animate map to user's current location
  const animateToCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const wideRegion: Region = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      const zoomedRegion: Region = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0025,
      };

      setRegion(zoomedRegion);
      fetchAddressFromCoords(zoomedRegion.latitude, zoomedRegion.longitude);
      setMarkerLocked(false);

      if (mapRef.current) {
        mapRef.current.animateToRegion(wideRegion, 500);
        setTimeout(() => {
          mapRef.current?.animateCamera(
            {
              center: { latitude: zoomedRegion.latitude, longitude: zoomedRegion.longitude },
              pitch: 40,
              heading: 0,
              zoom: 17,
            },
            { duration: 1000 }
          );
        }, 600);
      }

      setShowBottomCard(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      const addr = (params.address as string) || (params.fullAddress as string) || "";

      if (params.lat && params.lng && addr) {
        const selectedRegion: Region = {
          latitude: parseFloat(params.lat as string),
          longitude: parseFloat(params.lng as string),
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        };
        setRegion(selectedRegion);
        setCurrentAddress(addr);
        setSearchQuery(addr);

        if (params.edit === "true") setMarkerLocked(true);
        setLoading(false);

        if (mapRef.current) {
          mapRef.current.animateCamera(
            {
              center: { latitude: selectedRegion.latitude, longitude: selectedRegion.longitude },
              pitch: 45,
              heading: 0,
              zoom: 17,
            },
            { duration: 1000 }
          );
        }

        setShowBottomCard(true);
      } else {
        animateToCurrentLocation();
      }

      firstRender.current = false;
    }
  }, []);

  const searchPlaces = async (text: string) => {
    setSearchQuery(text);
    setIsSearching(true);
    setShowBottomCard(false);
    if (!region || text.length < 2) return setPlaces([]);
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&location=${region.latitude},${region.longitude}&radius=2000`
      );
      setPlaces(res.data.predictions || []);
    } catch (e) {
      console.log(e);
    }
  };

  const selectPlace = async (placeId: string, description: string) => {
    setSearchQuery(description);
    Keyboard.dismiss();
    setPlaces([]);
    setIsSearching(false);

    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const loc = res.data?.result?.geometry?.location;
      const addr = res.data?.result?.formatted_address;
      if (loc && addr) {
        const newRegion: Region = {
          latitude: loc.lat,
          longitude: loc.lng,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        };
        setRegion(newRegion);
        setCurrentAddress(addr);
        fetchAddressFromCoords(newRegion.latitude, newRegion.longitude);

        if (mapRef.current) {
          mapRef.current.animateCamera(
            { center: { latitude: loc.lat, longitude: loc.lng }, pitch: 45, heading: 0, zoom: 17 },
            { duration: 1000 }
          );
        }

        setShowBottomCard(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    fetchAddressFromCoords(newRegion.latitude, newRegion.longitude);
  };

  const handleConfirm = () => {
    if (!region) return;

    if (isForSavedAddress) {
      router.push({
        pathname: "/map/addnewAddress",
        params: { lat: region.latitude.toString(), lng: region.longitude.toString(), address: currentAddress },
      });
    } else if (params.edit === "true") {
      router.replace({
        pathname: "/map/addnewAddress",
        params: { ...params, lat: region.latitude.toString(), lng: region.longitude.toString(), address: currentAddress, locked: "true" },
      });
    } else {
      addLocation({ address: currentAddress, lat: region.latitude, lng: region.longitude, saved: false });
      router.push("/icon");
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a place"
        value={searchQuery}
        onChangeText={searchPlaces}
      />

      {places.length > 0 && (
        <FlatList
          style={[styles.placesList, { zIndex: 1000 }]}
          data={places}
          keyExtractor={(item) => item.place_id}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.placeItem} onPress={() => selectPlace(item.place_id, item.description)}>
              <Text style={styles.placeText}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {!isSearching && region && (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={handleRegionChangeComplete}
            showsUserLocation
          />

          <View style={styles.markerFixed}>
            <Image
              source={{ uri: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png" }}
              style={{ width: 25, height: 40 }}
            />
          </View>
        </>
      )}

      {showBottomCard && (
        <Animated.View style={styles.bottomCard}>
          <Text style={styles.currentLocationText}>Selected Location</Text>
          <ScrollView
            style={{ maxHeight: screenHeight * 0.25, width: "100%" }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <Text style={styles.addressText}>{currentAddress}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm & Proceed</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: screenWidth, height: screenHeight },
  searchInput: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 40,
    left: 15,
    right: 15,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 5,
    zIndex: 10,
  },
  placesList: {
    position: "absolute",
    top: Platform.OS === "ios" ? 105 : 95,
    left: 15,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    maxHeight: screenHeight * 0.3,
  },
  placeItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  placeText: { fontSize: 15, color: "#333" },
  markerFixed: {
    position: "absolute",
    top: screenHeight / 2 - 20,
    left: screenWidth / 2 - 12.5,
    zIndex: 10,
    alignItems: "center",
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    zIndex: 500,
    alignItems: "center",
    maxHeight: screenHeight * 0.4,
  },
  currentLocationText: { fontSize: 14, color: "#555", marginBottom: 5 },
  addressText: { fontSize: 16, fontWeight: "500", textAlign: "center", color: "#333", flexWrap: "wrap" },
  confirmBtn: { backgroundColor: "purple", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, marginTop: 15 },
  confirmText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
