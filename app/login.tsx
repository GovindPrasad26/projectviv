

// import React, { useState, useContext } from "react";
// import {
//   View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
//   Dimensions, Image, ScrollView, TextInput, KeyboardAvoidingView,
//   Platform, Alert, ToastAndroid
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { AuthContext } from "../context/Auth";

// const { width } = Dimensions.get("window");

// export default function LoginScreen() {
//   const [showPhoneBox, setShowPhoneBox] = useState(false);
//   const [phone, setPhone] = useState("");
//   const router = useRouter();
//   const { login } = useContext(AuthContext);

//   const isValid = phone.length === 10;

//   const handleLoginClick = () => setShowPhoneBox(true);

//   const handleGetOtp = async () => {
//     if (!isValid) {
//       Alert.alert("Invalid Number", "Please enter a valid 10-digit phone number.");
//       return;
//     }

//     try {
//       console.log("otp request")
//       const response = await fetch("http://192.168.0.104:9091/auth/customer/request-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone }),
//       });

//       console.log("request over")
//       const data = await response.json();
//       console.log("Send OTP Response:", data);

//       if (response.ok) {
//         ToastAndroid.show("OTP Sent Successfully!", ToastAndroid.SHORT);
//         router.push(`/otp?phone=${encodeURIComponent(phone)}`);
//       } else {
//         Alert.alert("Error", data.msg || "Failed to send OTP");
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Something went wrong!");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={styles.container}>
//           {/* Top Orange Header */}
//           <View style={styles.header}>
//             <Image
//               source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.svg" }}
//               style={styles.logo}
//             />
//             <Text style={styles.tagline}>
//               One app for food, dining, groceries {"\n"} & more in minutes!
//             </Text>
//             <Image
//               source={{ uri: "https://media.istockphoto.com/id/1252641777/photo/assorted-indian-food-on-a-dark-wooden-background.jpg?s=612x612&w=0&k=20&c=Jm5G5L4IadkoKg4Fv_b6cB2TtuAhpFkxErhmruV3DkY=" }}
//               style={styles.banner}
//             />
//           </View>

//           {/* Account Section */}
//           <View style={styles.card}>
//             <Text style={styles.accountTitle}>ACCOUNT</Text>
//             <Text style={styles.accountSubtitle}>Login/Create Account to manage orders</Text>

//             {!showPhoneBox ? (
//               <TouchableOpacity style={styles.loginButton} onPress={handleLoginClick}>
//                 <Text style={styles.loginText}>LOGIN</Text>
//               </TouchableOpacity>
//             ) : (
//               <>
//                 <View style={styles.inputBox}>
//                   <Text style={styles.countryCode}>+91</Text>
//                   <TextInput
//                     style={styles.phoneInput}
//                     placeholder="Enter phone number"
//                     keyboardType="number-pad"
//                     maxLength={10}
//                     value={phone}
//                     onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
//                   />
//                 </View>

//                 <TouchableOpacity
//                   style={[styles.otpButton, { backgroundColor: isValid ? "purple" : "#CBA4F7" }]}
//                   onPress={handleGetOtp}
//                   disabled={!isValid}
//                 >
//                   <Text style={styles.otpText}>Get OTP</Text>
//                 </TouchableOpacity>
//               </>
//             )}

//             <Text style={styles.policyText}>
//               By clicking, I accept the <Text style={styles.link}>Terms & Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>
//             </Text>

//             <TouchableOpacity style={styles.option}>
//               <Ionicons name="pricetag-outline" size={20} color="#444" />
//               <Text style={styles.optionText}>Offers</Text>
//               <Ionicons name="chevron-forward" size={20} color="#999" />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.option}>
//               <Ionicons name="mail-outline" size={20} color="#444" />
//               <Text style={styles.optionText}>Send Feedback</Text>
//               <Ionicons name="chevron-forward" size={20} color="#999" />
//             </TouchableOpacity>

//             <Text style={styles.version}>App version 1.0.0</Text>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#fff" },
//   container: { flexGrow: 1, backgroundColor: "#fff" },
//   header: { backgroundColor: "purple", alignItems: "center", paddingVertical: 25 },
//   logo: { width: 60, height: 60, tintColor: "#fff", marginBottom: 12 },
//   tagline: {
//     color: "#fff",
//     fontSize: 16,
//     textAlign: "center",
//     fontWeight: "600",
//     marginBottom: 15,
//     lineHeight: 22,
//   },
//   banner: { width, height: 180, resizeMode: "cover" },
//   card: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     marginTop: -15,
//     elevation: 3,
//   },
//   accountTitle: { fontSize: 16, fontWeight: "bold", color: "#111" },
//   accountSubtitle: { fontSize: 13, color: "#777", marginTop: 4, marginBottom: 20 },
//   loginButton: {
//     backgroundColor: "purple",
//     paddingVertical: 14,
//     borderRadius: 6,
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   loginText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
//   inputBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     marginBottom: 12,
//     paddingHorizontal: 10,
//     height: 50,
//   },
//   countryCode: { fontSize: 16, color: "#333", fontWeight: "bold", marginRight: 8 },
//   phoneInput: { flex: 1, fontSize: 16, color: "#000" },
//   otpButton: { paddingVertical: 14, borderRadius: 6, alignItems: "center", marginBottom: 12 },
//   otpText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
//   policyText: { fontSize: 12, textAlign: "center", color: "#777", marginBottom: 15 },
//   link: { color: "purple", fontWeight: "600" },
//   option: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//   },
//   optionText: { flex: 1, marginLeft: 10, fontSize: 15, color: "#333" },
//   version: { textAlign: "center", color: "#aaa", marginTop: 15, fontSize: 12 },
// });dont


