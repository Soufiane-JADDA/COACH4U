/*import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { router } from "expo-router";
import { Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-gifted-charts";
import {GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
export default function HomeScreen() {
  const data = [
    { value: 30, label: "26/12" },
    { value: 40, label: "02/01" },
    { value: 50, label: "09/01" },
    { value: 20, label: "16/01" },
  ];

  return (
    <GestureHandlerRootView>
      <ScrollView style={styles.container}>
        <View
          style={[styles.block, { flexDirection: "row", paddingVertical: 20 }]}
        >
          <Feather name="target" size={32} color="white" />
          <Text style={[styles.text, { fontWeight: "bold", marginLeft: 10 }]}>
            Current Goal:{" "}
          </Text>
          <Text style={[styles.text]}>Gain Muscles</Text>
        </View>
        <View
          style={[styles.block, { flexDirection: "row", paddingVertical: 20 }]}
        >
          <MaterialIcons name="timelapse" size={32} color="white" />
          <Text style={[styles.text, { fontWeight: "bold", marginLeft: 10 }]}>
            60%{" "}
          </Text>
          <Text style={[styles.text]}>Completed</Text>
        </View>
        <View
          style={[styles.block, { flexDirection: "column", paddingVertical: 20 }]}
        >
          <View style={[{ flexDirection: "row" }]}>
            <MaterialIcons name="timeline" size={32} color="white" />
            <Text style={[styles.text, { fontWeight: "bold", marginLeft: 10 }]}>
              Last Month Progress
            </Text>
          </View>
          <LineChart
            data={data}
            areaChart
            color="white" // Change the color of the chart elements
            yAxisColor="#FFFFFF" // Change the color of the y-axis
            xAxisColor="#FFFFFF" // Change the color of the x-axis
            rulesColor={"#FFFFFF"} // Change the color of the rules
            hideRules={true} // Hide the rules
            hideDataPoints
            yAxisTextStyle={{ color: "#FFFFFF" }} // Change the color of y-axis numbers
            xAxisLabelTextStyle={{ color: "#FFFFFF" }} // Change the color of y-axis numbers
            width={200} // Set the width of the chart
            height={160} // Set the height of the chart
          />
        </View>
        <View
          style={[styles.block, { flexDirection: "column", paddingVertical: 20 }]}
        >
          <View style={[{ flexDirection: "row" }]}>
            <FontAwesome6 name="list-check" size={32} color="white" /> 
            <Text style={[styles.text, { fontWeight: "bold", marginLeft: 10 }]}>
              Achievements 
            </Text>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    gap: 10,
    backgroundColor: "#212121",
    padding: 10,
  },
  block: {
    borderColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});
*/
