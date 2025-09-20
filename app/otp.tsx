// import React, { useState, useContext } from "react";
// import { 
//   View, Text, TextInput, TouchableOpacity, StyleSheet, 
//   SafeAreaView, KeyboardAvoidingView, Platform, Alert 
// } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { AuthContext } from "../context/Auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

// export default function OtpScreen() {
//   const [otp, setOtp] = useState("");
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const rawPhone = params.phone;
//   const phone = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone;
//   const { login } = useContext(AuthContext);

//   const handleVerifyOtp = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
//       return;
//     }

//     try {
//       // Verify OTP
     
//       const response = await fetch(`http://192.168.0.105:9091/auth/customer/verify-otp`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ phone, otp: otp.trim() }),
// });


//       const data = await response.json();

//       if (!response.ok) {
//         return Alert.alert("Error", data.msg || "Invalid OTP, please try again.");
//       }
//  console.log("✅ JWT Token:", data.jwtAccessToken,data.customerId);
//       // Store user in AuthContext & AsyncStorage
//       await login({
//         customerId: data.customerId,
//         fullName: data.fullName,
//         email: data.email,
//         phone: data.phone,
//         profileComplete: data.profileComplete,
//         token: data.jwtAccessToken
//       });
//       await AsyncStorage.setItem("user", JSON.stringify({
//         customerId: data.customerId,
//         fullName: data.fullName,
//         email: data.email,
//         phone: data.phone,
//         profileComplete: data.profileComplete,
//         token: data.jwtAccessToken
//       }));

//       // Navigate based on profileComplete
//       if (!data.profileComplete) {
//         router.replace({ pathname: "/signup", params: { phone, token: data.jwtAccessToken } });
//       } else {
//         router.replace("/profile"); // your icon page
//       }

//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Something went wrong!");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
//         <View style={styles.container}>
//           <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>

//           <Text style={styles.title}>Verify OTP</Text>
//           <Text style={styles.subtitle}>Enter the 6-digit code sent to +91 {phone}</Text>

//           <TextInput
//             style={styles.otpInput}
//             keyboardType="number-pad"
//             maxLength={6}
//             placeholder="Enter OTP"
//             placeholderTextColor="#aaa"
//             value={otp}
//             onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
//           />

//           <TouchableOpacity
//             style={[styles.verifyButton, { backgroundColor: otp.length === 6 ? "#6A0DAD" : "#CBA4F7" }]}
//             onPress={handleVerifyOtp}
//             disabled={otp.length !== 6}
//           >
//             <Text style={styles.verifyText}>Verify OTP</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => Alert.alert("OTP Sent", "New OTP sent!")}>
//             <Text style={styles.resendText}>Resend OTP</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#6A0DAD" },
//   container: { flex: 1, paddingHorizontal: 20, paddingTop: 60, backgroundColor: "#fff", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: "center" },
//   backButton: { position: "absolute", top: 20, left: 15, zIndex: 10, backgroundColor: "#6A0DAD", padding: 8, borderRadius: 50 },
//   title: { fontSize: 26, fontWeight: "bold", color: "#111", marginBottom: 8, marginTop: 20 },
//   subtitle: { fontSize: 14, color: "#777", marginBottom: 30, textAlign: "center" },
//   otpInput: { width: width * 0.7, height: 55, borderWidth: 1, borderColor: "#6A0DAD", borderRadius: 12, textAlign: "center", fontSize: 22, fontWeight: "600", letterSpacing: 12, color: "#000", marginBottom: 20 },
//   verifyButton: { width: width * 0.7, paddingVertical: 15, borderRadius: 12, alignItems: "center", marginTop: 10, elevation: 3 },
//   verifyText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   resendText: { marginTop: 15, color: "#6A0DAD", fontSize: 15, fontWeight: "600" },
// });dont remove



// import React, { useState, useContext } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   Dimensions,
// } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { AuthContext } from "../context/Auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const { width } = Dimensions.get("window");

// export default function OtpScreen() {
//   const [otp, setOtp] = useState("");
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const rawPhone = params.phone;
//   const phone = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone;
//   const returnTo = params.returnTo as string | undefined;

//   const { login } = useContext(AuthContext);

//   const handleVerifyOtp = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
//       return;
//     }

