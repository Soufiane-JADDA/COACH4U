import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { WebView } from "react-native-webview"; // To display YouTube videos in the app

import data from "../../assets/exercises.json";

export default function ExerciseDetails() {
  const { id, name } = useLocalSearchParams() as Record<string, string>;
  const video = useRef<Video>(null);
  const [showYouTubeVideo, setShowYouTubeVideo] = useState(false);
  useEffect(() => {
    if (video.current) {
      video.current
        .playAsync()
        .catch((error) => console.warn("Video playback error: ", error));
    }
  }, []);
  
  // Find the exercise by ID or Name
  const exercise = data.find(
    (item) => item.id.toString() === id || item.name.toLowerCase() === name?.toLowerCase()
  );

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Exercise not found.</Text>
      </View>
    );
  }
  const shortVideo = exercise.videoShortDemo;

  // Render individual equipment items
  const renderEquipmentItem = ({
    item,
  }: {
    item: { name: string; advice: string };
  }) => (
    <View style={styles.equipmentItem}>
      <Text style={styles.text}>
        {item.name}: {item.advice}
      </Text>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{ title: "Exercise Details", headerShown: true }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{exercise.name}</Text>

        {/* Pro Tip Section */}
        <Text style={styles.subtitle}>Pro Tip</Text>
        <Text style={styles.text}>
          {exercise.proTip || "No pro tips available."}
        </Text>

        {/* Target Muscle Section */}
        <Text style={styles.subtitle}>Target Muscle</Text>
        {exercise.typeMuscle.image ? (
          <Image
            source={{ uri: exercise.typeMuscle.image }}
            style={styles.image}
          />
        ) : (
          <Text style={styles.text}>No image available for this muscle.</Text>
        )}

        <Text style={styles.text}>
          {exercise.typeMuscle.name || "Unknown muscle"}:{" "}
          {exercise.typeMuscle.description || "No description available."}
        </Text>

        {/* Videos Section */}

        {/* source={{ uri: exercise.videoShortDemo }}*/}
        <Text style={styles.subtitle}>Videos</Text>
        {exercise.videoShortDemo && (
          <>
            {exercise.videoShortDemo ? (
              <Video
                ref={video}
                source={
                  exercise.videoShortDemo.startsWith("http")
                    ? { uri: exercise.videoShortDemo } // Remote URL
                    : require(`../../assets/videos/1.mp4`) // Local file
                }
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            ) : (
              <Text style={styles.text}>Video not available</Text>
            )}
            <Text style={styles.text}>Short Demo</Text>
          </>
        )}

        {exercise.videoInDepthExpl && (
          <>
            <TouchableOpacity
              onPress={() => setShowYouTubeVideo(true)}
              style={styles.showVideoButton}
            >
              <Text style={styles.buttonText}>Watch In-Depth Explanation</Text>
            </TouchableOpacity>
            {showYouTubeVideo && (
              <Modal visible={showYouTubeVideo} animationType="slide">
                <WebView
                  style={styles.video}
                  source={{ uri: exercise.videoInDepthExpl }}
                  allowsFullscreenVideo
                />
                <Button
                  title="Close"
                  onPress={() => setShowYouTubeVideo(false)}
                />
              </Modal>
            )}
          </>
        )}

        {/* Steps Section */}
        <Text style={styles.subtitle}>Steps</Text>
        {exercise.steps.length > 0 ? (
          exercise.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.text}>No steps available</Text>
        )}

        {/* Equipment Section */}
        <Text style={styles.subtitle}>Equipment</Text>
        {exercise.equipment.length > 0 ? (
          <View>
            {exercise.equipment.map((item, index) => (
              <View key={index} style={styles.equipmentItem}>
                <Text style={[styles.text, styles.equipmentName]}>
                  {item.name}
                </Text>
                <Text style={styles.text}>{item.advice}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.text}>No equipment required.</Text>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "#212121",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#FFF",
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    color: "#B4B4B4",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
  video: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start", // Align text properly in the same row
    marginBottom: 10,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginRight: 10,
  },
  stepText: {
    flex: 1, // Allow step text to wrap properly
    fontSize: 16,
    color: "#B4B4B4",
  },
  equipmentItem: {
    padding: 10,
    paddingBottom: 40,
    backgroundColor: "#2F2F2F",
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  equipmentName: {
    fontWeight: "bold",
    color: "#FFF",
  },
  showVideoButton: {
    backgroundColor: "#FF6700",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
