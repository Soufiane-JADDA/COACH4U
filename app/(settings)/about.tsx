import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from "react-native";
import { Stack } from "expo-router";

export default function AboutPage(){
    return( 
        <>
        <Stack.Screen options={{ title: "About", headerShown: true }} />
        <ScrollView contentContainerStyle={styles.container}>
        <Image
        style={styles.logo}
        source={require("../../assets/images/COACH4U.png")} // Replace with your logo path
        />
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.paragraph}>
        Welcome to our application! Our mission is to provide exceptional
        services and help our users achieve their goals effectively and
        efficiently.
        </Text>
        <Text style={styles.paragraph}>
        This application is built using cutting-edge technologies and is
        designed to offer a seamless user experience. We believe in innovation,
        collaboration, and continuous improvement to serve you better.
        </Text>
        <Text style={styles.subTitle}>Our Vision</Text>
        <Text style={styles.paragraph}>
        The Coach4U app combines sports and education to create a holistic,
        personalized coaching experience. With features like training plans,
        and progress tracking, it empowers users to achieve their fitness and learning goals.
        Coach4U is more than an app—it’s a step toward transforming personal development and well-being.

        </Text> 
        <Text style={styles.contact}>
        For more information, contact us at{" "}
        <Text style={styles.highlight}>support@example.com</Text>
        </Text>
    </ScrollView>
    </>
    ); 
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#212121",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#B4B4B4",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 15,
    color: "#FF6700",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    color: "#f4f4f4",
    lineHeight: 24,
    marginBottom: 15,
  },
  contact: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    color: "#f4f4f4",
  },
  highlight: {
    color: "#FF6700",
    fontWeight: "600",
  },
});