//     try {
//       const response = await fetch("http://192.168.0.104:9091/auth/customer/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone, otp: otp.trim() }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return Alert.alert("Error", data.msg || "Invalid OTP, please try again.");
//       }

//       // ✅ Save user in context + storage
//       const newUser = {
//         customerId: data.customerId,
//         fullName: data.fullName,
//         email: data.email,
//         phone: data.phone,
//         profileComplete: data.profileComplete,
//         token: data.jwtAccessToken,
//       };

//       await login(newUser);
//       await AsyncStorage.setItem("user", JSON.stringify(newUser));

//       // ✅ Navigate
//       if (!data.profileComplete) {
//         router.replace({
//           pathname: "/signup",
//           params: { phone, token: data.jwtAccessToken, returnTo },
//         });
//       } else {
//         router.replace({
//     pathname: "/items",
//   });
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Something went wrong!");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//         style={{ flex: 1 }}
//       >
//         <View style={styles.container}>
//           <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>

//           <Text style={styles.title}>Verify OTP</Text>
//           <Text style={styles.subtitle}>Enter the 6-digit code sent to +91 {phone}</Text>

//           <TextInput
//             style={styles.otpInput}
//             keyboardType="number-pad"
//             maxLength={6}
//             placeholder="Enter OTP"
//             placeholderTextColor="#aaa"
//             value={otp}
//             onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
//           />

//           <TouchableOpacity
//             style={[
//               styles.verifyButton,
//               { backgroundColor: otp.length === 6 ? "#6A0DAD" : "#CBA4F7" },
//             ]}
//             onPress={handleVerifyOtp}
//             disabled={otp.length !== 6}
//           >
//             <Text style={styles.verifyText}>Verify OTP</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => Alert.alert("OTP Sent", "New OTP sent!")}>
//             <Text style={styles.resendText}>Resend OTP</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#6A0DAD" },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     alignItems: "center",
//   },
//   backButton: {
//     position: "absolute",
//     top: 20,
//     left: 15,
//     zIndex: 10,
//     backgroundColor: "#6A0DAD",
//     padding: 8,
//     borderRadius: 50,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#111",
//     marginBottom: 8,
//     marginTop: 20,
//   },
//   subtitle: { fontSize: 14, color: "#777", marginBottom: 30, textAlign: "center" },
//   otpInput: {
//     width: width * 0.7,
//     height: 55,
//     borderWidth: 1,
//     borderColor: "#6A0DAD",
//     borderRadius: 12,
//     textAlign: "center",
//     fontSize: 22,
//     fontWeight: "600",
//     letterSpacing: 12,
//     color: "#000",
//     marginBottom: 20,
//   },
//   verifyButton: {
//     width: width * 0.7,
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//     elevation: 3,
//   },
//   verifyText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   resendText: { marginTop: 15, color: "#6A0DAD", fontSize: 15, fontWeight: "600" },
// });


// import React, { useState, useContext } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   Dimensions,
// } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { AuthContext } from "../context/Auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const { width } = Dimensions.get("window");

// export default function OtpScreen() {
//   const [otp, setOtp] = useState("");
//   const router = useRouter();
//   const params = useLocalSearchParams();

//   // phone param
//   const rawPhone = params.phone;
//   const phone = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone;

//   // returnTo param (profile / items / etc.)
//   const returnTo = params.returnTo as string | undefined;

//   const { login } = useContext(AuthContext);

//   const handleVerifyOtp = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
//       return;
//     }

//     try {
//       const response = await fetch("http://192.168.0.104:9091/auth/customer/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone, otp: otp.trim() }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return Alert.alert("Error", data.msg || "Invalid OTP, please try again.");
//       }

//       // ✅ Save user in context + storage
//       const newUser = {
//         customerId: data.customerId,
//         fullName: data.fullName,
//         email: data.email,
//         phone: data.phone,
//         profileComplete: data.profileComplete,
//         token: data.jwtAccessToken,
//       };

//       await login(newUser);
//       await AsyncStorage.setItem("user", JSON.stringify(newUser));

//       // ✅ Navigate based on profileComplete & returnTo
//       if (!data.profileComplete) {
//         router.replace({
//           pathname: "/signup",
//           params: { phone, token: data.jwtAccessToken, returnTo },
//         });
//       } else {
//         if (returnTo === "profile") {
//           router.replace("/profile"); // case: from profile icon
//         } else if (returnTo === "items") {
//           router.replace("/items"); // case: from items/cart flow
//         } else {
//           router.replace("/"); // fallback: home
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Something went wrong!");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//         style={{ flex: 1 }}
//       >
//         <View style={styles.container}>
//           <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>

