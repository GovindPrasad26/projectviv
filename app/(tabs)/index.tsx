import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/Header/headerSection";
import { setRestaurants } from "@/actioncreator/resturntlocation";
import { LocationContext } from "@/context/locationContent";
import { useRouter } from "expo-router";
import { setSelectedRestaurant } from "@/reducer/resturantloc";

const { width } = Dimensions.get("window");

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { location } = useContext(LocationContext);

  const restaurants = useSelector((state: any) => state.restaurant.restaurants);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "veg" | "nonVeg">("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (location?.lat && location?.lng) {
      fetchRestaurants(location.lat, location.lng);
    }
  }, [location]);

  const fetchRestaurants = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.108.21.53:9092/restaurants/nearby?longitude=${lng}&latitude=${lat}`
      );
      const data = await response.json();
      dispatch(setRestaurants(data));
    } catch (err) {
      console.log(err);
      dispatch(setRestaurants([]));
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = restaurants
    .map((r: any) => {
      let items = r.items;

      if (filterType === "veg") {
        items = items.filter((i: any) => i.foodType?.toUpperCase() === "VEG");
      } else if (filterType === "nonVeg") {
        items = items.filter(
          (i: any) =>
            i.foodType?.toUpperCase() === "NON_VEG" ||
            i.foodType?.toUpperCase() === "NON-VEG" ||
            i.foodType?.toUpperCase() === "NONVEG"
        );
      }

      if (items.length === 0) return null;
      if (searchText && !r.restaurantName.toLowerCase().includes(searchText.toLowerCase()))
        return null;

      return { ...r, items };
    })
    .filter(Boolean);

  const renderRestaurant = ({ item }: any) => {
    const imageUri =
      item.restaurantImageUrl ||
      "https://via.placeholder.com/600x400.png?text=Restaurant";

    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setSelectedRestaurant(item.restaurantId));
          router.push("/items");
        }}
      >
        <View style={styles.card}>
          <Image source={{ uri: imageUri }} style={styles.restaurantImage} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.restaurantName}</Text>
            <Text style={styles.cuisine}>
              {item.distance || "Nearby"} | {item.deliveryTime || "Fast Delivery"}
            </Text>
            <Text style={styles.itemsCount}>{item.items.length} items</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#1f5f61" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Sticky Header + Banner */}
      <View style={styles.headerWrapper}>
        <Header />
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search for restaurants"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={[styles.filterBtn, filterType === "veg" && styles.activeVeg]}
            onPress={() => setFilterType(filterType === "veg" ? "all" : "veg")}
          >
            <Text style={[styles.filterText, filterType === "veg" && styles.activeFilterText]}>
              VEG
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, filterType === "nonVeg" && styles.activeNonVeg]}
            onPress={() => setFilterType(filterType === "nonVeg" ? "all" : "nonVeg")}
          >
            <Text style={[styles.filterText, filterType === "nonVeg" && styles.activeFilterText]}>
              NON-VEG
            </Text>
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={{
            uri: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
          }}
          style={styles.banner}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.overlay} />
          <Text style={styles.bannerText}>Craving something delicious?</Text>
        </ImageBackground>
      </View>

      {/* Restaurant List */}
      {filteredRestaurants.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.noDataText}>No restaurants found nearby.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.restaurantId.toString()}
          renderItem={renderRestaurant}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  noDataText: { fontSize: 16, color: "#555", fontWeight: "500" },
  headerWrapper: {
    backgroundColor: "#1f5f61",
    width,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
    fontSize: 14,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginLeft: 5,
    backgroundColor: "#f8f8f8",
  },
  filterText: { fontSize: 12, fontWeight: "600", color: "#333" },
  activeFilterText: { color: "#fff" },
  activeVeg: { backgroundColor: "green", borderColor: "green" },
  activeNonVeg: { backgroundColor: "red", borderColor: "red" },
  banner: {
    height: 180,
    marginHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    overflow: "hidden",
  },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.25)", borderRadius: 20 },
  bannerText: { fontSize: 22, fontWeight: "700", color: "#fff", textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    width: width * 0.9,
    alignSelf: "center",
    marginBottom: 18,
    marginTop: 18,
  },
  restaurantImage: { width: "100%", height: 160 },
  info: { padding: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 18, fontWeight: "700", color: "#222" },
  cuisine: { color: "#555", marginTop: 4, fontSize: 14 },
  itemsCount: { marginTop: 4, fontWeight: "600", fontSize: 13, color: "#777" },
});