import React, { useState, useContext } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  Dimensions, Image, ScrollView, TextInput, KeyboardAvoidingView,
  Platform, Alert, ToastAndroid
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AuthContext } from "../context/Auth";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const [showPhoneBox, setShowPhoneBox] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const params = useLocalSearchParams();
  const { login } = useContext(AuthContext);

  const returnTo = params.returnTo as string | undefined;
  const restaurantId = params.restaurantId;
  const itemId = params.itemId;

  const isValid = phone.length === 10;

  const handleLoginClick = () => setShowPhoneBox(true);
  console.log("Login Screen Params:", { returnTo, restaurantId, itemId });
  const handleGetOtp = async () => {
    if (!isValid) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.102:9091/auth/customer/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        ToastAndroid.show("OTP Sent Successfully!", ToastAndroid.SHORT);

        // Navigate to OTP screen with extra params
        router.push(`/otp?phone=${encodeURIComponent(phone)}&returnTo=${returnTo || ""}&restaurantId=${restaurantId || ""}&itemId=${itemId || ""}`);
      } else {
        Alert.alert("Error", data.msg || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.svg" }} style={styles.logo} />
            <Text style={styles.tagline}>One app for food, dining, groceries {"\n"} & more in minutes!</Text>
            <Image
              source={{ uri: "https://media.istockphoto.com/id/1252641777/photo/assorted-indian-food-on-a-dark-wooden-background.jpg?s=612x612&w=0&k=20&c=Jm5G5L4IadkoKg4Fv_b6cB2TtuAhpFkxErhmruV3DkY=" }}
              style={styles.banner}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.accountTitle}>ACCOUNT</Text>
            <Text style={styles.accountSubtitle}>Login/Create Account to manage orders</Text>

            {!showPhoneBox ? (
              <TouchableOpacity style={styles.loginButton} onPress={handleLoginClick}>
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
            ) : (
              <>
                <View style={styles.inputBox}>
                  <Text style={styles.countryCode}>+91</Text>
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="Enter phone number"
                    keyboardType="number-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.otpButton, { backgroundColor: isValid ? "purple" : "#CBA4F7" }]}
                  onPress={handleGetOtp}
                  disabled={!isValid}
                >
                  <Text style={styles.otpText}>Get OTP</Text>
                </TouchableOpacity>
              </>
            )}

            <Text style={styles.policyText}>
              By clicking, I accept the <Text style={styles.link}>Terms & Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>
            </Text>

            <TouchableOpacity style={styles.option}>
              <Ionicons name="pricetag-outline" size={20} color="#444" />
              <Text style={styles.optionText}>Offers</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Ionicons name="mail-outline" size={20} color="#444" />
              <Text style={styles.optionText}>Send Feedback</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <Text style={styles.version}>App version 1.0.0</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flexGrow: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "purple", alignItems: "center", paddingVertical: 25 },
  logo: { width: 60, height: 60, tintColor: "#fff", marginBottom: 12 },
  tagline: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "600", marginBottom: 15, lineHeight: 22 },
  banner: { width, height: 180, resizeMode: "cover" },
  card: { backgroundColor: "#fff", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -15, elevation: 3 },
  accountTitle: { fontSize: 16, fontWeight: "bold", color: "#111" },
  accountSubtitle: { fontSize: 13, color: "#777", marginTop: 4, marginBottom: 20 },
  loginButton: { backgroundColor: "purple", paddingVertical: 14, borderRadius: 6, alignItems: "center", marginBottom: 12 },
  loginText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  inputBox: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 12, paddingHorizontal: 10, height: 50 },
  countryCode: { fontSize: 16, color: "#333", fontWeight: "bold", marginRight: 8 },
  phoneInput: { flex: 1, fontSize: 16, color: "#000" },
  otpButton: { paddingVertical: 14, borderRadius: 6, alignItems: "center", marginBottom: 12 },
  otpText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  policyText: { fontSize: 12, textAlign: "center", color: "#777", marginBottom: 15 },
  link: { color: "purple", fontWeight: "600" },
  option: { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderColor: "#eee" },
  optionText: { flex: 1, marginLeft: 10, fontSize: 15, color: "#333" },
  version: { textAlign: "center", color: "#aaa", marginTop: 15, fontSize: 12 },
});
