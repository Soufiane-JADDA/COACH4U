import { addUser, signUpUser } from "@/database/queries";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  AppState,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

export default function SignUpPage() {
  return (
    <GestureHandlerRootView>
      <SignUp />
    </GestureHandlerRootView>
  );
}

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("man");

  const router = useRouter();

  const handleSignUp = async () => {
      if (!email.includes("@")) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return;
      }
      if (password !== repassword) {
        Alert.alert("Password Mismatch", "Passwords do not match.");
        return;
      }
      if (password.length < 7) {
        Alert.alert("Short Password", "Password is too short.");
        return;
      }
    const userId = await signUpUser(email, password);
    if (userId) {
      const tmp = await addUser(
        userId,
        firstName,
        lastName,
        email,
        height,
        weight,
        age,
        sex
      );

      if (tmp) {
        router.push("/(tabs)/main");
      }
    }
  };
  return (
    <>
      <Stack.Screen options={{ title: "Login", headerShown: false }} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.title, { marginTop: 30 }]}>
            Create an account
          </Text>
          <View style={styles.rowContainer}>
            <View style={styles.colContainer}>
              <Text style={styles.label}>First Name:</Text>
              <TextInput
                style={styles.smallInput}
                placeholder="name"
                placeholderTextColor="#B4B4B4"
                value={firstName}
                keyboardType="email-address"
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.colContainer}>
              <Text style={styles.label}>Last Name:</Text>
              <TextInput
                style={styles.smallInput}
                placeholder="last name"
                placeholderTextColor="#B4B4B4"
                value={lastName}
                keyboardType="email-address"
                onChangeText={setLastName}
              />
            </View>
          </View>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            placeholderTextColor="#B4B4B4"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#B4B4B4"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme Password"
            placeholderTextColor="#B4B4B4"
            secureTextEntry
            value={repassword}
            onChangeText={setRepassword}
          />
          <Text style={styles.label}>Details:</Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.input, { width: "48%" }]}
              placeholder="Height in cm"
              placeholderTextColor="#B4B4B4"
              value={height}
              onChangeText={setHeight}
              keyboardType="number-pad"
              maxLength={3}
            />
            <TextInput
              style={[styles.input, { width: "48%" }]}
              placeholder="Weight in kg"
              placeholderTextColor="#B4B4B4"
              value={weight}
              onChangeText={setWeight}
              keyboardType="number-pad"
              maxLength={3}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#B4B4B4"
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            maxLength={2}
          />
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[
                styles.checkBtn,
                { borderColor: sex == "man" ? "#FF6700" : "#B4B4B4" },
              ]}
              onPress={() => {
                setSex("man");
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: sex == "man" ? "#FF6700" : "#fff" },
                ]}
              >
                Man
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.checkBtn,
                { borderColor: sex == "woman" ? "#FF6700" : "#B4B4B4" },
              ]}
              onPress={() => {
                setSex("woman");
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: sex == "woman" ? "#FF6700" : "#fff" },
                ]}
              >
                Woman
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button1, { marginTop: 20 }]}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              router.push("/(auth)/login");
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121",
    paddingVertical: 20,
  },
  header: {
    height: 50,
    backgroundColor: "#212121",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "80%",
  },
  colContainer: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#B4B4B4",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#2F2F2F",
    color: "#fff",
  },
  smallInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#B4B4B4",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#2F2F2F",
    color: "#fff",
  },
  button1: {
    width: "80%",
    height: 40,
    backgroundColor: "#FF6700",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    fontWeight: "bold",
  },
  button2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FF6700",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  separator: {
    height: 1,
    width: "60%",
    backgroundColor: "gray",
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    width: "80%",
    color: "white",
    marginBottom: 10,
  },
  checkBtn: {
    width: "48%",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#2F2F2F",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
