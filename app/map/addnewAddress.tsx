import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Animated,
  Easing,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import debounce from "lodash.debounce";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AuthContext } from "@/context/Auth";

const { width, height } = Dimensions.get("window");
const GOOGLE_API_KEY = "AIzaSyDbhDt1_GZG_bW-3f5s6cfSTY2CepE4GEg"; // replace with your key

interface PlacePrediction {
  description: string;
  place_id: string;
}

export default function AddressAndOrderScreen() {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useContext(AuthContext);

  // Cart data (optional)
  const cartItems = params.cart ? JSON.parse(params.cart as string) : [];
  const totalPrice = params.totalPrice || "0";

  // Map & location
  const [region, setRegion] = useState<Region | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [places, setPlaces] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [floor, setFloor] = useState("");
  const [label, setLabel] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [showForm, setShowForm] = useState(false);

  const bottomCardHeight = useRef(new Animated.Value(150)).current;

  useEffect(() => {
    if (params.lat && params.lng && params.address) {
      const selectedRegion: Region = {
        latitude: parseFloat(params.lat as string),
        longitude: parseFloat(params.lng as string),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(selectedRegion);
      setCurrentAddress(params.address as string);
      setSearchQuery(params.address as string);
      setLoading(false);
    } else fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Enable location permissions!");
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      const initialRegion: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(initialRegion);
      fetchAddressFromCoords(location.coords.latitude, location.coords.longitude);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const fetchAddressFromCoords = useCallback(
    debounce(async (lat: number, lng: number) => {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
        );
        const addr = res.data?.results?.[0]?.formatted_address;
        if (addr) {
          setCurrentAddress(addr);
          setSearchQuery(addr);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const animateBottomCard = (toValue: number) => {
    Animated.timing(bottomCardHeight, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const searchPlaces = async (text: string) => {
    setSearchQuery(text);
    animateBottomCard(350);
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
    setPlaces([]);
    Keyboard.dismiss();
    animateBottomCard(150);

    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const loc = res.data?.result?.geometry?.location;
      const addr = res.data?.result?.formatted_address;
      if (loc && addr && mapRef.current) {
        const newRegion: Region = {
          latitude: loc.lat,
          longitude: loc.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        mapRef.current.animateToRegion(newRegion, 500);
        setCurrentAddress(addr);
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
    setShowForm(true);
  };

  // ✅ Unified single button
  const handleEnterAddress = async () => {
    if (!house) {
      Alert.alert("Missing Details", "Please enter House / Flat / Block No.!");
      return;
    }
    if (!user) {
      Alert.alert("Login Required", "You must be logged in!");
      return;
    }

    const addressData = {
      userId: user.customerId,
      fullAddress: currentAddress,
      house,
      apartment,
      floor,
      label,
      receiverPhone,
      lat: region?.latitude,
      lng: region?.longitude,
    };

    try {
      if (cartItems.length > 0) {
        // Checkout: create order
        const orderPayload = {
          userId: user.customerId,
          cartItems,
          totalPrice,
          address: addressData,
          orderDate: new Date(),
        };
        const res = await axios.post("http://192.168.0.105:5000/create-order", orderPayload);
        if (res.data.success) {
          Alert.alert("✅ Order Placed", "Your order was successful!", [{ text: "OK", onPress: () => router.push("/") }]);
          setHouse(""); setApartment(""); setFloor(""); setLabel(""); setReceiverPhone("");
        } else {
          Alert.alert("❌ Failed", "Unable to place order. Try again.");
        }
      } else {
        // New address only
        const res = await axios.post("http://192.168.0.105:5000/save-address", addressData);
        if (res.data.success) {
          Alert.alert("✅ Address Saved", "Your address has been saved!", [{ text: "OK", onPress: () => router.push("/") }]);
          setHouse(""); setApartment(""); setFloor(""); setLabel(""); setReceiverPhone("");
        } else if (res.data.duplicate) {
          Alert.alert("⚠️ Duplicate Address", "This address is already saved.");
        } else {
          Alert.alert("❌ Failed", "Unable to save address. Try again.");
        }
      }
    } catch (err) {
      console.log("Error:", err);
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
      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a place"
        value={searchQuery}
        onFocus={() => animateBottomCard(350)}
        onChangeText={searchPlaces}
      />
      {places.length > 0 && (
        <FlatList
          style={styles.placesList}
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

      {/* Map */}
      <MapView
        ref={mapRef}
        style={[styles.map, { height: showForm ? 300 : height }]}
        initialRegion={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation
      />
      <View style={[styles.markerFixed, { top: (showForm ? 300 : height) / 2 - 30 }]}>
        <Image
          source={{ uri: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png" }}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Card */}
      {!showForm && (
        <Animated.View style={[styles.bottomCard, { height: bottomCardHeight }]}>
          <Text style={styles.currentLocationText}>Selected Location</Text>
          <Text style={styles.addressText}>{currentAddress}</Text>
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm & Proceed</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Form */}
      {showForm && (
        <ScrollView style={styles.addressForm} showsVerticalScrollIndicator={false}>
          <Text style={styles.locationTitle}>{currentAddress}</Text>

          <TextInput placeholder="House / Flat / Block No.*" value={house} onChangeText={setHouse} style={styles.input} />
          <TextInput placeholder="Floor" value={floor} onChangeText={setFloor} style={styles.input} />
          <TextInput placeholder="Apartment / Road / Area*" value={apartment} onChangeText={setApartment} style={styles.input} />

          <View style={styles.saveAsContainer}>
            {["Home", "Work", "Others"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.saveAsBtn, label === item && styles.selectedSaveAsBtn]}
                onPress={() => setLabel(item)}
              >
                <Text style={[styles.saveAsText, label === item && styles.selectedSaveAsText]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {label && (
            <TextInput
              placeholder="Receiver Phone Number"
              value={receiverPhone}
              onChangeText={setReceiverPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
          )}

          {/* ✅ Single Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleEnterAddress}>
            <Text style={styles.saveBtnText}>Enter House / Flat / Block</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

// Styles (unchanged)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchInput: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  placesList: { position: "absolute", top: 100, left: 20, right: 20, maxHeight: 200, zIndex: 10, backgroundColor: "#fff", borderRadius: 10 },
  placeItem: { padding: 10, borderBottomWidth: 0.5, borderBottomColor: "#ccc" },
  placeText: { fontSize: 16 },
  map: { flex: 1 },
  markerFixed: { position: "absolute", left: width / 2 - 25, zIndex: 5 },
  bottomCard: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  currentLocationText: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  addressText: { fontSize: 14, color: "#555", marginBottom: 10 },
  confirmBtn: { backgroundColor: "purple", padding: 10, borderRadius: 8, alignItems: "center" },
  confirmText: { color: "#fff", fontWeight: "bold" },
  addressForm: { flex: 1, padding: 20 },
  locationTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
  saveAsContainer: { flexDirection: "row", marginVertical: 10, justifyContent: "space-around" },
  saveAsBtn: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 },
  selectedSaveAsBtn: { backgroundColor: "purple", borderColor: "purple" },
  saveAsText: { color: "#000" },
  selectedSaveAsText: { color: "#fff" },
  saveBtn: { backgroundColor: "purple", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
  saveBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
 