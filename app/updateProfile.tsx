


import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { AuthContext } from "../context/Auth";

type FormType = {
  fullName: string;
  email: string;
  phone: string;
};

export default function EditAccountScreen() {
  const { user, login } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState<FormType>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [editingField, setEditingField] = useState<keyof FormType | null>(null);

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Separate endpoints for fullname and email
  const handleSaveFullName = async () => {
    if (!user?.token) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    try {
      const res = await axios.put(
        "http://192.168.0.105:9094/customers/profile/fullname",
        { newFullName: form.fullName },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (res.data.message) {
        const updatedUser = { ...user, fullName: form.fullName };
        await login(updatedUser);
        Alert.alert("Success", "Full name updated!");
        setEditingField(null);
      } else {
        Alert.alert("Error", res.data.message || "Update failed");
      }
    } catch (error) {
      console.error("FullName Update Error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleSaveEmail = async () => {
    if (!user?.token) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    try {
      const res = await axios.put(
        "http://192.168.0.105:9094/customers/profile/email",
        { newEmail: form.email },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    console.log("Email Update Response:", res.data);
      if (res.data.message) {
        const updatedUser = { ...user, email: form.email };
        await login(updatedUser);
        Alert.alert("Success", "Email updated!");
        setEditingField(null);
      } else {
        Alert.alert("Error", res.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Email Update Error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };5

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Account</Text>
        </View>

        {/* Full Name */}
        <View style={styles.fieldBox}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={[styles.input, editingField === "fullName" && styles.inputActive]}
            value={form.fullName}
            editable={editingField === "fullName"}
            onChangeText={(txt) => setForm({ ...form, fullName: txt })}
          />
          {editingField === "fullName" ? (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.updateBtn} onPress={handleSaveFullName}>
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditingField(null)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setEditingField("fullName")} style={styles.editBtn}>
              <Text style={styles.editText}>EDIT</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Email */}
        <View style={styles.fieldBox}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput
            style={[styles.input, editingField === "email" && styles.inputActive]}
            value={form.email}
            editable={editingField === "email"}
            onChangeText={(txt) => setForm({ ...form, email: txt })}
          />
          {editingField === "email" ? (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.updateBtn} onPress={handleSaveEmail}>
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditingField(null)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setEditingField("email")} style={styles.editBtn}>
              <Text style={styles.editText}>EDIT</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Phone (read-only) */}
        <View style={styles.fieldBox}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#f5f5f5" }]}
            value={form.phone}
            editable={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "700", marginLeft: 15 },
  fieldBox: { marginBottom: 25 },
  label: { fontSize: 12, fontWeight: "600", color: "#666", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, fontSize: 16, paddingVertical: 8, paddingHorizontal: 10 },
  inputActive: { borderColor: "purple" },
  editBtn: { position: "absolute", right: 20, top: 35 },
  editText: { color: "purple", fontWeight: "700" },
  buttonRow: { flexDirection: "row", marginTop: 10, justifyContent: "space-between" },
  updateBtn: { backgroundColor: "#A78BFA", padding: 10, borderRadius: 8, flex: 1, marginRight: 5 },
  updateText: { color: "#fff", fontWeight: "700", textAlign: "center" },
  cancelBtn: { backgroundColor: "#FECACA", padding: 10, borderRadius: 8, flex: 1, marginLeft: 5 },
  cancelText: { color: "#EF4444", fontWeight: "700", textAlign: "center" },
});

