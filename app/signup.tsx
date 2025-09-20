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
// } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Dimensions } from "react-native";
// import { AuthContext, User } from "../context/Auth";

// const { width } = Dimensions.get("window");

// export default function SignupScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const rawPhone = params.phone;
//   const phone = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone;
//   const token = params.token as string | undefined;
// console.log(token,'................')
//   const { user, login } = useContext(AuthContext);

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!fullName || !email) {
//       Alert.alert("Error", "Please enter full name and email");
//       return;
//     }

//     if (!token) {
//       Alert.alert("Error", "Token is missing");
//       return;
//     }

//     try {
//       setLoading(true);

//     const response = await fetch("http://192.168.0.105:9094/customers/profile", {
//   method: "PUT",
//   headers: { 
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${token}`
//   },
//   body: JSON.stringify({ fullName, email }),
// });


//       const data = await response.json();
//       setLoading(false);

//       if (!response.ok) {
//         return Alert.alert("Error", data.msg || "Profile update failed");
//       }

//       // Safely merge current user with updated profile
//       const updatedUser: User = {
//         ...(user ?? {}),               // spread existing user or empty
//         fullName: data.fullName ?? "",
//         email: data.email ?? "",
//         profileComplete: true,
//         token: token,
//         phone: phone ?? "",
//         customerId: data.customerId ?? user?.customerId ?? "",
//       };

//       // Update AuthContext + AsyncStorage
//       await login(updatedUser);

//       router.replace("/profile"); // Navigate to profile
//     } catch (err) {
//       setLoading(false);
//       console.error(err);
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
//           <Text style={styles.title}>Complete Your Profile</Text>
//           <Text style={styles.subtitle}>Phone: +91 {phone}</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Full Name"
//             value={fullName}
//             onChangeText={setFullName}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             onChangeText={setEmail}
//           />

//           <TouchableOpacity
//             style={[
//               styles.submitButton,
//               { backgroundColor: fullName && email ? "#6A0DAD" : "#CBA4F7" },
//             ]}
//             onPress={handleSubmit}
//             disabled={!fullName || !email || loading}
//           >
//             <Text style={styles.submitText}>
//               {loading ? "Saving..." : "Save & Continue"}
//             </Text>
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
//   title: { fontSize: 26, fontWeight: "bold", color: "#111", marginBottom: 8 },
//   subtitle: { fontSize: 14, color: "#777", marginBottom: 30, textAlign: "center" },
//   input: {
//     width: width * 0.8,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#6A0DAD",
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   submitButton: {
//     width: width * 0.8,
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   submitText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
// });dont remove


// import React, { useState, useContext } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { AuthContext, User } from "../context/Auth";

// export default function SignupScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const rawPhone = params.phone;
//   const phone = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone;
//   const token = params.token as string | undefined;
//   const returnTo = params.returnTo as string | undefined;

//   const { user, login } = useContext(AuthContext);

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!fullName || !email) {
//       Alert.alert("Error", "Please enter full name and email");
//       return;
//     }
//     if (!token) {
//       Alert.alert("Error", "Token is missing");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch("http://192.168.0.104:9094/customers/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ fullName, email }),
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (!response.ok) {
//         return Alert.alert("Error", data.msg || "Profile update failed");
//       }

//       // ✅ Merge user with new data
//       const updatedUser: User = {
//         ...(user ?? {}),
//         fullName: data.fullName ?? fullName,
//         email: data.email ?? email,
//         profileComplete: true,
//         token: token,
//         phone: phone ?? "",
//         customerId: data.customerId ?? user?.customerId ?? "",
//       };

//       await login(updatedUser);

//       // ✅ After signup, go back to where user came from
//          router.replace({
//     pathname: "/items",
//   });
//     } catch (err) {
//       setLoading(false);
//       console.error(err);
//       Alert.alert("Error", "Something went wrong!");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Complete Your Profile</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         placeholderTextColor="#777"
//         value={fullName}
//         onChangeText={setFullName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor="#777"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: loading ? "#aaa" : "#6A0DAD" }]}
//         onPress={handleSubmit}
//         disabled={loading}
//       >
//         {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save</Text>}
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 15,
//     fontSize: 16,
//     color: "#000",
//   },
//   button: {
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
// });


import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AuthContext, User } from "../context/Auth";

export default function SignupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const rawPhone = params.phone;
  const phone = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone;
  const token = params.token as string | undefined;
  const restaurantId = params.restaurantId || "";
  const itemId = params.itemId || "";

  const { user, login } = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !email) {
      Alert.alert("Error", "Please enter full name and email");
      return;
    }
    if (!token) {
      Alert.alert("Error", "Token is missing");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://10.108.21.53:9094/customers/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName, email }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        return Alert.alert("Error", data.msg || "Profile update failed");
      }

      // ✅ Merge user with new data
      const updatedUser: User = {
        ...(user ?? {}),
        fullName: data.fullName ?? fullName,
        email: data.email ?? email,
        profileComplete: true,
        token: token,
        phone: phone ?? "",
        customerId: data.customerId ?? user?.customerId ?? "",
      };

      await login(updatedUser);

      // ✅ Navigate based on params
      if (restaurantId && itemId) {
        router.replace({
          pathname: "/items",
          params: { restaurantId, itemId },
        });
      } else {
        router.replace("/profile");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#777"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: loading ? "#aaa" : "#6A0DAD" }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
