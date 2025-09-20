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
} from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import debounce from "lodash.debounce";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LocationContext } from "@/context/locationContent";

const { width, height } = Dimensions.get("window");
const GOOGLE_API_KEY = "AIzaSyDbhDt1_GZG_bW-3f5s6cfSTY2CepE4GEg"; // Replace with your key

interface PlacePrediction {
  description: string;
  place_id: string;
}

export default function LocationPicker() {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addLocation } = useContext(LocationContext); // Correct function from context

  const [region, setRegion] = useState<Region | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [places, setPlaces] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const bottomCardHeight = useRef(new Animated.Value(150)).current;

  // Fetch location on mount
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
    } else {
      fetchCurrentLocation();
    }
  }, []);

  // Fetch current device location
  const fetchCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Enable location permissions!");
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      const initialRegion: Region = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(initialRegion);
      fetchAddressFromCoords(loc.coords.latitude, loc.coords.longitude);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // Fetch address from coordinates (debounced)
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

  // Search places using Google Places Autocomplete
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

  // When a place is selected from suggestions
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

        // ✅ Save selected place to LocationContext
        addLocation({ address: addr, lat: loc.lat, lng: loc.lng });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // When the user drags the map
  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    fetchAddressFromCoords(newRegion.latitude, newRegion.longitude);
  };

  // Confirm selection
  const handleConfirm = () => {
    if (region && currentAddress) {
      addLocation({ address: currentAddress, lat: region.latitude, lng: region.longitude });
      router.push("/icon"); // Navigate next
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
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
      </View>

      <Animated.View style={[styles.bottomCard, { height: bottomCardHeight }]}>
        <Text style={styles.currentLocationText}>Selected Location</Text>
        <Text style={styles.addressText}>{currentAddress}</Text>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm & Proceed</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width, height },
  searchInput: {
    position: "absolute",
    top: 40,
    left: 15,
    right: 15,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 5,
    zIndex: 2,
  },
  placesList: {
    position: "absolute",
    top: 95,
    left: 15,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    zIndex: 2,
    maxHeight: 200,
  },
  placeItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  placeText: { fontSize: 15, color: "#333" },
  markerFixed: { position: "absolute", top: height / 2 - 60, left: width / 2 - 30, zIndex: 100 },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    alignItems: "center",
  },
  currentLocationText: { fontSize: 14, color: "#555", marginBottom: 5 },
  addressText: { fontSize: 16, fontWeight: "500", textAlign: "center", color: "#333" },
  confirmBtn: { backgroundColor: "purple", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, marginTop: 15 },
  confirmText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