//           <Text style={styles.title}>Verify OTP</Text>
//           <Text style={styles.subtitle}>Enter the 6-digit code sent to +91 {phone}</Text>

//           <TextInput
//             style={styles.otpInput}
//             keyboardType="number-pad"
//             maxLength={6}
//             placeholder="Enter OTP"
//             placeholderTextColor="#aaa"
//             value={otp}
//             onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
//           />

//           <TouchableOpacity
//             style={[
//               styles.verifyButton,
//               { backgroundColor: otp.length === 6 ? "#6A0DAD" : "#CBA4F7" },
//             ]}
//             onPress={handleVerifyOtp}
//             disabled={otp.length !== 6}
//           >
//             <Text style={styles.verifyText}>Verify OTP</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => Alert.alert("OTP Sent", "New OTP sent!")}>
//             <Text style={styles.resendText}>Resend OTP</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#6A0DAD" },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     alignItems: "center",
//   },
//   backButton: {
//     position: "absolute",
//     top: 20,
//     left: 15,
//     zIndex: 10,
//     backgroundColor: "#6A0DAD",
//     padding: 8,
//     borderRadius: 50,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#111",
//     marginBottom: 8,
//     marginTop: 20,
//   },
//   subtitle: { fontSize: 14, color: "#777", marginBottom: 30, textAlign: "center" },
//   otpInput: {
//     width: width * 0.7,
//     height: 55,
//     borderWidth: 1,
//     borderColor: "#6A0DAD",
//     borderRadius: 12,
//     textAlign: "center",
//     fontSize: 22,
//     fontWeight: "600",
//     letterSpacing: 12,
//     color: "#000",
//     marginBottom: 20,
//   },
//   verifyButton: {
//     width: width * 0.7,
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//     elevation: 3,
//   },
//   verifyText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   resendText: { marginTop: 15, color: "#6A0DAD", fontSize: 15, fontWeight: "600" },
// });//


// import React, { useState, useContext } from "react";
// import {
//   View, Text, TextInput, TouchableOpacity, StyleSheet,
//   SafeAreaView, KeyboardAvoidingView, Platform, Alert, Dimensions
// } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { AuthContext } from "../context/Auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const { width } = Dimensions.get("window");

// export default function OtpScreen() {
//   const [otp, setOtp] = useState("");
//   const router = useRouter();
//   const params = useLocalSearchParams();

//   const rawPhone = params.phone;
//   const phone = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone;

//   const returnTo = params.returnTo as string | undefined;
//   const restaurantId = params.restaurantId;
//   const itemId = params.itemId;

//   const { login } = useContext(AuthContext);

//   const handleVerifyOtp = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
//       return;
//     }

//     try {
//       const response = await fetch("http://192.168.0.104:9091/auth/customer/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone, otp: otp.trim() }),
//       });

//       const data = await response.json();

//         console.log("OTP Screen Params:", {
//     phone,
//     returnTo,
//     restaurantId,
//     itemId,
//   });

//       if (!response.ok) {
//         return Alert.alert("Error", data.msg || "Invalid OTP, please try again.");
//       }

//       const newUser = {
//         customerId: data.customerId,
//         fullName: data.fullName,
//         email: data.email,
//         phone: data.phone,
//         profileComplete: data.profileComplete,
//         token: data.jwtAccessToken,
//       };

//       await login(newUser);
//       await AsyncStorage.setItem("user", JSON.stringify(newUser));

//       if (!data.profileComplete) {
//         router.replace({
//           pathname: "/signup",
//           params: { phone, token: data.jwtAccessToken, returnTo, restaurantId, itemId },
//         });
//       } else {
//         if (returnTo === "items") {
//           router.replace({
//             pathname: "/items",
//             params: { restaurantId, itemId },
//           });
//         } else if (returnTo === "undefined") {
//           router.replace("/profile");
//         } else {
//           router.replace("/");
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Something went wrong!");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
//         <View style={styles.container}>
//           <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>

//           <Text style={styles.title}>Verify OTP</Text>
//           <Text style={styles.subtitle}>Enter the 6-digit code sent to +91 {phone}</Text>

