import { signInUser } from "@/database/queries";
import { Session } from "@supabase/supabase-js";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

export default function LoginPage(props: { session: Session | null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    const tmp = await signInUser(email, password);
    if (tmp) router.push("/(tabs)/main");
    else Alert.alert("Login Failed", "The user name or password is not correct.");
  };
  useEffect(() => {
    props.session && props.session.user && router.push("/(tabs)/main");
  }, []);
  return (
    <>
      <Stack.Screen options={{ title: "Login", headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          style={styles.input}
          placeholder="email@example.com"
          placeholderTextColor="#B4B4B4"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#B4B4B4"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button1} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            router.push("/(auth)/signup");
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121",
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
});
