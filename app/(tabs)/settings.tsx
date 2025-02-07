import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Modal,
  Platform,
  StatusBar,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Profiler } from "react";
import { getUserData } from "@/database/queries";

export default function SettingsPage() {

  const [language, setLanguage] = useState("English"); // Current language state
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state  
  const languages = ["English", "Arabic"]; // Language options 

  // Fetch the stored language preference
  useEffect(() => {
    async function loadLanguage() {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      if (savedLang) {
        setLanguage(savedLang);
      }
    }
    loadLanguage();
  }, []);

  const [form, setForm] = useState({ 
    emailNotifications: true,
    // pushNotifications: false,
  });

  const [firstName, setFirstName] = useState("firstName");
  const [lastName, setLastName] = useState("lastName");
  const [email, setEmail] = useState("email");

  // Save the selected language in AsyncStorage
  const handleLanguageChange = async (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    await AsyncStorage.setItem("appLanguage", selectedLanguage);
    setModalVisible(false);
  };

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUserData();
      if (userData) {
        setFirstName(userData[0].first_name); 
        setLastName(userData[0].last_name); 
        setEmail(userData[0].email); 
      }
    }
    fetchUser();
  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.section, { paddingTop: 4 }]}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.sectionBody}>
            <TouchableOpacity
              onPress={() => {
                router.push("/(settings)/editProfile");
              }}
              style={styles.profile}
            >
              <Image
                alt=""
                source={require("../../assets/images/react-logo.png")}
                style={styles.profileAvatar}
              />
              <View>
                <Text style={styles.profileName}>{firstName} {lastName}</Text>
                <Text style={styles.profileHandle}>{email}</Text>
              </View>
              {/* icon here like > for opening */}
              <MaterialCommunityIcons
                name="chevron-right"
                size={26}
                color="#bcbcbc"
                style={{marginLeft: 'auto'}}// Align icon to the right
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
          onPress={() => setModalVisible(true)} // Show modal when pressed
                  //onPress={() => {}}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Language</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{language}</Text>
                  <MaterialCommunityIcons
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              {/* Language Selection Modal */}
              <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Language</Text>
                    <FlatList
                      data={languages}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => handleLanguageChange(item)}
                          style={styles.languageOption}>
                          <Text style={styles.languageText}>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              </Modal>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Location</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>Morocco, MA</Text>
                  <MaterialCommunityIcons
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Notifications</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={emailNotifications =>
                      setForm({ ...form, emailNotifications })
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.emailNotifications} />
                </View>
              </View>
              {/* <View style={[styles.rowWrapper, styles.rowLast]}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Push Notifications</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={pushNotifications =>
                      setForm({ ...form, pushNotifications })
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.pushNotifications} />
                </View>
              </View> */}
            </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(settings)/contact");
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Contact Us</Text>
                <View style={styles.rowSpacer} />
                <MaterialCommunityIcons
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View> 
            <View style={[styles.rowWrapper, styles.rowLast]}>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(settings)/about");
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>About</Text>
                <View style={styles.rowSpacer} />
                <MaterialCommunityIcons
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <View
              style={[
                styles.rowWrapperLogOut,
                styles.rowFirst,
                styles.rowLast,
                { alignItems: 'center' },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(auth)/login")
                }}
                style={styles.row}>
                <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.contentFooter}>App Version 1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#212121",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFF",
    flexGrow: 1, // Allows the title to grow and take up remaining space.
    flexShrink: 1, // Allows the title to shrink if necessary.
    flexBasis: 0, // Initial size of the title is 0; flexible sizing takes precedence.
    textAlign: "center",
  },

  // Content
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    color: "#B4B4B4", // Sets the text color to a light grayish tone.
  },

  // Section
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "#B4B4B4",
    textTransform: "uppercase",
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  // Profile
  profile: {
    padding: 12,
    backgroundColor: "#2F2F2F",  
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999, // Makes the avatar circular.
    marginRight: 12,
  },
  profileBody: {
    marginRight: "auto", // Pushes the profile body to take remaining space.
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffff", 
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: "#858585",
  },

  // Row
  row: {
    height: 44,
    width: "100%", // Makes the row take up the full width.
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Aligns child elements to the start of the row.
    paddingRight: 12,
  },
  rowWrapperLogOut: {
    paddingLeft: 16,
    backgroundColor: "#FF6700",  
    borderTopWidth: 1, // Adds a border at the top.
    borderColor: "#B4B4B4", // Sets the border color to light gray.
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: "#2F2F2F",  
    borderTopWidth: 1, // Adds a border at the top.
    borderColor: "#B4B4B4", // Sets the border color to light gray.
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24, // Adds spacing between letters.
    color: "#fff",  
  },
  rowSpacer: {
    flexGrow: 1, // Allows the spacer to grow and take up remaining space.
    flexShrink: 1, // Allows the spacer to shrink if necessary.
    flexBasis: 0, // Initial size of the spacer is 0; flexible sizing takes precedence.
  },
  rowValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#B4B4B4", // Sets the text color to light grayish tone.
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    color: "#fff", 
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#2F2F2F",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#fff", 
  },
  languageOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff", 
  },
  languageText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff", 
  },
});