//           <TextInput
//             style={styles.otpInput}
//             keyboardType="number-pad"
//             maxLength={6}
//             placeholder="Enter OTP"
//             placeholderTextColor="#aaa"
//             value={otp}
//             onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
//           />

//           <TouchableOpacity
//             style={[styles.verifyButton, { backgroundColor: otp.length === 6 ? "#6A0DAD" : "#CBA4F7" }]}
//             onPress={handleVerifyOtp}
//             disabled={otp.length !== 6}
//           >
//             <Text style={styles.verifyText}>Verify OTP</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => Alert.alert("OTP Sent", "New OTP sent!")}>
//             <Text style={styles.resendText}>Resend OTP</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#6A0DAD" },
//   container: { flex: 1, paddingHorizontal: 20, paddingTop: 60, backgroundColor: "#fff", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: "center" },
//   backButton: { position: "absolute", top: 20, left: 15, zIndex: 10, backgroundColor: "#6A0DAD", padding: 8, borderRadius: 50 },
//   title: { fontSize: 26, fontWeight: "bold", color: "#111", marginBottom: 8, marginTop: 20 },
//   subtitle: { fontSize: 14, color: "#777", marginBottom: 30, textAlign: "center" },
//   otpInput: { width: width * 0.7, height: 55, borderWidth: 1, borderColor: "#6A0DAD", borderRadius: 12, textAlign: "center", fontSize: 22, fontWeight: "600", letterSpacing: 12, color: "#000", marginBottom: 20 },
//   verifyButton: { width: width * 0.7, paddingVertical: 15, borderRadius: 12, alignItems: "center", marginTop: 10, elevation: 3 },
//   verifyText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   resendText: { marginTop: 15, color: "#6A0DAD", fontSize: 15, fontWeight: "600" },
// });


import React, { useState, useContext, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert, Dimensions
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function OtpScreen() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const params = useLocalSearchParams();
  const { login } = useContext(AuthContext);

  const rawPhone = params.phone;
  const phone = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone;

  const returnTo = params.returnTo || "";
  const restaurantId = params.restaurantId || "";
  const itemId = params.itemId || "";

  useEffect(() => {
    console.log("OTP Screen Params:", { phone, returnTo, restaurantId, itemId });
  }, []);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch("http://10.108.21.53:9091/auth/customer/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: otp.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        return Alert.alert("Error", data.msg || "Invalid OTP, please try again.");
      }

      const newUser = {
        customerId: data.customerId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        profileComplete: data.profileComplete,
        token: data.jwtAccessToken,
      };

      await login(newUser);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));

      // Decide navigation
      if (!data.profileComplete) {
        router.replace({ pathname: "/signup", params: { phone, token: data.jwtAccessToken, returnTo, restaurantId, itemId } });
      } else {
        if (returnTo === "items" && restaurantId && itemId) {
          router.replace({ pathname: "/items", params: { restaurantId, itemId } });
        } else {
          router.replace("/profile");
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to +91 {phone}</Text>

          <TextInput
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="Enter OTP"
            placeholderTextColor="#aaa"
            value={otp}
            onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
          />

          <TouchableOpacity
            style={[styles.verifyButton, { backgroundColor: otp.length === 6 ? "#6A0DAD" : "#CBA4F7" }]}
            onPress={handleVerifyOtp}
            disabled={otp.length !== 6}
          >
            <Text style={styles.verifyText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#6A0DAD" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 60, backgroundColor: "#fff", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: "center" },
  backButton: { position: "absolute", top: 20, left: 15, zIndex: 10, backgroundColor: "#6A0DAD", padding: 8, borderRadius: 50 },
  title: { fontSize: 26, fontWeight: "bold", color: "#111", marginBottom: 8, marginTop: 20 },
  subtitle: { fontSize: 14, color: "#777", marginBottom: 30, textAlign: "center" },
  otpInput: { width: width * 0.7, height: 55, borderWidth: 1, borderColor: "#6A0DAD", borderRadius: 12, textAlign: "center", fontSize: 22, fontWeight: "600", letterSpacing: 12, color: "#000", marginBottom: 20 },
  verifyButton: { width: width * 0.7, paddingVertical: 15, borderRadius: 12, alignItems: "center", marginTop: 10 },
  verifyText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
