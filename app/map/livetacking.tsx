// import React, { useContext, useEffect, useState, useRef } from "react";
// import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
// import MapView, { Marker, Region } from "react-native-maps";
// import { LocationContext } from "@/context/locationContent";

// const { width, height } = Dimensions.get("window");

// export default function LiveTrackingScreen() {
//   const mapRef = useRef<MapView>(null);
//   const { location } = useContext(LocationContext);

//   const [region, setRegion] = useState<Region | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Set region once location is available
//   useEffect(() => {
//     if (location?.lat && location?.lng) {
//       const initialRegion: Region = {
//         latitude: location.lat,
//         longitude: location.lng,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       };
//       setRegion(initialRegion);
//       setLoading(false);

//       // Animate map to selected location
//       setTimeout(() => {
//         mapRef.current?.animateToRegion(initialRegion, 500);
//       }, 500);
//     } else {
//       setLoading(false);
//     }
//   }, [location]);

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="purple" />
//         <Text>Loading selected location...</Text>
//       </View>
//     );
//   }

//   if (!location?.lat || !location?.lng) {
//     return (
//       <View style={styles.loader}>
//         <Text>No location selected for live tracking</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         initialRegion={region!}
//         showsUserLocation={false} // Only show selected address, not current user location
//       >
//         <Marker
//           coordinate={{ latitude: location.lat, longitude: location.lng }}
//           title="Delivery Location"
//           description={location.address}
//           pinColor="red"
//         />
//       </MapView>
//       <View style={styles.addressContainer}>
//         <Text style={styles.addressText}>{location.address}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { width, height },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
//   addressContainer: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: "white",
//     padding: 12,
//     borderRadius: 10,
//     elevation: 5,
//     alignItems: "center",
//   },
//   addressText: { fontSize: 16, fontWeight: "500", color: "#333", textAlign: "center" },
// });


import React, { useContext, useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import { LocationContext } from "@/context/locationContent";

const { width, height } = Dimensions.get("window");

export default function LiveTrackingScreen() {
  const mapRef = useRef<MapView>(null);
  const { location } = useContext(LocationContext);

  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulated delivery boy coordinates
  const [deliveryCoord, setDeliveryCoord] = useState<{ latitude: number; longitude: number } | null>(null);

  // Set region once location is available
  useEffect(() => {
    if (location?.lat && location?.lng) {
      const initialRegion: Region = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(initialRegion);
      setLoading(false);

      // Animate map to selected location
      setTimeout(() => {
        mapRef.current?.animateToRegion(initialRegion, 500);
      }, 500);

      // Start delivery simulation
      simulateDelivery(initialRegion);
    } else {
      setLoading(false);
    }
  }, [location]);

  // Simulate a delivery boy moving toward the destination
  const simulateDelivery = (destination: Region) => {
    // Hardcoded starting point (delivery boy start)
    let start = {
      latitude: destination.latitude - 0.01, // 1 km south
      longitude: destination.longitude - 0.01, // 1 km west
    };
    setDeliveryCoord(start);

    const steps = 30; // number of animation steps
    let stepCount = 0;

    const latStep = (destination.latitude - start.latitude) / steps;
    const lngStep = (destination.longitude - start.longitude) / steps;

    const interval = setInterval(() => {
      stepCount++;
      const newCoord = {
        latitude: start.latitude + latStep * stepCount,
        longitude: start.longitude + lngStep * stepCount,
      };
      setDeliveryCoord(newCoord);

      // Animate map to follow delivery
      mapRef.current?.animateToRegion(
        {
          latitude: newCoord.latitude,
          longitude: newCoord.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500
      );

      if (stepCount >= steps) clearInterval(interval);
    }, 100); // 30 steps * 100ms = 3 seconds
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="purple" />
        <Text>Loading selected location...</Text>
      </View>
    );
  }

  if (!location?.lat || !location?.lng) {
    return (
      <View style={styles.loader}>
        <Text>No location selected for live tracking</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region!}
        showsUserLocation={false}
      >
        {/* User-selected location */}
        <Marker
          coordinate={{ latitude: location.lat, longitude: location.lng }}
          title="Delivery Location"
          description={location.address}
          pinColor="red"
        />

        {/* Delivery boy */}
        {deliveryCoord && (
          <Marker
            coordinate={deliveryCoord}
            title="Delivery Boy"
            pinColor="blue"
          />
        )}

        {/* Blue line from delivery boy to destination */}
        {deliveryCoord && (
          <Polyline
            coordinates={[deliveryCoord, { latitude: location.lat, longitude: location.lng }]}
            strokeColor="blue"
            strokeWidth={3}
          />
        )}
      </MapView>

      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{location.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width, height },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  addressContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  addressText: { fontSize: 16, fontWeight: "500", color: "#333", textAlign: "center" },
});
