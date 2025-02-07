import { Link, Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
  Switch,
} from "react-native-gesture-handler";
import { getUserData, updateUser } from "@/database/queries"; // Import Supabase functions


export default function EditProfilePage() {
  return (
    <GestureHandlerRootView>
      <EditProfile />
    </GestureHandlerRootView>
  );
}

function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData && userData.length > 0) {
        const user = userData[0]; // Assuming we only have one user entry
        setFirstName(user.first_name || "");
        setLastName(user.last_name || "");
        setEmail(user.email || "");
        setHeight(user.height?.toString() || "");
        setWeight(user.weight?.toString() || "");
        setAge(user.age?.toString() || "");
        setSex(user.sex || "man");
      } else {
        console.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = async () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (password !== repassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }
  
    const success = await updateUser(
      firstName,
      lastName,
      email,
      height,
      weight,
      age,
      sex
    );
  
    if (success) {
      Alert.alert("Profile Updated", "Your profile has been successfully updated.");
      router.push("/(tabs)/settings");
    } else {
      Alert.alert("Update Failed", "There was an issue updating your profile.");
    }
  };
  
  return (
    <>
     
      <Stack.Screen options={{ title: "Profile updated", headerShown: false }} /> 
      <ScrollView  style={styles.scrolling}>
        <View style={styles.container}>
          <Text style={[styles.title, { marginTop: 30, marginBottom: 30 }]}>
            Profile Settings
          </Text>
          <View style={styles.rowContainer}>
            <View style={styles.colContainer}>
              <Text style={styles.label}>First Name:</Text>
              <TextInput
                style={styles.smallInput}
                placeholder="First Name"
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
                placeholder="Show"
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
          <View style={styles.rowContainer}>
             <Text style={styles.label}>Change password ? </Text>  
            <Switch
              onValueChange={() => setChangePassword(!changePassword)}
              style={[styles.title,{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }]}
              trackColor={{ false: "#767577", true: "#FF6700" }}
              thumbColor={changePassword ? "#f5dd4b" : "#FF6700"}
              value={changePassword}
              />
          </View>
         
          {changePassword ? (
          <View style={styles.newPassContainer}>
            <Text style={styles.label}>Old Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the old password"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholderTextColor="#B4B4B4"
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
            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#B4B4B4"
              secureTextEntry
              value={repassword}
              onChangeText={setRepassword}
            />
          </View>
        ): null}


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
              }}>
              <Text
                style={[
                  styles.buttonText,
                  { color: sex == "man" ? "#FF6700" : "#fff" },
                ]}>
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
              }}>
              <Text
                style={[
                  styles.buttonText,
                  { color: sex == "woman" ? "#FF6700" : "#fff" },
                ]}>
                Woman
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button1, { marginTop: 20, marginBottom: 20 }]}
            onPress={handleEditProfile}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              router.push("/(tabs)/settings");
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

      </ScrollView> 
    </>
  );
}

const styles = StyleSheet.create({ 
  safeArea: {
    flex: 1, // Ensures it takes up the entire screen
    backgroundColor: "#0000", // Matches your desired background color
  },
  scrolling: {

    flexGrow: 1, // Ensures ScrollView content stretches 
    backgroundColor: "#212121", 
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121",
    paddingVertical: 20, 
    paddingTop: StatusBar.currentHeight
  },
  header: {
    height: 50,
    backgroundColor: "#212121",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center", // Vertically center items
    gap: 10,
    width: "80%",
  },
  colContainer: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
  },
  newPassContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center", 
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
    height: 48,
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
