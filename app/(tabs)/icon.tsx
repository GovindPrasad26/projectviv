import React, { useContext } from "react";
import { View, ScrollView, Dimensions, Platform, SafeAreaView, StyleSheet, Image, TouchableOpacity, Text, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import Header from "@/Header/headerSection"; // ✅ Import Header component
import { AuthContext } from "@/context/Auth";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const scale = (size: number) => Math.round(size * (width / 375));

export default function Home() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={{ paddingHorizontal: isWeb ? width * 0.05 : scale(16) }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🔹 Reusable Header Component */}
        <Header />

        {/* 🔹 Food Delivery & Instamart Cards */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card} onPress={() => router.push("/")}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
              }}
              style={styles.cardImg}
            />
            <Text style={styles.cardTitle}>FOOD DELIVERY</Text>
            <Text style={styles.cardSub}>FROM RESTAURANTS</Text>
            <Text style={styles.offerText}>UP TO 60% OFF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/263/263142.png",
              }}
              style={styles.cardImg}
            />
            <Text style={styles.cardTitle}>INSTAMART</Text>
            <Text style={styles.cardSub}>GET ANYTHING INSTANTLY</Text>
            <Text style={styles.offerText}>UP TO ₹100 OFF</Text>
          </TouchableOpacity>
        </View>

        {/* 🔹 Branding Section */}
        <View style={styles.branding}>
          <Text style={styles.brandTitle}>Live {"\n"}it up!</Text>
          <Text style={styles.brandSub}>Crafted with ❤️ in Kakinada, India</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 🔹 Styles (body-related only)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! : 0, // ✅ Use only status bar for Android
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(16),
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: scale(12),
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardImg: {
    width: scale(70),
    height: scale(70),
    marginBottom: scale(8),
  },
  cardTitle: {
    fontSize: scale(14),
    fontWeight: "bold",
    color: "#333",
  },
  cardSub: {
    fontSize: scale(11),
    color: "#666",
  },
  offerText: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "purple",
    marginTop: scale(6),
  },
  branding: {
    marginTop: scale(25),
    backgroundColor: "#f5f5f5",
    padding: scale(20),
    borderRadius: 12,
    alignItems: "center",
  },
  brandTitle: {
    fontSize: scale(28),
    fontWeight: "900",
    color: "#333",
    textAlign: "center",
  },
  brandSub: {
    fontSize: scale(14),
    color: "#777",
    marginTop: scale(6),
  },
});
